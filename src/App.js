import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Header';
import CityForm from './CityForm';
import Footer from './Footer';

class App extends React.Component {

  render() {
    return (
      <>
        <Header />
        <CityForm />
        <Footer/>
      </>
    )
  }

}

export default App;
