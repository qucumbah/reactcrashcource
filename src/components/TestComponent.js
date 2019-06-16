import React from 'react';

class TestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {n: 2};
    console.log(this);
  }

  render() {
    let n = +this.state.n;
    return (
      <input type="text" value={n} onChange={e=>this.setState({n: e.target.value})}/>
    );
  }
}

export default TestComponent;
