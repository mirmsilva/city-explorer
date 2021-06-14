import axios from 'axios';
import React from 'react';
import { Container, Form, Button} from 'react-bootstrap';
// import axios from 'axios';


class CityForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      city: '',
      cityLat:'',
      cityLon:'',
      displayName: ''
    };
  }
  
  handleChange = (e) =>{
    this.setState({city: e.target.value})
  }

  handleSubmit = async (e) =>{
    e.preventDefault();

    const key = process.env.REACT_APP_LOCATION_IQ;

    let URL = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${this.state.city}&format=json`;

    const response = await axios.get(URL);

    const cityInfo = response.data[0];
    console.log(cityInfo);

    let displayName = cityInfo.display_name;
    let cityLat = cityInfo.lat;
    let cityLon = cityInfo.lon;
    
    this.setState({displayName, cityLat, cityLon});

    console.log(cityInfo);
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
            Submit
          </Button> 
        </Form>
        <h3>{this.state.displayName}</h3>
        <h3>Latitude: {this.state.cityLat}</h3>
        <h3>Longitude: {this.state.cityLon}</h3>
      </Container>
      </>
    )
  }
}

export default CityForm;