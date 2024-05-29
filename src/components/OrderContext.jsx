import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import {API_URL} from "../constants/index.jsx";

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
  const [menuItemIds, setMenuItemIds] = useState([]);

  const addToOrder = (item) => {
    setMenuItemIds([...menuItemIds, item?.id]);
    setOrders((prevOrders) => {
      const existingOrderIndex = prevOrders.findIndex(
        (order) => order.id === item.id
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

  const saveOrderIntoDatabase = (params) => {
    // Placeholder function to simulate fetching order history from a database
    console.log("Fetching order history from the database...");
    // Implement your database fetch logic here
    axios.post(`${API_URL}/order`, params)
        .then(() => {
          setOrders([]);
        }).catch(er => console.error(er.message));
  };

  const fetchOrderHistoryFromDatabase = () => {
    // Placeholder function to simulate fetching order history from a database
    console.log("Fetching order history from the database...");
    // Implement your database fetch logic here
    axios.get(`${API_URL}/order?status=UNPAID`)
        .then(res => {
          const unpaidOrders = res.data?.data;
          setOrderHistory(unpaidOrders);
        }).catch(er => console.error(er.message));
  };

  const placeOrder = ({ specialInstruction, tableNumber, customer, orderType }) => {
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
    const menuItemIds = [];
    // Iterate over each item
    orders.forEach(item => {
      // Insert the item's id into the list based on its quantity
      for (let i = 0; i < item.quantity; i++) {
        menuItemIds.push(item.id);
      }
    });
    const params = {
      menuItemIds, tableNumber, customer, orderType, specialInstruction
    }
    // Simulate fetching order history from the database
    saveOrderIntoDatabase(params);
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
        menuItemIds,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
