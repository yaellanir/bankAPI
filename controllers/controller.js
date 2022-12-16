// import { deleteUser } from "../services/service.js";
import {
  loadUsers,
  deleteUser,
  findUser,
  transfer,
  deposit,
  withdraw,
  filter,
} from "../services/service.js";
import { User } from "../db/user.model.js";

const deleteUserRoute = async (req, res) => {
  try {
    const deletedUser = await deleteUser(req.params.id);
    res.status(200).send(deletedUser);
  } catch (e) {
    res.status(404).send({ error: e });
  }
};

const addUserRoute = (req, res) => {
  try {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(user);
      }
    });
  } catch (e) {
    res.status(403).send({ error: e.message });
  }
};

const transferRoute = async (req, res) => {
  try {
    res.status(200).send(
      await transfer({
        from: req.params.from,
        to: req.params.to,
        amount: parseInt(req.query.amount),
      })
    );
  } catch (e) {
    res.status(404).send({ error: e.message });
  }
};

const depositRoute = async (req, res) => {
  try {
    const updatedUser = await deposit(req.params.id, req.body.amount);
    res.status(200).send(updatedUser);
  } catch (e) {
    res.status(404).send({ error: e.message });
  }
};

const withdrawRoute = async (req, res) => {
  try {
    res.status(200).send(await withdraw(req.params.id, req.body.amount));
  } catch (e) {
    res.status(404).send({ error: e.message });
  }
};

const filteredRoute = async (req, res) => {
  res.status(201).send(await filter(req.query.amount));
};

const findUserRout = async (req, res) => {
  try {
    res.status(200).send(await findUser(req.params.id));
  } catch (e) {
    res.status(404).send({ error: e.message });
  }
};

const getAllUsersRoute = async (req, res) => {
  res.status(201).send(await loadUsers());
};
export {
  getAllUsersRoute,
  findUserRout,
  filteredRoute,
  withdrawRoute,
  deleteUserRoute,
  addUserRoute,
  transferRoute,
  depositRoute,
};
