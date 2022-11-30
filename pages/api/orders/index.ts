import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { db } from "../../../database";
import { IOrder } from "../../../interfaces";
import { Product, Order } from "../../../models";

type Data =
  | {
      message: string;
    }
  | IOrder;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createOrder(req, res);
    default:
      return res.status(400).json({ message: "Bad request" });
  }
}
async function createOrder(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { orderItems, total } = req.body as IOrder;

  // Verificar que tengamos un usuario
  //*con el req de getSession tenemos toda la sesion del usuario
  const session: any = await getSession({ req });

  if (!session) {
    return res
      .status(401)
      .json({ message: "Debe estar autenticado para hacer esto" });
  }

  // Crear un arreglo con los productos que la persona quiere
  const productsIds = orderItems.map((product) => product._id);
  await db.connect();
  //*Busca todos los productos cuyo id exista en ($in:) productsIds
  //*Esto va a generar un arreglo con todos los productos de la base de datos
  //* que coincide con los que la persona está llevando
  const dbProducts = await Product.find({ _id: { $in: productsIds } });

  try {
    //* Esto está bien desde el front, pero aca tendriamos que camviar el current.price por
    //* la info que viene desde dbProducts (desde el backend)
    // const subTotal = orderItems.reduce(
    //   (prev, current) => current.price * current.quantity + prev,
    //   0
    // );
    const subTotal = orderItems.reduce((prev, current) => {
      const currentPrice = dbProducts.find(
        (prod) => prod.id === current._id
      )?.price;

      // const currentPrice = dbProducts.find((p) => new mongoose.Types.ObjectId(p._id).toString() === product._id)?.price;

      if (!currentPrice) {
        throw new Error("Verifique el carrito de nuevo, producto no existe");
      }
      return currentPrice * current.quantity + prev;
    }, 0);

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const backendTotal = subTotal * (taxRate + 1);
    if (total !== backendTotal) {
      throw new Error("El total no cuadra con el monto");
    }

    const userId = session.user._id;
    const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
    await newOrder.save();
    await db.disconnect();
    return res.status(201).json(newOrder);
  } catch (error: any) {
    await db.disconnect();
    console.log(error);
    res.status(400).json({
      message: error.message || "Revise logs del servidor",
    });
  }

  return res.status(201).json(req.body);
}
