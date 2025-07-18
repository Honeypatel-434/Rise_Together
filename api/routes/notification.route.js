// import express from "express";
// import Notification from "../models/notification.model.js";
// import createError from "../utils/createError.js";
// import { verifyToken } from "../middleware/jwt.js";

// const router = express.Router();

// // POST - Create a new notification
// router.post("/", verifyToken, async (req, res, next) => {
//   try {
//     const newNotification = new Notification({
//       receiverId: req.body.receiverId,
//       message: req.body.message,
//       link: req.body.link,
//     });

//     const saved = await newNotification.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     next(err);
//   }
// });

// // GET - Get notifications for the logged-in user
// router.get("/", verifyToken, async (req, res, next) => {
//   try {
//     const notifications = await Notification.find({ receiverId: req.userId }).sort({ createdAt: -1 });
//     res.status(200).json(notifications);
//   } catch (err) {
//     next(err);
//   }
// });

// // PUT - Mark a notification as read
// router.put("/:id/read", verifyToken, async (req, res, next) => {
//   try {
//     await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
//     res.status(200).send("Notification marked as read");
//   } catch (err) {
//     next(err);
//   }
// });

// // DELETE - Delete a notification
// router.delete("/:id", verifyToken, async (req, res, next) => {
//   try {
//     await Notification.findByIdAndDelete(req.params.id);
//     res.status(200).send("Notification deleted");
//   } catch (err) {
//     next(err);
//   }
// });

// export default router;
