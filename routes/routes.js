import { Router } from "express";
import {getAllUsersRoute, findUserRout, filteredRoute, withdrawRoute, deleteUserRoute ,addUserRoute, transferRoute, depositRoute} from "../controllers/controller.js";
const router = Router();

// GET ALL USERS
router.get("/users", getAllUsersRoute);
// GET FILTERED USERS AMOUNT
router.get("/users/filter", filteredRoute);

// FIND USER
router.get("/users/:id", findUserRout);

// ADD USER
router.post("/users",addUserRoute);

// DELETE USER
router.delete("/users/:id",deleteUserRoute);

// TRANSFER FUNDS
router.patch("/users/:from/transfer/:to", transferRoute);

// DEPOSIT
router.patch("/users/:id/deposit",depositRoute);

// WITHDRAW
router.patch("/users/:id/withdraw",withdrawRoute);

export default router;
