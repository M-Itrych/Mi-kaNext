#!/bin/bash

# Skrypt do bezpiecznej konfiguracji SSH
# UWAGA: Upewnij się, że masz dostęp do serwera przez klucze SSH przed uruchomieniem!
# W przeciwnym razie możesz się zablokować!

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

if [ "$EUID" -ne 0 ]; then 
    print_error "Proszę uruchomić jako root (sudo)"
    exit 1
fi

SSH_CONFIG="/etc/ssh/sshd_config"
SSH_CONFIG_BACKUP="/etc/ssh/sshd_config.backup.$(date +%Y%m%d_%H%M%S)"

print_warning "To skrypt zmieni konfigurację SSH!"
print_warning "Upewnij się, że masz dostęp przez klucze SSH!"
read -p "Czy kontynuować? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo "Anulowano."
    exit 0
fi

# Backup konfiguracji
cp $SSH_CONFIG $SSH_CONFIG_BACKUP
print_success "Backup utworzony: $SSH_CONFIG_BACKUP"

# Pytanie o port SSH
read -p "Podaj nowy port SSH (1024-65535, domyślnie 2222): " NEW_SSH_PORT
NEW_SSH_PORT=${NEW_SSH_PORT:-2222}

# Sprawdź czy port jest w zakresie
if [ "$NEW_SSH_PORT" -lt 1024 ] || [ "$NEW_SSH_PORT" -gt 65535 ]; then
    print_error "Port musi być w zakresie 1024-65535"
    exit 1
fi

echo ""
echo "Konfiguracja SSH:"
echo "=================="

# Zmiana portu
if grep -q "^Port " $SSH_CONFIG; then
    sed -i "s/^Port .*/Port $NEW_SSH_PORT/" $SSH_CONFIG
else
    sed -i "1i Port $NEW_SSH_PORT" $SSH_CONFIG
fi
print_success "Port zmieniony na $NEW_SSH_PORT"

# PermitRootLogin
if grep -q "^PermitRootLogin " $SSH_CONFIG; then
    sed -i "s/^PermitRootLogin .*/PermitRootLogin no/" $SSH_CONFIG
else
    sed -i "/^#PermitRootLogin /a PermitRootLogin no" $SSH_CONFIG
fi
print_success "PermitRootLogin ustawione na no"

# PasswordAuthentication
print_warning "UWAGA: Wyłączanie logowania hasłem!"
read -p "Czy na pewno chcesz wyłączyć logowanie hasłem? (yes/no): " DISABLE_PASSWORD

if [ "$DISABLE_PASSWORD" = "yes" ]; then
    if grep -q "^PasswordAuthentication " $SSH_CONFIG; then
        sed -i "s/^PasswordAuthentication .*/PasswordAuthentication no/" $SSH_CONFIG
    else
        sed -i "/^#PasswordAuthentication /a PasswordAuthentication no" $SSH_CONFIG
    fi
    print_success "PasswordAuthentication wyłączone"
else
    print_warning "PasswordAuthentication pozostaje włączone"
fi

# PubkeyAuthentication
if grep -q "^PubkeyAuthentication " $SSH_CONFIG; then
    sed -i "s/^PubkeyAuthentication .*/PubkeyAuthentication yes/" $SSH_CONFIG
else
    sed -i "/^#PubkeyAuthentication /a PubkeyAuthentication yes" $SSH_CONFIG
fi
print_success "PubkeyAuthentication włączone"

# MaxAuthTries
if grep -q "^MaxAuthTries " $SSH_CONFIG; then
    sed -i "s/^MaxAuthTries .*/MaxAuthTries 3/" $SSH_CONFIG
else
    sed -i "/^#MaxAuthTries /a MaxAuthTries 3" $SSH_CONFIG
fi
print_success "MaxAuthTries ustawione na 3"

