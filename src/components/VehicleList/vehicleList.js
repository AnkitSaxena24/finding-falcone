import React, { Component } from 'react'

export default class VehicleList extends Component {

  state = {
    vehicleName: '',
    vehicleSpeed: 0,
    vehicleData: []
  }

  handleRadioChange = (e, speed) => {

    this.setState({ 
      vehicleSpeed: speed, 
      vehicleName: e.target.value  }, 
      () => this.calculateTimeTaken()
    );
  }

  calculateTimeTaken = () => {
    const { vehicleSpeed, vehicleName } = this.state;
    const { distance } = this.props;

    let timeTaken = distance/vehicleSpeed;

    this.props.time_taken(timeTaken);
    this.props.vehicle(vehicleName);
  }

  getVehicleListUI = () => {
    const { vehicle_list, distance } = this.props;
    const { vehicleName } = this.state;

    return <div>
      {vehicle_list && vehicle_list.map((data, index) => (
        <form key={index}>
          <label>
            <input
              disabled={distance > data.max_distance ? true : false}
              type="radio"
              name="vehicle-name"
              checked={vehicleName === data.name}
              value={data.name}
              className={`form-checked-input mr-1`}
              onChange={(e) => this.handleRadioChange(e, data.speed)}
            /> {`${data.name}`}
          </label>
        </form>
      ))}
    </div>
    
  }

  render() {
    const { vehicle_list } = this.props;
    
    return (
      <div>
        {vehicle_list && this.getVehicleListUI() }
      </div>
    )
  }
}
