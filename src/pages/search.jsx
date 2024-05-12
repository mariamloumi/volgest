import React, { useState } from 'react';
import '../assets/fonts/form.css'
import axios from '../services/ClientApi';
import { Link } from 'react-router-dom';



const FlightSearchForm = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const searchData = {
        origin: origin,
        dest: destination,
        departureDate: departureDate,
        returnDate: returnDate,
        passengers: passengers
      };
      console.log(searchData);
      const response = await axios.get(`vols/searchVol?origine=${searchData.origin}&destination=${searchData.dest}&date_depart=${searchData.departureDate}&date_arrivee=${searchData.returnDate}`, { params: searchData });
      console.log(`http://localhost:8080/vols/searchVol?origine=${searchData.origin}&destination=${searchData.dest}&date_depart=${searchData.departureDate}&date_arrivee=${searchData.returnDate}`);
      console.log('status',response);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while searching for flights.');
    }
  };


  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div  >
          <label htmlFor="origin">Origin:</label>
          <input
            type="text"
            id="origin"
            className="form-control"
            value={origin}
            onChange={(event) => setOrigin(event.target.value)}
          />
        </div>
        <div >
          <label htmlFor="destination">Destination:</label>
          <input
            type="text"
            id="destination"
            className="form-control"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
          />
        </div>
        <div  >
          <label htmlFor="departure-date">Departure Date:</label>
          <input
            type="date"
            id="departure-date"
            className="form-control"
            value={departureDate}
            onChange={(event) => setDepartureDate(event.target.value)}
          />
        </div>
        <div  >
          <label htmlFor="return-date">Return Date:</label>
          <input
            type="date"
            id="return-date"
            className="form-control"
            value={returnDate}
            onChange={(event) => setReturnDate(event.target.value)}
          />
        </div>
        <div  >
          <label htmlFor="passengers">Passengers:</label>
          <select
            id="passengers"
            className="form-control"
            value={passengers}
            onChange={(event) => setPassengers(parseInt(event.target.value))}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      {searchResults.length > 0 && (
        <div className="search-results-container">
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((result) => (
              <li key={result.volId}>
                {result.volId}
              Flight Number: {result.numero_vol} - Departure: {result.date_depart} - Arrival: {result.arriv_time} <Link to={{pathname:`/Booking/${result.volId}` }}>Reserver</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FlightSearchForm;