import express from "express";
import cors from "cors";
const app = express();
// Middlewares
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello, Concept Nexus!");
});
export default app;
//# sourceMappingURL=app.js.map