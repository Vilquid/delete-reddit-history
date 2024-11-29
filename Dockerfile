FROM node:18-slim

RUN apt update && apt install -y \
    ca-certificates \
    libappindicator1 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgcc1 \
    libgconf-2-4 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    lsb-release \
    xdg-utils \
    wget \
    chromium \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Variable pour éviter le téléchargement de Chromium par Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Chemin exécutable de Chromium
ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium"

ENV REDDIT_USERNAME=""

ENV REDDIT_PASSWORD=""

# Répertoire de l'application
WORKDIR /delete-reddit-history

# Copier les fichiers package.json et package-lock.json
COPY package.json package-lock.json ./

# Contrairement à npm install, qui peut mettre à jour le fichier package-lock.json
# si des différences sont détectées avec package.json, npm ci supprime complètement le dossier node_modules et
# installe exactement les versions spécifiées dans package-lock.json. Cela garantit que l'environnement
# d'exécution est identique à celui prévu.
RUN npm ci

# Copier le fichier source de l'application
COPY main.js .

CMD [ "node", "main.js", "${PUPPETEER_EXECUTABLE_PATH}", "${REDDIT_USERNAME}", "${REDDIT_PASSWORD}" ]
