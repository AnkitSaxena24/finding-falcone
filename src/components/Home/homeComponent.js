import React, { Component } from 'react';
import './css/homeComponent.css';
import Select from 'react-select';
import {
  getPlanets,
  getVehicles,
  getAPIToken,
  findFalcone
} from "../../actions/findFalconeAction";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FalconeHeader from '../FalconeHeader/falconeHeader';
import Vehicles from '../VehicleList/vehicleList';

class FindFalcone extends Component {

  state = {
    token: '',
    time_taken: 0,
    distance: 0,
    destination_1: '',
    destination_2: '',
    destionation_3: '',
    destination_4: '',
    vehicle_1: '',
    vehicle_2: '',
    vehicle_3: '',
    vehicle_4: '',
    destination1Object: '',
    destination2Object: '',
    destination3Object: '',
    destination4Object: '',
    planetList2: [],
    planetList3: [],
    planetList4:[]
  }

  componentDidMount() {
    this.props.getVehicles();
    this.props.getPlanets();
    this.props.getAPIToken();
  } 

  getVehicle1 = vehicle => this.setState({ vehicle_1 : vehicle });
  getVehicle2 = vehicle => this.setState({ vehicle_2 : vehicle });
  getVehicle3 = vehicle => this.setState({ vehicle_3 : vehicle });
  getVehicle4 = vehicle => this.setState({ vehicle_4 : vehicle });

  //Calculate total time taken
  totalTimeTaken = time => {
    this.setState(prevState => {
      return {
        time_taken: prevState.time_taken + time
      }
    });
  }

  //Manipulating planets data
  makePlanetDropdownData = data => {
    let finalPlanetData = [];
    
    data.map((planet_name, index) => {
      finalPlanetData.push({
        label: planet_name.name,
        name: planet_name.name,
        distance: planet_name.distance,
        id: index
      })
    });

    return finalPlanetData;
  }

  //Filter planet list
  filterPlanetsList = (value, planet_list) => {
    let finalPlanetList = planet_list.filter(planet => planet.name !== value.name);
    return finalPlanetList
  }

  //Making dropdown list for Destination 1
  handleDestination1Data = planets_data => {
    let firstDestinationData = this.makePlanetDropdownData(planets_data);
    return firstDestinationData;
  }

  //Making dropdown list for Destination 2
  handleDestination2Data = planets_data => {
    let secondDestinationData = this.makePlanetDropdownData(planets_data);
    return secondDestinationData;
  }

  //Making dropdown list for Destination 3
  handleDestination3Data = planets_data => {
    let thirdDestinationData = this.makePlanetDropdownData(planets_data);
    return thirdDestinationData;
  }

  //Making dropdown list for Destination 4
  handleDestination4Data = planets_data => {
    let fourthDestinationData = this.makePlanetDropdownData(planets_data);
    return fourthDestinationData;
  }

  //Setting value for planet 1
  handlePlanet1Value = val => {
    const { planets } = this.props;
    let finalData = val !== null ? this.filterPlanetsList(val, planets) : '';

    if(val && val.name) {
      this.setState({ 
        destination_1: val.name,
        destination1Object: val,
        planetList2: finalData
      })
    } else {
      this.setState({
        destination_1: '',
        destination1Object: null,
        planetList2: []
      })
    }
  }

  //Setting value for planet 2
  handlePlanet2Value = val => {
    const { planetList2 } = this.state;
    let finalData = val !== null ? this.filterPlanetsList(val, planetList2) : '';

    if(val && val.name) {
      this.setState({ 
        destination_2: val.name,
        destination2Object: val,
        planetList3: finalData
      })
    } else {
      this.setState({
        destination_2: '',
        destination2Object: null,
        planetList3: []
      })
    }
  }

  //Setting value for planet 3
  handlePlanet3Value = val => {
    const { planetList3 } = this.state;
    let finalData = val !== null ? this.filterPlanetsList(val, planetList3) : '';

    if(val && val.name) {
      this.setState({ 
        destination_3: val.name,
        destination3Object: val,
        planetList4: finalData
      })
    } else {
      this.setState({
        destination_3: '',
        destination3Object: null,
        planetList4: []
      })
    }
  }

  //Setting value for planet 4
  handlePlanet4Value = val => {
    if(val && val.name) {
      this.setState({ 
        destination_4: val.name,
        destination4Object: val
      })
    } else {
      this.setState({
        destination_4: '',
        destination4Object: null
      })
    }
  }

  findFalconeResult = () => {
    this.props.history.push('/result');
  }

  prepareFinalData = () => {

    const { destination_1, 
      destination_2, 
      destination_3, 
      destination_4,
      vehicle_1, 
      vehicle_2,
      vehicle_3,
      vehicle_4, 
      time_taken
    } = this.state;

    const { token } = this.props;
    
    let finalData = {};
    finalData['token'] = token.token;
    finalData['planet_names'] = [destination_1, destination_2, destination_3, destination_4];
    finalData['vehicle_names'] = [vehicle_1, vehicle_2, vehicle_3, vehicle_4];

    this.props.findFalcone(finalData, time_taken);
    this.findFalconeResult();
  }

