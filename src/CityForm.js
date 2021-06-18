import axios from 'axios';
import React from 'react';
import { Card, Form, Button, CardColumns } from 'react-bootstrap';

import Weather from './Weather';
import Movies from './Movies';
import Map from './Map';

//Global Keys
const key = process.env.REACT_APP_LOCATION_IQ;

class CityForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      city: '',
      cityLat:'',
      cityLon:'',
      displayName: '',
      cityMap:'', 
      errorCode:'',
      weatherInfo:{data:[]},
      movieInfo:{data:[]}
    };
  }
  
  handleChange = (e) =>{
    this.setState({city: e.target.value})
  }

  handleSubmit = async (e) =>{
    e.preventDefault();

    try{
    let cityLatLon = await axios.get (`https://us1.locationiq.com/v1/search.php?key=${key}&q=${this.state.city}&format=json`);
    
    const cityInfo = cityLatLon.data[0];
    console.log(cityInfo);

    let displayName = cityInfo.display_name;
    let cityLat = cityInfo.lat;
    let cityLon = cityInfo.lon;
    
    this.setState({displayName, cityLat, cityLon});
    //Get City Map
    let cityMap = (`https://maps.locationiq.com/v3/staticmap?key=${key}&center=${this.state.cityLat},${this.state.cityLon}&zoom=18`);

    this.setState({cityMap});

    //Get Weather Info
    let weatherInfo = await axios.get(`http://localhost:3001/weather?lat=${this.state.cityLat}&lon=${this.state.cityLon}`);
    this.setState({weatherInfo});

    //Get Movie Info
    let movieInfo = await axios.get(`http://localhost:3001/movie?city_name=${this.state.city}`)
    this.setState({movieInfo});

    }catch(err){
      console.log('err.message');
      this.setState({errorCode: err.message})
    }
  }


  render(){
    return(
      <>
      <Card sytle={{width:'18rem'}}>
        <Form onSubmit = {this.handleSubmit}>
          <Form.Group controlId = "cityForm">
            <Form.Label>Enter City Name Below:</Form.Label>
            <Form.Control type = "text" placeholder = "city name" onChange = {this.handleChange}/> 
          </Form.Group>
          <Button variant = "primary" type = "submit">
            Explore!
          </Button> 
        </Form>
        </Card>
        {this.state.errorCode.length>0?
          <Card sytle={{width:'18rem'}}>
          <p>{this.state.errorCode}</p>
        </Card>
        :
        <Card sytle={{width:'18rem'}}>
          <ul>
            <li>City Name: {this.state.displayName}</li>
            <li>Latitude: {this.state.cityLat}</li>
            <li>Longitude: {this.state.cityLon}</li>
          </ul>
        </Card>
        }
        <CardColumns>
        <Map showMap = {this.state.cityMap} />
        <Weather weatherData={this.state.weatherInfo.data} />
        <Movies movieData={this.state.movieInfo.data} />
        </CardColumns>
      </>
    )
  }
}

export default CityForm;