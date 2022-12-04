import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IOrder } from "../../../interfaces";
import { Order } from "../../../models";

type Data =
  | {
      message: string;
    }
  | IOrder[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getOrders(req, res);
    default:
      res.status(400).json({ message: "Bad request" });
  }
}

async function getOrders(req: NextApiRequest, res: NextApiResponse<Data>) {
  await db.connect();

  //* populate (llenar de informacion), nos pide dos argumentos... la referencia de
  //* en este caso usuarios, y lo que queremos que nos traiga
  const orders = await Order.find()
    .sort({ createdAt: "desc" })
    .populate("user", "name email")
    .lean();
  await db.disconnect();

  return res.status(200).json(orders);
}
