import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/headerComponent.css';

export default class headerComponent extends Component {
  render() {
    return (
      <div>
        <header className="mb-5">
          <nav>
            <div className="row">
              <div className="col-md-12">
                <img src="falcone-logo.png" alt="Falcone Logo" className="logo" />
                <ul className="main-nav">
                  <li><Link to='/'>Home</Link></li>
                  <li><Link to='/about-project'>About Project</Link></li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </div>
    )
  }
}
