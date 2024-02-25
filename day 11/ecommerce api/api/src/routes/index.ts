/** @format */

import { route as productRoutes } from "./products";
import { route as userRoutes } from "./user";
import { route as cartRoutes } from "./carts";
import { route as transactionRoutes } from "./transaction";
import { route as addressRoutes } from "./address";

export const routes = {
  userRoutes,
  productRoutes,
  cartRoutes,
  transactionRoutes,
  addressRoutes,
};