# MaxStartups
if grep -q "^MaxStartups " $SSH_CONFIG; then
    sed -i "s/^MaxStartups .*/MaxStartups 3:50:10/" $SSH_CONFIG
else
    sed -i "/^#MaxStartups /a MaxStartups 3:50:10" $SSH_CONFIG
fi
print_success "MaxStartups skonfigurowane"

# ClientAliveInterval
if grep -q "^ClientAliveInterval " $SSH_CONFIG; then
    sed -i "s/^ClientAliveInterval .*/ClientAliveInterval 300/" $SSH_CONFIG
else
    sed -i "/^#ClientAliveInterval /a ClientAliveInterval 300" $SSH_CONFIG
fi
print_success "ClientAliveInterval ustawione"

# ClientAliveCountMax
if grep -q "^ClientAliveCountMax " $SSH_CONFIG; then
    sed -i "s/^ClientAliveCountMax .*/ClientAliveCountMax 2/" $SSH_CONFIG
else
    sed -i "/^#ClientAliveCountMax /a ClientAliveCountMax 2" $SSH_CONFIG
fi
print_success "ClientAliveCountMax ustawione"

# PermitEmptyPasswords
if grep -q "^PermitEmptyPasswords " $SSH_CONFIG; then
    sed -i "s/^PermitEmptyPasswords .*/PermitEmptyPasswords no/" $SSH_CONFIG
else
    sed -i "/^#PermitEmptyPasswords /a PermitEmptyPasswords no" $SSH_CONFIG
fi
print_success "PermitEmptyPasswords wyłączone"

# X11Forwarding
if grep -q "^X11Forwarding " $SSH_CONFIG; then
    sed -i "s/^X11Forwarding .*/X11Forwarding no/" $SSH_CONFIG
else
    sed -i "/^#X11Forwarding /a X11Forwarding no" $SSH_CONFIG
fi
print_success "X11Forwarding wyłączone"

# Protocol
if grep -q "^Protocol " $SSH_CONFIG; then
    sed -i "s/^Protocol .*/Protocol 2/" $SSH_CONFIG
else
    sed -i "/^#Protocol /a Protocol 2" $SSH_CONFIG
fi
print_success "Protocol ustawiony na 2"

# Test konfiguracji
echo ""
echo "Testowanie konfiguracji SSH..."
if sshd -t; then
    print_success "Konfiguracja SSH jest poprawna"
else
    print_error "Błąd w konfiguracji SSH!"
    print_error "Przywracanie backupu..."
    cp $SSH_CONFIG_BACKUP $SSH_CONFIG
    exit 1
fi

echo ""
print_warning "WAŻNE: Przed restartem SSH:"
print_warning "1. Otwórz NOWY terminal i przetestuj połączenie:"
echo "   ssh -p $NEW_SSH_PORT michal@57.128.180.118"
print_warning "2. Jeśli połączenie działa, zrestartuj SSH w tym terminalu:"
echo "   sudo systemctl restart sshd"
print_warning "3. Nie zamykaj tego terminala do czasu potwierdzenia, że nowy działa!"
echo ""

read -p "Czy chcesz teraz zrestartować SSH? (yes/no): " RESTART_SSH
if [ "$RESTART_SSH" = "yes" ]; then
    systemctl restart sshd
    print_success "SSH zrestartowany"
    print_warning "Sprawdź czy możesz się połączyć przez nowy port!"
else
    print_warning "SSH nie został zrestartowany. Zrób to ręcznie później."
fi

echo ""
echo "=========================================="
echo "Konfiguracja SSH zakończona!"
echo "=========================================="
echo ""
echo "Pamiętaj o:"
echo "- Aktualizacji firewall (UFW) dla nowego portu: sudo ufw allow $NEW_SSH_PORT/tcp"
echo "- Aktualizacji Fail2Ban (port w /etc/fail2ban/jail.local)"
echo "- Backup został zapisany w: $SSH_CONFIG_BACKUP"
echo ""

