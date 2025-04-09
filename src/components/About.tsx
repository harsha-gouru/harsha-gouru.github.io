import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">About Me</h1>
      
      <div className="prose prose-slate max-w-none">
        <p className="text-lg text-slate-700 leading-relaxed mb-8">
          Hi, I'm Harsha! I'm a software developer and technology enthusiast with a passion for quantum computing, 
          web development, and artificial intelligence.
        </p>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-10">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2"></div>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">My Tech Journey</h2>
            <p className="mb-4">
              I began my journey in technology by exploring web development, creating websites and applications 
              that solve real-world problems. Over time, my interests expanded to include quantum computing and its 
              potential applications in optimization and machine learning.
            </p>
            <p>
              Today, I continue to explore the intersection of these fields, seeking innovative ways to leverage 
              quantum principles in practical software solutions.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2"></div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Technical Skills</h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Web Development (React, TypeScript, Node.js)
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Quantum Computing (Qiskit, Pennylane)
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Machine Learning & AI (TensorFlow, PyTorch)
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Cloud Services (AWS, Azure)
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-2"></div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Current Interests</h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                  </svg>
                  Quantum Machine Learning
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                  </svg>
                  Modern Frontend Frameworks
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                  </svg>
                  Serverless Architectures
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                  </svg>
                  Edge Computing
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl shadow-md overflow-hidden text-white mb-10">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Why I Blog</h2>
            <p className="mb-4">
              This blog serves as a platform to share my learnings, experiments, and insights with the broader 
              tech community. Writing helps me solidify my understanding and potentially helps others facing 
              similar challenges.
            </p>
            <p>
              I believe in the power of open knowledge exchange to accelerate innovation and discovery in 
              technology.
            </p>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Get in Touch</h2>
          <p className="mb-6">
            I'm always interested in connecting with fellow technologists, researchers, and curious minds. 
            Whether you have questions about my work, ideas for collaboration, or just want to say hello, 
            feel free to reach out!
          </p>
          <div className="flex space-x-4">
            <a 
              href="https://github.com/harsha-gouru" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com/in/harsha-gouru" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="mailto:harsha.gouru@example.com"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
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