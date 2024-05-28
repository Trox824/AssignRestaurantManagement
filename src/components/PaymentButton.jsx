import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
} from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/radio";

export default function PaymentButton() {
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
    setAmount("");
    setError("");
  };

  const handleProcessPayment = () => {
    if (paymentMethod === "Cash" && !amount) {
      setError("Amount is required for cash payments.");
      return;
    }
    setError("");
    // Process the payment
    console.log(
      "Payment processed with method:",
      paymentMethod,
      "Amount:",
      amount
    );
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
                defaultValue="Card"
                onValueChange={handlePaymentMethodChange}
              >
                <Radio value="Card">Card</Radio>
                <Radio value="Cash">Cash</Radio>
              </RadioGroup>
              {paymentMethod === "Cash" && (
                <Input
                  type="text"
                  label="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  isInvalid={!!error}
                  errorMessage={error}
                />
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
