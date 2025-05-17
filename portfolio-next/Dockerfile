FROM node:18-alpine

WORKDIR /app

# Set NODE_ENV to development
ENV NODE_ENV=development

COPY package*.json ./
RUN npm install

COPY . .

# Build the application
RUN npm run build

EXPOSE 3000

# Start the development server with host 0.0.0.0 to allow external connections
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]