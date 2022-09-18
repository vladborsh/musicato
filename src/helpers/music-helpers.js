const NOTE_MAP = [
  { symbol: 'C', isSharp: false, noteShift: 0 },
  { symbol: 'C', isSharp: true, noteShift: 0 },
  { symbol: 'D', isSharp: false, noteShift: 0.5 },
  { symbol: 'D', isSharp: true, noteShift: 0.5 },
  { symbol: 'E', isSharp: false, noteShift: 1 },
  { symbol: 'F', isSharp: false, noteShift: 1.5 },
  { symbol: 'F', isSharp: true, noteShift: 1.5 },
  { symbol: 'G', isSharp: false, noteShift: 2 },
  { symbol: 'G', isSharp: true, noteShift: 2 },
  { symbol: 'A', isSharp: false, noteShift: 2.5 },
  { symbol: 'A', isSharp: true, noteShift: 2.5 },
  { symbol: 'B', isSharp: false, noteShift: 3 },
];

const NOTE_RU_MAP = {
  A: 'Ля',
  B: 'Си',
  C: 'До',
  D: 'Ре',
  E: 'Ми',
  F: 'Фа',
  G: 'Соль',
};

const OCTAVE_TO_LINE = [-11.5, -8, -4.5, -1, 2.5, 6, 9.5]; 
const FIRST_OCTAVE_NOTE = 24;
const OCTAVE_SIZE = 12;

const getNoteBaseConfig = (note) => {
  const keyNumberInOctave = (note - FIRST_OCTAVE_NOTE) % OCTAVE_SIZE;
  
  return NOTE_MAP[keyNumberInOctave];
}

export const getNoteSymbol = note => {
  const noteConfig = getNoteBaseConfig(note);

  return `${noteConfig.symbol}${noteConfig.isSharp ? '#' : ''}`;
}

export const getNoteRuSymbol = note => {
  const noteConfig = getNoteBaseConfig(note);

  return `${NOTE_RU_MAP[noteConfig.symbol]}${noteConfig.isSharp ? ' диез' : ''}`;
}

export const getNoteConfig = note => {
  const noteConfig = getNoteBaseConfig(note);
  const octave = Math.floor((note - FIRST_OCTAVE_NOTE) / OCTAVE_SIZE);
  const octaveNoteLine = OCTAVE_TO_LINE[octave];
  const noteLine = octaveNoteLine + noteConfig.noteShift;
  
  return {
    ...noteConfig,
    fullSymbol: getNoteSymbol(note),
    ruSymbol: getNoteRuSymbol(note),
    note,
    noteLine,
  }
}