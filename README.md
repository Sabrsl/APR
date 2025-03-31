# APR Sénégal - Site Web Officiel

Site web professionnel pour le parti politique "Alliance Pour la République" (APR) du Sénégal.

## Technologies utilisées

- **Frontend**: Next.js avec TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js avec Express
- **Formulaires**: Formik, Yup, React Hook Form
- **Stockage temporaire**: JSON files (pour la démonstration)
- **Déploiement**: Docker

## Fonctionnalités

- Site responsive (mobile et desktop)
- Pages principales : Accueil, À propos, Actualités, Adhésion, Contact, Mentions légales
- Formulaire d'adhésion avec validation
- Formulaire de contact
- Filtrage des actualités par catégorie et recherche
- Animations fluides avec Framer Motion

## Installation et démarrage

1. Clonez le dépôt:
```bash
git clone <url-du-repo>
cd apr-senegal.com
```

2. Installez les dépendances:
```bash
npm install
```

3. Créez un fichier `.env` à la racine du projet avec le contenu suivant:
```
PORT=5000
API_URL=http://localhost:5000
NEXT_PUBLIC_API_URL=http://localhost:5000
MONGODB_URI=mongodb://localhost:27017/apr-senegal
SESSION_SECRET=apr-senegal-secret-key
UPLOAD_DIR=src/server/uploads
```

4. Démarrez le serveur de développement Next.js:
```bash
npm run dev
```

5. Dans un autre terminal, démarrez le serveur backend:
```bash
npm run dev:server
```

6. Accédez au site dans votre navigateur à l'adresse [http://localhost:3000](http://localhost:3000)

## Déploiement avec Docker

### Prérequis
- Docker et Docker Compose installés sur votre serveur

### Construction et démarrage
1. Créez un fichier `.env.production` avec les variables d'environnement pour la production.

2. Construction et démarrage avec Docker Compose:
```bash
docker-compose up -d --build
```

3. Le site sera disponible à l'adresse [http://localhost:3000](http://localhost:3000) ou sur le domaine configuré.

### Mise à jour
Pour mettre à jour le site après des modifications:
```bash
git pull
docker-compose up -d --build
```

### Arrêt
Pour arrêter les services:
```bash
docker-compose down
```

## Structure du projet

- `src/app`: Pages de l'application Next.js
- `src/components`: Composants React réutilisables
- `src/server`: API backend Express
- `public`: Fichiers statiques (images, etc.)

## Contributions

Ce projet est open-source. N'hésitez pas à soumettre des pull requests pour améliorer le site.

## Licence

MIT
