import { nanoid } from "nanoid";
import { writeFileSync, readFileSync } from "fs";

const loadUsers = () => {
  try {
    const dataBuffer = readFileSync("./db/users.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

function saveUsers(data) {
writeFileSync("./db/users.json", JSON.stringify(data));
}

const addUser = (body) => {
  const users = loadUsers();
  const userExists = users.find((user) => user.passport === body.passport);
  if (userExists) {
    throw new Error("User already exists");
  }
  const newUser = {
    id: nanoid(),
    ...body,
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
};

const deleteUser = (id) => {
  const users = loadUsers();
  const userToDelete = users.find((user) => user.id === id);
  if (!userToDelete) {
    throw new Error("User does not exist");
  }
  const updatedUsersAfterDelete = users.filter((user) => user.id !== id);
  saveUsers(updatedUsersAfterDelete);
  return userToDelete;
};

const findUser = (id) => {
  const users = loadUsers();
  const foundUser = users.find((user) => user.id === id);
  if (!foundUser) {
    throw new Error("User does not exist");
    
  }
  return foundUser;
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

const deposit = (id, amount) => {
  const users = loadUsers();
  const userToDeposit = users.find((user) => user.id === id);
  if (!userToDeposit) {
    throw new Error("no user found");
  }
  userToDeposit.cash = userToDeposit.cash + parseInt(amount);
  const updatedUsersAfterDeposit = users.map((user) =>
    user.id === id ? userToDeposit : user
  );
  saveUsers(updatedUsersAfterDeposit);
  return userToDeposit;
};

const withdraw = (id, amount) => {
  const users = loadUsers();
  const userToWithdraw = users.find((user) => user.id === id);
  if (!userToWithdraw) {
    throw new Error("no user found");
  }
  hasFunds(userToWithdraw, amount);
  userToWithdraw.cash = userToWithdraw.cash - parseInt(amount);
  const updatedUsersAfterWithdraw = users.map((user) =>
    user.id === id ? userToWithdraw : user
  );
  saveUsers(updatedUsersAfterWithdraw);
  return userToWithdraw;
};

const transfer = ({ from, to, amount }) => {
  console.log(from, to, amount);
  const users = loadUsers();
  const sender = users.find((user) => user.id === from);
  const receiver = users.find((user) => user.id === to);
  amount = parseInt(amount.amount);
  if (!sender || !receiver) {
    console.log("no user found");
    throw new Error("User does not exist");
  }
  hasFunds(sender, amount);
  sender.cash = parseInt(sender.cash) - amount;
  receiver.cash = parseInt(receiver.cash) + amount;
  const updatedUsersAfterTransfer = users.map((user) => {
    if (user.id === sender.id) {
      return sender;
    } else if (user.id === receiver.id) {
      return receiver;
    } else {
      return user;
    }
  });
  saveUsers(updatedUsersAfterTransfer);
  return sender;
};

const filter = (amount) => {
  const users = loadUsers();
  const filteredUsers= users.filter(user => user.cash >= amount)
  return filteredUsers
}


export {
  addUser,
  deleteUser,
  saveUsers,
  loadUsers,
  findUser,
  transfer,
  deposit,
  withdraw,
  filter
};
