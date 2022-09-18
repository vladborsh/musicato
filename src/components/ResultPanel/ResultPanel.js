import React from 'react';

const ResultPanel = (props) => {
  let className = 'result';

  if (props.result === 'success') {
    className += ' success';
  } else if (props.result === 'fail') {
    className += ' fail';
  } else {
    className += ' none';
  }

  return (
    <div className={className}></div>
  );
}

export default ResultPanel;
