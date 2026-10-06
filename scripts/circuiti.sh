#!/bin/bash
# Compila ogni file circuiti/*.tex in public/images/circuiti/*.svg
# Uso (dalla cartella del progetto):  npm run circuiti

set -e
cd "$(dirname "$0")/.."

for comando in latex dvisvgm; do
  if ! command -v "$comando" > /dev/null; then
    echo "Manca il programma '$comando'. Controlla l'installazione di LaTeX."
    exit 1
  fi
done

mkdir -p public/images/circuiti

for file in circuiti/*.tex; do
  nome=$(basename "$file" .tex)
  tmp=$(mktemp -d)

  if ! latex -interaction=nonstopmode -halt-on-error -output-directory="$tmp" "$file" > "$tmp/log.txt"; then
    echo "Errore in $file:"
    cat "$tmp/log.txt"
    rm -rf "$tmp"
    exit 1
  fi

  dvisvgm --no-fonts "$tmp/$nome.dvi" -o "public/images/circuiti/$nome.svg"
  rm -rf "$tmp"
  echo "Creato public/images/circuiti/$nome.svg"
done
