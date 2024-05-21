import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
} from "@nextui-org/react";

const initialReservations = [
  {
    reservation_id: 1,
    customer_id: 101,
    number_of_people: 4,
    reservation_time: "2024-05-21T18:30",
    reservation_status: "Placed",
  },
  {
    reservation_id: 2,
    customer_id: 102,
    number_of_people: 2,
    reservation_time: "2024-05-21T19:00",
    reservation_status: "Confirmed",
  },
  {
    reservation_id: 3,
    customer_id: 103,
    number_of_people: 6,
    reservation_time: "2024-05-21T20:00",
    reservation_status: "Cancelled",
  },
];

const getStatusClass = (status) => {
  switch (status) {
    case "Placed":
      return "text-yellow-500";
    case "Confirmed":
      return "text-green-500";
    case "Cancelled":
      return "text-red-500";
    default:
      return "";
  }
};

const Reservation = () => {
  const [reservations, setReservations] = useState(initialReservations);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editMode, setEditMode] = useState(false);
  const [currentReservation, setCurrentReservation] = useState({
    reservation_id: "",
    customer_id: "",
    number_of_people: "",
    reservation_time: "",
    reservation_status: "Placed",
  });

  const openModal = (reservation) => {
    if (reservation) {
      setCurrentReservation(reservation);
      setEditMode(true);
    } else {
      setCurrentReservation({
        reservation_id: "",
        customer_id: "",
        number_of_people: "",
        reservation_time: "",
        reservation_status: "Placed",
      });
      setEditMode(false);
    }
    onOpen();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentReservation((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value) => {
    setCurrentReservation((prev) => ({ ...prev, reservation_status: value }));
  };

  const saveReservation = () => {
    if (editMode) {
      setReservations((prev) =>
        prev.map((res) =>
          res.reservation_id === currentReservation.reservation_id
            ? currentReservation
            : res
        )
      );
    } else {
      setReservations((prev) => [
        ...prev,
        { ...currentReservation, reservation_id: prev.length + 1 },
      ]);
    }
    onOpenChange(false);
  };

  const deleteReservation = (reservation_id) => {
    setReservations((prev) =>
      prev.filter((res) => res.reservation_id !== reservation_id)
    );
  };

  return (
    <main className="flex-1 p-6 bg-gray-100">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reservation List</h1>
        <Button color="default" onPress={() => openModal(null)}>
          Add Reservation
        </Button>
      </header>
      <div className="mt-6">
        <Table aria-label="Reservation List Table">
          <TableHeader>
            <TableColumn>Reservation ID</TableColumn>
            <TableColumn>Customer ID</TableColumn>
            <TableColumn>Number of People</TableColumn>
            <TableColumn>Reservation Time</TableColumn>
            <TableColumn>Reservation Status</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.reservation_id}>
                <TableCell>{reservation.reservation_id}</TableCell>
                <TableCell>{reservation.customer_id}</TableCell>
                <TableCell>{reservation.number_of_people}</TableCell>
                <TableCell>{reservation.reservation_time}</TableCell>
                <TableCell
                  className={getStatusClass(reservation.reservation_status)}
                >
                  {reservation.reservation_status}
                </TableCell>
                <TableCell>
                  <Button size="sm" onPress={() => openModal(reservation)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    color="error"
                    onPress={() =>
                      deleteReservation(reservation.reservation_id)
                    }
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {editMode ? "Edit Reservation" : "Add Reservation"}
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Customer ID"
                  name="customer_id"
                  value={currentReservation.customer_id}
                  onChange={handleChange}
                  fullWidth
                />
                <Input
                  label="Number of People"
                  name="number_of_people"
                  value={currentReservation.number_of_people}
                  onChange={handleChange}
                  fullWidth
                />
                <input
                  label="Reservation Time"
                  name="reservation_time"
                  type="datetime-local"
                  value={currentReservation.reservation_time}
                  onChange={handleChange}
                  fullWidth
                />
                <Dropdown>
                  <DropdownTrigger>
                    <Button flat>
                      {currentReservation.reservation_status}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Single selection actions"
                    color="secondary"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={[currentReservation.reservation_status]}
                    onSelectionChange={(keys) =>
                      handleStatusChange([...keys][0])
                    }
                  >
                    <DropdownItem key="Placed">Placed</DropdownItem>
                    <DropdownItem key="Confirmed">Confirmed</DropdownItem>
                    <DropdownItem key="Cancelled">Cancelled</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={saveReservation}>
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

export default Reservation;
