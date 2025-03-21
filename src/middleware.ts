import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
 

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const url = request.nextUrl.pathname;
   



    if(url === "/login" && token){
        return NextResponse.redirect(new URL('/', request.url))

    }

   

    if((url=== "/panel/gestao" || url ==="/panel/gestao/cadastrar") && !token){
        return NextResponse.redirect(new URL('/panel',request.url))
    }

    return NextResponse.next();


 
}
 

export const config = {
  matcher: ['/login','/panel','/panel/gestao/:path*'],  
}