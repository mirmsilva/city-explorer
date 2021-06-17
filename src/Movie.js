import React from 'react';
import { Container } from 'react-bootstrap';

class Movie extends React.Component{

  render(){
    return(
      <>
      <Container>
      <h2>This is where my movie info goes!</h2>
      {this.props.movieData.map((m,idx)=>{
        return(
          <ul>
            <li>{m.title}</li>
            <li>overview:{m.overview}</li>
            <li>vote avg:{m.vote_average}</li>
            <li>vote count:{m.vote_count}</li>
          </ul>)
      })}
      </Container>
      </>
    )
  }
}

export default Movie;