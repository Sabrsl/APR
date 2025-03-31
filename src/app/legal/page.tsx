import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales | APR Sénégal",
  description: "Mentions légales et conditions d'utilisation du site de l'Alliance Pour la République",
};

export default function LegalPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Mentions légales</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Informations légales</h2>
          
          <p className="text-gray-700 mb-4">
            <strong>Alliance Pour la République (APR)</strong><br />
            Siège social : 123 Rue de la République, Dakar, Sénégal<br />
            Téléphone : +221 33 123 45 67<br />
            Email : contact@apr-senegal.com
          </p>
          
          <p className="text-gray-700 mb-4">
            <strong>Directeur de la publication :</strong> Amadou Diop, Président de l'APR
          </p>
          
          <p className="text-gray-700 mb-4">
            <strong>Hébergeur du site :</strong><br />
            Société XYZ Hosting<br />
            Adresse : 45 Avenue de l'Informatique, 75000 Paris, France<br />
            Téléphone : +33 1 23 45 67 89
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Propriété intellectuelle</h2>
          
          <p className="text-gray-700 mb-4">
            L'ensemble du contenu de ce site (structure, textes, logos, images, vidéos, etc.) est la propriété exclusive de l'Alliance Pour la République ou de ses partenaires. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l'APR.
          </p>
          
          <p className="text-gray-700 mb-4">
            Toute exploitation non autorisée du site ou de son contenu sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de la Propriété Intellectuelle.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Liens hypertextes</h2>
          
          <p className="text-gray-700 mb-4">
            Ce site peut contenir des liens vers d'autres sites internet ou d'autres sources d'informations. Dans la mesure où l'APR ne peut contrôler ces sites et ces sources externes, l'APR ne peut être tenue pour responsable de la mise à disposition de ces sites et sources externes, et décline toute responsabilité quant au contenu, publicités, produits, services ou tout autre matériel disponible sur ou à partir de ces sites ou sources externes.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Limitation de responsabilité</h2>
          
          <p className="text-gray-700 mb-4">
            L'APR s'efforce d'assurer au mieux de ses possibilités l'exactitude et la mise à jour des informations diffusées sur ce site, dont elle se réserve le droit de corriger, à tout moment et sans préavis, le contenu. Toutefois, l'APR ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site.
          </p>
          
          <p className="text-gray-700 mb-4">
            En conséquence, l'utilisateur reconnaît utiliser ces informations sous sa responsabilité exclusive. L'APR ne pourra être tenue responsable des dommages directs ou indirects résultant de l'utilisation de ce site.
          </p>
        </div>
        
        <div className="text-center space-x-4">
          <Link href="/legal/privacy" className="text-green-600 hover:text-green-700 font-medium">
            Politique de confidentialité
          </Link>
          <span className="text-gray-400">|</span>
          <Link href="/legal/rgpd" className="text-green-600 hover:text-green-700 font-medium">
            RGPD
          </Link>
        </div>
      </div>
    </div>
  );
} 