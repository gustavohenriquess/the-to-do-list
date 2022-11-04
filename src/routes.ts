import express from "express";
import { UserListsUseCase } from "./use-cases/user-lists-use-case";
import { CreateUserUseCase } from "./use-cases/create-user.use-case";
import { CreateListUseCase } from "./use-cases/create-list.use-case";

const router = express.Router();

router.post("/account", (req, res) => {
  const { name } = req.body;
  const accountId = CreateUserUseCase.execute(name);
  res.json({ accountId });
});

router.get("/:accountId/list", (req, res) => {
  const { accountId } = req.params;
  const lists = UserListsUseCase.execute(accountId);
  res.json(lists);
});

router.post("/:accountId/list", (req, res) => {
  const { accountId } = req.params;
  const { name } = req.body;
  CreateListUseCase.execute(accountId, name);
  res.status(200).send();
});
router.delete("/:accountId/list/:listId", (req, res) => {});

router.get("/:accountId/list/:listId/task", (req, res) => {});
router.post("/:accountId/list/:listId/task", (req, res) => {});
router.put("/:accountId/list/:listId/task/:taskId/name", (req, res) => {});
router.put("/:accountId/list/:listId/task/:taskId/done", (req, res) => {});
router.delete("/:accountId/list/:listId/task/:taskId", (req, res) => {});

export { router };
