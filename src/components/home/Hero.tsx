"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";

export const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 200], [1, 1.1]);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax and 3D effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ 
          y, 
          opacity,
          scale,
          rotateX: mousePosition.y * 0.15,
          rotateY: mousePosition.x * -0.15,
        }}
      >
        <Image
          src="/images/hero-bg.jpg"
          alt="Sénégal background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-50 mix-blend-overlay"></div>
      </motion.div>

      {/* Animated particles */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.3,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: [`${Math.random() * 100}%`, `${Math.random() * 100 + 15}%`, `${Math.random() * 100}%`],
              opacity: [0.3, Math.random() * 0.3 + 0.2, 0.3],
              scale: [0.8, Math.random() * 0.5 + 1, 0.8]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10 px-4 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-left text-white lg:col-span-7"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60px" }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="h-1 bg-secondary mb-6"
            />
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight"
            >
              Pour un Sénégal{" "}
              <motion.span 
                className="relative inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-secondary">fort</span>
                <motion.span 
                  className="absolute bottom-0 left-0 h-1 bg-secondary"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                />
              </motion.span>,{" "}
              <motion.span 
                className="relative inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-secondary">uni</span>
                <motion.span 
                  className="absolute bottom-0 left-0 h-1 bg-secondary"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                />
              </motion.span>{" "}
              et{" "}
              <motion.span 
                className="relative inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-secondary">prospère</span>
                <motion.span 
                  className="absolute bottom-0 left-0 h-1 bg-secondary"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.6, duration: 0.8 }}
                />
              </motion.span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl mb-8 leading-relaxed max-w-xl text-gray-200 font-light"
            >
              L'Alliance Pour la République s'engage à bâtir un avenir meilleur pour tous les Sénégalais, fondé sur la solidarité, l'innovation et le progrès.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link 
                  href="/join"
                  className="btn bg-secondary hover:bg-secondary-dark text-white py-3 px-8 shadow-lg transform transition-all duration-300 hover:-translate-y-1 rounded-full"
                >
                  Adhérer maintenant
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link 
                  href="/about"
                  className="btn bg-transparent backdrop-blur-sm border border-white/30 hover:border-white hover:bg-white/10 text-white py-3 px-8 shadow-lg flex items-center transform transition-all duration-300 hover:-translate-y-1 rounded-full"
                >
                  Découvrir notre vision 
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="ml-2"
                  >
                    <FaArrowRight />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 40 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden lg:block lg:col-span-5"
          >
            <div className="relative p-6 bg-white/90 shadow-2xl backdrop-blur-md rounded-xl">
              <h2 className="text-2xl font-serif font-bold mb-6 text-primary border-b border-gray-200 pb-4">
                Actualités récentes
              </h2>
              
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex gap-4 items-start group cursor-pointer"
                  whileHover={{ y: -5 }}
                >
                  <div className="rounded-lg overflow-hidden flex-shrink-0 relative shadow-md">
                    <Image 
                      src="/images/news-1.jpg" 
                      alt="Actualité" 
                      width={80} 
                      height={80}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/20 transition-colors duration-300"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                      Grand rassemblement à Dakar pour le lancement de notre programme
                    </h3>
                    <p className="text-sm text-gray-500">15 mars 2023</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="flex gap-4 items-start group cursor-pointer"
                  whileHover={{ y: -5 }}
                >
                  <div className="rounded-lg overflow-hidden flex-shrink-0 relative shadow-md">
                    <Image 
                      src="/images/news-2.jpg" 
                      alt="Actualité" 
                      width={80} 
                      height={80}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/20 transition-colors duration-300"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                      Notre parti accueille une délégation internationale
                    </h3>
                    <p className="text-sm text-gray-500">28 février 2023</p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  whileHover={{ x: 5 }}
                >
                  <Link href="/actualites" className="text-primary font-medium flex items-center hover:underline">
                    Toutes les actualités 
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="ml-2"
                    >
                      <FaArrowRight />
                    </motion.span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center text-white cursor-pointer">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider">Découvrir plus</p>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="bg-secondary/80 rounded-full p-2 backdrop-blur-sm"
            whileHover={{ scale: 1.2, backgroundColor: "rgba(255,255,255,0.3)" }}
          >
            <FaChevronDown className="text-white" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}; 