import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="text-center mb-16">
        <h1 className="font-heading text-5xl font-bold mb-6 bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text">
          About Me
        </h1>
        <img
          src="https://github.com/harsha-gouru.png"
          alt="Harsha Gouru"
          className="w-48 h-48 rounded-full mx-auto mb-8 border-4 border-primary-500"
        />
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Hi, I'm Harsha! I'm a passionate software engineer who loves building things for the web.
        </p>
      </section>

      <section className="prose prose-lg dark:prose-invert prose-primary max-w-none mb-16">
        <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-white">
          My Journey
        </h2>
        <p>
          I started my journey in software development during my college years, where I discovered
          my passion for creating web applications. Since then, I've been constantly learning and
          exploring new technologies to improve my skills.
        </p>
        <p>
          Currently, I'm focused on modern web development technologies like React, TypeScript,
          and Node.js. I believe in writing clean, maintainable code and creating intuitive user
          experiences.
        </p>

        <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-white">
          What I Do
        </h2>
        <ul>
          <li>Frontend Development with React and TypeScript</li>
          <li>Backend Development with Node.js</li>
          <li>Database Design and Implementation</li>
          <li>API Development and Integration</li>
          <li>Technical Writing and Documentation</li>
        </ul>

        <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-white">
          Beyond Coding
        </h2>
        <p>
          When I'm not coding, you can find me reading tech blogs, contributing to open-source
          projects, or exploring new tools and frameworks. I also enjoy sharing my knowledge
          through writing and helping others learn programming.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="font-heading text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Skills
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Frontend
              </h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'HTML/CSS'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Backend
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST APIs'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="font-heading text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Get in Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
          <div className="space-y-4">
            <a
              href="https://github.com/harsha-gouru"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
              </svg>
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/harsha-gouru"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="mailto:harsha.gouru@example.com"
              className="flex items-center text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 