# Przewodnik Zabezpieczenia VPS dla Mi-ka Next.js

## Spis treści
1. [Początkowa konfiguracja serwera](#1-pocztkowa-konfiguracja-serwera)
2. [Zabezpieczenie SSH](#2-zabezpieczenie-ssh)
3. [Konfiguracja Firewall (UFW)](#3-konfiguracja-firewall-ufw)
4. [Instalacja i konfiguracja Nginx z SSL](#4-instalacja-i-konfiguracja-nginx-z-ssl)
5. [Zabezpieczenie MySQL](#5-zabezpieczenie-mysql)
6. [Zarządzanie procesami Node.js (PM2)](#6-zarzdzanie-procesami-nodejs-pm2)
7. [Zabezpieczenie zmiennych środowiskowych](#7-zabezpieczenie-zmiennych-rodowiskowych)
8. [Rate Limiting i Ochrona DDoS](#8-rate-limiting-i-ochrona-ddos)
9. [Backup i monitoring](#9-backup-i-monitoring)
10. [Aktualizacje bezpieczeństwa](#10-aktualizacje-bezpieczeństwa)

---

## 1. Początkowa konfiguracja serwera

### Aktualizacja systemu
```bash
sudo apt update && sudo apt upgrade -y
```

### Tworzenie użytkownika z ograniczonymi uprawnieniami
```bash
# Jeśli jeszcze nie masz użytkownika nieto root
sudo adduser michal
sudo usermod -aG sudo michal
```

### Instalacja podstawowych narzędzi
```bash
sudo apt install -y curl wget git build-essential
```

---

## 2. Zabezpieczenie SSH

### Zmiana domyślnego portu SSH (opcjonalne, ale zalecane)
```bash
sudo nano /etc/ssh/sshd_config
```

**Ważne zmiany w `/etc/ssh/sshd_config`:**
```bash
# Zmień port (np. z 22 na inny losowy port między 1024-65535)
Port 2222  # Zmień 22 na inny port

# Wyłącz logowanie root
PermitRootLogin no

# Wyłącz logowanie hasłem, użyj tylko kluczy SSH
PasswordAuthentication no
PubkeyAuthentication yes

# Ogranicz liczbę prób logowania
MaxAuthTries 3
MaxStartups 3:50:10

# Timeout dla bezczynnych sesji
ClientAliveInterval 300
ClientAliveCountMax 2

# Wyłącz puste hasła
PermitEmptyPasswords no

# Wyłącz X11 forwarding (jeśli nie potrzebujesz)
X11Forwarding no
```

### Wyłączenie niepotrzebnych protokołów
```bash
# W pliku /etc/ssh/sshd_config
Protocol 2  # Użyj tylko wersji 2
```

### Restart SSH
```bash
sudo systemctl restart sshd
# Uwaga: Przetestuj połączenie w nowym terminalu przed zamknięciem bieżącego!
```

### Konfiguracja kluczy SSH (na lokalnym komputerze)
```bash
# Wygeneruj klucz SSH (jeśli jeszcze nie masz)
ssh-keygen -t ed25519 -C "twoj-email@example.com"

# Skopiuj klucz publiczny na serwer
ssh-copy-id -p 2222 michal@57.128.180.118
# lub ręcznie:
cat ~/.ssh/id_ed25519.pub | ssh -p 2222 michal@57.128.180.118 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

### Fail2Ban - ochrona przed atakami brute force
```bash
sudo apt install fail2ban -y

# Utwórz konfigurację dla SSH
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

sudo nano /etc/fail2ban/jail.local
```

**Dodaj/zmodyfikuj sekcję SSH:**
```ini
[sshd]
enabled = true
port = 2222  # Twój nowy port SSH
maxretry = 3
bantime = 3600
findtime = 600
```

```bash
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

---

## 3. Konfiguracja Firewall (UFW)

```bash
# Zainstaluj UFW
sudo apt install ufw -y

# Ustaw domyślne zasady
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Zezwól na SSH (użyj nowego portu jeśli zmieniłeś)
sudo ufw allow 2222/tcp comment 'SSH'

# Zezwól na HTTP i HTTPS
sudo ufw allow 80/tcp comment 'HTTP'
sudo ufw allow 443/tcp comment 'HTTPS'

# Zezwól na Next.js (jeśli chcesz udostępnić bezpośrednio, ale lepiej przez Nginx)
# sudo ufw allow 3000/tcp comment 'Next.js'

# Włącz firewall
sudo ufw enable

# Sprawdź status
sudo ufw status verbose
```

---

## 4. Instalacja i konfiguracja Nginx z SSL

### Instalacja Nginx
```bash
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

### Instalacja Certbot (Let's Encrypt SSL)
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### Konfiguracja Nginx dla Next.js

Utwórz plik konfiguracyjny:
```bash
sudo nano /etc/nginx/sites-available/v2.mi-ka.pl
```

**Kod konfiguracji Nginx:**
```nginx
# Rate limiting
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=auth_limit:10m rate=5r/s;

# Upstream dla Next.js
upstream nextjs_backend {
    server 127.0.0.1:3000;
    keepalive 64;
}

# HTTP -> HTTPS redirect
server {
    listen 80;
    listen [::]:80;
    server_name v2.mi-ka.pl www.v2.mi-ka.pl;
    
    # Let's Encrypt challenge
    location ~ /.well-known/acme-challenge {
        allow all;
        root /var/www/html;
    }
    
    location / {
        return 301 https://$server_name$request_uri;
    }
}

# HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name v2.mi-ka.pl www.v2.mi-ka.pl;

    # SSL Configuration (certbot automatycznie doda ścieżki)
    ssl_certificate /etc/letsencrypt/live/v2.mi-ka.pl/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/v2.mi-ka.pl/privkey.pem;
    
    # SSL Security Headers
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    ssl_stapling on;
    ssl_stapling_verify on;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline' 'unsafe-eval'" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;

    # Logging
    access_log /var/log/nginx/v2.mi-ka.pl.access.log;
    error_log /var/log/nginx/v2.mi-ka.pl.error.log;

    # Max upload size (dostosuj do potrzeb)
    client_max_body_size 50M;

    # Rate limiting dla API
    location /api/auth/ {
        limit_req zone=auth_limit burst=5 nodelay;
        proxy_pass http://nextjs_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/ {
        limit_req zone=api_limit burst=20 nodelay;
        proxy_pass http://nextjs_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files
    location /_next/static/ {
        proxy_pass http://nextjs_backend;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, immutable";
    }

    # Main proxy
    location / {
        proxy_pass http://nextjs_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

```bash
# Aktywuj konfigurację
sudo ln -s /etc/nginx/sites-available/v2.mi-ka.pl /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # Usuń domyślną konfigurację

# Test konfiguracji
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### Uzyskanie certyfikatu SSL
```bash
sudo certbot --nginx -d v2.mi-ka.pl -d www.v2.mi-ka.pl
```

### Automatyczne odnowienie certyfikatu
```bash
# Certbot automatycznie tworzy cron job, sprawdź:
sudo certbot renew --dry-run
```

---

## 5. Zabezpieczenie MySQL

### Bezpieczna instalacja MySQL
```bash
sudo apt install mysql-server -y
sudo mysql_secure_installation
```

### Utworzenie użytkownika bazy danych dla aplikacji
```bash
sudo mysql -u root -p
```

```sql
-- Utwórz użytkownika tylko z potrzebnymi uprawnieniami
CREATE USER 'mika_app'@'localhost' IDENTIFIED BY 'BARDZO_SILNE_HASLO_TUTAJ';
GRANT SELECT, INSERT, UPDATE, DELETE ON `mika_db`.* TO 'mika_app'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Konfiguracja bezpieczeństwa MySQL
```bash
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
```

**Dodaj/zmodyfikuj:**
```ini
[mysqld]
# Wyłącz logowanie z zewnątrz (tylko localhost)
bind-address = 127.0.0.1

# Wyłącz LOAD DATA LOCAL (zapobiega atakom)
local-infile = 0

# Limit połączeń
max_connections = 100

# Logowanie wolnych zapytań (opcjonalne, do debugowania)
# slow_query_log = 1
# slow_query_log_file = /var/log/mysql/slow-query.log
# long_query_time = 2
```

```bash
sudo systemctl restart mysql
```

---

## 6. Zarządzanie procesami Node.js (PM2)

### Instalacja PM2
```bash
sudo npm install -g pm2
```

### Utworzenie pliku konfiguracyjnego PM2

Utwórz plik `ecosystem.config.js` w katalogu projektu na serwerze:
```bash
nano /home/michal/v2.mi-ka.pl/ecosystem.config.js
```

```javascript
module.exports = {
  apps: [
    {
      name: 'mika-nextjs',
      script: 'npm',
      args: 'start',
      cwd: '/home/michal/v2.mi-ka.pl',
      instances: 2, // Dla lepszej wydajności
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: '/home/michal/v2.mi-ka.pl/logs/pm2-error.log',
      out_file: '/home/michal/v2.mi-ka.pl/logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_memory_restart: '500M',
      min_uptime: '10s',
      max_restarts: 10,
    },
  ],
};
```

```bash
# Utwórz katalog na logi
mkdir -p /home/michal/v2.mi-ka.pl/logs

# Start aplikacji
pm2 start ecosystem.config.js

# Zapisz konfigurację PM2 (automatyczne uruchamianie po restarcie)
pm2 save
pm2 startup

# Sprawdź status
pm2 status
pm2 logs
```

---

## 7. Zabezpieczenie zmiennych środowiskowych

### Tworzenie pliku .env na serwerze
```bash
nano /home/michal/v2.mi-ka.pl/.env.production
```

**Wymagane zmienne (NIGDY nie commituj tego pliku!):**
```env
# Database
DATABASE_URL="mysql://mika_app:BARDZO_SILNE_HASLO@localhost:3306/mika_db"

# NextAuth
NEXTAUTH_URL="https://v2.mi-ka.pl"
NEXTAUTH_SECRET="LOSOWY_64_ZNAKOWY_STRING_WYGENERUJ_UZYWAJAC_openssl_rand_base64_32"

# Node Environment
NODE_ENV=production

# Inne zmienne z Twojej aplikacji
```

**Uwaga:** Wygeneruj bezpieczny NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

### Uprawnienia do pliku .env
```bash
chmod 600 /home/michal/v2.mi-ka.pl/.env.production
chown michal:michal /home/michal/v2.mi-ka.pl/.env.production
```

### Aktualizacja PM2, aby używał .env.production
```javascript
// W ecosystem.config.js dodaj:
env_file: '/home/michal/v2.mi-ka.pl/.env.production',
```

---

## 8. Rate Limiting i Ochrona DDoS

### ModSecurity (opcjonalne, zaawansowane)
```bash
sudo apt install libapache2-mod-security2 -y
# ModSecurity wymaga dodatkowej konfiguracji
```

### Cloudflare (zalecane)
- Skonfiguruj Cloudflare dla domeny
- Włącz DDoS protection
- Włącz Rate Limiting w Cloudflare Dashboard
- Włącz WAF (Web Application Firewall)

### Rate Limiting w Next.js (middleware)
Sprawdź, czy masz middleware.ts i dodaj rate limiting dla API.

---

## 9. Backup i monitoring

### Automatyczny backup bazy danych

Utwórz skrypt:
```bash
nano /home/michal/backup-db.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/home/michal/backups"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="mika_db"
DB_USER="mika_app"
DB_PASS="BARDZO_SILNE_HASLO"

mkdir -p $BACKUP_DIR

# Backup bazy danych
mysqldump -u $DB_USER -p$DB_PASS $DB_NAME > $BACKUP_DIR/mika_db_$DATE.sql

# Kompresja
gzip $BACKUP_DIR/mika_db_$DATE.sql

# Usuwanie backupów starszych niż 30 dni
find $BACKUP_DIR -name "mika_db_*.sql.gz" -mtime +30 -delete

echo "Backup completed: mika_db_$DATE.sql.gz"
```

```bash
chmod +x /home/michal/backup-db.sh

# Dodaj do crontab (codziennie o 2:00)
crontab -e
# Dodaj linię:
0 2 * * * /home/michal/backup-db.sh >> /home/michal/backup.log 2>&1
```

### Monitoring z PM2
```bash
# PM2 Monitoring (wymaga rejestracji, darmowy plan dostępny)
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### Logwatch (monitoring logów systemowych)
```bash
sudo apt install logwatch -y
sudo nano /etc/logwatch/conf/logwatch.conf
```

---

## 10. Aktualizacje bezpieczeństwa

### Automatyczne aktualizacje bezpieczeństwa
```bash
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure -plow unattended-upgrades
```

### Regularne aktualizacje (ręczne)
```bash
# Dodaj do crontab
crontab -e
# Dodaj (co tydzień):
0 3 * * 0 sudo apt update && sudo apt upgrade -y
```

### Monitoring podatności
```bash
# Na serwerze, w katalogu projektu
npm audit
npm audit fix

# Dla systemu
sudo apt list --upgradable
```

---

## Dodatkowe rekomendacje

### 1. Użyj strong passwords
- Minimum 16 znaków
- Kombinacja liter, cyfr, znaków specjalnych
- Używaj password manager (np. Bitwarden)

### 2. Monitoring i alerty
- Skonfiguruj Uptime Robot lub podobne
- Ustaw alerty email dla błędów PM2
- Monitoruj logi regularnie

### 3. Backup off-site
- Kopiuj backupy na inny serwer lub S3
- Testuj przywracanie backupów regularnie

### 4. Logi aplikacji
- Regularnie przeglądaj logi Nginx
- Monitoruj logi PM2
- Sprawdzaj logi MySQL

### 5. Zabezpieczenie NextAuth
- Użyj długiego i losowego NEXTAUTH_SECRET
- Włącz HTTPS (już skonfigurowane)
- Rozważ użycie session maxAge w konfiguracji

### 6. Ochrona przed XSS/CSRF
- Next.js ma wbudowaną ochronę
- Upewnij się, że używasz walidacji po stronie serwera
- Używaj DOMPurify (już masz w projekcie)

---

## Checklist bezpieczeństwa

- [ ] SSH zabezpieczony (klucze, zmieniony port)
- [ ] Firewall (UFW) skonfigurowany i aktywny
- [ ] Fail2Ban zainstalowany i aktywny
- [ ] Nginx skonfigurowany z SSL (Let's Encrypt)
- [ ] MySQL zabezpieczony (osobny użytkownik, bind-address)
- [ ] PM2 skonfigurowany z autostartem
- [ ] Zmienne środowiskowe bezpiecznie przechowywane (.env)
- [ ] Backup bazy danych automatyczny
- [ ] Automatyczne aktualizacje bezpieczeństwa
- [ ] Rate limiting skonfigurowany
- [ ] Monitoring aktywny

---

## Przydatne komendy

```bash
# Status serwisów
sudo systemctl status nginx
sudo systemctl status mysql
pm2 status

# Logi
sudo tail -f /var/log/nginx/v2.mi-ka.pl.error.log
pm2 logs mika-nextjs
sudo journalctl -u nginx -f

# Restart serwisów
sudo systemctl restart nginx
pm2 restart mika-nextjs
sudo systemctl restart mysql

# Sprawdzenie portów
sudo netstat -tlnp | grep :3000
sudo ss -tlnp | grep :3000

# Sprawdzenie bezpieczeństwa
sudo fail2ban-client status sshd
sudo ufw status verbose
```

---

## Kontakt i wsparcie

W razie problemów sprawdź:
- Logi aplikacji: `pm2 logs`
- Logi Nginx: `/var/log/nginx/`
- Logi systemu: `sudo journalctl -xe`
- Dokumentacja Next.js: https://nextjs.org/docs
- Dokumentacja Nginx: https://nginx.org/en/docs/

