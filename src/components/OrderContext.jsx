import React, { createContext, useContext, useState } from "react";

// Create a context
const OrderContext = createContext();

// Custom hook to use the OrderContext
export const useOrderContext = () => useContext(OrderContext);

// Function to generate a unique ID (for simplicity)
const generateId = () => Math.floor(Math.random() * 1000000);

// Context provider component
export const OrderProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([
    { name: "Lemon Chicken", price: 10.0, image: "path/to/image1.jpg" },
    { name: "Sweet & Sour Pork", price: 10.0, image: "path/to/image2.jpg" },
    { name: "Salt & Pepper Chicken", price: 10.0, image: "path/to/image3.jpg" },
    { name: "Mongolian Beef", price: 10.0, image: "path/to/image4.jpg" },
    { name: "Special Fried Rice", price: 10.0, image: "path/to/image5.jpg" },
    { name: "Hainanese Chicken", price: 10.0, image: "path/to/image6.jpg" },
    { name: "Roast Duck", price: 10.0, image: "path/to/image7.jpg" },
    { name: "Crispy Roast Pork", price: 10.0, image: "path/to/image8.jpg" },
    { name: "BBQ Pork", price: 10.0, image: "path/to/image9.jpg" },
  ]);

  const [orders, setOrders] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  const addToOrder = (item) => {
    setOrders((prevOrders) => {
      const existingOrderIndex = prevOrders.findIndex(
        (order) => order.name === item.name
      );
      if (existingOrderIndex !== -1) {
        const updatedOrders = [...prevOrders];
        updatedOrders[existingOrderIndex].quantity += 1;
        return updatedOrders;
      } else {
        return [...prevOrders, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromOrder = (item) => {
    setOrders((prevOrders) => {
      const existingOrderIndex = prevOrders.findIndex(
        (order) => order.name === item.name
      );
      if (existingOrderIndex !== -1) {
        const updatedOrders = [...prevOrders];
        if (updatedOrders[existingOrderIndex].quantity > 1) {
          updatedOrders[existingOrderIndex].quantity -= 1;
        } else {
          updatedOrders.splice(existingOrderIndex, 1);
        }
        return updatedOrders;
      }
      return prevOrders;
    });
  };

  const UploadOrderHistoryToDatabase = () => {
    // Placeholder function to simulate fetching order history from a database
    console.log("Fetching order history from the database...");
    // Implement your database fetch logic here
  };

  const fetchOrderHistoryFromDatabase = () => {
    // Placeholder function to simulate fetching order history from a database
    console.log("Fetching order history from the database...");
    // Implement your database fetch logic here
  };

  const placeOrder = () => {
    const subtotal = orders.reduce(
      (acc, order) => acc + order.price * order.quantity,
      0
    );
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const newOrder = {
      id: generateId(),
      time: new Date().toLocaleTimeString(),
      processPayment: "Pay",
      total: `$${total.toFixed(2)}`,
      viewInvoice: "View Invoice",
      orders: [...orders],
    };

    // Simulate fetching order history from the database
    UploadOrderHistoryToDatabase();
    fetchOrderHistoryFromDatabase();
    // Clear current orders
    setOrders([]);
  };

  return (
    <OrderContext.Provider
      value={{
        menuItems,
        orders,
        orderHistory,
        addToOrder,
        removeFromOrder,
        placeOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
