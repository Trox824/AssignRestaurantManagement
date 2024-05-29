import React, {useEffect, useState} from "react";
import MenuItem from "../components/MenuItem";
import OrderDetails from "../components/OrderDetails";
import image1 from "../assets/image1.jpg";
import MenuTab from "../components/MenuTab";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import {useAddMenuItem, useDeleteMenuItem, useGetMenuItems, useUpdateMenuItem} from "../hooks/menu/index.jsx";

const initialMenuItems = [
  { id: 1, name: "Lemon Chicken", price: 10.0, image: image1 },
  { id: 2, name: "Sweet & Sour Pork", price: 10.0, image: image1 },
  { id: 3, name: "Salt & Pepper Chicken", price: 10.0, image: image1 },
  { id: 4, name: "Mongolian Beef", price: 10.0, image: image1 },
  { id: 5, name: "Special Fried Rice", price: 10.0, image: image1 },
  { id: 6, name: "Hainanese Chicken", price: 10.0, image: image1 },
  { id: 7, name: "Roast Duck", price: 10.0, image: image1 },
  { id: 8, name: "Crispy Roast Pork", price: 10.0, image: image1 },
  { id: 9, name: "BBQ Pork", price: 10.0, image: image1 },
];

const Menu = () => {
  const [currentItem, setCurrentItem] = useState({
    id: "",
    name: "",
    price: "",
    description: ""
  });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [editMode, setEditMode] = useState(false);
  const [addedMenuItems, loading, addItemError, addMenuItem] = useAddMenuItem([isOpen]);
  const [deletedItem, deleteLoading, deleteError, deleteMenuItem] = useDeleteMenuItem([editMode]);
  const [updatedItem, updateLoading, updateError, updateMenuItem] = useUpdateMenuItem([editMode]);
  const saveMenuItem = async () => {
    if (editMode) {
      await  updateMenuItem(currentItem?.id, { name: currentItem.name, description: currentItem.description, price: currentItem.price })
    } else {
      await addMenuItem({name: currentItem.name, description: currentItem.description, price: currentItem.price});
    }
    closeModal();
  };

  const { menuItems, error } = useGetMenuItems([addedMenuItems, deletedItem, updatedItem]);

  const openModal = (item) => {
    if (item) {
      setCurrentItem(item);
      setEditMode(true);
    } else {
      setCurrentItem({ id: "", name: "", price: "", description: "" });
      setEditMode(false);
    }
    onOpen();
  };

  const closeModal = () => {
    onOpenChange(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prev) => ({ ...prev, [name]: value }));
  };

  console.log(menuItems)
  return (
    <main className="h-screen overflow-hidden flex-1 p-6 bg-gray-100 grid grid-cols-4 gap-4">
      <div className="col-span-3">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Menu</h1>
          <div>
            <Button
              color="primary"
              variant="solid"
              size="md"
              onPress={() => openModal(null)}
            >
              Add Dishes
            </Button>
            <Button
              color="danger"
              variant="solid"
              size="md"
              onPress={() => setEditMode((prev) => !prev)}
              className="ml-4"
            >
              {editMode ? "Stop Editing" : "Edit Menu"}
            </Button>
          </div>
        </div>
        <div
          className="overflow-y-auto"
          style={{ height: "calc(100vh - 70px)" }}
        >
          <div className="grid grid-cols-3 gap-4 mt-6">
            {menuItems?.map((item) => (
              <div key={item.id} className="relative">
                <MenuItem
                  name={item.name}
                  price={item.price}
                  image={image1}
                  id={item?.id}
                />
                {editMode && (
                  <div className="relative space-y-2 z-50">
                    <Button size="sm" onPress={() => openModal(item)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      color="error"
                      onPress={() => deleteMenuItem(item.id)}
                      isLoading={deleteLoading}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <MenuTab />
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {editMode ? "Edit Menu Item" : "Add Menu Item"}
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Name"
                  name="name"
                  value={currentItem.name}
                  onChange={handleChange}
                  fullWidth
                />
                <Input
                  label="Price"
                  name="price"
                  type="number"
                  value={currentItem.price}
                  onChange={handleChange}
                  fullWidth
                />
                <Input
                  label="Description"
                  name="description"
                  value={currentItem.image}
                  onChange={handleChange}
                  fullWidth
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" isLoading={loading || updateLoading} onPress={saveMenuItem}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </main>
  );
};

export default Menu;
