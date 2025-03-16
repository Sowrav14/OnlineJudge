/*
import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import { parse } from "cookie";

// const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

export function middleware(req: NextRequest) {
  console.log("hi from middleware");
//   const cookies = parse(req.headers.get("cookie") || "");
//   const token = cookies.token;

//   if (!token) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

  try {
    // const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };
    // const userId = decoded.userId;
    const userId = 'u3';

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("userId", userId);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid Token" }, { status: 403 });
  }
}

// Apply middleware to all protected routes
export const config = {
  matcher: ["/api/submit/"],
};
*/

