import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useOrderContext } from "./OrderContext";

const MenuItem = ({ name, price, image, id }) => {
  const { addToOrder } = useOrderContext();

  return (
    <Card
      shadow="sm"
      isPressable
      onPress={() => addToOrder({ name, price, image, id })}
    >
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={name}
          className="w-full object-cover h-60"
          src={image}
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <b>{name}</b>
        <p className="text-default-500">${price.toFixed(2)}</p>
      </CardFooter>
    </Card>
  );
};

export default MenuItem;
