import bcrypt from 'bcrypt';
import { User } from './user.interface';
import UserModel from './user.model';

const createUserIntoDb = async (user: User) => {
  // hash the password
  const hashedPassword = await bcrypt.hash(user.password, 10);

  // create a new user with hash password
  const userWithHashedPassword = {
    ...user,
    password: hashedPassword,
  };

  const result = await UserModel.create(userWithHashedPassword);
  return result;
};

// get all users from DB
const getAllUsersFromDB = async () => {
  const result = await UserModel.find()
    .select('username fullName age email address')
    .exec();
  return result;
};

// get single user by id
const getSingleUserById = async (userId: number) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

// update single user
const updateSingleUser = async (userId: number, updatedUserData: User) => {
  const result = await UserModel.findOneAndUpdate({ userId }, updatedUserData, {
    new: true,
  });
  return result;
};

// delete a user by id
const deleteSingleUser = async (userId: number) => {
  const result = await UserModel.findOneAndDelete({ userId });
  return result;
};

// create order for user
const createOrder = async (userId: number) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

//  Retrieve all orders for a specific user
const getAllOrdersForUser = async (userId: number) => {
  const result = await UserModel.findOne({ userId });
  return result;
};
// Calculate Total Price of Orders for a Specific User
const calculateTotalPrice = async (userId: number) => {
  const result = await UserModel.findOne({ userId });
  const order = result?.orders;
  return order;
};

export const UserServices = {
  createUserIntoDb,
  getAllUsersFromDB,
  getSingleUserById,
  updateSingleUser,
  deleteSingleUser,
  createOrder,
  getAllOrdersForUser,
  calculateTotalPrice,
};
