"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaHandshake, FaLightbulb, FaBalanceScale, FaGlobeAfrica } from "react-icons/fa";

const values = [
  {
    icon: <FaHandshake className="w-16 h-16 text-secondary" />,
    title: "Solidarité",
    description: "Nous croyons en une société où chaque Sénégalais est soutenu par la communauté, où personne n'est laissé pour compte."
  },
  {
    icon: <FaLightbulb className="w-16 h-16 text-secondary" />,
    title: "Innovation",
    description: "Nous favorisons les idées nouvelles et les solutions créatives pour relever les défis du Sénégal d'aujourd'hui et de demain."
  },
  {
    icon: <FaBalanceScale className="w-16 h-16 text-secondary" />,
    title: "Justice",
    description: "Nous défendons un système juridique impartial et accessible à tous, garantissant l'égalité de tous devant la loi."
  },
  {
    icon: <FaGlobeAfrica className="w-16 h-16 text-secondary" />,
    title: "Développement durable",
    description: "Nous œuvrons pour un Sénégal qui progresse économiquement tout en préservant son environnement et son patrimoine culturel."
  }
];

export const ValueCards = () => {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.19, 1.0, 0.22, 1.0] // Ease in-out cubic
      }
    }
  };

  return (
    <section className="section py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-secondary uppercase tracking-wider font-medium mb-2 block">Ce qui nous définit</span>
          <h2 className="section-title text-3xl md:text-5xl font-bold font-serif text-primary">Nos valeurs fondamentales</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 mt-8">
              L'Alliance Pour la République s'engage à défendre et promouvoir ces valeurs essentielles qui guident notre vision pour l'avenir du Sénégal.
            </p>
          </div>
        </motion.div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              variants={cardVariants}
              className="presidential-card p-8 hover:border-l-4 hover:border-l-secondary transition-all group bg-white hover:bg-gradient-to-b hover:from-white hover:to-gray-50"
              whileHover={{ 
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
              }}
            >
              <div className="flex justify-center mb-8">
                <div className="p-5 bg-primary/5 rounded-full transform transition-transform group-hover:scale-110 group-hover:bg-primary/10">
                  {value.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold font-serif mb-4 text-primary text-center relative">
                {value.title}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "30%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  className="h-0.5 bg-secondary absolute bottom-0 left-1/2 transform -translate-x-1/2 mt-2"
                />
              </h3>
              <p className="text-gray-600 text-center">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}; 