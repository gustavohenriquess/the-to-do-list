import express from "express";
import { UserListsUseCase } from "./use-cases/user-lists-use-case";
import { CreateUserUseCase } from "./use-cases/create-user.use-case";
import { CreateListUseCase } from "./use-cases/create-list.use-case";
import { DeleteListUseCase } from "./use-cases/delete-list.use-case";
import { CreateTaskUseCase } from "./use-cases/create-task.use-case";
import { ListTasksUseCase } from "./use-cases/list-tasks.use-case";
import { DeleteTaskUseCase } from "./use-cases/delete-task.use-case";

const router = express.Router();

router.post("/account", (req, res) => {
  const { name } = req.body;
  const userId = CreateUserUseCase.execute(name);
  res.json({ userId });
});

router.get("/:userId/list", (req, res) => {
  const { userId } = req.params;
  const lists = UserListsUseCase.execute(userId);
  res.json(lists);
});

router.post("/:userId/list", (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  CreateListUseCase.execute(userId, name);
  res.status(204).send();
});

router.delete("/:userId/list/:listId", (req, res) => {
  const { userId, listId } = req.params;
  DeleteListUseCase.execute(userId, parseInt(listId));
  res.status(204).send();
});

router.post("/:userId/list/:listId/task", (req, res) => {
  const { userId, listId } = req.params;
  const { name } = req.body;
  CreateTaskUseCase.execute(userId, parseInt(listId), name);

  res.status(204).send();
});
router.get("/:userId/list/:listId/task", (req, res) => {
  const { userId, listId } = req.params;
  const tasks = ListTasksUseCase.execute(userId, parseInt(listId));

  res.json(tasks);
});
router.put("/:userId/list/:listId/task/:taskId/name", (req, res) => {});
router.put("/:userId/list/:listId/task/:taskId/done", (req, res) => {});

router.delete("/:userId/list/:listId/task/:taskId", (req, res) => {
  const { userId, listId, taskId } = req.params;
  DeleteTaskUseCase.execute(userId, parseInt(listId), parseInt(taskId));

  res.status(204).send();
});

export { router };
