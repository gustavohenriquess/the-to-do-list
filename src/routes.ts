import express from "express";
import { UserListsUseCase } from "./use-cases/user-lists-use-case";
import { CreateUserUseCase } from "./use-cases/create-user.use-case";
import { CreateListUseCase } from "./use-cases/create-list.use-case";
import { DeleteListUseCase } from "./use-cases/delete-list.use-case";

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
  res.status(200).send();
});

router.delete("/:userId/list/:listId", (req, res) => {
  const { userId, listId } = req.params;
  DeleteListUseCase.execute(userId, parseInt(listId));
  res.status(200).send();
});

router.get("/:userId/list/:listId/task", (req, res) => {});
router.post("/:userId/list/:listId/task", (req, res) => {});
router.put("/:userId/list/:listId/task/:taskId/name", (req, res) => {});
router.put("/:userId/list/:listId/task/:taskId/done", (req, res) => {});
router.delete("/:userId/list/:listId/task/:taskId", (req, res) => {});

export { router };