import { password, relationship, text } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";

export const User = list({
  // access
  // ui
  fields: {
    name: text({ isRequired: true }),
    password: password(),
    email: text({ isRequired: true, isUnique: true }),
    cart: relationship({
      ref: "CartItem.user",
      many: true,
      ui: {
        createView: {
          fieldMode: "hidden",
        },
        itemView: {
          fieldMode: "read",
        },
      },
    }),
  },
});
