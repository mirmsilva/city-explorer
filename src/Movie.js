import React from 'react';
import { Card } from 'react-bootstrap';

class Movie extends React.Component{

  render(){
    return(
      <>
      {this.props.movieData.splice(0,3).map((m,idx)=>{
        return(
          <Card style ={{width:'18rem'}}>
            <Card.Title>{m.title}</Card.Title>
            <Card.Text>Received: {m.vote_count} votes</Card.Text>
            <Card.Text>{m.overview}</Card.Text>
          </Card>)
      })}
      </>
    )
  }
}

export default Movie;