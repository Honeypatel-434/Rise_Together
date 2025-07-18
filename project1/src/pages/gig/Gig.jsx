import React, { useState } from "react";
import "./Gig.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";
import { toast } from "react-toastify";

function Gig() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () => newRequest.get(`/gigs/single/${id}`).then((res) => res.data),
  });

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => newRequest.get(`/users/${data.userId}`).then((res) => res.data),
    enabled: !!data?.userId,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMessageText("");
  };

  const handleSendMessageRequest = async () => {
    if (!messageText.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    setIsSending(true);
    try {
      if (!currentUser?._id || !dataUser?._id) {
        toast.error("User or gig data is missing");
        return;
      }

      const conversationResponse = await newRequest.post("/conversation", {
        to: dataUser._id,
      });

      const conversationId = conversationResponse.data.id;

      await newRequest.post("/message", {
        conversationId,
        desc: messageText,
      });

      toast.success("Message sent successfully 🎉");
      setIsModalOpen(false);
      setMessageText("");

      navigate(`/message/${conversationId}`);
    } catch (err) {
      console.error("Error sending message:", err);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleDelete = async () => {
    try {
      await newRequest.delete(`/gigs/${id}`);
      toast.success("Gig deleted successfully");
      navigate("/gigs");
    } catch (err) {
      toast.error("Failed to delete the gig");
    }
  };

  const handleUpdate = () => {
    navigate(`/edit-gig/${id}`, { state: { gigData: data } });
  };

  return (
    <div className="gig">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              Fiverr {">"} Graphics & Design {">"}
            </span>
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser?.img || "/img/noavatar.jpg"}
                  alt=""
                />
                <span>{dataUser?.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((_, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}
                    <span>
                      {Math.round(data.totalStars / data.starNumber)}
                    </span>
                  </div>
                )}
              </div>
            )}
            {data.images.map((img) => (
              <img key={img} src={img} alt="" />
            ))}
            <h2>About This Gig</h2>
            <p>{data.desc}</p>
            <div className="seller">
              <h2>About The Seller</h2>
              <div className="user">
                <img src={dataUser?.img || "/img/noavatar.png"} alt="" />
                <div className="info">
                  <span>{dataUser?.username}</span>
                  {!isNaN(data.totalStars / data.starNumber) && (
                    <div className="stars">
                      {Array(Math.round(data.totalStars / data.starNumber))
                        .fill()
                        .map((_, i) => (
                          <img src="/img/star.png" alt="" key={i} />
                        ))}
                      <span>
                        {Math.round(data.totalStars / data.starNumber)}
                      </span>
                    </div>
                  )}
                  <button>Contact Me</button>
                </div>
              </div>
              <div className="box">
                <div className="items">
                  <div className="item">
                    <span className="title">From</span>
                    <span className="desc">{dataUser?.country}</span>
                  </div>
                  <div className="item">
                    <span className="title">Member since</span>
                    <span className="desc">Aug 2022</span>
                  </div>
                  <div className="item">
                    <span className="title">Avg. response time</span>
                    <span className="desc">4 hours</span>
                  </div>
                  <div className="item">
                    <span className="title">Last delivery</span>
                    <span className="desc">1 day</span>
                  </div>
                  <div className="item">
                    <span className="title">Languages</span>
                    <span className="desc">English</span>
                  </div>
                </div>
                <hr />
                <p>{dataUser?.desc}</p>
              </div>
            </div>
            <Reviews gigId={id} />
          </div>

          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>Rs {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data.deliveryDate} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            {currentUser?._id === data.userId ? (
              <div className="ownerActions">
                <button className="updateBtn" onClick={handleUpdate}>
                  Update
                </button>
                <button className="deleteBtn" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            ) : (
              <button className="message-seller-btn" onClick={handleOpenModal}>
                Message Seller
              </button>
            )}
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="message-modal">
          <div className="modal-content">
            <button className="close-modal" onClick={handleCloseModal}>
              X
            </button>
            <h2>Send a Message</h2>
            <textarea
              placeholder="Write your message..."
              rows="4"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            ></textarea>
            <div className="modal-buttons">
              <button
                className="send-message-btn"
                onClick={handleSendMessageRequest}
                disabled={isSending}
              >
                {isSending ? "Sending..." : "Send Message"}
              </button>
              <button onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
