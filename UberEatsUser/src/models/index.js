// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatus = {
  "NEW": "NEW",
  "PREPARING": "PREPARING",
  "READY_FOR_PICKUP": "READY_FOR_PICKUP",
  "PICKED_UP": "PICKED_UP",
  "COMPLETED": "COMPLETED"
};

const { OrderList, Dish, Order, Restaurant, Cart, CartList, User } = initSchema(schema);

export {
  OrderList,
  Dish,
  Order,
  Restaurant,
  Cart,
  CartList,
  User,
  OrderStatus
};