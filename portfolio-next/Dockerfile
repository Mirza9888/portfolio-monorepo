# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Kopirajte package.json fajlove
COPY package*.json ./
RUN npm ci

# Kopirajte source code
COPY . .

# Buildirajte aplikaciju
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Kopiraj sve neophodno za pokretanje aplikacije s builder stage-a
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json
EXPOSE 3000

CMD ["npm", "start"]