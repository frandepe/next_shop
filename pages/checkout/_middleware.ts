import { NextRequest, NextFetchEvent, NextResponse } from "next/server";
import { jwt } from "../../utils";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  console.log(req.cookies);
  const { token = "" } = req.cookies;

  try {
    await jwt.isValidToken(token);
    return NextResponse.next();
  } catch (error) {
    // const requestedPage = req.page.name;
    const { origin, pathname } = req.nextUrl.clone();
    return NextResponse.redirect(`${origin}/auth/login?p=${pathname}`);
  }

  //   return new Response("No autorizado", {
  //     status: 401,
  //   });
}
