# PHP image
FROM php:8.2

# Install dependencies
RUN apt-get update && apt-get install -y \
	build-essential \
	libpng-dev \
	libjpeg-dev \
	libfreetype6-dev \
	zip \
	libzip-dev \
	unzip \
	git \
	curl

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
	&& docker-php-ext-install gd pdo pdo_mysql zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Working Directory
WORKDIR /var/www

# Copy app files
COPY . .

# Install Laravel dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Permission
RUN chown -R www-data:www-data /var/www \
	&& chmod -R 755 /var/www/storage \
	&& chmod -R 755 /var/www/bootstrap/cache

# Expose port
#EXPOSE 8000

# Entrypoint
CMD php artisan serve --host=0.0.0.0 --port=8000