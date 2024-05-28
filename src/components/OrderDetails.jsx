import React, { useState } from "react";
import { Divider } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import OrderDropdown from "./OrderDropdown";
import { Button } from "@nextui-org/react";
import { useOrderContext } from "./OrderContext";

const OrderDetails = ({ onPlaceOrder }) => {
  const { orders, removeFromOrder, placeOrder } = useOrderContext();
  const [tableNumber, setTableNumber] = useState("");
  const [selectedOrderType, setSelectedOrderType] = useState("");
  const [error, setError] = useState("");

  const subtotal = orders.reduce(
    (acc, order) => acc + order.price * order.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handlePlaceOrder = () => {
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
    setError("");
    placeOrder();
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
