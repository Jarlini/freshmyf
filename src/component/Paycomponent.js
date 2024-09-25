import React, { useEffect, useState } from 'react';
import { getPackages } from './Packageapi';

import './packegepage.css';

const PackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [cart, setCart] = useState([]);
  const [showAgreement, setShowAgreement] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    passengers: [{ name: '', age: '' }],
    numberOfPassengers: 1,
    address: '',
    email: '',
    phone: '',
    paymentMethod: 'Total Payment',
  });
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      const data = await getPackages();
      setPackages(data);
    };
    fetchPackages();
  }, []);

  // Function to handle adding/removing packages from the cart
  const handleCartToggle = (pkg) => {
    setCart((prev) => {
      if (prev.some((item) => item._id === pkg._id)) {
        return prev.filter((item) => item._id !== pkg._id);
      } else {
        return [...prev, pkg];
      }
    });
  };

  const handleAccept = () => {
    setShowAgreement(false);
    setShowBookingForm(true);
  };

  const handleBookingFormChange = (e, index) => {
    const { name, value } = e.target;
    if (name.startsWith('passenger-')) {
      const passengers = [...bookingData.passengers];
      passengers[index][name.split('-')[1]] = value;
      setBookingData({ ...bookingData, passengers });
    } else {
      setBookingData({ ...bookingData, [name]: value });
    }
  };

  const handlePassengerCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    const passengers = Array.from({ length: count }, () => ({ name: '', age: '' }));
    setBookingData({ ...bookingData, numberOfPassengers: count, passengers });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const totalAmount = cart.reduce((total, pkg) => total + (pkg.price * bookingData.numberOfPassengers), 0);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...bookingData,
          packageId: cart[0]._id,
          totalAmount,
        }),
      });
      if (response.ok) {
        alert('Booking successful!');
        setCart([]);
        setShowBookingForm(false);
      } else {
        alert('Booking failed!');
      }
    } catch (error) {
      alert('Error occurred while booking.');
    }
  };

  return (
    <div className="packages-container">
      {packages.map((pkg) => (
        <div key={pkg._id} className="package">
          <h2>{pkg.name}</h2>
          <p>{pkg.description}</p>
          <p>Price: Rs.{pkg.price}</p>
          <button onClick={() => handleCartToggle(pkg)}>
            {cart.some((item) => item._id === pkg._id) ? 'Remove from Cart' : 'Add to Cart'}
          </button>
        </div>
      ))}

      {/* Cart Display */}
      <div className="cart">
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((pkg) => (
              <li key={pkg._id}>{pkg.name} - Rs.{pkg.price}</li>
            ))}
          </ul>
        )}
        <button onClick={() => setShowAgreement(true)} disabled={cart.length === 0}>
          Proceed to Checkout
        </button>
      </div>

      {/* Agreement Modal */}
      {showAgreement && (
        <div className="agreement-modal">
          <div className="agreement-content">
            <h2>Agreement</h2>
            <p>
              By joining these trips, you agree to the following conditions:
              <ul>
                <li>No use of drugs or alcohol during the travel.</li>
                <li>No disturbance to other passengers.</li>
                <li>We reserve the right to take action if any rules are violated.</li>
              </ul>
            </p>
            <h3>Total Amount: Rs.{cart.reduce((total, pkg) => total + pkg.price, 0).toLocaleString()}</h3>
            <button className="accept-button" onClick={handleAccept}>Accept</button>
            <button className="cancel-button" onClick={() => setShowAgreement(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Booking Form */}
      {showBookingForm && (
        <div className="booking-form">
          <h2>Booking Form</h2>
          <form onSubmit={handleBookingSubmit}>
            <label>
              Number of Passengers:
              <input
                type="number"
                min="1"
                name="numberOfPassengers"
                value={bookingData.numberOfPassengers}
                onChange={handlePassengerCountChange}
              />
            </label>
            {bookingData.passengers.map((passenger, index) => (
              <div key={index}>
                <label>
                  Passenger Name:
                  <input
                    type="text"
                    name={`passenger-name-${index}`}
                    value={passenger.name}
                    onChange={(e) => handleBookingFormChange(e, index)}
                  />
                </label>
                <label>
                  Trip name:
                  <input
                    type="text"
                    name='trip-name'
                    value={bookingData.trip}
                    onChange={handleBookingFormChange}
                    required
                  />
                </label>
              </div>
            ))}
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={bookingData.address}
                onChange={handleBookingFormChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={bookingData.email}
                onChange={handleBookingFormChange}
              />
            </label>
            <label>
              Phone Number:
              <input
                type="tel"
                name="phone"
                value={bookingData.phone}
                onChange={handleBookingFormChange}
                required
              />
            </label>
            <label>
              Payment Method:
              <select
                name="paymentMethod"
                value={bookingData.paymentMethod}
                onChange={handleBookingFormChange}
              >
                <option value="Total Payment">Total Payment</option>
                <option value="Deposit">Deposit</option>
                <option value="Full Payment">Full Payment</option>
              </select>
            </label>
            <button type="submit">Submit Booking</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PackagesPage;
