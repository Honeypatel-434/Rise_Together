const Notification = require("../models/Notification");

// When a message request is sent
const handleMessageRequest = async (req, res) => {
  try {
    const { sellerId, gigId } = req.body;
    const newNotification = new Notification({
      sellerId: sellerId,
      message: `You have received a message request for gig: ${gigId}`,
    });
    await newNotification.save();

    res.status(200).send("Message request sent!");
  } catch (err) {
    res.status(500).send("Error sending message request");
  }
};
