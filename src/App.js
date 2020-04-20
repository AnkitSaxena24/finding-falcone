import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home/homeComponent';
import Header from './components/Header/headerComponent';
import Footer from './components/Footer/footerComponent';
import About from './components/About/aboutComponent';
import Result from './components/Result/resultComponent';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <section>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/about-project' component={About} />
            <Route exact path='/result' component={Result} />
          </Switch>
        </section>
        <Footer />
      </div>
    )
  }
}
