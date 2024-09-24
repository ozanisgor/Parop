FROM ghcr.io/puppeteer/puppeteer:22.15.0

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
ENV MONGO_URI=$MONGO_URI

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run build
CMD ["npm", "run", "start"]
