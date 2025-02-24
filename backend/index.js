const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());


app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


PORT = process.env.PORT || 5050
// Connect DB and start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error("Error during app startup:", err);
});
