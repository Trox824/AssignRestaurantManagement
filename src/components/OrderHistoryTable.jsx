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
export default function OrderHistoryTable() {
  const { orderHistory } = useOrderContext();

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
      <TableBody items={orderHistory}>
        {(item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.time}</TableCell>
            <TableCell>
              <PaymentButton />
            </TableCell>
            <TableCell>{item.total}</TableCell>
            <TableCell>
              <a href="#" className="text-blue-500">
                {item.viewInvoice}
              </a>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
