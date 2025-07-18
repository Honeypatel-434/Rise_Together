import mongoose from "mongoose";

const MessageRequestSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  toSeller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  gigId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gig",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
}, { timestamps: true });

export default mongoose.model("MessageRequests", MessageRequestSchema);
