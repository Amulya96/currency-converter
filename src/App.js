import React, { PureComponent } from 'react';
import './App.css';
import Layout from './components/layout/Layout';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return <Layout />;
  }
}

export default App;
