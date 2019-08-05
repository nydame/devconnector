const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

// initialize middleware for parsing body
app.use(express.json({ extended: false }));

// Routes
app.get("/", (req, res) => res.send("API up and running :)"));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
