import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
// import logo from './logo.svg';
import $ from 'jquery';

import 'foundation-sites/dist/css/foundation.min.css';
import './App.css';
import 'foundation-sites';

import Menu from './components/Menu';
import Dashboard from './components/Dashboard';
import Rentals from './components/Rentals';
import Leads from './components/Leads';
import LeadDetails from './components/LeadDetails';
import Landlords from './components/Landlords';
import LandlordDetails from './components/LandlordDetails';

window.$ = window.jQuery = $;
$(document).foundation();


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="off-canvas position-left" id="offCanvasLeft" data-off-canvas>
            1231212121
          </div>
          <div className="grid-container off-canvas-content" data-off-canvas-content>
            <div className="grid-x grid-margin-x">
              <div className="shrink cell show-for-medium">
                <Menu />
              </div>
              <div className="auto cell content-pane">
                <Route exact path="/" component={Dashboard} />
                <Route path="/rentals" component={Rentals} />
                <Route exact path="/leads" component={Leads} />
                <Route path="/leads/:id" component={LeadDetails} />
                <Route exact path="/landlords" component={Landlords} />
                <Route path="/landlords/:id" component={LandlordDetails} />
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
