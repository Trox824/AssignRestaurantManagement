import React from "react";
import { Divider } from "@nextui-org/react";
import OrderHistoryTable from "./OrderHistoryTable";
const OrderHistory = () => {
  return (
    <div className="bg-white p-2 rounded-md w-full">
      <h2 className="text-xl font-semibold mb-4">Unpay Order</h2>
      <Divider className="my-4" />
      <OrderHistoryTable />
    </div>
  );
};

export default OrderHistory;
