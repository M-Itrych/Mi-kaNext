#!/bin/bash

# Skrypt automatycznej konfiguracji zabezpieczeń VPS dla Mi-ka Next.js
# Użycie: sudo ./setup-vps-security.sh
# UWAGA: Przeczytaj cały skrypt przed uruchomieniem!

set -e

echo "=========================================="
echo "Konfiguracja zabezpieczeń VPS - Mi-ka"
echo "=========================================="
echo ""

# Kolory dla output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Funkcje pomocnicze
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Sprawdź czy skrypt jest uruchomiony jako root
if [ "$EUID" -ne 0 ]; then 
    print_error "Proszę uruchomić jako root (sudo)"
    exit 1
fi

# 1. Aktualizacja systemu
echo "1. Aktualizacja systemu..."
apt update && apt upgrade -y
print_success "System zaktualizowany"

# 2. Instalacja podstawowych narzędzi
echo ""
echo "2. Instalacja narzędzi..."
apt install -y curl wget git build-essential ufw fail2ban nginx certbot python3-certbot-nginx unattended-upgrades
print_success "Narzędzia zainstalowane"

# 3. Konfiguracja UFW
echo ""
echo "3. Konfiguracja firewall (UFW)..."
ufw --force enable
ufw default deny incoming
ufw default allow outgoing

# Pytanie o port SSH
read -p "Podaj port SSH (domyślnie 22): " SSH_PORT
SSH_PORT=${SSH_PORT:-22}
ufw allow $SSH_PORT/tcp comment 'SSH'
ufw allow 80/tcp comment 'HTTP'
ufw allow 443/tcp comment 'HTTPS'
print_success "Firewall skonfigurowany (SSH port: $SSH_PORT)"

# 4. Konfiguracja Fail2Ban
echo ""
echo "4. Konfiguracja Fail2Ban..."
if [ ! -f /etc/fail2ban/jail.local ]; then
    cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
fi

# Aktualizuj konfigurację SSH w Fail2Ban
sed -i "s/^port.*ssh/port = $SSH_PORT/" /etc/fail2ban/jail.local 2>/dev/null || true
sed -i '/\[sshd\]/,/^\[/ { s/^enabled.*/enabled = true/; }' /etc/fail2ban/jail.local

systemctl enable fail2ban
systemctl restart fail2ban
print_success "Fail2Ban skonfigurowany"

# 5. Konfiguracja automatycznych aktualizacji
echo ""
echo "5. Konfiguracja automatycznych aktualizacji..."
echo 'Unattended-Upgrade::Automatic-Reboot "false";' >> /etc/apt/apt.conf.d/50unattended-upgrades
dpkg-reconfigure -f noninteractive unattended-upgrades
print_success "Automatyczne aktualizacje skonfigurowane"

# 6. Konfiguracja Nginx (podstawowa)
echo ""
echo "6. Podstawowa konfiguracja Nginx..."
# Usuń domyślną konfigurację jeśli istnieje
if [ -f /etc/nginx/sites-enabled/default ]; then
    rm /etc/nginx/sites-enabled/default
fi

# Podstawowa konfiguracja dla SSL
cat > /etc/nginx/snippets/ssl-params.conf << 'EOF'
ssl_protocols TLSv1.2 TLSv1.3;
ssl_prefer_server_ciphers on;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 10m;
ssl_stapling on;
ssl_stapling_verify on;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
EOF

print_success "Nginx skonfigurowany (podstawowo)"

# 7. Instalacja Node.js (jeśli nie jest zainstalowany)
echo ""
if ! command -v node &> /dev/null; then
    echo "7. Instalacja Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
    print_success "Node.js zainstalowany"
else
    echo "7. Node.js już zainstalowany"
    node --version
fi

# 8. Instalacja PM2
echo ""
if ! command -v pm2 &> /dev/null; then
    echo "8. Instalacja PM2..."
    npm install -g pm2
    print_success "PM2 zainstalowany"
else
    echo "8. PM2 już zainstalowany"
fi

# 9. Utworzenie użytkownika aplikacji (jeśli nie istnieje)
echo ""
read -p "Podaj nazwę użytkownika dla aplikacji (domyślnie: michal): " APP_USER
APP_USER=${APP_USER:-michal}

