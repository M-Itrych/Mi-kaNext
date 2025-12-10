#!/bin/bash

# Skrypt naprawczy dla problemów z PM2
# Uruchom na serwerze: bash scripts/fix-pm2-issues.sh

set -e

echo "=========================================="
echo "Naprawa problemów z PM2"
echo "=========================================="
echo ""

# Kolory
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# 1. Zatrzymaj wszystkie procesy PM2
echo "1. Zatrzymywanie wszystkich procesów PM2..."
pm2 stop all
pm2 delete all
print_success "Wszystkie procesy PM2 zatrzymane"

# 2. Sprawdź co zajmuje port 3000
echo ""
echo "2. Sprawdzanie portu 3000..."
if lsof -ti:3000 > /dev/null 2>&1 || netstat -tlnp 2>/dev/null | grep :3000 > /dev/null || ss -tlnp 2>/dev/null | grep :3000 > /dev/null; then
    print_warning "Port 3000 jest zajęty!"
    echo "Procesy używające portu 3000:"
    lsof -i:3000 2>/dev/null || netstat -tlnp 2>/dev/null | grep :3000 || ss -tlnp 2>/dev/null | grep :3000 || echo "Nie można sprawdzić (zainstaluj lsof: sudo apt install lsof)"
    read -p "Czy chcesz zabić proces na porcie 3000? (y/n): " KILL_PORT
    if [ "$KILL_PORT" = "y" ]; then
        lsof -ti:3000 | xargs kill -9 2>/dev/null || fuser -k 3000/tcp 2>/dev/null || true
        print_success "Port 3000 zwolniony"
    fi
else
    print_success "Port 3000 jest wolny"
fi

# 3. Sprawdź czy node_modules istnieją
echo ""
echo "3. Sprawdzanie instalacji zależności..."
if [ ! -d "node_modules" ]; then
    print_warning "Brak katalogu node_modules - instalowanie zależności..."
    npm install
    print_success "Zależności zainstalowane"
else
    print_success "Katalog node_modules istnieje"
    
    # Sprawdź czy next jest zainstalowany
    if [ ! -d "node_modules/.bin/next" ] && [ ! -f "node_modules/.bin/next" ]; then
        print_warning "Next.js nie jest zainstalowany - reinstalacja..."
        npm install
    else
        print_success "Next.js jest zainstalowany"
    fi
fi

# 4. Sprawdź czy build istnieje
echo ""
echo "4. Sprawdzanie builda..."
if [ ! -d ".next" ]; then
    print_warning "Brak katalogu .next - budowanie aplikacji..."
    npm run build
    print_success "Aplikacja zbudowana"
else
    print_success "Katalog .next istnieje"
fi

# 5. Sprawdź ecosystem.config.js
echo ""
echo "5. Sprawdzanie konfiguracji PM2..."
if [ ! -f "ecosystem.config.js" ]; then
    print_warning "Brak pliku ecosystem.config.js - tworzenie..."
    cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'mika-nextjs',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: process.cwd(),
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_file: '.env.production',
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_memory_restart: '500M',
      min_uptime: '10s',
      max_restarts: 10,
    },
  ],
};
EOF
    print_success "Plik ecosystem.config.js utworzony"
else
    print_success "Plik ecosystem.config.js istnieje"
    # Sprawdź czy używa poprawnej ścieżki do next
    if grep -q "script: 'npm'" ecosystem.config.js; then
        print_warning "Ecosystem.config.js używa 'npm' - zmiana na bezpośrednią ścieżkę do next..."
        sed -i "s|script: 'npm'|script: 'node_modules/.bin/next'|g" ecosystem.config.js
        sed -i "s|args: 'start'|args: 'start'|g" ecosystem.config.js
        print_success "Ecosystem.config.js zaktualizowany"
    fi
fi

# 6. Utwórz katalog na logi
echo ""
echo "6. Tworzenie katalogu na logi..."
mkdir -p logs
print_success "Katalog logs utworzony"

# 7. Sprawdź .env.production
echo ""
echo "7. Sprawdzanie zmiennych środowiskowych..."
if [ ! -f ".env.production" ]; then
    print_warning "Brak pliku .env.production!"
    echo "Utwórz plik .env.production z wymaganymi zmiennymi:"
    echo "  - DATABASE_URL"
    echo "  - NEXTAUTH_URL"
    echo "  - NEXTAUTH_SECRET"
    echo "  - NODE_ENV=production"
else
    print_success "Plik .env.production istnieje"
fi

# 8. Uruchom aplikację
echo ""
read -p "Czy chcesz teraz uruchomić aplikację przez PM2? (y/n): " START_APP
if [ "$START_APP" = "y" ]; then
    echo "Uruchamianie aplikacji..."
    pm2 start ecosystem.config.js
    sleep 3
    pm2 status
    pm2 logs --lines 20
fi

echo ""
echo "=========================================="
echo "Naprawa zakończona!"
echo "=========================================="
echo ""
echo "Jeśli aplikacja nadal nie działa, sprawdź:"
echo "1. pm2 logs - wyświetl logi błędów"
echo "2. Sprawdź czy .env.production jest poprawnie skonfigurowany"
echo "3. Sprawdź czy port 3000 jest wolny: lsof -i:3000"
echo "4. Sprawdź czy build jest aktualny: npm run build"
echo ""

