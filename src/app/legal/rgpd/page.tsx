import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "RGPD | APR Sénégal",
  description: "Informations sur le Règlement Général sur la Protection des Données (RGPD) de l'Alliance Pour la République",
};

export default function RgpdPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">RGPD</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Qu'est-ce que le RGPD ?</h2>
          
          <p className="text-gray-700 mb-4">
            Le Règlement Général sur la Protection des Données (RGPD) est un règlement de l'Union européenne qui constitue le texte de référence en matière de protection des données à caractère personnel. Il renforce et unifie la protection des données pour les individus au sein de l'Union européenne.
          </p>
          
          <p className="text-gray-700 mb-4">
            Bien que le Sénégal ne soit pas membre de l'Union européenne, l'Alliance Pour la République (APR) s'engage à respecter les principes du RGPD et à protéger vos données personnelles avec le plus grand soin.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Nos engagements RGPD</h2>
          
          <p className="text-gray-700 mb-4">
            Conformément au RGPD, nous nous engageons à :
          </p>
          
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>Collecter vos données personnelles uniquement pour des finalités déterminées, explicites et légitimes</li>
            <li>Ne traiter que les données personnelles nécessaires au regard des finalités poursuivies (minimisation des données)</li>
            <li>Conserver vos données pendant une durée limitée et proportionnée</li>
            <li>Assurer la sécurité et la confidentialité de vos données</li>
            <li>Respecter vos droits sur vos données personnelles</li>
            <li>Documenter notre conformité au RGPD</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Base légale des traitements</h2>
          
          <p className="text-gray-700 mb-4">
            Nous traitons vos données personnelles sur les bases légales suivantes :
          </p>
          
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li><strong>Consentement</strong> : lorsque vous nous avez donné votre consentement explicite pour le traitement de vos données à des fins spécifiques</li>
            <li><strong>Exécution d'un contrat</strong> : lorsque le traitement est nécessaire à l'exécution d'un contrat auquel vous êtes partie (par exemple, votre adhésion au parti)</li>
            <li><strong>Obligation légale</strong> : lorsque le traitement est nécessaire au respect d'une obligation légale à laquelle nous sommes soumis</li>
            <li><strong>Intérêt légitime</strong> : lorsque le traitement est nécessaire aux fins des intérêts légitimes que nous poursuivons, sous réserve de vos intérêts ou libertés et droits fondamentaux</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Transfert de données</h2>
          
          <p className="text-gray-700 mb-4">
            Nous nous engageons à ne pas transférer vos données personnelles en dehors du Sénégal sans mettre en place les garanties appropriées conformément à la réglementation applicable.
          </p>
          
          <p className="text-gray-700 mb-4">
            Dans le cas où nous serions amenés à transférer vos données à des partenaires ou des prestataires situés en dehors du Sénégal, nous nous assurons qu'ils présentent des garanties suffisantes pour assurer la protection de vos données.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Délégué à la protection des données</h2>
          
          <p className="text-gray-700 mb-4">
            Pour toute question relative à la protection de vos données personnelles ou pour exercer vos droits, vous pouvez contacter notre Délégué à la Protection des Données à l'adresse suivante :
          </p>
          
          <p className="text-gray-700 mb-4">
            <strong>Email</strong> : rgpd@apr-senegal.com<br />
            <strong>Adresse postale</strong> : Délégué à la Protection des Données, Alliance Pour la République, 123 Rue de la République, Dakar, Sénégal
          </p>
        </div>
        
        <div className="text-center space-x-4">
          <Link href="/legal" className="text-green-600 hover:text-green-700 font-medium">
            Mentions légales
          </Link>
          <span className="text-gray-400">|</span>
          <Link href="/legal/privacy" className="text-green-600 hover:text-green-700 font-medium">
            Politique de confidentialité
          </Link>
        </div>
      </div>
    </div>
  );
} 