import React from "react";
import MenuItem from "../components/MenuItem";
import OrderDetails from "../components/OrderDetails";
import image1 from "../assets/image1.jpg";
import MenuTab from "../components/MenuTab";
import { Button } from "@nextui-org/react";

const menuItems = [
  { name: "Lemon Chicken", price: 10.0, image: image1 },
  { name: "Sweet & Sour Pork", price: 10.0, image: image1 },
  { name: "Salt & Pepper Chicken", price: 10.0, image: image1 },
  { name: "Mongolian Beef", price: 10.0, image: image1 },
  { name: "Special Fried Rice", price: 10.0, image: image1 },
  { name: "Hainanese Chicken", price: 10.0, image: image1 },
  { name: "Roast Duck", price: 10.0, image: image1 },
  { name: "Crispy Roast Pork", price: 10.0, image: image1 },
  { name: "BBQ Pork", price: 10.0, image: image1 },
];
const Menu = () => {
  return (
    <main className="h-screen overflow-hidden flex-1 p-6 bg-gray-100 grid grid-cols-4 gap-4 ">
      <div className="col-span-3  ">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Menu</h1>
          <Button color="danger" variant="solid" size="md">
            Edit Menu
          </Button>
        </div>
        <div
          className="overflow-y-auto"
          style={{ height: "calc(100vh - 70px)" }}
        >
          <div className="grid grid-cols-3 gap-4 mt-6 ">
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <MenuTab />
      </div>
    </main>
  );
};

export default Menu;
