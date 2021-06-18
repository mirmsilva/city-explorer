import React from 'react';
import { Card } from 'react-bootstrap';

class Movie extends React.Component{

  render(){
    return(
      <>
      <Card style ={{width:'18rem'}}>
      <h2>This is where my movie cards go</h2>
      {this.props.movieData.map((m,idx)=>{
        return(
          <ul>
            <li>{m.title}</li>
            <li>overview:{m.overview}</li>
            <li>vote avg:{m.vote_average}</li>
            <li>vote count:{m.vote_count}</li>
          </ul>)
      })}
      </Card>
      </>
    )
  }
}

export default Movie;