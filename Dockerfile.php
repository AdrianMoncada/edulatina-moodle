FROM php:8.3-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    libicu-dev \
    libxml2-dev \
    libcurl4-openssl-dev \
    libonig-dev \
    libxslt-dev \
    libldap2-dev \
    libpspell-dev \
    unzip \
    git \
    && rm -rf /var/lib/apt/lists/*

# Configure PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-configure ldap --with-libdir=lib/x86_64-linux-gnu/

# Install PHP extensions required by Moodle (removed xmlrpc as it's not available in PHP 8.3)
RUN docker-php-ext-install -j$(nproc) \
    gd \
    zip \
    intl \
    mysqli \
    pdo_mysql \
    soap \
    bcmath \
    exif \
    xsl \
    ldap \
    pspell

# Note: curl, xml, and mbstring are already compiled into PHP 8.3

# Set working directory
WORKDIR /var/www/html

# Set proper permissions for www-data user
RUN chown -R www-data:www-data /var/www/html
