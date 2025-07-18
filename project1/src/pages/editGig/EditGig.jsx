// src/pages/editGig/EditGig.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditGig = () => {
  const { gigId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: ""
  });

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await axios.get(`/api/gigs/${gigId}`, {
          headers: {
            Accept: "application/json",
          },
        });

        if (
          !res.headers["content-type"] ||
          !res.headers["content-type"].includes("application/json")
        ) {
          throw new Error("Expected JSON response, got something else.");
        }

        setFormData({
          title: res.data.title || "",
          description: res.data.description || "",
          price: res.data.price || ""
        });
      } catch (err) {
        console.error("Failed to fetch gig:", err);
        alert("Failed to load gig details. " + (err.message || ""));
      }
    };

    fetchGig();
  }, [gigId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/api/gigs/${gigId}`, formData);
      alert("Gig updated successfully!");
      navigate("/myGigs");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update gig.");
    }
  };

  return (
    <div className="flex justify-center items-center py-20 px-4 bg-white min-h-screen">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Your Gig</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Gig Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
          >
            Update Gig
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditGig;
