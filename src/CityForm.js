import axios from 'axios';
import React from 'react';
import { Card, Container, Form, Button } from 'react-bootstrap';

import Weather from './Weather';
import Movie from './Movie';


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
    const key = process.env.REACT_APP_LOCATION_IQ;

    let URL = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${this.state.city}&format=json`;

    const response = await axios.get(URL);
    
    const cityInfo = response.data[0];
    console.log(cityInfo);

    let displayName = cityInfo.display_name;
    let cityLat = cityInfo.lat;
    let cityLon = cityInfo.lon;
    
    this.setState({displayName, cityLat, cityLon});

    //Get Weather Info
    let weatherInfo = await axios.get(`http://localhost:3001/weather?lat=${this.state.cityLat}&lon=${this.state.cityLon}`);
    this.setState({weatherInfo});

    //Get Movie Info
    let movieInfo = await axios.get(`http://localhost:3001/movie?city_name=${this.state.city}`)
    this.setState({movieInfo});

    this.showMap();
    }
    catch(err){
      console.log('err.message');
      this.setState({errorCode: err.message})
    }
  }

  showMap = (e) =>{
    const key = process.env.REACT_APP_LOCATION_IQ;
    let URL = `https://maps.locationiq.com/v3/staticmap?key=${key}&center=${this.state.cityLat},${this.state.cityLon}&zoom=18`;
    this.setState({cityMap:URL});
  }


  render(){
    return(
      <>
      <Container>
        <Form onSubmit = {this.handleSubmit}>
          <Form.Group controlId = "cityForm">
            <Form.Label>Enter City Name Below:</Form.Label>
            <Form.Control type = "text" placeholder = "city name" onChange = {this.handleChange}/> 
          </Form.Group>
          <Button variant = "primary" type = "submit">
            Explore!
          </Button> 
        </Form>
        </Container>
        {this.state.errorCode.length>0?
        <Container>
          <p>{this.state.errorCode}</p>
        </Container>
        :
        <Card>
          <ul>
            <li>City Name: {this.state.displayName}</li>
            <li>Latitude: {this.state.cityLat}</li>
            <li>Longitude: {this.state.cityLon}</li>
          </ul>
        </Card>
        }
        <Card style={{width:'30rem'}}>
          <Card.Img variant="top" src ={this.state.cityMap}/>
        </Card>
        <Weather
        weatherData={this.state.weatherInfo.data}
        />
        <Movie 
        movieData={this.state.movieInfo.data}
        />
      </>
    )
  }
}

export default CityForm;