  render() {
    const { time_taken, 
      destination1Object, 
      destination2Object, 
      destination3Object, 
      destination4Object,
      planetList2,
      planetList3,
      planetList4,
      vehicle_1,
      vehicle_2,
      vehicle_3,
      vehicle_4
    } = this.state;

    const { planets, vehicles } = this.props;

    return (
      <div className="container-fluid pl-4 pr-4">
        <FalconeHeader />
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-12 pt-2">
                <h2 className="font-weight-bold">Select planets you want to search in:</h2>
              </div>
            </div>
            <div className="row destionation-column">
              <div className="col-md-3 mt-3">
                <h5>Destination 1</h5>
                <div className="row">
                  <div className="col-md-12 mt-2">
                    <Select 
                      isSearchable={true}
                      isClearable={true}
                      options={this.handleDestination1Data(planets)}
                      onChange={(e) => this.handlePlanet1Value(e)}
                      value={destination1Object}
                      auto
                      required
                      closeOnSelect={true}
                      placeholder="Choose Planet..."
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-3">
                    {destination1Object && destination1Object !== null ? 
                      <Vehicles 
                        vehicle={this.getVehicle1}
                        time_taken={this.totalTimeTaken}
                        vehicle_list={vehicles}
                        distance={destination1Object.distance ? destination1Object.distance : ''}
                      /> : ''
                    }
                  </div>
                </div>
              </div>
              <div className="col-md-3 mt-3">
                <h5>Destination 2</h5>
                <div className="row">
                  <div className="col-md-12 mt-2">
                    <Select 
                      isSearchable={true}
                      isClearable={true}
                      isDisabled={vehicle_1 === '' || vehicle_1 === null || destination1Object === null ? true : false}
                      options={this.handleDestination2Data(planetList2)}
                      onChange={(e) => this.handlePlanet2Value(e)}
                      value={destination2Object}
                      auto
                      required
                      closeOnSelect={true}
                      placeholder="Choose Planet..."
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-3">
                    {destination2Object && destination2Object !== null ? 
                      <Vehicles 
                        vehicle={this.getVehicle2}
                        time_taken={this.totalTimeTaken}
                        vehicle_list={vehicles}
                        distance={destination2Object.distance ? destination2Object.distance : ''}
                      /> : ''
                    }
                  </div>
                </div>
              </div>
              <div className="col-md-3 mt-3">
                <h5>Destination 3</h5>
                <div className="row">
                  <div className="col-md-12 mt-2">
                    <Select 
                      isSearchable={true}
                      isClearable={true}
                      isDisabled={vehicle_2 === '' || vehicle_2 === null || destination2Object === null ? true : false}
                      options={this.handleDestination3Data(planetList3)}
                      onChange={(e) => this.handlePlanet3Value(e)}
                      value={destination3Object}
                      auto
                      required
                      closeOnSelect={true}
                      placeholder="Choose Planet..."
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-3">
                    {destination3Object && destination3Object !== null ? 
                      <Vehicles
                        vehicle={this.getVehicle3} 
                        time_taken={this.totalTimeTaken}
                        vehicle_list={vehicles}
                        distance={destination3Object.distance ? destination3Object.distance : ''}
                      /> : ''
                    }
                  </div>
                </div>
              </div>
              <div className="col-md-3 mt-3">
                <h5>Destination 4</h5>
                <div className="row">
                  <div className="col-md-12 mt-2">
                    <Select 
                      isSearchable={true}
                      isClearable={true}
                      isDisabled={vehicle_3 === '' || vehicle_3 === null || destination3Object === null ? true : false}
                      options={this.handleDestination4Data(planetList4)}
                      onChange={(e) => this.handlePlanet4Value(e)}
                      value={destination4Object}
                      auto
                      required
                      closeOnSelect={true}
                      placeholder="Choose Planet..."
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-3">
                    {destination4Object && destination4Object !== null ? 
                      <Vehicles
                        time_taken={this.totalTimeTaken}
                        vehicle={this.getVehicle4}
                        vehicle_list={vehicles}
                        distance={destination4Object.distance ? destination4Object.distance : ''}
                      /> : ''
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-center">
                <button 
                  className="submit-button mt-5" 
                  disabled={vehicle_4 !== '' || destination4Object === null ? false : true}
                  onClick={()=>this.prepareFinalData()}
                >
                  Find Falcone!
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-12 text-center pt-3">
                <h2 className="font-weight-bold">Time Taken:</h2>
                <br />
                <h1 className="font-weight-light">{time_taken}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    planets: state.FindFalconeReducer.planets,
    vehicles: state.FindFalconeReducer.vehicles,
    token: state.FindFalconeReducer.token
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getPlanets,
    getVehicles,
    getAPIToken,
    findFalcone
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FindFalcone);
