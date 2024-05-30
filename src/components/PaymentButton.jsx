import React, { useState, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
} from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/radio";

export default function PaymentButton({
  processPayment,
  orderId,
  totalAmountDue,
}) {
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [receivedAmount, setReceivedAmount] = useState("");
  const [error, setError] = useState("");
  const [change, setChange] = useState(null);

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
    setReceivedAmount("");
    setError("");
    setChange(null);
  };

  const handleReceivedAmountChange = (e) => {
    const value = e.target.value;
    setReceivedAmount(value);

    const receivedAmountNum = parseFloat(value);
    if (!value || isNaN(receivedAmountNum)) {
      setError("Received amount is required and must be a valid number.");
      setChange(null);
      return;
    }
    if (receivedAmountNum < totalAmountDue) {
      setError("Received amount cannot be less than the total amount due.");
      setChange(null);
      return;
    }
    const calculatedChange = receivedAmountNum - totalAmountDue;
    setChange(calculatedChange);
    setError("");
  };

  const handleProcessPayment = () => {
    const receivedAmountNum = parseFloat(receivedAmount);
    if (paymentMethod === "Cash") {
      if (
        !receivedAmount ||
        isNaN(receivedAmountNum) ||
        receivedAmountNum < totalAmountDue
      ) {
        setError(
          "Received amount is required and must be a valid number greater than the total amount due."
        );
        return;
      }
    }

    setError("");
    processPayment({
      orderId: orderId,
      receivedAmount: receivedAmountNum,
      paymentMethod: paymentMethod.toUpperCase(),
    });
  };

  return (
    <Popover placement="bottom" showArrow offset={10}>
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
                defaultValue="Cash"
                onValueChange={handlePaymentMethodChange}
              >
                <Radio isDisabled value="Card">
                  Card
                </Radio>
                <Radio value="Cash">Cash</Radio>
              </RadioGroup>
              {paymentMethod === "Cash" && (
                <div>
                  <Input
                    type="text"
                    label="Received Amount"
                    value={receivedAmount}
                    onChange={handleReceivedAmountChange}
                    isInvalid={!!error}
                    errorMessage={error}
                  />
                  {change !== null && (
                    <div className="mt-2">
                      <span>Change: ${change.toFixed(2)}</span>
                    </div>
                  )}
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
