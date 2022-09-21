export const NOTE_MAP = [
  {
    symbol: 'C',
    isSharp: false,
    noteShift: 0,
  },
  {
    symbol: 'C',
    isSharp: true,
    noteShift: 0,
    flat: {
      symbol: 'D',
      isSharp: false,
      isFlat: true,
      noteShift: 0.5,
    },
  },
  {
    symbol: 'D',
    isSharp: false,
    noteShift: 0.5
  },
  {
    symbol: 'D',
    isSharp: true,
    noteShift: 0.5,
    flat: {
      symbol: 'E',
      isSharp: false,
      isFlat: true,
      noteShift: 1,
    },
  },
  {
    symbol: 'E',
    isSharp: false,
    noteShift: 1,
  },
  {
    symbol: 'F',
    isSharp: false,
    noteShift: 1.5,
  },
  {
    symbol: 'F',
    isSharp: true,
    noteShift: 1.5,
    flat: {
      symbol: 'G',
      isSharp: false,
      isFlat: true,
      noteShift: 2,
    },
  },
  {
    symbol: 'G',
    isSharp: false,
    noteShift: 2,
  },
  {
    symbol: 'G',
    isSharp: true,
    noteShift: 2,
    flat: {
      symbol: 'A',
      isSharp: false,
      isFlat: true,
      noteShift: 2.5,
    },
  },
  {
    symbol: 'A',
    isSharp: false,
    noteShift: 2.5,
  },
  {
    symbol: 'A',
    isSharp: true,
    noteShift: 2.5,
    flat: {
      symbol: 'B',
      isSharp: false,
      isFlat: true,
      noteShift: 3,
    },
  },
  {
    symbol: 'B',
    isSharp: false,
    noteShift: 3
  },
];

export const NOTE_RU_MAP = {
  A: 'Ля',
  B: 'Си',
  C: 'До',
  D: 'Ре',
  E: 'Ми',
  F: 'Фа',
  G: 'Соль',
};

export const TREBLE_CLEF_OCTAVE_TO_LINE = [-11.5, -8, -4.5, -1, 2.5, 6, 9.5];
export const BASE_CLEF_OCTAVE_TO_LINE = [-5.5, -2, 1.5, 5, 8.5, 12, 15.5];
export const FIRST_OCTAVE_NOTE = 24;
export const OCTAVE_SIZE = 12;
