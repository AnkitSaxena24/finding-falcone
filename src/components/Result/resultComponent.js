import React, { Component } from 'react'
import { connect } from 'react-redux';
import './css/resultComponent.css';
import { Link } from 'react-router-dom';

import FalconeHeader from '../FalconeHeader/falconeHeader';

class Result extends Component {

  successUI = () => {
    const { planet_name, time_taken } = this.props;
    return <>
      <h1>Success! Congratulations on Finding Falcone. King Shan is mighty Pleased</h1>
      <h3 className="mt-3">{`Time Taken: ${time_taken}`}</h3>
      <h3>{`Planet found: ${planet_name}`}</h3>
    </>
  }

  failureUI = () => {
    return <>
      <h1>Failure! Ooopppssss! Falcone couldn't be found anywhere. Try again.</h1>
    </>
  }

  render() {
    const { status} = this.props;
    console.log('props', this.props);
    return(
      <div className="container">
        <FalconeHeader />
        <div className="row">
          <div className="col-md-12 text-center mt-5 result-div">
            {!status ? <div>Fetching Result..</div> : status === 'success' ? this.successUI() : this.failureUI()}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <Link to='/'><button className="text-center" disabled={!status ? true : false}>Start Again!</button></Link>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    planet_name: state.FindFalconeReducer.planet_name, 
    status: state.FindFalconeReducer.status,
    time_taken: state.FindFalconeReducer.time_taken
  }
}

export default connect(mapStateToProps, null)(Result);

