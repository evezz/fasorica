#!/bin/bash
# Compila i file circuiti/*.tex in public/images/circuiti/*.svg
#
# Uso (dalla cartella del progetto):
#   npm run circuiti                    compila solo i circuiti nuovi o modificati
#   npm run circuiti -- ohm th_vth      ricompila solo quelli indicati (anche se già esistono)
#   npm run circuiti -- --tutti         ricompila tutto da capo
#
# "Nuovo" = non esiste ancora il .svg. "Modificato" = il .tex è stato salvato dopo l'ultima
# creazione del .svg. In alternativa basta cancellare un .svg: alla prossima esecuzione viene rifatto.
# Usa --tutti se cambi l'INTESTAZIONE qui sotto (i .tex non risulterebbero modificati).
#
# - Se il file NON contiene \documentclass, l'intestazione qui sotto viene aggiunta in automatico:
#   puoi incollare direttamente il codice \begin{tikzpicture} ... \end{tikzpicture}.
# - Se invece contiene già \documentclass, viene usato così com'è.

set -e
cd "$(dirname "$0")/.."

# Intestazione aggiunta ai file che ne sono privi (modificala se ti servono altri pacchetti)
INTESTAZIONE='\documentclass[border=4pt]{standalone}
\usepackage{circuitikz}
\usepackage{amsmath}
\begin{document}'

for comando in latex dvisvgm; do
  if ! command -v "$comando" > /dev/null; then
    echo "Manca il programma '$comando'. Controlla l'installazione di LaTeX."
    exit 1
  fi
done

# Quali file compilare
TUTTI=0
RICHIESTI=()
for arg in "$@"; do
  case "$arg" in
    --tutti|-t) TUTTI=1 ;;
    --) ;;
    -*) echo "Opzione sconosciuta: $arg  (usa --tutti oppure i nomi dei circuiti)"; exit 1 ;;
    *)
      nome=$(basename "$arg" .tex)
      if [ ! -f "circuiti/$nome.tex" ]; then
        echo "Non trovo circuiti/$nome.tex"
        exit 1
      fi
      RICHIESTI+=("$nome")
      ;;
  esac
done

mkdir -p public/images/circuiti

creati=0
saltati=0

for file in circuiti/*.tex; do
  [ -e "$file" ] || { echo "Nessun file .tex in circuiti/"; exit 0; }
  nome=$(basename "$file" .tex)
  svg="public/images/circuiti/$nome.svg"

  if [ ${#RICHIESTI[@]} -gt 0 ]; then
    scelto=0
    for r in "${RICHIESTI[@]}"; do [ "$r" = "$nome" ] && scelto=1; done
    [ "$scelto" -eq 1 ] || continue
  elif [ "$TUTTI" -eq 0 ] && [ -f "$svg" ] && [ ! "$file" -nt "$svg" ]; then
    saltati=$((saltati + 1))
    continue
  fi

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

  dvisvgm --no-fonts "$tmp/$nome.dvi" -o "$svg" > /dev/null 2>&1
  rm -rf "$tmp"
  creati=$((creati + 1))
  echo "Creato $svg"
done

if [ "$creati" -eq 0 ]; then
  echo "Niente da compilare: tutti i circuiti sono già aggiornati. (Per rifarli: npm run circuiti -- --tutti)"
else
  echo "Fatto. Compilati: $creati. Già aggiornati: $saltati."
fi