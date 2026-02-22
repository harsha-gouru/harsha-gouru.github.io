---
title: Exploring x402 — HTTP-Native Payments
date: 2026-02-22
description: My first experiment with Coinbase's x402 protocol for micropayments on Base.
---

I've been tinkering with [x402](https://github.com/coinbase/x402), an open protocol by Coinbase that brings payments directly into HTTP using the `402 Payment Required` status code.

## Why it's interesting

The web never had a native payment layer. We got API keys, subscriptions, OAuth — but never "pay per request." x402 changes that.

The flow is dead simple:

- Client hits a paid endpoint
- Server responds with `402` and a payment schema
- Client signs a USDC payment and retries
- Server delivers the resource

## What I built

A pay-per-joke API. It charges $0.001 USDC per joke on Base Sepolia. The server uses `@x402/express` middleware, and the client uses `@x402/fetch` which auto-handles the 402 response.

## What I learned

- The middleware intercepts requests *before* your route handler runs
- The client library handles everything — detect 402, sign, retry — zero manual work
- Coinbase's facilitator verifies payments for free (1,000 tx/month)
- Micropayments actually work when the infrastructure is this simple

## What's next

I want to explore AI agents that can autonomously pay for resources. Imagine an agent that reads RSS feeds, finds relevant articles, and pays for premium content — all without human intervention.
