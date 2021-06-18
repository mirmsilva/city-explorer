import React from 'react';
import { Card } from 'react-bootstrap';

class Map extends React.Component{

  render(){
    return(
      <>
      <Card style ={{width:'18rem'}}>
        <Card.Img src={this.props.showMap} alt ="city map" />
      </Card>
      </>
    )
  }
}

export default Map;