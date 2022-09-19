import './App.css';
import NotesCanvas from './components/NotesCanvas/NotesCanvas';
import { callMIDIAccess, getMIDIMessage, getRandomNote } from './helpers/midi-helpers';
import { useEffect, useState } from 'react';
import { getNoteConfig } from './helpers/music-helpers';
import ResultPanel from './components/ResultPanel/ResultPanel';
import NoteSymbol from './components/NoteSymbol/NoteSymbol';
import ClefSelect from './components/ClefSelect/ClefSelect';

const getNewNote = (prevNote, clef) => {
  const newNote = getRandomNote(clef);
  
  return newNote === prevNote ? getNewNote(newNote, clef) : newNote;
}

const App = () => {
  const [note, setNote] = useState(getRandomNote());
  const [midiInputs, setMidiInputs] = useState(null);
  const [clef, setClef] = useState('treble');
  const [result, setResult] = useState('none');

  const noteOn = (inputNote) => {
    if (inputNote === note) {
      setResult('success');
      setNote(getNewNote(note, clef));
      setTimeout(() => setResult('none'), 300);
    } else {
      setResult('fail');
      setTimeout(() => setResult('none'), 300);
    }
  };

  const onNewClef = (newClef) => {
    setClef(newClef); 
    setNote(getNewNote(note, newClef));
  }

  if (midiInputs) {
    midiInputs.forEach(input => {
      input.onmidimessage = message => getMIDIMessage(message, noteOn, () => {})
    })
  }

  useEffect(() => {
    if (navigator.requestMIDIAccess) {
      console.info('This browser supports WebMIDI!');

      callMIDIAccess((note) => noteOn(note), () => {})
        .then(midiInputHandlers => setMidiInputs(midiInputHandlers));
    } else {
      const alertMessage = 'WebMIDI is not supported in this browser.';

      console.warn('WebMIDI is not supported in this browser.');
      alert(alertMessage);
    }
  }, [])

  const selectedNote = getNoteConfig(note, clef);

  return (
    <div className="App">
      <header className="App-header">
        <ResultPanel result={result}/>
        <NotesCanvas selectednote={selectedNote} clef={clef}/>
        <NoteSymbol selectednote={selectedNote}/>
        <ClefSelect clef={clef} onChange={(newClef) => onNewClef(newClef)}/>
      </header>
    </div>
  );
}

export default App;
