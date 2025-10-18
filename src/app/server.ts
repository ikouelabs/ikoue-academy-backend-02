import express from "express";
import homeRouter from "../features/home/home.route";
import statusRouter from "../features/status/status.route";
import todosRouter from "../features/todos";
import usersRouter from "../features/users";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRouter);
app.use("/health", statusRouter);
app.use("/todos", todosRouter);
app.use("/users", usersRouter);

export default app;
