import React, { Component } from 'react';
import './css/footerComponent.css';

export default class footerComponent extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <footer className="d-flex pl-3 pr-3">
            <span>Copyright © 2020</span>
            <span>Finding Falcone - All Rights Reserved</span> 
          </footer>
        </div>
      </div>
    )
  }
}
