import express from "express";
import MessageRequest from "../models/MessageRequests.js";
import createError from "../utils/createError.js";

const router = express.Router();

// POST - Send message request
router.post("/", async (req, res, next) => {
  const userId = req.userId; // from middleware
  const { toSeller, gigId } = req.body;

  try {
    const existing = await MessageRequest.findOne({ fromUser: userId, toSeller, gigId });
    if (existing) return next(createError(400, "Request already sent"));

    const newReq = new MessageRequest({
      fromUser: userId,
      toSeller,
      gigId,
    });

    await newReq.save();
    res.status(201).send("Message request sent.");
  } catch (err) {
    next(err);
  }
});

// GET - Fetch requests sent to this seller
router.get("/seller", async (req, res, next) => {
  try {
    const requests = await MessageRequest.find({ toSeller: req.userId, status: "pending" })
      .populate("fromUser", "username")
      .populate("gigId", "title");

    res.status(200).json(requests);
  } catch (err) {
    next(err);
  }
});

// PUT - Accept request
router.put("/:id/accept", async (req, res, next) => {
  try {
    const updated = await MessageRequest.findByIdAndUpdate(
      req.params.id,
      { status: "accepted" },
      { new: true }
    );

    res.status(200).send("Request accepted");
  } catch (err) {
    next(err);
  }
});

// PUT - Reject request (optional)
router.put("/:id/reject", async (req, res, next) => {
  try {
    const updated = await MessageRequest.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    res.status(200).send("Request rejected");
  } catch (err) {
    next(err);
  }
});

export default router;
