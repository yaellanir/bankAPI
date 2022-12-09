import { Router } from "express";
import {
  loadUsers,
  addUser,
  deleteUser,
  findUser,
  transfer,
  deposit,
  withdraw,
  filter
} from "../controllers/controllers.js";

const router = Router();

// GET ALL USERS
router.get("/users", (req, res) => {
  res.status(201).send(loadUsers());
});
// GET FILTERED USERS AMOUNT
router.get("/users/filter", (req, res) => {
  res.status(201).send(filter(req.query.amount));
});

// FIND USER
router.get("/users/:id", (req, res) => {
  try {
    res.status(200).send(findUser(req.params.id));
  } catch (e) {
    res.status(404).send(JSON.stringify({ error: e.message }));
  }
});

// ADD USER
router.post("/users", (req, res) => {
  try {
    res.status(200).send(addUser(req.body));
  } catch (e) {
    res.status(403).send({ error: e.message });
  }
});

// DELETE USER
router.delete("/users/:id", (req, res) => {
  try {
    res.status(200).send(deleteUser(req.params.id));
  } catch (e) {
    res.status(404).send({ error: e.message });
  }
});

// TRANSFER FUNDS
router.patch("/users/:from/transfer/:to", (req, res) => {
  try {
    res.status(200).send(
      transfer({
        from: req.params.from,
        to: req.params.to,
        amount: req.query,
      })
    );
  } catch (e) {
    res.status(404).send({ error: e.message });
  }
});

// DEPOSIT
router.patch("/users/:id/deposit", (req, res) => {
  try {
    res.status(200).send(deposit(req.params.id, req.body.amount));
  } catch (e) {
    res.status(404).send({ error: e.message });
  }
});

// WITHDRAW
router.patch("/users/:id/withdraw", (req, res) => {
  try {
    res.status(200).send(withdraw(req.params.id, req.body.amount));
  } catch (e) {
    res.status(404).send({ error: e.message });
  }
});

export default router;
