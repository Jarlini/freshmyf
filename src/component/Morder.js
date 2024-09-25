import React, { useEffect, useState } from 'react';
import api from './Api'; // Adjust the path as necessary

const MOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders'); // Adjust the API endpoint accordingly
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    try {
      await api.delete(`/orders/${orderId}`); // Adjust the API endpoint accordingly
      setOrders((prev) => prev.filter(order => order._id !== orderId)); // Update the local state
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className="manage-orders">
      <h2>Manage Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Passenger Name</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.passengerName}</td>
                <td>Rs.{order.totalAmount}</td>
                <td>
                  <button onClick={() => handleDelete(order._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MOrder;
