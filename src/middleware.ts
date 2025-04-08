import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { jwtDecode } from "jwt-decode";
import { TokenType } from './utils/types';

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const url = request.nextUrl.pathname;
   
    if(url === "/login" && token){
        const isToken=JSON.parse(token).access
        const decoded:TokenType = jwtDecode(isToken)
        
            if(decoded.user_id == 1){
                return NextResponse.next();

            }
        return NextResponse.redirect(new URL('/', request.url))

    }  





    if(( url=== "/panel/gestao" || url ==="/panel/gestao/cadastrar" || url ==="/panel/gestao/editar") &&token ){
        
        const isToken=JSON.parse(token).access
        const decoded:TokenType = jwtDecode(isToken)
        
            if(decoded.user_id !== 1){
                return NextResponse.redirect(new URL('/login',request.url))

            }

            return NextResponse.next();

    }


}
 

export const config = {
  matcher: ['/login','/panel','/panel/gestao/:path*'],  
}