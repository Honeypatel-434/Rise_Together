import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function MyGigs() {
  const currentUser = getCurrentUser();
  const [expandedGigId, setExpandedGigId] = useState(null);

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (id) => newRequest.delete(`/gigs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  const toggleExpand = (id) => {
    setExpandedGigId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="myGigs">
      <div className="container">
        <div className="title">
          <h1>My Gigs</h1>
          {currentUser.isSeller && (
            <Link to="/add">
              <button>Add New Gig</button>
            </Link>
          )}
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Something went wrong!</p>
        ) : (
          <div className="gigCards">
            {data.map((gig) => (
              <div
                className={`gigCard ${expandedGigId === gig._id ? "expanded" : ""}`}
                key={gig._id}
                onClick={() => toggleExpand(gig._id)}
              >
                <img src={gig.cover} alt={gig.title} className="gigImage" />
                <div className="gigContent">
                  <h3>{gig.title}</h3>
                  <p>Price: ₹{gig.price}</p>
                  <p>Sales: {gig.sales}</p>
                  {expandedGigId === gig._id && (
                    <div className="gigDetails">
                      <p className="desc">{gig.desc}</p>
                      <ul className="features">
                        {gig.features?.map((feat, idx) => (
                          <li key={idx}>• {feat}</li>
                        ))}
                      </ul>
                      <div className="actions">
                        <Link to={`/edit/${gig._id}`}>
                          <button className="updateBtn">Update</button>
                        </Link>
                        <button className="deleteBtn" onClick={() => handleDelete(gig._id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyGigs;
