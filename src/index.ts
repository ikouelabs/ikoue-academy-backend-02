require("dotenv").config();

import express from "express";
import homeRouter from "./features/home/home.route";
import statusRouter from "./features/status/status.route";
import todosRouter from "./features/todos";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

app.use("/", homeRouter);
app.use("/status", statusRouter);
app.use("/todos", todosRouter);

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
