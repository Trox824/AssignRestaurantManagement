import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import OrderDetails from "./OrderDetails";
import OrderHistoryTable from "./OrderHistoryTable";
import { useOrderContext } from "./OrderContext";

export default function MenuTab() {
  const [selected, setSelected] = React.useState("Current");
  const { orders } = useOrderContext();

  return (
    <div className="flex flex-col w-full">
      <Card className="max-w-full w-full h-full">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="Current" title="Current">
              <OrderDetails
                orders={orders}
                onPlaceOrder={() => setSelected("History")}
              />
            </Tab>
            <Tab key="History" title="History">
              <OrderHistoryTable />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
