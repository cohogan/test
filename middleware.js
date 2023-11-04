import { NextRequest, NextResponse } from 'next/server';
import { withMiddlewareAuthRequired, getSession } from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired(async (req) => {
  const res = NextResponse.next();
  const user = await getSession(req, res);

  console.log("USER", user)

  console.log("IS THIS WORKING?")
  if (user) {
    console.log("ANUDDER THING HERE", user)
    // Do what you want...

  }
  else {
    // Redirect to login page
    console.log("SOMETHIN HERE")
    res.redirect('/api/auth/login');
  }

  return res;
});

// export const config = {
//   matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
// };

export const config = {
    matcher: [
        '/projects'
    ] 
}