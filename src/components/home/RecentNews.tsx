"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";

// Données fictives
const recentNews = [
  {
    id: "1",
    title: "Programme économique : Relance et innovation",
    excerpt: "Notre parti dévoile son nouveau plan économique axé sur la croissance inclusive et l'innovation technologique.",
    image: "/images/news1.jpg",
    date: "15 juin 2023",
    category: "Économie"
  },
  {
    id: "2",
    title: "Partenariat international pour l'éducation",
    excerpt: "Signature d'un accord majeur pour améliorer l'accès à l'éducation de qualité dans les zones rurales.",
    image: "/images/news2.jpg",
    date: "3 juin 2023",
    category: "Éducation"
  },
  {
    id: "3",
    title: "Initiative pour la formation des jeunes",
    excerpt: "Lancement d'un programme innovant visant à former 10 000 jeunes aux métiers du numérique.",
    image: "/images/news3.jpg",
    date: "28 mai 2023",
    category: "Jeunesse"
  }
];

export const RecentNews = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.19, 1.0, 0.22, 1.0]
      }
    }
  };

  return (
    <section className="section py-24 bg-background-gray relative overflow-hidden">
      {/* Background design elements */}
      <motion.div 
        className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary opacity-5"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-secondary opacity-5"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-secondary uppercase tracking-wider font-medium mb-2 block">Restez informé</span>
          <h2 className="section-title text-3xl md:text-5xl font-bold font-serif text-primary">Actualités Récentes</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 mt-8">
              Découvrez les dernières initiatives, réformes et activités de l'Alliance Pour la République au service du Sénégal.
            </p>
          </div>
        </motion.div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {recentNews.map((news, index) => (
            <motion.div
              key={news.id}
              variants={itemVariants}
              className="presidential-card group overflow-hidden flex flex-col bg-white"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ 
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
              }}
            >
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  style={{ 
                    transformOrigin: 'center'
                  }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-full p-4 flex justify-between items-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-white">
                    {news.category}
                  </span>
                  <div className="flex items-center text-white text-sm">
                    <FaCalendarAlt className="mr-2" />
                    {news.date}
                  </div>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold font-serif mb-3 text-primary group-hover:text-secondary transition-colors">
                  {news.title}
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">{news.excerpt}</p>
                <Link
                  href={`/news/${news.id}`}
                  className="inline-flex items-center text-secondary font-medium hover:text-primary transition-colors"
                >
                  Lire plus
                  <motion.span
                    animate={hoveredIndex === index ? { x: 5 } : { x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-2"
                  >
                    <FaArrowRight />
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <Link
            href="/news"
            className="inline-flex items-center justify-center px-8 py-3 rounded bg-primary hover:bg-primary-dark text-white font-medium transition-all hover:scale-105 hover:shadow-lg"
          >
            Toutes les actualités
            <FaArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}; 