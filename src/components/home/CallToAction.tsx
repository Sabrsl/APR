"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView, useViewportScroll, useTransform } from "framer-motion";
import { FaArrowRight, FaUsers, FaRegLightbulb, FaRegHandshake } from "react-icons/fa";

// Composant pour les bulles flottantes
const FloatingBubble = ({ delay, size, x, y, duration, className }: any) => (
  <motion.div
    className={`absolute rounded-full backdrop-blur-md ${className}`}
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0.3, 0.8, 0.3],
      y: [0, y, 0],
      x: [0, x, 0],
      scale: [1, 1.2, 1]
    }}
    transition={{ 
      duration, 
      delay, 
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut"
    }}
    style={{ width: size, height: size }}
  />
);

// Composant pour les icônes flottantes
const FloatingIcon = ({ icon, delay, x, y, size, rotate }: any) => (
  <motion.div
    className="absolute text-white/10"
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.1, 0.3, 0.1],
      rotate: [0, rotate, 0],
      scale: [0.8, 1.2, 0.8],
      y: [0, y, 0],
      x: [0, x, 0]
    }}
    transition={{ 
      duration: 15 + Math.random() * 10,
      delay,
      repeat: Infinity,
      repeatType: "loop"
    }}
    style={{ fontSize: size }}
  >
    {icon}
  </motion.div>
);

// Composant principal
export const CallToAction = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hovered, setHovered] = useState(false);
  const { scrollYProgress } = useViewportScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section className="section py-32 relative overflow-hidden" ref={ref}>
      {/* Gradient backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary to-primary-dark"></div>
      <motion.div 
        className="absolute inset-0 bg-[url('/images/map-senegal.svg')] bg-no-repeat bg-center opacity-5"
        style={{ y: backgroundY, backgroundSize: "70%" }}
      />
      
      {/* Animated bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingBubble 
          delay={0} 
          size="15rem" 
          x="-5%" 
          y="-15%" 
          duration={25} 
          className="top-[10%] left-[10%] bg-white/5"
        />
        <FloatingBubble 
          delay={5} 
          size="12rem" 
          x="10%" 
          y="20%" 
          duration={20} 
          className="bottom-[15%] right-[10%] bg-secondary/5"
        />
        <FloatingBubble 
          delay={2} 
          size="8rem" 
          x="-8%" 
          y="10%" 
          duration={18} 
          className="top-[40%] right-[20%] bg-white/5"
        />
        <FloatingBubble 
          delay={8} 
          size="6rem" 
          x="12%" 
          y="-12%" 
          duration={22} 
          className="bottom-[30%] left-[25%] bg-white/5"
        />
        
        {/* Floating icons */}
        <FloatingIcon 
          icon={<FaUsers />} 
          delay={0} 
          x="50" 
          y="-30" 
          size="4rem"
          rotate={15}
        />
        <FloatingIcon 
          icon={<FaRegLightbulb />} 
          delay={4} 
          x="-60" 
          y="40" 
          size="3.5rem"
          rotate={-10}
        />
        <FloatingIcon 
          icon={<FaRegHandshake />} 
          delay={8} 
          x="30" 
          y="50" 
          size="5rem"
          rotate={10}
        />
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-md bg-white/5 rounded-3xl p-10 md:p-16 shadow-2xl border border-white/10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
              className="text-center text-white"
            >
              <motion.span 
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-block px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 shadow-inner"
              >
                Rejoignez le mouvement
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl md:text-5xl font-bold font-serif mb-8 leading-tight"
              >
                Ensemble, construisons l'avenir du Sénégal
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-xl text-white/90 max-w-2xl mx-auto mb-10"
              >
                L'Alliance Pour la République a besoin de votre engagement et de votre soutien pour continuer à transformer notre nation.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-5 justify-center"
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    y: -5
                  }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setHovered(true)}
                  onHoverEnd={() => setHovered(false)}
                  className="relative"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-secondary to-secondary-dark rounded-full opacity-0"
                    animate={{ opacity: hovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <Link 
                    href="/join"
                    className="btn relative z-10 bg-white text-primary hover:text-white py-4 px-10 rounded-full font-medium flex items-center justify-center group transition-all duration-300"
                  >
                    Devenir membre
                    <motion.span
                      animate={{ x: hovered ? 5 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-2"
                    >
                      <FaArrowRight />
                    </motion.span>
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    y: -5, 
                    backgroundColor: "rgba(255, 255, 255, 0.15)" 
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="backdrop-blur-sm"
                >
                  <Link 
                    href="/contact"
                    className="btn bg-transparent border-2 border-white/50 text-white py-4 px-10 rounded-full font-medium flex items-center justify-center transition-all duration-300"
                  >
                    Nous contacter
                  </Link>
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="mt-16 text-white/70 text-sm"
              >
                <p>
                  Rejoignez plus de <span className="font-semibold text-white">2 millions</span> de Sénégalais qui soutiennent déjà notre vision pour un Sénégal prospère
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}; 