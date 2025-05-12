#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process..."

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️ Please update the .env file with your production values!"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
composer install --no-dev --optimize-autoloader
cd portfolio-next && npm install && npm run build && cd ..

# Build and start containers
echo "🐳 Building and starting Docker containers..."
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d

# Run Laravel setup
echo "⚙️ Running Laravel setup..."
docker-compose -f docker-compose.prod.yml exec php php artisan key:generate --force
docker-compose -f docker-compose.prod.yml exec php php artisan config:cache
docker-compose -f docker-compose.prod.yml exec php php artisan route:cache
docker-compose -f docker-compose.prod.yml exec php php artisan migrate --force
docker-compose -f docker-compose.prod.yml exec php php artisan storage:link

echo "✅ Deployment completed successfully!"
echo "🌐 Your application should now be running at https://mirzaredzic.duckdns.org" 