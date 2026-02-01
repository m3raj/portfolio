"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

/* ---------------- Articles Data ---------------- */

const ARTICLES = [
  {
    id: "engineering-to-code",
    title: "From Engineering to Code: My Transition",
    excerpt:
      "How I pivoted from a B.E degree to Full Stack Development. The challenges, the late nights, and the breakthroughs.",
    category: "Journey",
    readTime: "5 min read",
    color: "from-blue-500 to-cyan-500",

    content: `
My journey from traditional engineering to full-stack development was not easy.

After completing my Bachelor of Engineering, I realized that my real passion was building software.
I started learning programming by myself using online courses, documentation, and open-source projects.

Initially, concepts like data structures, backend systems, and deployment were overwhelming.
Many nights were spent debugging errors and fixing broken code.

Over time, consistency paid off.

I built small projects, learned Git, explored frameworks like Spring Boot and React,
and gradually improved my confidence.

Today, I work on scalable applications and continue learning every day.

This transition taught me that dedication and curiosity matter more than degrees.
    `,
  },

  {
    id: "microservices",
    title: "Understanding Microservices Architecture",
    excerpt:
      "A deep dive into how I built the InSource IT Solutions backend using Java, SpringBoot, Docker, and RabbitMQ.",
    category: "Tech",
    readTime: "8 min read",
    color: "from-purple-500 to-pink-500",

    content: `
Microservices architecture allows applications to be divided into small independent services.

In my InSource IT Solutions project, I separated authentication, user management,
and business logic into different services.

Each service communicates using RabbitMQ.

Docker helped me containerize every service for easy deployment.
Spring Boot provided fast development and strong security.

Benefits I experienced:

• Independent scaling
• Faster development
• Easier debugging
• Better fault isolation

However, microservices require strong monitoring and logging.

Without proper tools, debugging becomes difficult.

Overall, microservices gave my system flexibility and long-term scalability.
    `,
  },

  {
    id: "java-choice",
    title: "Why I Picked Java for The Hashed",
    excerpt:
      "Explaining why I chose Java and Spring Boot for The Hashed e-commerce platform.",
    category: "Tech",
    readTime: "6 min read",
    color: "from-orange-500 to-red-500",

    content: `
When building The Hashed, performance and security were my top priorities.

Java offered:

• Strong typing
• Mature ecosystem
• Excellent frameworks
• Enterprise-level security

Spring Boot helped me build REST APIs quickly.
Hibernate handled database operations.
JWT secured user authentication.

Java’s multithreading support improved performance under heavy traffic.

The platform now supports:

• User accounts
• Orders
• Payments
• Admin panel
• Inventory system

Choosing Java ensured long-term stability and maintainability.
    `,
  },
];

/* ---------------- Blog Component ---------------- */

export default function Blog() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedArticle = ARTICLES.find((a) => a.id === selectedId);

  return (
    <section
      id="blog"
      className="relative z-20 bg-[#0a0a0a] py-32 px-4 md:px-12 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-16 text-center"
        >
          Insights
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map((article, index) => (
            <motion.div
              key={article.id}
              onClick={() => setSelectedId(article.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:bg-white/10 transition flex flex-col">
                {/* Gradient */}
                <div
                  className={`h-2 bg-linear-to-r ${article.color}`}
                />

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex justify-between mb-6">
                    <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white font-bold">
                      {article.category}
                    </span>

                    <span className="text-xs text-gray-500 font-mono">
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition">
                    {article.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed mb-6 flex-1">
                    {article.excerpt}
                  </p>

                  <div className="text-blue-400 font-bold text-sm group-hover:translate-x-2 transition">
                    Read Article →
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ---------------- Modal ---------------- */}

      <AnimatePresence>
        {selectedArticle && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50"
            />

            {/* Modal */}
            <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="bg-[#121212] w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 shadow-2xl relative"
              >
                {/* Close */}
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/10"
                >
                  ✕
                </button>

                <div className="p-8 md:p-12">
                  <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white font-mono">
                    {selectedArticle.category}
                  </span>

                  <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-2">
                    {selectedArticle.title}
                  </h2>

                  <p className="text-gray-500 mb-8">
                    {selectedArticle.readTime}
                  </p>

                  <article className="text-gray-300 leading-relaxed space-y-4 whitespace-pre-line text-lg">
                    {selectedArticle.content}
                  </article>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
