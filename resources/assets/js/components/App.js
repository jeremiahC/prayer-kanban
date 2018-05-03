import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';
import Content from './Content';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Content />
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
