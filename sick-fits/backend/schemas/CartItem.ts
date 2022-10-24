import {
  integer,
  password,
  relationship,
  select,
  text,
} from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";

export const CartItem = list({
  // access
  // ui
  ui: {
    listView: {
      initialColumns: ["product", "quantity", "user"],
    },
  },
  fields: {
    // To Do custom label
    quantity: integer({
      defaultValue: 1,
      isRequired: true,
    }),
    product: relationship({ ref: "Product" }),
    user: relationship({ ref: "User.cart" }),
  },
});
