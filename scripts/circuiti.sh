#!/bin/bash
# Compila ogni file circuiti/*.tex in public/images/circuiti/*.svg
# Uso (dalla cartella del progetto):  npm run circuiti
#
# - Se il file NON contiene \documentclass, l'intestazione qui sotto viene aggiunta in automatico:
#   puoi incollare direttamente il codice \begin{tikzpicture} ... \end{tikzpicture}.
# - Se invece contiene già \documentclass, viene usato così com'è.

set -e
cd "$(dirname "$0")/.."

# Intestazione aggiunta ai file che ne sono privi (modificala se ti servono altri pacchetti)
INTESTAZIONE='\documentclass[border=1pt]{standalone}
\usepackage{circuitikz}
\usepackage{amsmath}
\usepackage{xcolor}
\begin{document}'

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
  sorgente="$PWD/$file"

  if ! grep -q '\\documentclass' "$file"; then
    { printf '%s\n' "$INTESTAZIONE"; cat "$file"; printf '\n\\end{document}\n'; } > "$tmp/completo.tex"
    sorgente="$tmp/completo.tex"
  fi

  # Il driver "pgfsys-dvisvgm" fa disegnare le linee direttamente in SVG, senza Ghostscript.
  if ! latex -interaction=nonstopmode -halt-on-error -output-directory="$tmp" -jobname="$nome" \
       "\\def\\pgfsysdriver{pgfsys-dvisvgm.def}\\input{$sorgente}" > "$tmp/log.txt"; then
    echo "Errore in $file:"
    cat "$tmp/log.txt"
    rm -rf "$tmp"
    exit 1
  fi

  dvisvgm --no-fonts "$tmp/$nome.dvi" -o "public/images/circuiti/$nome.svg" > /dev/null 2>&1
  rm -rf "$tmp"
  echo "Creato public/images/circuiti/$nome.svg"
done
