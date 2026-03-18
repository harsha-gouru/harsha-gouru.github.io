---
title: "Apple Says This Chip Is Inference-Only. I Trained on It Anyway."
date: 2026-03-18
description: Part 1 of "What's Inside the Neural Engine?" — how I got training loops running on Apple's NPU, and why it's faster than the GPU sitting right next to it.
---

Every Apple Silicon chip has a Neural Engine. It's right there on the die — 38 trillion operations per second on the M4 Pro, more raw throughput than the GPU for neural network workloads. Apple uses it for everything: photo search, Siri, autocorrect, background intelligence tasks you never see.

But there's a catch. Apple only lets you *run* models on it. Not train them. CoreML, the official framework, is inference-only. No gradients, no optimizer, no backward pass. The Neural Engine is a black box that takes a model in and spits predictions out.

This isn't just an Apple thing. Nobody trains on NPUs. Not Qualcomm's Hexagon, not Samsung's NPU, not Google's Edge TPU. The entire industry treats neural processing units as inference accelerators. Training happens on GPUs. That's the rule.

I wanted to know if the rule was real or just a convention.

## The question

I came across a project that had already cracked part of this open. Someone had figured out how to dispatch matrix multiplications to the Neural Engine using private APIs — the kind Apple doesn't document or support, the kind that could break with any OS update. They'd built a small training loop: a GPT-style language model, learning on the Neural Engine.

It worked. But it was slow in ways that didn't make sense. The training step took 128 milliseconds, and most of that time wasn't spent on the Neural Engine at all. The ANE would finish its matrix multiplications in a few milliseconds, then sit idle while the CPU ground through everything else — normalization, activation functions, loss computation, weight updates.

The Neural Engine was fast. Everything around it wasn't.

## Going hybrid

My first instinct was obvious: if the CPU is the bottleneck, move work to the GPU. The M4 Pro has a capable GPU sitting right there, doing nothing during training. Let it handle the heavy compute while the ANE does what it does best.

So I tried. Metal compute shaders for the activation functions, the normalization, the loss computation. The results were... disappointing.

Here's something I didn't expect: for the tensor sizes in this model, the GPU is slower than the CPU. Not because the GPU is weak, but because *launching* a GPU kernel has overhead. Creating a command buffer, encoding the work, committing it, waiting for completion — that cycle costs about 0.2 to 0.5 milliseconds per kernel. When the actual computation takes less time than the dispatch overhead, you're better off staying on the CPU.

The Apple Silicon CPU has something called AMX — a matrix coprocessor that BLAS libraries use automatically. For the shapes I was working with, AMX running through `cblas_sgemm` was genuinely faster than the GPU running through Metal Performance Shaders. A tall-thin matrix multiply that the GPU can't fully parallelize is exactly where AMX shines.

The GPU wasn't the answer. The CPU was the answer — I just needed to make the CPU faster.

## Death by a thousand copies

When I actually profiled where time was going, the picture was grim. The single biggest cost wasn't computation at all. It was *data conversion*.

The Neural Engine only speaks fp16 in a specific memory layout. The CPU works in fp32 with standard row-major arrays. Every time data moves between them, you're converting millions of floating-point numbers from one format to another, packing them into the right shape, copying them into the right buffers. This was eating 19% of every training step.

The second biggest cost was the loss function. Cross-entropy loss over a 32,000-word vocabulary, computed 256 times per step. The original implementation accessed memory in the worst possible pattern — striding across columns of a row-major matrix, thrashing the cache on every access.

I fixed the memory layout. Transposed the logits so the hot loop could scan contiguous memory. A single layout change took the loss computation from 72 milliseconds to 0.9.

## NEON over everything

Once I started looking for CPU optimization opportunities, they were everywhere. The activation function backward pass was 13 separate vectorized calls where one fused loop would do. The position encoding was recomputing trigonometric functions every step instead of looking them up from a table. The soft-capping function was dispatched to the GPU when a polynomial approximation on the CPU would be both faster and free of dispatch overhead.

Each fix was small. Together they changed the character of the training loop. The CPU wasn't a bottleneck anymore — it was a lean, tight pipeline feeding the Neural Engine exactly what it needed, exactly when it needed it.

## The result

Starting point: **127.8 ms/step**.

After everything: **58.5 ms/step**. A **2.18x speedup**.

The model is 82 million parameters — a GPT-style transformer with 8 layers, 6 attention heads, 768-dimensional embeddings. It trains at over 17 steps per second on a MacBook Pro. The loss curve is numerically identical to the original — same learning, just faster.

For context: on the same chip, training via the official Metal Performance Shaders GPU path gets you 764 ms/step for a *smaller* 11.5 million parameter model. The Neural Engine path trains a 6x bigger model 8x faster than the GPU path on the same silicon.

An NVIDIA H100 trains a comparable 50 million parameter model at 314 ms/step. The M4 Pro Neural Engine — a chip in a laptop — is doing 58.5 ms/step on a bigger model.

## What I actually learned

The Neural Engine isn't slow. The ecosystem around it is just not designed for training. Every piece of infrastructure assumes you're running inference: load a model, feed it data, get a prediction. There's no gradient tape, no autograd, no optimizer integration.

But the hardware doesn't care what you're doing. Matrix multiplication is matrix multiplication. The forward pass and the backward pass are both just matmuls with different inputs. If you can dispatch a matmul for inference, you can dispatch one for training.

The real engineering challenge isn't on the Neural Engine — it's everything else. The data format conversions, the memory layouts, the CPU operations between ANE dispatches. Get those right and the Neural Engine just does its thing.

Nobody trains on NPUs today. Not because the hardware can't do it, but because nobody built the software to make it work. That's a solvable problem.

## What's next

This is Part 1 of a series called *What's Inside the Neural Engine?* In the next post, I'll talk about something I found while digging into Apple's on-device ML stack: your iPhone is running 86 neural networks right now, and one of them is a hidden CLIP model that powers every photo search you've ever done.

[Part 2: 86 ML Models Are Running on Your iPhone Right Now →](/blog/ane-training-part-2)
