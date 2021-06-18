import React from 'react';
import { Card } from 'react-bootstrap';

class WeatherDay extends React.Component{

  render(){
    return(
      <>
      <Card style ={{width:'18rem'}}>
      <h2>This Is The Forecast For One Day!</h2>
        {this.props.weatherData.map((w,idx)=>{
          return(
          <ul>
            <li>Date: {w.date}</li>
            <li>{w.description} with a low of: {w.lowTemp} Degrees & a high of {w.highTemp}</li>
          </ul>)
        })}
        </Card>
      </>
    )
  }
}

export default WeatherDay;