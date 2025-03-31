import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | APR Sénégal",
  description: "Politique de confidentialité de l'Alliance Pour la République au Sénégal",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Politique de Confidentialité</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          
          <p className="text-gray-700 mb-4">
            L'Alliance Pour la République (APR) s'engage à protéger votre vie privée et à traiter vos données personnelles avec transparence, conformément aux lois et réglementations en vigueur, notamment le Règlement Général sur la Protection des Données (RGPD).
          </p>
          
          <p className="text-gray-700 mb-4">
            Cette politique de confidentialité vous informe sur la manière dont nous collectons, utilisons et protégeons vos données personnelles lorsque vous utilisez notre site web ou nos services.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Données collectées</h2>
          
          <p className="text-gray-700 mb-4">
            Nous pouvons collecter les types de données personnelles suivants :
          </p>
          
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>Informations d'identification (nom, prénom)</li>
            <li>Coordonnées (adresse email, numéro de téléphone)</li>
            <li>Informations démographiques (date de naissance, ville)</li>
            <li>Documents d'identité (lors de l'adhésion)</li>
            <li>Informations professionnelles</li>
            <li>Données de navigation sur notre site web</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Finalités du traitement</h2>
          
          <p className="text-gray-700 mb-4">
            Nous traitons vos données personnelles pour les finalités suivantes :
          </p>
          
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>Gestion des adhésions au parti</li>
            <li>Communication avec nos membres et sympathisants</li>
            <li>Envoi d'informations sur nos activités et événements</li>
            <li>Traitement des demandes de contact</li>
            <li>Amélioration de nos services et de notre site web</li>
            <li>Respect de nos obligations légales</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Conservation des données</h2>
          
          <p className="text-gray-700 mb-4">
            Nous conservons vos données personnelles aussi longtemps que nécessaire pour atteindre les finalités pour lesquelles elles ont été collectées, conformément à nos obligations légales et à nos intérêts légitimes.
          </p>
          
          <p className="text-gray-700 mb-4">
            Les données relatives aux adhésions sont conservées pendant toute la durée de votre adhésion, puis pour une période de 3 ans à compter de la fin de votre adhésion. Les données relatives aux demandes de contact sont conservées pendant 1 an.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Sécurité des données</h2>
          
          <p className="text-gray-700 mb-4">
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour assurer la sécurité de vos données personnelles, leur protection contre l'accès non autorisé, la modification, la divulgation ou la destruction.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Vos droits</h2>
          
          <p className="text-gray-700 mb-4">
            Conformément à la réglementation applicable en matière de protection des données, vous disposez des droits suivants :
          </p>
          
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>Droit d'accès à vos données personnelles</li>
            <li>Droit de rectification des données inexactes</li>
            <li>Droit à l'effacement de vos données</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité de vos données</li>
            <li>Droit d'opposition au traitement</li>
            <li>Droit de retirer votre consentement à tout moment</li>
          </ul>
          
          <p className="text-gray-700 mb-4">
            Pour exercer ces droits, vous pouvez nous contacter à l'adresse email suivante : rgpd@apr-senegal.com.
          </p>
        </div>
        
        <div className="text-center space-x-4">
          <Link href="/legal" className="text-green-600 hover:text-green-700 font-medium">
            Mentions légales
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