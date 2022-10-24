import { KeystoneContext } from "@keystone-next/types";
import { CartItemCreateInput } from "../.keystone/schema-types";
import { Session } from "../types";

export const addToCart = async (
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> => {
  // 1 query the current user and see if signed in

  const sesh = context.session as Session;

  if (!sesh.itemId) {
    console.log(sesh);
    throw new Error("You must be logged in to do this");
  }

  // query the current users cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: {
      user: {
        id: sesh.itemId,
      },
      product: {
        id: productId,
      },
    },
    resolveFields: "id, quantity",
  });
  const [existingCartItem] = allCartItems;

  console.log(existingCartItem);

  if (existingCartItem) {
    console.log(
      `This item is already in the cart ${existingCartItem.quantity}, increment by one`
    );

    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: {
        quantity: existingCartItem.quantity + 1,
      },
    });
  }

  return await context.lists.CartItem.createOne({
    data: {
      product: {
        connect: {
          id: productId,
        },
      },
      user: {
        connect: {
          id: sesh.itemId,
        },
      },
    },
  });
};
