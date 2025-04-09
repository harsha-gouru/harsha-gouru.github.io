import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-black mb-6">About Me</h1>
      
      <div className="prose prose-slate max-w-none">
        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          Hi, I'm Harsha! I'm a software developer and technology enthusiast with a passion for quantum computing, 
          web development, and artificial intelligence.
        </p>
        
        <div className="bg-white rounded border border-gray-100 mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-black mb-4">My Tech Journey</h2>
            <p className="text-gray-600 mb-4">
              I began my journey in technology by exploring web development, creating websites and applications 
              that solve real-world problems. Over time, my interests expanded to include quantum computing and its 
              potential applications in optimization and machine learning.
            </p>
            <p className="text-gray-600">
              Today, I continue to explore the intersection of these fields, seeking innovative ways to leverage 
              quantum principles in practical software solutions.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded border border-gray-100">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-black mb-3">Technical Skills</h2>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-black mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Web Development (React, TypeScript, Node.js)
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-black mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Quantum Computing (Qiskit, Pennylane)
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-black mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Machine Learning & AI (TensorFlow, PyTorch)
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-black mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Cloud Services (AWS, Azure)
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded border border-gray-100">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-black mb-3">Current Interests</h2>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-black mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Quantum Machine Learning
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-black mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Modern Frontend Frameworks
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-black mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Serverless Architectures
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-black mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Edge Computing
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded border border-gray-100 mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-black mb-4">Why I Blog</h2>
            <p className="text-gray-600 mb-4">
              This blog serves as a platform to share my learnings, experiments, and insights with the broader 
              tech community. Writing helps me solidify my understanding and potentially helps others facing 
              similar challenges.
            </p>
            <p className="text-gray-600">
              I believe in the power of open knowledge exchange to accelerate innovation and discovery in 
              technology.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8">
          <h2 className="text-xl font-semibold text-black mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            I'm always interested in connecting with fellow technologists, researchers, and curious minds. 
            Whether you have questions about my work, ideas for collaboration, or just want to say hello, 
            feel free to reach out!
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="https://github.com/harsha-gouru" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com/in/harsha-gouru" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-black transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="mailto:harsha.gouru@example.com"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 