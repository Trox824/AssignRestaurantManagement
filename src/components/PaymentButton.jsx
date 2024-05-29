import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
} from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/radio";

export default function PaymentButton( { processPayment, orderId } ) {
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [receivedAmount, setReceivedAmount] = useState("");
  const [error, setError] = useState("");
  // const [open, setOpen] = useState()

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
    setError("");
  };

  const handleProcessPayment = () => {
    if (paymentMethod === "Cash" && !receivedAmount) {
      setError("Received amount is required");
      return;
    }
    setError("");
    processPayment({ orderId: orderId, receivedAmount: receivedAmount, paymentMethod: "CASH" })
  };

  return (
    <Popover placement="bottom" showArrow offset={10} >
      <PopoverTrigger>
        <a href="#" className="text-orange-500">
          Pay
        </a>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <div className="mt-2 flex flex-col gap-2 w-full">
              <RadioGroup
                label="Select Payment Method"
                color="secondary"
                defaultValue="Card"
                onValueChange={handlePaymentMethodChange}
              >
                <Radio value="Card">Card</Radio>
                <Radio value="Cash">Cash</Radio>
              </RadioGroup>
              {paymentMethod === "Cash" && (
                  <div>
                    <Input
                        type="text"
                        label="Received Amount"
                        value={receivedAmount}
                        onChange={(e) => setReceivedAmount(e.target.value)}
                        isInvalid={!!error}
                        errorMessage={error}
                    />
                  </div>

              )}
            </div>
            <Button
              color="primary"
              className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md"
              onClick={handleProcessPayment}
            >
              Process Payment
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
