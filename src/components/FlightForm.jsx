import React, { useState } from 'react';
import '../assets/fonts/styles.css';

const FlightForm = ({ flight: initialFlight, onSave, onCancel }) => {
  const [flight, setFlight] = useState(initialFlight);
  const [departdate, setDepartdate] = useState(new Date(initialFlight.date_depart));
  const [arrivdate, setArrivdate] = useState(new Date(initialFlight.date_depart));
  const [departureTime, setDepartureTime] = useState(initialFlight.depart_time || '00:00:00');
  const [arrivalTime, setArrivalTime] = useState(initialFlight.arriv_time || '00:00:00');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFlight({ ...flight, [name]: value });
  };

  const handleDepartDateChange = (event) => {
    setDepartdate(event.target.value);
    setFlight({ ...flight, date_depart: event.target.value });
  };
  const handleArrivDateChange = (event) => {
    setArrivdate(event.target.value);
    setFlight({ ...flight, date_depart: event.target.value });
  };

  const handleDepartureTimeChange = (event) => {
    setDepartureTime(event.target.value);
    setFlight({ ...flight, depart_time: event.target.value });
  };

  const handleArrivalTimeChange = (event) => {
    setArrivalTime(event.target.value);
    setFlight({ ...flight, arriv_time: event.target.value });
  };

 
  return (
    <form>
      <label htmlFor="number">Flight Number:</label>
      <input
        type="text"
        id="number"
        name="numero_vol"
        value={flight.numero_vol}
        onChange={handleInputChange}
      />
      <label htmlFor="departureDate">Departure Date:</label>
      <input type="date" id="departureDate" name="date_depart" value={departdate} onChange={handleDepartDateChange} />
      <label htmlFor="departureTime">Departure Time:</label>
      <input type="time" id="departureTime" name="depart_time" value={departureTime} onChange={handleDepartureTimeChange} step="1" />
      <label htmlFor="arrivalDate">Arrival Date:</label>
      <input type="date" id="arrivalDate" name="arriv_date" value={arrivdate} onChange={handleArrivDateChange} />
      <label htmlFor="arrivalTime">Arrival Time:</label>
      <input type="time" id="arrivalTime" name="arriv_time" value={arrivalTime} onChange={handleArrivalTimeChange} step="1" />

      <label htmlFor="origin">Origin:</label>
      <input
        type="text"
        id="origin"
        name="origine"
        value={flight.origine}
        onChange={handleInputChange}
      />
      <label htmlFor="destination">Destination:</label>
      <input
        type="text"
        id="destination"
        name="destination"
        value={flight.destination}
        onChange={handleInputChange}
      />
      <label htmlFor="airline">Airline:</label>
      <input
        type="text"
        id="airline"
        name="compagnie_aerienne"
        value={flight.compagnie_aerienne}
        onChange={handleInputChange}
      />
      <label htmlFor="aircraftType">Aircraft Type:</label><input
        type="text"
        id="aircraftType"
        name="type_avion"
        value={flight.type_avion}
        onChange={handleInputChange}
      />
      <label htmlFor="availableSeats">Available Seats:</label>
      <input
        type="number"
        id="availableSeats"
        name="nb_sieges_dispo"
        value={flight.nb_sieges_dispo}
        onChange={handleInputChange}
      />
      <button type="button" onClick={() => onSave(flight)}>
        Save
      </button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default FlightForm;