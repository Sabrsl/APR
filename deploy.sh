#!/bin/bash

# Script de déploiement du site web APR Sénégal
echo "Démarrage du déploiement du site web APR Sénégal..."

# Récupération des dernières modifications du dépôt
echo "Récupération des dernières modifications du dépôt..."
git pull

# Construction et démarrage des conteneurs Docker
echo "Construction et démarrage des conteneurs Docker..."
docker-compose up -d --build

# Vérification que les conteneurs sont en cours d'exécution
echo "Vérification de l'état des conteneurs..."
docker-compose ps

echo "Déploiement terminé ! Le site web devrait être accessible à l'adresse http://localhost:3000"
echo "Pour consulter les logs, exécutez : docker-compose logs -f" 