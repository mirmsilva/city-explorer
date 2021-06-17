import React from 'react';
import { Container } from 'react-bootstrap';

class Weather extends React.Component{

  render(){
    return(
      <>
      <Container>
      <h2>This Is The Forecast!</h2>
        {this.props.weatherData.map((w,idx)=>{
          return(
          <ul>
            <li>Date: {w.date}</li>
            <li>{w.description}</li>
            <li>Low of: {w.lowTemp} Degrees</li>
            <li>High of: {w.highTemp} Degrees</li>
          </ul>)
        })}
        </Container>
      </>
    )
  }
}

export default Weather;