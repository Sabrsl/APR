"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { FaTrophy, FaUsers, FaHandshake, FaLandmark } from "react-icons/fa";

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  delay: number;
  index: number;
}

const stats = [
  {
    icon: <FaUsers className="w-10 h-10 text-secondary" />,
    value: 2000000,
    label: "Membres",
    suffix: "+",
    delay: 0
  },
  {
    icon: <FaLandmark className="w-10 h-10 text-secondary" />,
    value: 45,
    label: "Départements",
    delay: 0.1
  },
  {
    icon: <FaHandshake className="w-10 h-10 text-secondary" />,
    value: 500,
    label: "Projets réalisés",
    suffix: "+",
    delay: 0.2
  },
  {
    icon: <FaTrophy className="w-10 h-10 text-secondary" />,
    value: 10,
    label: "Années d'expérience",
    delay: 0.3
  }
];

const StatItem: React.FC<StatItemProps> = ({ icon, value, label, suffix = "", delay, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [count, setCount] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      
      // Éasing function pour un comptage plus naturel
      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
      
      // Duration proportionnelle à la taille du nombre
      const duration = Math.min(2000 + Math.log10(end) * 500, 3500);
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);
      
      let frame = 0;
      const timer = setInterval(() => {
        frame++;
        const progress = easeOutQuart(frame / totalFrames);
        const currentCount = Math.floor(progress * end);
        
        if (frame === totalFrames) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(currentCount);
        }
      }, frameDuration);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePosition({ x, y });
  };
  
  const formattedCount = new Intl.NumberFormat().format(count);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.8, 
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="flex flex-col items-center"
    >
      <motion.div
        className="backdrop-blur-md bg-white/90 p-8 rounded-xl shadow-xl border border-white/20 w-full h-full hover:shadow-2xl transition-all duration-500"
        whileHover={{ scale: 1.05, y: -10 }}
        style={{
          rotateX: mousePosition.y,
          rotateY: mousePosition.x,
          transformStyle: "preserve-3d"
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
      >
        <div className="mb-6 flex justify-center">
          <motion.div 
            className="p-5 rounded-full bg-gradient-to-br from-primary/5 to-primary/10"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(0, 0, 0, 0)",
                "0 0 20px 10px rgba(0, 0, 0, 0.04)",
                "0 0 0 0 rgba(0, 0, 0, 0)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.3
            }}
          >
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 360 }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "linear",
                delay: index * 1.5
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {icon}
            </motion.div>
          </motion.div>
        </div>
        <h3 className="text-4xl md:text-5xl font-bold text-primary mb-3 text-center relative">
          <span className="relative z-10">{formattedCount}{suffix}</span>
          <motion.div 
            className="absolute -bottom-2 left-0 h-3 bg-secondary/20 w-full rounded-full -z-10"
            initial={{ width: 0 }}
            animate={isInView ? { width: "100%" } : { width: 0 }}
            transition={{ delay: delay + 0.4, duration: 0.8 }}
          />
        </h3>
        <p className="text-gray-600 font-medium text-center">{label}</p>
      </motion.div>
    </motion.div>
  );
};

export const StatsSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.1, 0.05]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);
  
  return (
    <section 
      ref={ref}
      className="section py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary opacity-5"
            style={{
              width: `${Math.random() * 400 + 200}px`,
              height: `${Math.random() * 400 + 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, Math.random() * 0.3 + 1, 1],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "url('/images/map-senegal.svg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          y: backgroundY,
          opacity,
          scale
        }}
      />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-secondary uppercase tracking-wider font-medium mb-2 px-4 py-1 rounded-full bg-secondary/10 backdrop-blur-sm">
            Nos chiffres clés
          </span>
          <h2 className="section-title text-3xl md:text-5xl font-bold font-serif text-primary mt-6">
            L'APR en quelques chiffres
          </h2>
          <motion.div 
            className="h-1 w-20 bg-secondary mx-auto mt-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              index={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={stat.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 