import express from "express";

const app = express();
app.use(express.json());

let latestMessage = "";

app.post("/api/api.js", (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "No message provided" });

    latestMessage = message;
    res.json({ success: true });
});

app.get("/api/api.js", (req, res) => {
    res.json({ message: latestMessage });
});

app.listen(3000, () => console.log("API running on port 3000"));
