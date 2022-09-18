import React, { useState } from 'react';

const NoteSymbol = (props) => {
  const [isShownSymbol, setIsShownSymbol] = useState(true);

  if (isShownSymbol) {
    return (
      <div className="symbols">
        <div>{props.selectednote.ruSymbol}</div>
        <button onClick={() => setIsShownSymbol(false)}>Hide symbols</button>
      </div>
    )
  } else {

    return (
      <div className="symbols">
        <button onClick={() => setIsShownSymbol(true)}>Show symbols</button>
      </div>
    );
  }
}

export default NoteSymbol;