import React from 'react';
import { Card } from 'react-bootstrap';

import Movie from './Movie';

class Movies extends React.Component{

  render(){
    return(
      <>
      <Movie movieData ={this.props.movieData} />
      </>
    )
  }
}

export default Movies;