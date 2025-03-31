"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight, FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Fatou Diop",
    role: "Entrepreneur, Dakar",
    image: "/images/testimonial-1.jpg",
    content: "L'APR a considérablement amélioré le climat des affaires au Sénégal. Grâce à leurs politiques économiques, j'ai pu développer mon entreprise et créer des emplois dans ma communauté.",
    rating: 5
  },
  {
    id: 2,
    name: "Moussa Sall",
    role: "Enseignant, Thiès",
    image: "/images/testimonial-2.jpg",
    content: "Les réformes éducatives mises en place par l'APR ont transformé notre système scolaire. Nous disposons maintenant de meilleurs outils pédagogiques et d'infrastructures modernisées.",
    rating: 5
  },
  {
    id: 3,
    name: "Aminata Ndiaye",
    role: "Agricultrice, Kaolack",
    image: "/images/testimonial-3.jpg",
    content: "Le programme de développement rural a révolutionné mon activité agricole. J'ai bénéficié de formations et d'équipements qui m'ont permis d'augmenter ma production de manière significative.",
    rating: 5
  },
  {
    id: 4,
    name: "Ibrahima Gueye",
    role: "Étudiant, Saint-Louis",
    image: "/images/testimonial-4.jpg",
    content: "Les initiatives pour la jeunesse de l'APR m'ont ouvert des portes que je n'aurais jamais imaginées. La formation digitale que j'ai reçue m'a permis de démarrer ma carrière dans la technologie.",
    rating: 5
  }
];

const ImageWithTilt = ({ src, alt }: { src: string, alt: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d"
      }}
      className="relative w-28 h-28 rounded-full overflow-hidden mx-auto mb-2"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="w-full h-full relative"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-70"></div>
      </motion.div>
    </motion.div>
  );
};

export const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const goToNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (isAutoplay) {
      autoplayRef.current = setInterval(goToNext, 6000);
    }
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isAutoplay]);

  const handlePauseAutoplay = () => {
    setIsAutoplay(false);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      filter: "blur(4px)"
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)"
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95,
      filter: "blur(4px)"
    }),
  };

  return (
    <section className="section py-28 relative overflow-hidden bg-gradient-to-b from-white to-gray-50" ref={ref}>
      {/* Background design elements */}
      <motion.div 
        className="absolute top-40 left-[10%] w-80 h-80 rounded-full bg-primary opacity-5"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.08, 0.03],
          rotate: [0, 15, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute -bottom-20 right-[5%] w-96 h-96 rounded-full bg-secondary opacity-5"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.03, 0.06, 0.03],
          rotate: [0, -15, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Floating particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/10"
          style={{
            width: `${Math.random() * 15 + 5}px`,
            height: `${Math.random() * 15 + 5}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: "blur(1px)"
          }}
          animate={{
            y: [0, Math.random() * 100 - 50, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-secondary uppercase tracking-wider font-medium mb-3 px-4 py-1 rounded-full bg-secondary/10 backdrop-blur-sm">
            Témoignages
          </span>
          <h2 className="section-title text-3xl md:text-5xl font-bold font-serif text-primary mt-6">
            Ils parlent de nous
          </h2>
          <motion.div 
            className="h-1 w-20 bg-secondary mx-auto mt-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 mt-8">
              Découvrez comment nos politiques et initiatives ont un impact positif sur la vie quotidienne des Sénégalais.
            </p>
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto px-4 relative">
          <motion.div 
            className="absolute inset-0 -m-16 rounded-[3rem] blur-3xl"
            animate={{ 
              background: [
                "radial-gradient(circle at 30% 40%, rgba(var(--color-primary-rgb), 0.03), rgba(var(--color-primary-rgb), 0.08))",
                "radial-gradient(circle at 70% 60%, rgba(var(--color-primary-rgb), 0.08), rgba(var(--color-primary-rgb), 0.03))",
                "radial-gradient(circle at 30% 40%, rgba(var(--color-primary-rgb), 0.03), rgba(var(--color-primary-rgb), 0.08))"
              ] 
            }}
            transition={{ duration: 10, repeat: Infinity }}
            aria-hidden="true"
          />
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative backdrop-blur-md bg-white/90 p-10 md:p-14 rounded-2xl shadow-2xl border border-white/50"
            onMouseEnter={handlePauseAutoplay}
            whileHover={{ boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.12)" }}
          >
            <div className="absolute left-6 top-6 text-5xl text-secondary opacity-20">
              <FaQuoteLeft />
            </div>
            <div className="absolute right-6 bottom-6 text-5xl text-secondary opacity-20">
              <FaQuoteRight />
            </div>

            <div className="min-h-[300px] flex flex-col items-center justify-center py-8 md:py-10">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 },
                    filter: { duration: 0.4 }
                  }}
                  className="text-center"
                >
                  <div className="mb-10 relative">
                    <div className="relative w-32 h-32 mx-auto">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-secondary to-primary opacity-20 blur-lg"></div>
                      <div className="relative rounded-full p-1 bg-gradient-to-br from-secondary/20 to-primary/20 backdrop-blur-sm">
                        <ImageWithTilt
                          src={testimonials[current].image}
                          alt={testimonials[current].name}
                        />
                      </div>
                    </div>
                    <div className="flex justify-center mt-4">
                      {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                        >
                          <FaStar className="text-yellow-400 mx-0.5" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <motion.p 
                    className="text-lg md:text-xl text-gray-700 italic max-w-3xl mb-8 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                  >
                    "{testimonials[current].content}"
                  </motion.p>
                  <motion.h3 
                    className="text-2xl font-bold text-primary"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                  >
                    {testimonials[current].name}
                  </motion.h3>
                  <motion.p 
                    className="text-secondary font-medium"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                  >
                    {testimonials[current].role}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center gap-6 mt-12">
              <motion.button 
                onClick={goToPrev}
                className="p-3 bg-white hover:bg-primary/5 text-primary rounded-full transition-colors duration-300 shadow-md border border-gray-100"
                aria-label="Témoignage précédent"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaChevronLeft />
              </motion.button>
              <div className="flex gap-3 items-center">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setDirection(index > current ? 1 : -1);
                      setCurrent(index);
                      handlePauseAutoplay();
                    }}
                    className={`rounded-full transition-all duration-500 backdrop-blur-sm ${
                      index === current 
                        ? "bg-secondary/80 px-5 py-1.5 shadow-lg" 
                        : "bg-gray-200 w-3 h-3 hover:bg-gray-300"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Témoignage ${index + 1}`}
                  />
                ))}
              </div>
              <motion.button 
                onClick={goToNext}
                className="p-3 bg-white hover:bg-primary/5 text-primary rounded-full transition-colors duration-300 shadow-md border border-gray-100"
                aria-label="Témoignage suivant"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaChevronRight />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 