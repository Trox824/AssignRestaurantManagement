import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function OrderDropdown({
  selectedOrderType,
  setSelectedOrderType,
}) {
  const selectedValue = selectedOrderType || "Please Select Type";

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="capitalize">
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={new Set([selectedOrderType])}
        onSelectionChange={(keys) => setSelectedOrderType(Array.from(keys)[0])}
      >
        <DropdownItem key="Dine In">Dine In</DropdownItem>
        <DropdownItem key="Take Away">Take Away</DropdownItem>
        <DropdownItem key="Deliver">Deliver</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
