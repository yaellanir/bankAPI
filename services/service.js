import { nanoid } from "nanoid";
import { User } from "../db/user.model.js";

const loadUsers = async () => {
  try {
    const users = await User.find({});
    console.log(users);
    return users;
  } catch (e) {
    throw new Error("can't get users");
  }
};
const saveUsers = async () => {};
const deleteUser = async (id) => {
  try {
    const userToDelete = await User.findOneAndDelete({ _id: id });
    console.log(userToDelete);
    if (!userToDelete) {
      throw new Error("User does not exist");
    }
    return userToDelete;
  } catch (err) {
    throw new Error(err.message);
  }
};

const findUser = async (id) => {
  try {
    const foundUser = await User.findOne({ _id: id });
    if (!foundUser) {
      throw new Error("User does not exist");
    }
    console.log(foundUser);
    return foundUser;
  } catch (err) {
    throw new Error("can't find user");
  }
};

const deposit = async (id, amount) => {
  try {
    const userToDeposit = await User.findOne({ _id: id });
    if (!userToDeposit) {
      throw new Error("no user found");
    }
    userToDeposit.cash = userToDeposit.cash + parseInt(amount);
    await User.findOneAndUpdate({ _id: id }, { cash: userToDeposit.cash });
    return userToDeposit;
  } catch (err) {
    throw new Error("can't deposit money");
  }
};

const withdraw = async (id, amount) => {
  try {
    const userToWithdraw = await User.findOne({ _id: id });
    if (!userToWithdraw) {
      throw new Error("no user found");
    }
    hasFunds(userToWithdraw, amount);
    userToWithdraw.cash = userToWithdraw.cash - parseInt(amount);
    await User.findOneAndUpdate({ _id: id }, { cash: userToWithdraw.cash });
    return userToWithdraw;
  } catch (err) {
    throw new Error("can't withdraw money");
  }
};

function hasFunds(user, amount) {
  const totalBalance = parseInt(user.cash) + parseInt(user.credit);
  console.log(totalBalance, amount);
  if (totalBalance >= amount) {
    return true;
  } else {
    throw new Error("insufficient funds");
  }
}

const transfer = async ({ from, to, amount }) => {
  console.log(from, to, amount);
  const sender = await User.findOne({ _id: from });
  const receiver = await User.findOne({ _id: to });
  if (!sender || !receiver) {
    console.log("no user found");
    throw new Error("User does not exist");
  }
  hasFunds(sender, amount);
  sender.cash = parseInt(sender.cash) - amount;
  receiver.cash = parseInt(receiver.cash) + amount;
  console.log(sender, receiver);
  await User.updateOne({_id: from},{cash:sender.cash})
  await User.updateOne({_id: to},{cash:receiver.cash})
  return sender;
};

// const filter = (amount) => {
//   const users = loadUsers();
//   const filteredUsers = users.filter((user) => user.cash >= amount);
//   return filteredUsers;
// };


const filter = (amount) => {
const filteredUsers= User.find({ cash: { $gt : amount } })
return filteredUsers}


export {
  deleteUser,
  saveUsers,
  loadUsers,
  findUser,
  transfer,
  deposit,
  withdraw,
  filter,
};
