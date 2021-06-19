import React from 'react';
import { Card } from 'react-bootstrap';

class WeatherDay extends React.Component{

  render(){
    return(
      <>
      <Card style ={{width:'18rem'}}>
        {this.props.weatherData.splice(0,1).map((w,idx)=>{
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