import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import getMuiTheme from 'material-ui/styles/getMuiTheme'; 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; 
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'; 

import registerServiceWorker from './registerServiceWorker';
import Component from 'react';
import HomePage from './components/HomePage.jsx';
import List from './components/List.jsx';
import NodeDeets from './components/NodeDeets.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <Router>
            <div>
              <Route exact path='/' component={ HomePage }/>
              <Route path='/NodeDeets' component={ NodeDeets }/> 
            </div>
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
