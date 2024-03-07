import { auth } from "@/auth";
import NavUI from "./NavUI";
import CartModel from "@models/cartModel";
import { Types } from "mongoose";

const getCartItemsCount = async () => {
  try {
    const session = await auth();
    if (!session?.user) return 0;

    const userId = session.user.id;

    const cart = await CartModel.aggregate([
      { $match: { userId: new Types.ObjectId(userId) } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$_id",
          totalQuantity: { $sum: "$items.quantity" },
        },
      },
    ]);

    if (cart.length) {
      return cart[0].totalQuantity;
    }

    return 0;
  } catch (error) {
    console.log("Error while fetching cart items.", error);
    return 0;
  }
};

export default async function Navbar() {
  const cartItemsCount = await getCartItemsCount();

  return (
    <div>
      <NavUI cartItemsCount={cartItemsCount} />
    </div>
  );
}
