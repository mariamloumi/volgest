import React, { Component } from 'react';
import axios from '../services/volApi';
import FlightForm from '../components/FlightForm';
import '../assets/fonts/styles.css';

class Flights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [],
      showForm: false,
      selectedFlight: null,
    };
  }

  componentDidMount() {
    axios.get('vols')
      .then(response => {
        this.setState({
          flights: response.data,
        });
      })
      .catch(error => {
        console.error('Error fetching flights:', error);
      });
  }

  handleCreate = () => {
    this.setState({
      showForm: true,
      selectedFlight: {
        numero_vol: '',
        date_depart: new Date(),
        depart_time: '',
        date_arrivee: new Date(),
        arriv_time: '',
        origine: '',
        destination: '',
        compagnie_aerienne: '',
        type_avion: '',
        nb_sieges_dispo: '',
        tarif: '',
      },
    });
  };

  handleSave = async (flight) => {
    if (flight.volId) {
      try {
        await axios.put(`vols/updateVol/${flight.volId}`, flight);
        console.log('Flight updated:', flight);
        // Handle successful save
        alert('Flight updated successfully');
      } catch (error) {
        console.error('Error updating flight:', error);
        // Handle error
        alert('Error updating flight: ' + error.message);
      }
      // Update existing flight
      const updatedFlights = this.state.flights.map(f => f.volId === flight.volId ? flight : f);
      this.setState({
        flights: updatedFlights,
      });
    } else {
      try {
        console.log('Flight to saved:', flight);
        await axios.post(`vols/addVol`, flight);
        console.log('Flight saved:', flight);
        // Handle successful save
        alert('Flight saved successfully');
      } catch (error) {
        console.error('Error saving flight:', error);
        // Handle error
        alert('Error saving flight: ' + error.message);
      }
      // Add new flight
      this.setState({
        flights: [...this.state.flights, flight],
      });
    }
    this.setState({
      showForm: false,
    });
  };

  handleCancel = () => {
    this.setState({
      showForm: false,
    });
  };

  handleEdit = (flight) => {
    this.setState({
      selectedFlight: flight,
      showForm: true,
    });
  };



  handleDelete = async (flight) => {
    if (window.confirm(`Are you sure you want to cancel this  flight ${flight.numero_vol}?`)) {
      try {
        await axios.put(`vols/deleteVol/${flight.volId}`);
        const updatedFlights = this.state.flights.filter(f => f.volId !== flight.volId);
        this.setState({
          flights: updatedFlights,
        });
        alert('Flight cancelled successfully');
      } catch (error) {
        console.error('Error cancelling flight:', error);
        alert('Error deleting flight: ' + error.message);
      }
    }
  };
  

  render() {
    return (
      <div>
        <h2>Manage Flights</h2>
        <button onClick={this.handleCreate}>Create New Flight</button>
        {this.state.showForm && (
          <div className="modal">
            <FlightForm
              flight={this.state.selectedFlight}
              onSave={this.handleSave}
              onCancel={this.handleCancel}
            />
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>Departure City</th>
              <th>Arrival City</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Date of Travel</th>
              <th>status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.flights.map(flight => (
              <tr key={flight.volId}>
                <td>{flight.numero_vol}</td>
                <td>{flight.origine}</td>
                <td>{flight.destination}</td>
                <td>{flight.depart_time}</td>
                <td>{flight.arriv_time}</td>
                <td>{flight.date_depart}</td>
                <td>{flight.status}</td>
                <td>
                  <button onClick={() => this.handleEdit(flight)}>Edit</button>
                  <button onClick={() => this.handleDelete(flight)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Flights;
