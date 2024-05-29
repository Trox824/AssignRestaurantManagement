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
import {useAddReservation, useGetReservations} from "../hooks/reservation/index.jsx";

const initialReservations = [
  {
    reservationId: 1,
    customer: 101,
    phone: "0912309123",
    numOfPeople: 4,
    reservationTime: "2024-05-21T18:30",
    reservationStatus: "Placed",
  },
  {
    reservationId: 2,
    customer: 102,
    phone: "0912309123",
    numOfPeople: 2,
    reservationTime: "2024-05-21T19:00",
    reservationStatus: "Confirmed",
  },
  {
    reservationId: 3,
    customer: 103,
    phone: "0912309123",
    numOfPeople: 6,
    reservationTime: "2024-05-21T20:00",
    reservationStatus: "Cancelled",
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
  // const [reservations, setReservations] = useState(initialReservations);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editMode, setEditMode] = useState(false);
  const [currentReservation, setCurrentReservation] = useState({
    reservationId: "",
    customer: "",
    phone: "",
    numOfPeople: "",
    reservationTime: "",
    reservationStatus: "Placed",
  });
  const [addedReservation, addLoading, addError, addReservation] = useAddReservation(currentReservation);
  const [reservations, getLoading, getError] = useGetReservations([addedReservation]);

  const openModal = (reservation) => {
    if (reservation) {
      setCurrentReservation(reservation);
      setEditMode(true);
    } else {
      setCurrentReservation({
        reservationId: "",
        customer: "",
        phone: "",
        numOfPeople: "",
        reservationTime: "",
        reservationStatus: "Placed",
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
    setCurrentReservation((prev) => ({ ...prev, reservationStatus: value }));
  };

  const saveReservation = () => {
    addReservation({customer: { name: currentReservation.customer, phone: currentReservation.phone }, numOfPeople: currentReservation.numOfPeople, reservationTime: currentReservation.reservationTime});
    onOpenChange(false);
  };

  const deleteReservation = (reservation_id) => {
    // setReservations((prev) =>
    //   prev.filter((res) => res.reservation_id !== reservation_id)
    // );
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
            <TableColumn>Customer's Name</TableColumn>
            <TableColumn>Phone Number</TableColumn>
            <TableColumn>Number of People</TableColumn>
            <TableColumn>Reservation Time</TableColumn>
            <TableColumn>Reservation Status</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation?.id}>
                <TableCell>{reservation?.id}</TableCell>
                <TableCell>{reservation?.customer?.name}</TableCell>
                <TableCell>{reservation?.customer?.phone}</TableCell>
                <TableCell>{reservation?.numOfPeople}</TableCell>
                <TableCell>{reservation?.reservationTime}</TableCell>
                <TableCell
                  className={getStatusClass(reservation.reservationStatus)}
                >
                  {reservation?.status}
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    color="error"
                    onPress={() =>
                      deleteReservation(reservation?.id)
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
                  label="Customer's Name"
                  name="customer"
                  value={currentReservation.customer}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <Input
                    label="Phone Number"
                    name="phone"
                    value={currentReservation.phone}
                    onChange={handleChange}
                    fullWidth
                    type={'number'}
                    required
                />
                <Input
                  label="Number of People"
                  name="numOfPeople"
                  value={currentReservation.numOfPeople}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <input
                  label="Reservation Time"
                  name="reservationTime"
                  type="datetime-local"
                  value={currentReservation.reservationTime}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <Dropdown>
                  <DropdownTrigger>
                    <Button flat>
                      {currentReservation.reservationStatus}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Single selection actions"
                    color="secondary"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={[currentReservation.reservationStatus]}
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
                <Button color="primary" isLoading={addLoading} onPress={saveReservation}>
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
