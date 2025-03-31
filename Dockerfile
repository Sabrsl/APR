FROM node:20-alpine AS base

# Installation des dépendances uniquement quand nécessaire
FROM base AS deps
WORKDIR /app

# Copie des fichiers package
COPY package.json package-lock.json ./

# Installation des dépendances
RUN npm ci

# Reconstruction du code source uniquement quand nécessaire
FROM base AS builder
WORKDIR /app

# Copie des node_modules de l'étape deps
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Construction de l'application
RUN npm run build

# Image de production, copie des fichiers nécessaires et lancement de next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copie des fichiers nécessaires
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"] 