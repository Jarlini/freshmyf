import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useLocation } from 'react-router-dom';

const PaymentComponent = () => {
  const location = useLocation();
  const { packages, totalAmount } = location.state || { packages: [], totalAmount: 0 };

  const handleApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      alert(`Transaction completed by ${details.payer.name.given_name}`);
      // Call your backend to save the transaction details
      // Example: await saveTransaction({ packages, transactionId: details.id });
    });
  };

  return (
    <PayPalScriptProvider
      options={{ 
        "client-id": "GGGHLKYFJKWTQ", // Your PayPal client ID
        currency: "USD", // Use LKR for Sri Lankan Rupees
      }}
    >
      <div>
        <h2>Payment for Selected Packages</h2>
        <ul>
          {packages.map((pkg, index) => (
            <li key={index}>{pkg.name} - Rs.{pkg.price.toLocaleString()}</li>
          ))}
        </ul>
        <h3>Total Amount: Rs.{totalAmount.toLocaleString()}</h3>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: totalAmount.toString(), // Total amount as string
                  currency_code: 'USD', // Currency code
                },
                description: `Payment for selected packages`, // Order description
              }],
            });
          }}
          onApprove={handleApprove}
          onError={(err) => {
            console.error('PayPal Checkout onError', err);
            alert('An error occurred during the transaction. Please try again.');
          }}
          onCancel={() => {
            alert('Transaction cancelled by the user.');
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PaymentComponent;
