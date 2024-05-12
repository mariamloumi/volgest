import React, { useState, useEffect } from 'react';
import axios from '../services/ClientApi';
import '../assets/fonts/FlightInfo.css';
import { useParams }from 'react-router-dom';

const BookingForm = () => {
  let { volId } = useParams();
  const [flightDetails, setFlightDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for passenger information
  const [passengerInfo, setPassengerInfo] = useState([
    {
      givenName: '',
      surname: '',
    },
  ]);

  // State for contact information
  const [contactInfo, setContactInfo] = useState({
    contactName: '',
    email: '',
    mobilePhone: '',
  });

  // State for promo code
  const [promoCode, setPromoCode] = useState('');

  // State for total price
  const [totalPrice, setTotalPrice] = useState(0);

  // Handler for changes in passenger information
  const handlePassengerInfoChange = (index, field, value) => {
    setPassengerInfo((prevInfo) => {
      const newInfo = [...prevInfo];
      newInfo[index][field] = value;
      return newInfo;
    });
  };

  // Handler for adding a new passenger
  const handleAddPassenger = () => {
    setPassengerInfo((prevInfo) => [...prevInfo, {
      givenName: '',
      surname: '',
    }]);
    setTotalPrice(prevTotalPrice => prevTotalPrice + flightDetails.tarif);
  };

  // Handler for removing a passenger
  const handleRemovePassenger = (index) => {
    setPassengerInfo((prevInfo) => {
      const newInfo = [...prevInfo];
      newInfo.splice(index, 1);
      return newInfo;
    });
    setTotalPrice(prevTotalPrice => prevTotalPrice - flightDetails.tarif);
  };

  // Handler for changes in contact information
  const handleContactInfoChange = (e) => {
    setContactInfo((prevContactInfo) => ({
      ...prevContactInfo,
      [e.target.name]: e.target.value,
    }));
  };

  // Handler for changes in promo code
  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  // Handler for form submission
  const handleSubmit = async () => {
    try {
      console.log('Passenger Info:', passengerInfo);
      console.log('Contact Info:', contactInfo);
      console.log('Promo Code:', promoCode);
      const response = await axios.post(`signup`, {
        fullName: contactInfo.contactName,
        email: contactInfo.email,
        mobilephone: contactInfo.mobilePhone,
      });
      console.log(response.data)
      const guestListString = passengerInfo.map(passenger => `${passenger.givenName}, ${passenger.surname}`).join('; ');


      // Create reservation
      const reservations = {
        num_tick: passengerInfo.length,
        totalPrice: totalPrice,
        guestList: guestListString,
      };
      console.log('try', reservations);
      const resp = await axios.post(`reservations/reservations/createreserv?volId=${volId}&passengerId=${response.data.num}`, reservations);

      console.log(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch flight details
  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        const response = await axios.get(`vols/vols/${volId}`);
        setFlightDetails(response.data);

        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchFlightDetails();
  }, []);

  // Set the initial total price
  useEffect(() => {
    if (flightDetails) {
      setTotalPrice(flightDetails.tarif);
    }
    setIsLoading(false);
  }, [flightDetails]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div id="main">
      <div className="m-booking-body ThemeColor8">
        <div className="flight-info">
          <h2>Flight Details</h2>
          {flightDetails && (
            <div>
              <p>Flight Number: {flightDetails.numero_vol}</p>
              <p>Departure date: {flightDetails.date_depart}</p>
              <p>Arrival date: {flightDetails.date_arrivee}</p>
              <p>Tarif {flightDetails.tarif}</p>
              <p>Departure time: {flightDetails.depart_time}</p>
              <p>Arrival time: {flightDetails.arriv_time}</p>
            </div>
          )}
        </div>

        <div className="m-booking-content">
          <div className="m-book-main is-book">
            <div className="m-booking-passenger">
              {/* Passenger Info */}
              <h2>Who is travelling</h2>
              {passengerInfo.map((passenger, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={passenger.givenName}
                    onChange={(e) => handlePassengerInfoChange(index, 'givenName', e.target.value)}
                    placeholder="Given Name"
                  />
                  <input
                    type="text"
                    value={passenger.surname}
                    onChange={(e) => handlePassengerInfoChange(index, 'surname', e.target.value)}
                    placeholder="Surname"
                  />
                  <button onClick={() => handleRemovePassenger(index)} className="remove-passenger-button">Remove Passenger</button>
                </div>
              ))}
              <button onClick={handleAddPassenger}>Add Passenger</button>

              {/* Contact Info */}
              <h2>Contact Information</h2>
              <input
                type="text"
                name="contactName"
                value={contactInfo.contactName}
                onChange={handleContactInfoChange}
                placeholder="Contact Name"
              />
              <input
                type="email"
                name="email"
                value={contactInfo.email}
                onChange={handleContactInfoChange}
                placeholder="Email"
              />
              <input
                type="text"
                name="mobilePhone"
                value={contactInfo.mobilePhone}
                onChange={handleContactInfoChange}
                placeholder="Mobile Phone"
              />

              {/* Promo Code */}
              <h2>Promo Code</h2>
              <input
                type="text"
                value={promoCode}
                onChange={handlePromoCodeChange}
                placeholder="Enter Promo Code"
              />

              {/* Total Price */}
              <h2>Total Price: {totalPrice}</h2>

              {/* Submit Button */}
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;