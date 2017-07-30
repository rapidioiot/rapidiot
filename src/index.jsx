import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import HomePage from './components/homepage.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
