# Deployment Guide

## Prerequisites

1. Ubuntu Server (20.04 LTS or newer)
2. Git installed
3. Docker and Docker Compose installed
4. Domain name pointed to your server
5. SSL certificates (Let's Encrypt)

## Installation Steps

1. **Install Docker and Docker Compose**
```bash
# Update package list
sudo apt update

# Install required packages
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# Add Docker repository
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# Update package list again
sudo apt update

# Install Docker
sudo apt install -y docker-ce

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

2. **Clone the Repository**
```bash
git clone https://github.com/Mirza9888/portfolio-monorepo.git
cd portfolio-monorepo
```

3. **Setup SSL Certificates**
```bash
# Install Certbot
sudo apt install -y certbot

# Get SSL certificate
sudo certbot certonly --standalone -d mirzaredzic.hopto.org
```

4. **Configure Environment**
```bash
# Copy example env file
cp .env.example .env

# Edit the .env file with your production values
nano .env
```

5. **Make Deploy Script Executable**
```bash
chmod +x deploy.sh
```

6. **Run Deployment**
```bash
./deploy.sh
```

## Environment Variables

Make sure to set these variables in your `.env` file:

```env
APP_NAME=Portfolio
APP_ENV=production
APP_DEBUG=false
APP_URL=https://mirzaredzic.hopto.org

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=portfolio
DB_USERNAME=portfolio
DB_PASSWORD=your-secure-password

NEXT_PUBLIC_API_URL=https://mirzaredzic.hopto.org
```

## Maintenance

### Viewing Logs
```bash
# All containers
docker-compose -f docker-compose.prod.yml logs -f

# Specific service
docker-compose -f docker-compose.prod.yml logs -f nginx
```

### Restarting Services
```bash
docker-compose -f docker-compose.prod.yml restart
```

### Updating the Application
```bash
# Pull latest changes
git pull origin master

# Rebuild and restart
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d
```

## Troubleshooting

1. **If containers fail to start:**
```bash
docker-compose -f docker-compose.prod.yml logs
```

2. **If database connection fails:**
- Check if MySQL container is running
- Verify database credentials in .env file
- Check if database volume is properly mounted

3. **If SSL certificate issues:**
- Verify certificate paths in nginx configuration
- Check certificate permissions
- Ensure domain is properly pointed to server

4. **If Next.js frontend is not loading:**
- Check Next.js container logs
- Verify NEXT_PUBLIC_API_URL in .env
- Ensure nginx proxy configuration is correct 