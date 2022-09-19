import React from 'react';

const ClefSelect = (props) => {
  return (
    <div className="dropup">
      <button className="dropbtn">{props.clef} clef</button>
      <div className="dropup-content">
        <a href="#" onClick={() => props.onChange('treble')}>treble clef</a>
        <a href="#" onClick={() => props.onChange('base')}>base clef</a>
      </div>
    </div>
  );
}

export default ClefSelect;