if ! id "$APP_USER" &>/dev/null; then
    echo "Tworzenie użytkownika $APP_USER..."
    adduser --disabled-password --gecos "" $APP_USER
    usermod -aG sudo $APP_USER
    print_success "Użytkownik $APP_USER utworzony"
else
    print_success "Użytkownik $APP_USER już istnieje"
fi

# 10. Konfiguracja SSH (ostrożnie!)
echo ""
print_warning "Konfiguracja SSH wymaga ręcznej edycji!"
print_warning "Edytuj plik /etc/ssh/sshd_config i zmień:"
echo "  - Port (na inny niż 22, np. $SSH_PORT)"
echo "  - PermitRootLogin no"
echo "  - PasswordAuthentication no (po upewnieniu się, że klucze SSH działają!)"
echo "  - MaxAuthTries 3"
echo ""
read -p "Czy chcesz zobaczyć przykładową konfigurację SSH? (y/n): " SHOW_SSH_CONFIG
if [ "$SHOW_SSH_CONFIG" = "y" ]; then
    echo ""
    echo "Przykładowa konfiguracja dla /etc/ssh/sshd_config:"
    echo "---"
    echo "Port $SSH_PORT"
    echo "PermitRootLogin no"
    echo "PasswordAuthentication no"
    echo "PubkeyAuthentication yes"
    echo "MaxAuthTries 3"
    echo "MaxStartups 3:50:10"
    echo "ClientAliveInterval 300"
    echo "ClientAliveCountMax 2"
    echo "PermitEmptyPasswords no"
    echo "X11Forwarding no"
    echo "Protocol 2"
    echo "---"
fi

# 11. Utworzenie katalogu na backup
echo ""
echo "11. Tworzenie struktury katalogów..."
mkdir -p /home/$APP_USER/backups
chown $APP_USER:$APP_USER /home/$APP_USER/backups
print_success "Katalogi utworzone"

# 12. Skrypt backup bazy danych
echo ""
echo "12. Tworzenie skryptu backup..."
cat > /home/$APP_USER/backup-db.sh << 'BACKUP_EOF'
#!/bin/bash
BACKUP_DIR="/home/APP_USER_PLACEHOLDER/backups"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="mika_db"
DB_USER="mika_app"
# DB_PASS - ustaw w skrypcie ręcznie!

mkdir -p $BACKUP_DIR

if [ -z "$DB_PASS" ]; then
    echo "Błąd: Ustaw zmienną DB_PASS w skrypcie!"
    exit 1
fi

mysqldump -u $DB_USER -p$DB_PASS $DB_NAME > $BACKUP_DIR/mika_db_$DATE.sql
gzip $BACKUP_DIR/mika_db_$DATE.sql

# Usuń backupy starsze niż 30 dni
find $BACKUP_DIR -name "mika_db_*.sql.gz" -mtime +30 -delete

echo "Backup completed: mika_db_$DATE.sql.gz"
BACKUP_EOF

sed -i "s/APP_USER_PLACEHOLDER/$APP_USER/g" /home/$APP_USER/backup-db.sh
chmod +x /home/$APP_USER/backup-db.sh
chown $APP_USER:$APP_USER /home/$APP_USER/backup-db.sh
print_success "Skrypt backup utworzony (edytuj ręcznie DB_PASS!)"

# Podsumowanie
echo ""
echo "=========================================="
echo "Konfiguracja zakończona!"
echo "=========================================="
echo ""
echo "Następne kroki:"
echo "1. Skonfiguruj SSH: nano /etc/ssh/sshd_config"
echo "2. Zrestartuj SSH: systemctl restart sshd"
echo "3. Skonfiguruj Nginx dla swojej domeny (szablon w docs/VPS_SECURITY.md)"
echo "4. Uzyskaj certyfikat SSL: certbot --nginx -d twoja-domena.pl"
echo "5. Skonfiguruj MySQL i utwórz użytkownika bazy danych"
echo "6. Skonfiguruj zmienne środowiskowe (.env.production)"
echo "7. Skonfiguruj PM2 (ecosystem.config.js)"
echo "8. Dodaj backup do crontab"
echo ""
echo "Szczegółowe instrukcje w: docs/VPS_SECURITY.md"
echo ""

