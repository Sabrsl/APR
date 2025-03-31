"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaUser, FaTag, FaArrowLeft } from "react-icons/fa";

// Mock news data - would come from an API in a real application
const allNewsData = [
  {
    id: 1,
    title: "Grand rassemblement à Dakar pour le lancement de notre programme économique",
    excerpt: "Plus de 10 000 personnes se sont réunies à Dakar pour soutenir le nouveau programme économique de l'APR, axé sur l'emploi des jeunes et le développement durable.",
    content: "<p>Plus de 10 000 personnes se sont réunies à Dakar ce week-end pour assister au lancement officiel du nouveau programme économique de l'Alliance Pour la République (APR). Cet événement majeur, qui s'est tenu au stade Léopold Sédar Senghor, a été marqué par une forte mobilisation populaire et la présence de nombreuses personnalités politiques et économiques.</p><p>Le programme, intitulé \"Sénégal Émergent 2035\", s'articule autour de plusieurs axes prioritaires : la création d'emplois pour les jeunes, le développement des infrastructures, la modernisation de l'agriculture et la transition vers les énergies renouvelables.</p><p>Dans son discours d'ouverture, le président de l'APR a souligné l'importance de ce nouveau programme pour l'avenir du pays : \"Nous sommes à un tournant décisif de notre histoire. Ce programme économique n'est pas seulement une vision, c'est une feuille de route concrète pour faire du Sénégal un pays émergent d'ici 2035. Nous allons créer des milliers d'emplois, moderniser notre économie et assurer une croissance inclusive qui profitera à tous les Sénégalais, qu'ils vivent dans les grandes villes ou dans les zones rurales.\"</p><p>Plusieurs experts ont déjà salué l'ambition et le réalisme de ce programme, qui prévoit notamment la création de cinq pôles économiques régionaux et un investissement massif dans la formation professionnelle des jeunes.</p><p>L'APR prévoit d'organiser dans les prochaines semaines une série de rencontres à travers tout le pays pour présenter en détail ce programme aux citoyens et recueillir leurs suggestions.</p>",
    image: "/images/news-1.jpg",
    date: "15 mars 2023",
    category: "Événement",
    author: "Mamadou Diallo",
    tags: ["Économie", "Jeunesse", "Emploi", "Développement"]
  },
  {
    id: 2,
    title: "Notre parti accueille une délégation internationale de partenaires économiques",
    excerpt: "L'APR a organisé une table ronde avec des investisseurs et partenaires internationaux pour discuter des opportunités de développement au Sénégal.",
    content: "<p>L'Alliance Pour la République (APR) a accueilli cette semaine à Dakar une importante délégation d'investisseurs et de partenaires économiques internationaux. Venus d'Europe, d'Asie et d'Amérique du Nord, ces représentants de grandes entreprises et d'institutions financières ont participé à une table ronde de deux jours sur les opportunités d'investissement au Sénégal.</p><p>Cette initiative s'inscrit dans la stratégie du parti visant à renforcer les partenariats économiques internationaux et à attirer des investissements étrangers dans des secteurs clés comme les infrastructures, l'énergie, l'agriculture et les technologies numériques.</p><p>\"Notre pays regorge d'opportunités et nous sommes déterminés à créer un environnement favorable aux investissements\", a déclaré le responsable économique de l'APR lors de la séance d'ouverture. \"Cette rencontre nous permet de présenter directement aux partenaires internationaux notre vision économique et les réformes que nous avons engagées pour améliorer le climat des affaires.\"</p><p>Plusieurs protocoles d'accord ont été signés à l'issue de cette rencontre, notamment dans les domaines des énergies renouvelables et de l'agriculture. Ces accords devraient se traduire par des investissements de plusieurs millions d'euros dans les prochains mois et la création de nombreux emplois.</p><p>Les participants étrangers ont unanimement salué la qualité des échanges et exprimé leur confiance dans le potentiel économique du Sénégal. \"Nous avons été impressionnés par la vision claire et les projets concrets qui nous ont été présentés\", a confié le directeur d'un fonds d'investissement européen. \"Le Sénégal offre un cadre stable et des perspectives de croissance très intéressantes pour nos investissements en Afrique de l'Ouest.\"</p>",
    image: "/images/news-2.jpg",
    date: "28 février 2023",
    category: "International",
    author: "Fatou Ndiaye",
    tags: ["International", "Économie", "Investissement", "Partenariat"]
  },
  {
    id: 3,
    title: "Lancement d'un programme de formation pour 5000 jeunes sénégalais",
    excerpt: "L'APR, en partenariat avec plusieurs entreprises nationales, lance un ambitieux programme de formation professionnelle pour les jeunes dans les secteurs porteurs.",
    content: `<p>L'Alliance Pour la République a lancé aujourd'hui, en partenariat avec un consortium d'entreprises nationales, un ambitieux programme de formation professionnelle qui bénéficiera à 5000 jeunes Sénégalais au cours des deux prochaines années.</p>
    <p>Baptisé "Jeunesse Compétente", ce programme vise à doter les jeunes de compétences pratiques dans des secteurs porteurs tels que le numérique, l'agroalimentaire, les énergies renouvelables, le tourisme et l'artisanat.</p>
    <p>"Face au défi majeur du chômage des jeunes, nous avons choisi d'agir concrètement en créant des ponts entre le monde de la formation et celui de l'entreprise", a déclaré Ibrahim Sow, responsable du programme au sein de l'APR, lors de la cérémonie de lancement qui s'est tenue au Centre International de Conférences Abdou Diouf.</p>
    <p>Les formations, d'une durée de 3 à 6 mois, seront dispensées dans 15 centres répartis sur l'ensemble du territoire national. Elles incluront des périodes d'immersion en entreprise et un accompagnement personnalisé pour favoriser l'insertion professionnelle ou la création d'entreprise.</p>
    <p>Le programme bénéficie du soutien financier de plusieurs entreprises nationales leaders dans leurs secteurs, qui s'engagent également à recruter une partie des jeunes formés.</p>
    <p>"Investir dans la formation de notre jeunesse, c'est investir dans l'avenir de notre pays. C'est pourquoi nous avons mobilisé des ressources importantes pour ce programme qui aura un impact concret sur la vie de milliers de jeunes Sénégalais", a souligné Amadou Diop, président de l'APR.</p>
    <p>Les inscriptions au programme "Jeunesse Compétente" débuteront la semaine prochaine et seront ouvertes à tous les jeunes Sénégalais âgés de 18 à 35 ans.</p>`,
    image: "/images/news-3.jpg",
    date: "10 février 2023",
    category: "Éducation",
    author: "Ibrahim Sow",
    tags: ["Formation", "Jeunesse", "Emploi", "Développement"]
  },
  {
    id: 4,
    title: "Visite officielle du président de l'APR dans les régions du Sud",
    excerpt: "Le président de l'APR a effectué une tournée dans les régions du Sud pour rencontrer les militants et discuter des préoccupations locales.",
    content: `<p>Le président de l'Alliance Pour la République, Amadou Diop, a achevé hier une tournée de cinq jours dans les régions du Sud du Sénégal, où il a rencontré des milliers de militants et de sympathisants du parti.</p>
    <p>Cette visite, qui l'a conduit successivement à Ziguinchor, Sédhiou et Kolda, avait pour objectif de renforcer les structures locales du parti, d'écouter les préoccupations des populations et de présenter les projets de l'APR pour le développement de ces régions souvent marginalisées.</p>
    <p>"Le Sud du Sénégal regorge de potentialités extraordinaires, mais fait face à des défis spécifiques qui nécessitent une attention particulière", a déclaré Amadou Diop lors d'un grand meeting à Ziguinchor qui a rassemblé plus de 5000 personnes.</p>
    <p>Au cours de sa tournée, le président de l'APR a inauguré plusieurs sièges locaux du parti et rencontré des représentants de la société civile, des chefs religieux et traditionnels, ainsi que des opérateurs économiques locaux.</p>
    <p>Il a également visité plusieurs projets agricoles et touristiques soutenus par le parti, et a annoncé le lancement prochain d'un fonds spécial pour le développement des régions du Sud, doté d'un budget initial de 5 milliards de FCFA.</p>
    <p>"L'APR s'engage à faire du développement équilibré du territoire national une priorité absolue. Aucune région ne doit être laissée pour compte dans la marche du Sénégal vers l'émergence", a-t-il affirmé.</p>
    <p>Cette tournée s'inscrit dans le cadre de la stratégie de l'APR visant à renforcer sa présence sur l'ensemble du territoire national en préparation des prochaines échéances électorales.</p>`,
    image: "/images/news-1.jpg",
    date: "5 février 2023",
    category: "Tournée",
    author: "Amadou Diop",
    tags: ["Régions", "Développement local", "Militants", "Sud"]
  },
  {
    id: 5,
    title: "Conférence nationale sur l'agriculture: l'APR présente son plan d'action",
    excerpt: "Lors de la conférence nationale sur l'agriculture, notre parti a présenté un plan ambitieux pour moderniser le secteur agricole et assurer la sécurité alimentaire.",
    content: `<p>L'Alliance Pour la République a présenté hier, lors de la Conférence nationale sur l'agriculture qui s'est tenue à Thiès, son plan d'action pour la modernisation du secteur agricole sénégalais et le renforcement de la sécurité alimentaire du pays.</p>
    <p>Intitulé "Agriculture 2030: Nourrir le Sénégal", ce plan s'articule autour de cinq axes stratégiques: l'augmentation de la production nationale, la modernisation des techniques agricoles, le soutien aux petits producteurs, le développement des filières de transformation, et l'adaptation au changement climatique.</p>
    <p>"L'agriculture est et restera le socle de notre économie et de notre sécurité alimentaire. Nous devons investir massivement dans ce secteur pour garantir notre souveraineté alimentaire et créer des emplois durables dans nos zones rurales", a déclaré Marie Badji, responsable des questions agricoles au sein de l'APR.</p>
    <p>Parmi les mesures phares annoncées figurent la création d'un fonds de soutien à la mécanisation agricole de 50 milliards de FCFA, la construction de 100 nouveaux périmètres irrigués dans la vallée du fleuve Sénégal, le développement de la recherche agronomique, et le renforcement des coopératives agricoles.</p>
    <p>Le plan prévoit également des mesures spécifiques pour encourager l'agriculture biologique et agroécologique, ainsi que pour favoriser l'installation des jeunes agriculteurs.</p>
    <p>"Avec ce plan, nous visons à augmenter la production agricole nationale de 60% d'ici 2030, à réduire de moitié nos importations alimentaires, et à créer 200 000 emplois directs et indirects dans le secteur agricole", a précisé Marie Badji.</p>
    <p>Ce plan d'action a été élaboré après une large consultation des acteurs du secteur agricole dans toutes les régions du Sénégal, et sera intégré au programme global de l'APR pour les prochaines échéances électorales.</p>`,
    image: "/images/news-2.jpg",
    date: "20 janvier 2023",
    category: "Agriculture",
    author: "Marie Badji",
    tags: ["Agriculture", "Sécurité alimentaire", "Développement rural", "Emploi"]
  },
  {
    id: 6,
    title: "L'APR salue l'adoption de la nouvelle loi sur la protection de l'environnement",
    excerpt: "Notre parti se félicite de l'adoption de la nouvelle loi sur la protection de l'environnement, fruit d'un long travail de collaboration avec les associations écologistes.",
    content: `<p>L'Alliance Pour la République se félicite de l'adoption par l'Assemblée nationale de la nouvelle loi sur la protection de l'environnement et la lutte contre le changement climatique, fruit d'un long travail de collaboration entre notre parti, les parlementaires et les associations écologistes.</p>
    <p>Cette loi, votée à une large majorité, marque une avancée significative dans l'engagement du Sénégal en faveur de la protection de son patrimoine naturel et de la transition écologique.</p>
    <p>"C'est un moment historique pour notre pays. Cette loi nous dote enfin d'un cadre juridique complet et ambitieux pour préserver notre environnement et faire face aux défis du changement climatique", a déclaré Mamadou Diallo, porte-parole de l'APR, lors d'une conférence de presse tenue au siège du parti.</p>
    <p>Parmi les dispositions majeures de cette loi figurent l'interdiction progressive des plastiques à usage unique, le renforcement des sanctions contre les crimes environnementaux, l'obligation d'études d'impact environnemental pour tous les grands projets, et la mise en place d'un fonds national pour la transition écologique.</p>
    <p>La loi prévoit également des mesures d'incitation fiscale pour les entreprises qui investissent dans les technologies vertes et l'économie circulaire.</p>
    <p>"Cette loi, que notre parti a soutenue avec détermination, traduit notre vision d'un développement économique qui respecte l'environnement et préserve les ressources naturelles pour les générations futures", a souligné Mamadou Diallo.</p>
    <p>L'APR a annoncé qu'elle veillerait à la bonne application de cette loi et continuerait à travailler en étroite collaboration avec les associations écologistes pour promouvoir la conscience environnementale au Sénégal.</p>`,
    image: "/images/news-3.jpg",
    date: "5 janvier 2023",
    category: "Écologie",
    author: "Mamadou Diallo",
    tags: ["Environnement", "Législation", "Écologie", "Développement durable"]
  }
];

const NewsDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [newsItem, setNewsItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedNews, setRelatedNews] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, you'd fetch this data from an API
    const id = Number(params.id);
    const selectedNews = allNewsData.find(news => news.id === id);
    
    if (selectedNews) {
      setNewsItem(selectedNews);
      
      // Find related news based on category or tags
      const related = allNewsData
        .filter(news => news.id !== id && (
          news.category === selectedNews.category || 
          news.tags.some((tag: string) => selectedNews.tags.includes(tag))
        ))
        .slice(0, 3);
      
      setRelatedNews(related);
    }
    
    setIsLoading(false);
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Article introuvable</h1>
            <p className="text-gray-600 mb-6">
              L'article que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <Link 
              href="/news"
              className="btn btn-primary inline-flex items-center"
            >
              <FaArrowLeft className="mr-2" /> Retour aux actualités
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <div className="mb-6">
          <button 
            onClick={() => router.back()}
            className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors font-medium"
          >
            <FaArrowLeft className="mr-2" /> Retour aux actualités
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Main article */}
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-80">
                <Image
                  src={newsItem.image}
                  alt={newsItem.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-green-600 text-white py-1 px-3 rounded-full text-sm">
                  {newsItem.category}
                </div>
              </div>
              
              <div className="p-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{newsItem.title}</h1>
                
                <div className="flex flex-wrap items-center text-gray-500 mb-6 gap-x-6 gap-y-2">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2" />
                    <span>{newsItem.date}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <FaUser className="mr-2" />
                    <span>Par {newsItem.author}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <FaTag className="mr-2" />
                    <span>{newsItem.category}</span>
                  </div>
                </div>
                
                <div 
                  className="prose prose-lg max-w-none text-gray-700 mb-6"
                  dangerouslySetInnerHTML={{ __html: newsItem.content }}
                ></div>
                
                {newsItem.tags && (
                  <div className="flex flex-wrap gap-2 mt-8">
                    {newsItem.tags.map((tag: string) => (
                      <span 
                        key={tag} 
                        className="bg-gray-100 text-gray-700 rounded-full py-1 px-3 text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          </div>
          
          <div>
            {/* Related articles */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Articles associés</h2>
              
              {relatedNews.length > 0 ? (
                <div className="space-y-6">
                  {relatedNews.map((news) => (
                    <div key={news.id} className="flex space-x-4">
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={news.image}
                          alt={news.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1 line-clamp-2">
                          <Link href={`/news/${news.id}`} className="hover:text-green-600 transition-colors">
                            {news.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-500">{news.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Aucun article associé</p>
              )}
            </div>
            
            {/* Categories */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
              <h2 className="text-xl font-semibold mb-4">Catégories</h2>
              
              <div className="space-y-2">
                {Array.from(new Set(allNewsData.map(news => news.category))).map((category) => (
                  <Link 
                    key={category as string} 
                    href={`/news?category=${category}`}
                    className="block py-2 px-4 rounded-md hover:bg-gray-100 text-gray-700 hover:text-green-600 transition-colors"
                  >
                    {category as string}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage; 