
export function callMIDIAccess() {
  function onMIDISuccess(midiAccess) {
    const midiInputHandlers = []
    for (var input of midiAccess.inputs.values()) {
      midiInputHandlers.push(input);
    }

    return Promise.resolve(midiInputHandlers);
  }

  function onMIDIFailure() {
    const alertMessage = 'Could not access your MIDI devices.';

    alert(alertMessage);
    console.warn(alertMessage);
  }

  return navigator.requestMIDIAccess()
    .then(onMIDISuccess, onMIDIFailure);
}

export function getMIDIMessage(message, noteOnCb, noteOffCb) {
  var command = message.data[0];
  var note = message.data[1];
  var velocity = (message.data.length > 2) ? message.data[2] : 0;

  switch (command) {
    case 144: // noteOn
      if (velocity > 0) {
        noteOnCb(note, velocity);
      } else {
        noteOffCb(note);
      }
      break;
    case 128: // noteOff
      noteOffCb(note);
      break;
  }
}

/* 
  Note values are on a range from 0–127, lowest to highest. 
  For example, the lowest note on an 88-key piano has a value of 21, and the highest note is 108. 
  A “middle C” is 60.
*/
export const getRandomNote = (clef = 'treble') => {
  const middleC = 60;
  const rangeStart = clef === 'treble' ? middleC - 7 : middleC - 30;
  const rangeEnd = clef === 'treble' ? middleC + 30: middleC + 7;

  return Math.floor(Math.random() * (rangeEnd - rangeStart) + rangeStart);
}
