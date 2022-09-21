import { BASE_CLEF_OCTAVE_TO_LINE, FIRST_OCTAVE_NOTE, NOTE_MAP, NOTE_RU_MAP, OCTAVE_SIZE, TREBLE_CLEF_OCTAVE_TO_LINE } from './music-config';

const getNoteBaseConfig = (note) => {
  const keyNumberInOctave = (note - FIRST_OCTAVE_NOTE) % OCTAVE_SIZE;

  return NOTE_MAP[keyNumberInOctave];
}

export const getNoteSymbol = (note, isFlatSelectable = false) => {
  let noteConfig = getNoteBaseConfig(note);
  if (isFlatSelectable && noteConfig.flat) {
    noteConfig = noteConfig.flat;
  }

  return `${noteConfig.symbol}${noteConfig.isSharp ? '#' : ''}`;
}

export const getNoteRuSymbol = (note, isFlatSelectable = false) => {
  let noteConfig = getNoteBaseConfig(note);
  if (isFlatSelectable && noteConfig.flat) {
    noteConfig = noteConfig.flat;
  }

  return `${NOTE_RU_MAP[noteConfig.symbol]}${noteConfig.isSharp ? ' диез' : ''}${noteConfig.isFlat ? ' бемоль' : ''}`;
}

export const getNoteConfig = (note, clef = 'treble', isFlatSelectable = false) => {
  let noteConfig = getNoteBaseConfig(note);
  if (isFlatSelectable && noteConfig.flat) {
    noteConfig = noteConfig.flat;
  }

  const octave = Math.floor((note - FIRST_OCTAVE_NOTE) / OCTAVE_SIZE);
  const octaveNoteLine = clef === 'treble'
    ? TREBLE_CLEF_OCTAVE_TO_LINE[octave]
    : BASE_CLEF_OCTAVE_TO_LINE[octave];
  const noteLine = octaveNoteLine + noteConfig.noteShift;

  return {
    ...noteConfig,
    fullSymbol: getNoteSymbol(note, isFlatSelectable),
    ruSymbol: getNoteRuSymbol(note, isFlatSelectable),
    note,
    noteLine,
  }
}