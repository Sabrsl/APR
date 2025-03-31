"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSearch, FaArrowRight } from "react-icons/fa";

// Mock news data - would come from an API in a real application
const allNewsData = [
  {
    id: 1,
    title: "Grand rassemblement à Dakar pour le lancement de notre programme économique",
    excerpt: "Plus de 10 000 personnes se sont réunies à Dakar pour soutenir le nouveau programme économique de l'APR, axé sur l'emploi des jeunes et le développement durable.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel ultricies ultricies, nunc nisl ultricies nisl, nec ultricies nisl nisl nec ultricies nisl. Sed euismod, nunc vel ultricies ultricies, nunc nisl ultricies nisl, nec ultricies nisl nisl nec ultricies nisl.",
    image: "/images/news-1.jpg",
    date: "15 mars 2023",
    category: "Événement",
    author: "Mamadou Diallo"
  },
  {
    id: 2,
    title: "Notre parti accueille une délégation internationale de partenaires économiques",
    excerpt: "L'APR a organisé une table ronde avec des investisseurs et partenaires internationaux pour discuter des opportunités de développement au Sénégal.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel ultricies ultricies, nunc nisl ultricies nisl, nec ultricies nisl nisl nec ultricies nisl. Sed euismod, nunc vel ultricies ultricies, nunc nisl ultricies nisl, nec ultricies nisl nisl nec ultricies nisl.",
    image: "/images/news-2.jpg",
    date: "28 février 2023",
    category: "International",
    author: "Fatou Ndiaye"
  },
  {
    id: 3,
    title: "Lancement d'un programme de formation pour 5000 jeunes sénégalais",
    excerpt: "L'APR, en partenariat avec plusieurs entreprises nationales, lance un ambitieux programme de formation professionnelle pour les jeunes dans les secteurs porteurs.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel ultricies ultricies, nunc nisl ultricies nisl, nec ultricies nisl nisl nec ultricies nisl. Sed euismod, nunc vel ultricies ultricies, nunc nisl ultricies nisl, nec ultricies nisl nisl nec ultricies nisl.",
    image: "/images/news-3.jpg",
    date: "10 février 2023",
    category: "Éducation",
    author: "Ibrahim Sow"
  },
  {
    id: 4,
    title: "Visite officielle du président de l'APR dans les régions du Sud",
    excerpt: "Le président de l'APR a effectué une tournée dans les régions du Sud pour rencontrer les militants et discuter des préoccupations locales.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel ultricies ultricies, nunc nisl ultricies nisl, nec ultricies nisl nisl nec ultricies nisl. Sed euismod, nunc vel ultricies ultricies, nunc nisl ultricies nisl, nec ultricies nisl nisl nec ultricies nisl.",
    image: "/images/news-1.jpg",
    date: "5 février 2023",
    category: "Tournée",
    author: "Amadou Diop"
  },
  {
    id: 5,
    title: "Conférence nationale sur l'agriculture: l'APR présente son plan d'action",
    excerpt: "Lors de la conférence nationale sur l'agriculture, notre parti a présenté un plan ambitieux pour moderniser le secteur agricole et assurer la sécurité alimentaire.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel ultricies ultricies, nunc nisl ultricies nisl, nec ultricies nisl nisl nec ultricies nisl. Sed euismod, nunc vel ultricies ultricies, nunc nisl ultricies nisl, nec ultricies nisl nisl nec ultricies nisl.",
    image: "/images/news-2.jpg",
    date: "20 janvier 2023",
    category: "Agriculture",
    author: "Marie Badji"
  },
  {
    id: 6,
    title: "L'APR salue l'adoption de la nouvelle loi sur la protection de l'environnement",
    excerpt: "Notre parti se félicite de l'adoption de la nouvelle loi sur la protection de l'environnement, fruit d'un long travail de collaboration avec les associations écologistes.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel ultricies ultricies, nunc nisl ultricies nisl, nec ultricies nisl nisl nec ultricies nisl. Sed euismod, nunc vel ultricies ultricies, nunc nisl ultricies nisl, nec ultricies nisl nisl nec ultricies nisl.",
    image: "/images/news-3.jpg",
    date: "5 janvier 2023",
    category: "Écologie",
    author: "Mamadou Diallo"
  }
];

// Extract unique categories for filter
const categories = ["Tous", ...new Set(allNewsData.map(item => item.category))];

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  
  // Filter news based on search term and category
  const filteredNews = allNewsData.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         news.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Tous" || news.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Actualités</h1>
        
        {/* Search and filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                placeholder="Rechercher une actualité..."
                className="w-full py-3 px-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {categories.map(category => (
                <button
                  key={category}
                  className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* News grid */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((news) => (
              <div key={news.id} className="bg-white overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-green-600 text-white py-1 px-3 text-sm">
                    {news.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-500 text-sm">{news.date}</p>
                    <p className="text-gray-500 text-sm">Par {news.author}</p>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2">{news.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{news.excerpt}</p>
                  <Link href={`/news/${news.id}`} className="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition-colors">
                    Lire plus <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Aucune actualité ne correspond à votre recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
} 