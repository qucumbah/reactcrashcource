import React from 'react';
import './App.css';

function App() {
  let thing = <div>Hello</div>;
  console.dir(thing);
  let result = (
    <div className="App">
      {thing}
    </div>
  );
  console.dir(result);
  console.dir(result.children);
  return result;
}

export default App;
