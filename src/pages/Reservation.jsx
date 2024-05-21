import React from "react";

const Reservation = () => {
  return (
    <main className="flex-1 p-6 bg-gray-100">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reservation List</h1>
        <button className="bg-gray-200 p-2 rounded-md">Edit Reservation</button>
      </header>
      <div className="mt-6">{/* Add reservation list details here */}</div>
    </main>
  );
};

export default Reservation;
