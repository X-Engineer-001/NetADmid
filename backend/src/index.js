import express from "express";
import rootRouter from "./routes";
import { prisma } from "./adapters";
const port = process.env.PORT || 8000;
const app = express();
app.use(rootRouter);
app.get("/", (req, res) => {
res.send("Hello World!");
});
app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`);
});
process.on("exit", async () => {
await prisma.$disconnect();
});