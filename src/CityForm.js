import axios from 'axios';
import React from 'react';
import { Card, Container, Form, Button, ListGroup} from 'react-bootstrap';
// import axios from 'axios';


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
      weatherInfo:[]
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

    this.showMap();
    }
    catch(err){
      console.log('err.message');
      this.setState({errorCode: err.message})
    }
  }

  showMap = async (e) =>{
    const key = process.env.REACT_APP_LOCATION_IQ;

    let URL = `https://maps.locationiq.com/v3/staticmap?key=${key}&center=${this.state.cityLat},${this.state.cityLon}&zoom=18`;

    this.setState({cityMap:URL})
  }

  showWeatherInfo = async (e) =>{
    let weatherInfo = await axios.get(`http://localhost:3001/weather?lat=${this.state.cityLat}&lon=${this.state.cityLon}&searchQuery=${this.state.displayName.split(',')[0]}`);

    this.setState({
      weatherInfo:weatherInfo.data
    });
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
          <h3>Weather Data Goes Here!</h3>
          {this.state.weatherInfo.map((weather,i) => 
          <ListGroup.Item key ={i}>
          <h3>{weather.date}</h3>
          <p>{weather.description}</p>
          </ListGroup.Item>)}
      </>
    )
  }
}

export default CityForm;