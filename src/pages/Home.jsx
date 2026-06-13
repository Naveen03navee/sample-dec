import React, { useState } from "react";
import Button from "../components/Button";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [vehicle, setVehicle] = useState(null);

  const vehicles = [
    {
      id: 1,
      name: "Bike",
      type: "2-Wheeler",
      price: 50,
      eta: "3 min",
    },
    {
      id: 2,
      name: "Auto",
      type: "3-Wheeler",
      price: 100,
      eta: "5 min",
    },
    {
      id: 3,
      name: "Car",
      type: "4-Wheeler",
      price: 200,
      eta: "7 min",
    },
  ];

  const handleBooking = () => {
    if (!pickup || !drop || !vehicle) {
      alert("Please fill all details");
      return;
    }

    alert(`Ride Booked with ${vehicle.name} 🚗`);
  };

  return (
    <div className="p-5 max-w-md mx-auto">

      {/* 🔹 Header */}
      <h2 className="text-2xl font-bold mb-4 text-center">
        Book Your Ride
      </h2>

      {/* 🔹 Pickup Input */}
      <input
        type="text"
        placeholder="Enter Pickup Location"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
        className="w-full p-3 border rounded-lg mb-3"
      />

      {/* 🔹 Drop Input */}
      <input
        type="text"
        placeholder="Enter Drop Location"
        value={drop}
        onChange={(e) => setDrop(e.target.value)}
        className="w-full p-3 border rounded-lg mb-4"
      />

      {/* 🔹 Vehicle Selection */}
      <h3 className="mb-2 font-semibold">Select Vehicle</h3>

      <div className="space-y-3">
        {vehicles.map((v) => (
          <div
            key={v.id}
            onClick={() => setVehicle(v)}
            className={`p-3 border rounded-lg cursor-pointer ${
              vehicle?.id === v.id
                ? "border-green-500 bg-green-100"
                : "border-gray-300"
            }`}
          >
            <div className="flex justify-between">
              <div>
                <p className="font-medium">
                  {v.name} ({v.type})
                </p>
                <p className="text-sm text-gray-500">
                  ETA: {v.eta}
                </p>
              </div>

              <p className="font-bold text-green-600">
                ₹{v.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Fare Display */}
      {vehicle && (
        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          <p>
            Estimated Fare:{" "}
            <span className="font-bold text-green-600">
              ₹{vehicle.price}
            </span>
          </p>
        </div>
      )}

      {/* 🔹 Book Button */}
      <div className="mt-5">
        <Button text="Book Ride" onClick={handleBooking} />
      </div>
    </div>
  );
};

export default Home;