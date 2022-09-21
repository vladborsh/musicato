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

const getRandomClef = () => Math.random() > 0.5 ? 'treble' : 'base';
const getRandomIsFlat = () => Math.random() > 0.5;

const App = () => {
  const [note, setNote] = useState(getRandomNote());
  const [midiInputs, setMidiInputs] = useState(null);
  const [isFlat, setIsFlat] = useState(false);
  const [clef, setClef] = useState('treble');
  const [isRandomClef, setIsRandomClef] = useState(false);
  const [result, setResult] = useState('none');

  const noteOn = (inputNote) => {
    if (inputNote === note) {
      setResult('success');
      if (isRandomClef) {
        const randomClef = getRandomClef();
        setClef(randomClef);
        setNote(getNewNote(note, randomClef));
        setIsFlat(getRandomIsFlat());
      } else {
        setNote(getNewNote(note, clef));
        setIsFlat(getRandomIsFlat());
      }
      setTimeout(() => setResult('none'), 300);
    } else {
      setResult('fail');
      setTimeout(() => setResult('none'), 300);
    }
  };

  const onNewClef = (newClef) => {
    if (newClef === 'random') {
      setIsRandomClef(true);
      const randomClef = getRandomClef();
      setClef(randomClef);
      setNote(getNewNote(note, randomClef));
    } else {
      setIsRandomClef(false);
      setClef(newClef); 
      setNote(getNewNote(note, newClef));
    }
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
        .then(midiInputHandlers => {
          console.info('Midi input accepted!');

          setMidiInputs(midiInputHandlers)
        });
    } else {
      const alertMessage = 'WebMIDI is not supported in this browser.';

      console.warn('WebMIDI is not supported in this browser.');
      alert(alertMessage);
    }
  }, [])

  const selectedNote = getNoteConfig(note, clef, isFlat);
  console.log(selectedNote);

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
