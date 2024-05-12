import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';


const Home = () => {
 

  return (
    <header className="App-header">
      <img src="Aerotrip-logo.png" alt="Aerotrip logo" className="App-logo" style={{ borderRadius: '50%' }}/>
      <h1>Welcome to Aerotrip!</h1>
      <p>The best way to travel to Tunisia and beyond.</p>
      <Link to='search' className="App-button" >Book Now</Link>
    
      <main>
        <section className="destinations">
          <h2>Top Destinations</h2>
          <ul>
            <li>Tunis</li>
            <li>Djerba</li>
            <li>Sousse</li>
            <li>Hammamet</li>
            <li>Monastir</li>
          </ul>
        </section>
        <section className="flights">
          <h2>Latest Flights</h2>
          <ul>
            <li>Tunis - Paris: 12:00 PM</li>
            <li>Djerba - London: 3:00 PM</li>
            <li>Sousse - Rome: 6:00 AM</li>
            <li>Hammamet - Berlin: 9:00 AM</li>
            <li>Monastir - Madrid: 11:00 AM</li>
          </ul>
        </section>
      </main>
    </header>
  );
}

export default Home;
