import React from 'react';
import './App.css';

class App extends React.Component {
  render() {
    let thing = <div>Hello</div>;
    let result = (
      <div className="App">
        {thing}
      </div>
    );
    return result;
  }
}

export default App;
