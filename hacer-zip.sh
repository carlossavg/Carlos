#!/bin/bash
# Empaqueta una plantilla lista para vender.
#   ./hacer-zip.sh barberia   ->  GrowthOS-Barberia.zip
set -e
n="${1:?Dime cuál: ./hacer-zip.sh barberia}"
d="plantillas/$n"
[ -d "$d/web" ] || { echo "No existe $d/web"; exit 1; }

# Nombre bonito: cada palabra con mayúscula inicial (real-estate -> Real-Estate)
bonito="$(echo "$n" | awk -F'-' '{for(i=1;i<=NF;i++){$i=toupper(substr($i,1,1)) substr($i,2)}; print}' OFS='-')"
zip="GrowthOS-${bonito}.zip"

# Revisiones antes de empaquetar
[ -f "$d/LEEME-PRIMERO.txt" ] || { echo "Falta LEEME-PRIMERO.txt"; exit 1; }
[ -f "$d/web/config.js" ]     || { echo "Falta web/config.js"; exit 1; }
[ -f "$d/web/index.html" ]    || { echo "Falta web/index.html"; exit 1; }
node --check "$d/web/config.js" || { echo "config.js tiene un error"; exit 1; }
if ls "$d/web/img/"*.png "$d/web/img/"*.jpg >/dev/null 2>&1; then
  echo "AVISO: hay fotos en img/ — quítalas si son de prueba"
fi

rm -f "$zip"
( cd "$d" && zip -qr "../../$zip" LEEME-PRIMERO.txt web -x '.*' -x '__MACOSX/*' )
echo "$zip  ($(du -h "$zip" | cut -f1))"
unzip -l "$zip" | tail -n +4 | head -n -2 | awk '{print "   " $4}'
