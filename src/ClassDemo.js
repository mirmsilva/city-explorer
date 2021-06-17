import axios from 'axios';
import React from 'react';

class ClassDemo extends React.Component{
  constructor(props){
    super(props);

    this.state={};
  }

  onFormSubmit = async (e) =>{
    e.preventDefault();

    let pictureData = await axios.get ('url here')
    this.setState({
      pictures:pictureData.data
    })
  }
  
  render(){
    return(
      <>
        <h2>Pretty Pictures</h2>
        <form>
          <input id= 'query'/>
          <input type ="submit" value= "Search for Pictures"/>
          {this.state.pictures ? 
          this.state.pictures.map(picture=> <img key={picture.urls.full} src={picture.urls.thumb} alt={picture.description}/>)
        :''}
        </form>
      </>
    )
  }
}

export default ClassDemo;