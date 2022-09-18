import './App.css';
import NotesCanvas from './components/NotesCanvas/NotesCanvas';
import { callMIDIAccess, getMIDIMessage, getRandomNote } from './helpers/midi-helpers';
import { useEffect, useState } from 'react';
import { getNoteConfig, getNoteSymbol } from './helpers/music-helpers';
import ResultPanel from './components/ResultPanel/ResultPanel';
import NoteSymbol from './components/NoteSymbol/NoteSymbol';

let midiInputs;

const App = () => {
  const [note, setNote] = useState(getRandomNote());
  const [result, setResult] = useState('none');

  const noteOn = (inputNote) => {
    if (inputNote === note) {
      setResult('success');
      setNote(getRandomNote());
      setTimeout(() => setResult('none'), 300);
    } else {
      setResult('fail');
      setTimeout(() => setResult('none'), 300);
    }
  };

  if (midiInputs) {
    midiInputs.forEach(input => {
      input.onmidimessage = message => getMIDIMessage(message, noteOn, () => {})
    })
  }

  useEffect(() => {
    if (navigator.requestMIDIAccess) {
      console.warn('This browser supports WebMIDI!');

      callMIDIAccess((note) => noteOn(note), () => {})
        .then(midiInputHandlers => {
          midiInputs = midiInputHandlers;

          midiInputs.forEach(input => {
            input.onmidimessage = message => getMIDIMessage(message, noteOn, () => {})
          })
        });
    } else {
      console.warn('WebMIDI is not supported in this browser.');
    }
  }, [])

  const selectedNote = getNoteConfig(note);

  return (
    <div className="App">
      <header className="App-header">
        <ResultPanel result={result}/>
        <NotesCanvas selectednote={selectedNote}/>
        <NoteSymbol selectednote={selectedNote}/>
      </header>
    </div>
  );
}

export default App;
