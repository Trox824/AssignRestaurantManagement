import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useOrderContext } from "./OrderContext";
import PaymentButton from "./PaymentButton";
import { useGetOrder } from "../hooks/history/index.jsx";
import { useProcessPayment } from "../hooks/payment/index.jsx";
export default function OrderHistoryTable() {
  const { orders } = useOrderContext();
  const [payment, payLoading, paymentError, processPayment] =
    useProcessPayment();
  const [orderHistory, loading, error] = useGetOrder({
    orderStatus: "UNPAID",
    deps: [orders, payment],
  });
  return (
    <Table
      isStriped
      aria-label="Order History Table"
      css={{ height: "auto", minWidth: "100%" }}
      classNames={{
        base: "max-h-[520px] overflow-scroll",
        table: "min-h-[420px]",
      }}
    >
      <TableHeader>
        <TableColumn>Order ID</TableColumn>
        <TableColumn>Time</TableColumn>
        <TableColumn>Paying</TableColumn>
        <TableColumn>Total</TableColumn>
        <TableColumn>View Invoice</TableColumn>
      </TableHeader>
      <TableBody isLoading={loading} items={orderHistory}>
        {(item) => (
          <TableRow key={item?.id}>
            <TableCell>{item?.id}</TableCell>
            <TableCell>{item?.date}</TableCell>
            <TableCell>
              <PaymentButton
                orderId={item?.id}
                processPayment={processPayment}
                totalAmountDue={item?.totalPrice}
              />
            </TableCell>
            <TableCell>{item?.totalPrice}</TableCell>
            <TableCell>
              <a href="#" className="text-blue-500">
                View Invoice
              </a>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
