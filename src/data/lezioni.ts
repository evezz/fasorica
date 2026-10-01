// Elenco delle lezioni. Per aggiungere o spostare una lezione basta modificare questo file.
// "slug" è il percorso della pagina dentro src/content/docs/it/ (senza estensione):
// quando crei quel file, la lezione diventa automaticamente cliccabile.

export type Livello = 'superiori' | 'universita';

export interface Lezione {
  titolo: string;
  slug: string;
  descrizione: string;
  livello: Livello[];
}

export interface Argomento {
  titolo: string;
  descrizione: string;
  lezioni: Lezione[];
}

const S: Livello[] = ['superiori'];
const U: Livello[] = ['universita'];
const SU: Livello[] = ['superiori', 'universita'];

export const argomenti: Argomento[] = [
  {
    titolo: 'Fondamenti dei circuiti',
    descrizione: 'Le grandezze e le leggi di base per analizzare qualunque circuito.',
    lezioni: [
      { titolo: 'Tensione, corrente e potenza', slug: 'fondamenti/grandezze-elettriche', descrizione: 'Cosa sono, come si misurano e come si legge un segno.', livello: SU },
      { titolo: 'Legge di Ohm', slug: 'fondamenti/legge-di-ohm', descrizione: 'Il legame tra tensione, corrente e resistenza.', livello: S },
      { titolo: 'Resistenze in serie e in parallelo', slug: 'fondamenti/serie-parallelo', descrizione: 'Resistenza equivalente e partitori.', livello: S },
      { titolo: 'Leggi di Kirchhoff', slug: 'fondamenti/kirchhoff', descrizione: 'Bilancio delle correnti ai nodi e delle tensioni nelle maglie.', livello: SU },
      { titolo: 'Teoremi di Thevenin e Norton', slug: 'fondamenti/thevenin-norton', descrizione: 'Ridurre una rete complessa a un generatore equivalente.', livello: U },
    ],
  },
  {
    titolo: 'Componenti reattivi e transitori',
    descrizione: 'Condensatori e induttori, e come evolvono i circuiti nel tempo.',
    lezioni: [
      { titolo: 'Il condensatore', slug: 'transitori/condensatore', descrizione: 'Capacità, carica ed energia immagazzinata.', livello: SU },
      { titolo: "L'induttore", slug: 'transitori/induttore', descrizione: 'Induttanza e legge di Faraday nei circuiti.', livello: SU },
      { titolo: 'Transitori RC e RL', slug: 'transitori/rc-rl', descrizione: 'Costante di tempo e risposta di un circuito del primo ordine.', livello: SU },
      { titolo: 'Circuiti RLC', slug: 'transitori/rlc', descrizione: 'Smorzamento e oscillazioni nei circuiti del secondo ordine.', livello: U },
    ],
  },
  {
    titolo: 'Corrente alternata e fasori',
    descrizione: 'Il regime sinusoidale e il metodo simbolico che lo semplifica.',
    lezioni: [
      { titolo: 'Segnali sinusoidali', slug: 'fasori/segnali-sinusoidali', descrizione: 'Ampiezza, frequenza, fase e valore efficace.', livello: SU },
      { titolo: "Numeri complessi per l'elettrotecnica", slug: 'fasori/numeri-complessi', descrizione: 'Forma cartesiana e polare, operazioni essenziali.', livello: SU },
      { titolo: 'I fasori', slug: 'fasori/fasori', descrizione: 'Rappresentare una sinusoide con un numero complesso.', livello: SU },
      { titolo: 'Impedenza e ammettenza', slug: 'fasori/impedenza', descrizione: 'La legge di Ohm in regime sinusoidale.', livello: SU },
      { titolo: 'Potenza e rifasamento', slug: 'fasori/potenza-rifasamento', descrizione: 'Potenza attiva, reattiva, apparente e fattore di potenza.', livello: SU },
    ],
  },
  {
    titolo: 'Risposta in frequenza e filtri',
    descrizione: 'Come un circuito risponde al variare della frequenza.',
    lezioni: [
      { titolo: 'Funzione di trasferimento', slug: 'frequenza/funzione-di-trasferimento', descrizione: 'Poli, zeri e comportamento in frequenza.', livello: U },
      { titolo: 'Diagrammi di Bode', slug: 'frequenza/bode', descrizione: 'Tracciare modulo e fase con le approssimazioni asintotiche.', livello: U },
      { titolo: 'Filtri passivi RC', slug: 'frequenza/filtri-rc', descrizione: 'Passa-basso e passa-alto, frequenza di taglio.', livello: SU },
    ],
  },
  {
    titolo: 'Diodi e transistor',
    descrizione: 'I componenti a semiconduttore e le loro prime applicazioni.',
    lezioni: [
      { titolo: 'La giunzione PN', slug: 'semiconduttori/giunzione-pn', descrizione: 'Dal drogaggio alla barriera di potenziale.', livello: SU },
      { titolo: 'Diodo e raddrizzatori', slug: 'semiconduttori/diodo-raddrizzatori', descrizione: 'Caratteristica, modelli e alimentatori semplici.', livello: SU },
      { titolo: 'Transistor BJT', slug: 'semiconduttori/bjt', descrizione: 'Funzionamento, polarizzazione e uso come interruttore.', livello: SU },
      { titolo: 'Transistor MOSFET', slug: 'semiconduttori/mosfet', descrizione: 'Regioni di funzionamento e caratteristiche.', livello: SU },
    ],
  },
  {
    titolo: 'Amplificatori operazionali',
    descrizione: "L'operazionale ideale e le configurazioni fondamentali.",
    lezioni: [
      { titolo: 'Amplificatore operazionale ideale', slug: 'operazionali/ideale', descrizione: 'Ipotesi di idealità e corto circuito virtuale.', livello: SU },
      { titolo: 'Configurazione invertente e non invertente', slug: 'operazionali/invertente-non-invertente', descrizione: 'Guadagno, impedenze e confronto.', livello: SU },
      { titolo: 'Sommatore, integratore e derivatore', slug: 'operazionali/sommatore-integratore', descrizione: 'Operazioni matematiche con i circuiti.', livello: SU },
    ],
  },
  {
    titolo: 'Elettronica digitale',
    descrizione: 'Dai numeri binari alle reti logiche.',
    lezioni: [
      { titolo: 'Sistemi di numerazione', slug: 'digitale/numerazione', descrizione: 'Binario, esadecimale e conversioni.', livello: S },
      { titolo: 'Algebra di Boole e porte logiche', slug: 'digitale/boole-porte', descrizione: 'Operatori, tabelle di verità e semplificazioni.', livello: SU },
      { titolo: 'Mappe di Karnaugh', slug: 'digitale/karnaugh', descrizione: 'Minimizzare le funzioni logiche in modo grafico.', livello: SU },
      { titolo: 'Flip-flop e contatori', slug: 'digitale/flip-flop-contatori', descrizione: 'Elementi di memoria e reti sequenziali.', livello: SU },
    ],
  },
];