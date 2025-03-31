import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos | APR Sénégal",
  description: "Découvrez l'histoire, la vision et les valeurs de l'Alliance Pour la République au Sénégal",
};

const leaders = [
  {
    name: "Amadou Diop",
    role: "Président",
    image: "/images/leader-1.jpg",
    bio: "Fondateur et président de l'APR, engagé pour un Sénégal plus juste et prospère depuis plus de 15 ans.",
  },
  {
    name: "Fatou Ndiaye",
    role: "Secrétaire Générale",
    image: "/images/leader-2.jpg",
    bio: "Experte en politiques publiques, elle coordonne les actions du parti à travers tout le pays depuis 2018.",
  },
  {
    name: "Ibrahim Sow",
    role: "Trésorier",
    image: "/images/leader-3.jpg",
    bio: "Économiste de formation, il veille à la bonne gestion des ressources du parti et supervise les projets de développement.",
  },
  {
    name: "Marie Badji",
    role: "Responsable Communication",
    image: "/images/leader-4.jpg",
    bio: "Ancienne journaliste, elle est en charge de la stratégie de communication et des relations avec les médias.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      {/* History section */}
      <section className="container mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Notre histoire</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-green-700 mb-4">La naissance de l'APR</h2>
            <p className="text-gray-700 mb-4">
              Fondée en 2008, l'Alliance Pour la République (APR) est née de la volonté de créer une alternative politique moderne et progressiste au Sénégal. Notre parti s'est construit autour de valeurs fortes : la solidarité, l'innovation, la justice et le développement durable.
            </p>
            <p className="text-gray-700 mb-4">
              Dès sa création, l'APR s'est donné pour mission de défendre les intérêts de tous les Sénégalais, en particulier ceux des plus vulnérables, tout en promouvant une vision ambitieuse pour l'avenir du pays.
            </p>
          </div>
          
          <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
            <Image 
              src="/images/about-history.jpg" 
              alt="Fondation de l'APR Sénégal" 
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
      
      {/* Vision and values section */}
      <section className="bg-gray-50 py-16 mb-16">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Notre vision</h2>
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-lg text-gray-700 mb-6">
              L'APR aspire à construire un Sénégal prospère, solidaire et respecté sur la scène internationale. Nous croyons en un pays où chaque citoyen a accès à l'éducation, aux soins de santé et à des opportunités économiques équitables.
            </p>
            <p className="text-lg text-gray-700">
              Notre vision s'articule autour de piliers fondamentaux : une gouvernance transparente et efficace, une économie dynamique et inclusive, des services publics de qualité, et une diplomatie active au service des intérêts nationaux.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-700 mb-3">Gouvernance démocratique</h3>
              <p className="text-gray-700">
                Nous défendons une gouvernance transparente, participative et redevable, où les institutions sont fortes et au service des citoyens.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-700 mb-3">Développement économique</h3>
              <p className="text-gray-700">
                Notre priorité est de bâtir une économie robuste qui crée des emplois décents, valorise les ressources nationales et réduit les inégalités.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-700 mb-3">Cohésion sociale</h3>
              <p className="text-gray-700">
                Nous œuvrons pour un Sénégal uni dans sa diversité, où le dialogue, la solidarité et la paix sociale constituent le socle de notre vivre-ensemble.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Leadership team section */}
      <section className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Notre équipe dirigeante</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader) => (
            <div key={leader.name} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image 
                  src={leader.image} 
                  alt={leader.name} 
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{leader.name}</h3>
                <p className="text-green-700 font-medium mb-3">{leader.role}</p>
                <p className="text-gray-600">{leader.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 