FROM php:8.3-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libwebp-dev \
    libjpeg62-turbo-dev

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/laravel

# Copy the entire project first
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Generate application key if needed
RUN php artisan key:generate --force

# Cache configuration and routes for better performance
RUN php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache

# Permissions (for storage and cache folders)
RUN chown -R www-data:www-data /var/www/laravel \
    && chmod -R 775 /var/www/laravel/storage \
    && chmod -R 775 /var/www/laravel/bootstrap/cache

# Expose port
EXPOSE 9000

CMD ["php-fpm"]