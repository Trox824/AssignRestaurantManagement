import React, { useState } from "react";
import { Divider } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import OrderDropdown from "./OrderDropdown";
import { Button } from "@nextui-org/react";
import { useOrderContext } from "./OrderContext";

const OrderDetails = ({ onPlaceOrder }) => {
  const { orders, removeFromOrder, placeOrder } = useOrderContext();
  const [tableNumber, setTableNumber] = useState("");
  const [customer, setCustomer] = useState({ name: "", phone: "" })
  const [selectedOrderType, setSelectedOrderType] = useState("");
  const [instruction, setInstruction] = useState("");
  const [error, setError] = useState("");

  const subtotal = orders.reduce(
    (acc, order) => acc + order.price * order.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handlePlaceOrder = () => {
      console.log(orders)
    if (!tableNumber) {
      setError("Table number is required.");
      return;
    }
    if (!selectedOrderType) {
      setError("Order type is required.");
      return;
    }
    if (orders.length === 0) {
      setError("At least one order item is required.");
      return;
    }
    if(!customer?.name) {
        setError("Customer's name is required.");
        return;
    }
      if(!customer?.phone) {
          setError("Customer's phone number is required.");
          return;
      }
    setError("");
    placeOrder({customer, orderType: selectedOrderType, specialInstruction: instruction, tableNumber: tableNumber, });
    onPlaceOrder();
  };

  return (
    <div className="bg-white p-2 rounded-md w-full">
      <h2 className="text-xl font-semibold mb-4">Order ID</h2>
      <Divider className="my-4" />
      <Input
        className="mb-3"
        type="text"
        label="Table Number"
        value={tableNumber}
        onChange={(e) => setTableNumber(e.target.value)}
        isInvalid={!!error && !tableNumber}
        errorMessage={error && !tableNumber ? error : ""}
      />
        <Input
            className="mb-3"
            type="text"
            label="Customer's Name"
            value={customer?.name}
            onChange={(e) => setCustomer({...customer, name: e.target.value})}
            isInvalid={!!error && !customer?.name}
            errorMessage={error && !customer?.name ? error : ""}
        />
        <Input
            className="mb-3"
            type="text"
            label="Customer's Phone Number"
            value={customer?.phone}
            onChange={(e) => setCustomer({...customer, phone: e.target.value})}
            isInvalid={!!error && !customer?.phone}
            errorMessage={error && !customer?.phone ? error : ""}
        />
        <Input
            className="mb-3"
            type="text"
            label="Special Instruction"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            isInvalid={!!error && !instruction}
            errorMessage={error && !instruction ? error : ""}
        />
      <OrderDropdown
        selectedOrderType={selectedOrderType}
        setSelectedOrderType={setSelectedOrderType}
      />
      {error && !selectedOrderType && (
        <div className="text-red-500 mt-2">Order type is required.</div>
      )}
      <Divider className="my-4" />
      <h2 className="text-xl font-semibold mb-4">Order Details</h2>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center">
              <span>{order.name}</span>
              <button
                onClick={() => removeFromOrder(order)}
                className="ml-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center"
              >
                -
              </button>
            </div>
            <span>
              ${order.price.toFixed(2)} x {order.quantity}
            </span>
          </div>
        ))}
      </div>
      <Divider className="my-4" />
      <div className="mt-4">
        <div className="flex justify-between">
          <span>Sub Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <Button
          color="primary"
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md"
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
        {error && orders.length === 0 && (
          <div className="text-red-500 mt-2">
            At least one order item is required.
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
