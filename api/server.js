import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import { verifyToken } from "./middleware/jwt.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
// import notificationRoute from "./routes/notification.route.js";
import cors from "cors";
import messageRequestRoute from "./routes/messageRequests.js";

const app = express()


const connectDB = async() => {
    try {
        mongoose.set('strictQuery',true)
        mongoose.connect("mongodb://127.0.0.1:27017/freelancer")
        console.log("Mongo Connected!");
    } catch (error) {
        console.log(error);
        process.exit();
    }
}
connectDB();

app.use(cors({origin:"http://localhost:3000", credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/message-requests", verifyToken, messageRequestRoute);
// app.use("/api/notifications", verifyToken, notificationRoute);
app.use("/api/auth",authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/order", orderRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);
app.use("/api/reviews", reviewRoute);

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";

    return res.status(errorStatus).send(errorMessage);

});

app.listen(3007,()=>{
    console.log("backend server is running!")
})