import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function OrderDropdown() {
  const [selectedKeys, setSelectedKeys] = React.useState(
    new Set(["Please Select Type"])
  );

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

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
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="Dine In">Dine In</DropdownItem>
        <DropdownItem key="Take Away">Take Away</DropdownItem>
        <DropdownItem key="Deliver">Deliver</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
