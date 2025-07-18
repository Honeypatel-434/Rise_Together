import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getCurrentUser from "../../utils/getCurrentUser";
import newRequest from "../../utils/newRequest";
import Icon from "@mdi/react";
import { mdiCurrencyUsd } from "@mdi/js";

const Card = ({ gig, onClick }) => (
  <div
    className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
    onClick={onClick}
  >
    <h3 className="text-xl font-semibold text-gray-900">{gig.title}</h3>
    <p className="text-lg text-green-500 font-medium mt-2">₹{gig.price}</p>
    <p className="text-gray-600 mt-1">{gig.desc}</p>
  </div>
);

const Popup = ({ gig, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-gray-200 p-6 rounded-lg shadow-lg max-w-md w-full">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{gig.title}</h3>
      <p className="text-gray-700 mb-2">
        <strong>Price:</strong> ₹{gig.price}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Sales:</strong> {gig.sales}
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Description:</strong> {gig.desc}
      </p>
      <ul className="text-gray-600 mb-4">
        {gig.features?.map((f, idx) => (
          <li key={idx}>• {f}</li>
        ))}
      </ul>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  </div>
);

const Investment = () => {
  const currentUser = getCurrentUser();
  const [selectedGig, setSelectedGig] = useState(null);

  const { data: gigs, isLoading, error } = useQuery({
    queryKey: ["allGigs"],
    queryFn: () => newRequest.get("/gigs").then((res) => res.data),
  });

  // Filter investments for non-seller users only
  const myInvestments =
    gigs?.filter(
      (gig) =>
        !currentUser?.isSeller &&
        gig.features?.includes(currentUser.username)
    ) || [];

  const totalInvestment = myInvestments
    .reduce((sum, gig) => sum + (Number(gig.price) || 0), 0)
    .toLocaleString("en-IN", { style: "currency", currency: "INR" });

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-5xl font-bold text-gray-800">My Investments</h1>
        <div className="flex items-center text-green-500 text-xl font-medium">
     
          <span>Total: {totalInvestment}</span>
        </div>
      </div>

      {isLoading ? (
        <p>Loading investments...</p>
      ) : error ? (
        <p>Something went wrong!</p>
      ) : myInvestments.length === 0 ? (
        <p>No investments found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myInvestments.map((gig) => (
            <Card key={gig._id} gig={gig} onClick={() => setSelectedGig(gig)} />
          ))}
        </div>
      )}

      {selectedGig && <Popup gig={selectedGig} onClose={() => setSelectedGig(null)} />}
    </div>
  );
};

export default Investment;
