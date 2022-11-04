import express from "express";

const router = express.Router();

router.post("/account", (req, res) => {});

router.get("/:accountId/list", (req, res) => {});
router.post("/:accountId/list", (req, res) => {});
router.delete("/:accountId/list/:listId", (req, res) => {});

router.get("/:accountId/list/:listId/task", (req, res) => {});
router.post("/:accountId/list/:listId/task", (req, res) => {});
router.put("/:accountId/list/:listId/task/:taskId/name", (req, res) => {});
router.put("/:accountId/list/:listId/task/:taskId/done", (req, res) => {});
router.delete("/:accountId/list/:listId/task/:taskId", (req, res) => {});

export { router };
