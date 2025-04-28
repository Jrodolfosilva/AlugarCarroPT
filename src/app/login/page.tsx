'use client'

import styles from "./page.module.css";
import Link from "next/link";
import { Auth } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cooikes from "js-cookie";




export default function Login() {
  
  const router =  useRouter()
  
  const [error,setError] = useState("")

  async function acesso(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setError("")

    const {email,password}= e.currentTarget;

    const user = {
      email: email.value,
      password: password.value
    }

   const response =  await Auth(user)
    console.log(response)
   
   if(response.access){

    Cooikes.set("tokenUser",JSON.stringify(response),{expires:1})
    router.push('login/account')

   }
   else{
    
    setError(response.error)
   }

  }

  return (
    <section className={styles.containerLogin}>
      <div className={styles.Login_containerForm}>
        <span>Login</span>
        <h1>Acesse sua conta</h1>
        <form onSubmit={acesso} >
          <label htmlFor="email">
            <input type="email" name="email" id="email" placeholder="joao@mail.com" defaultValue={""} required />
          </label>
          <label htmlFor="password">
            <input type="password" name="password" placeholder="Senha" id="password" defaultValue={""} required/>
          </label>
          <input type="submit" value="Entrar" />
          {error?<p className={styles.error}>{error}</p>:null}
          
        </form>
      </div>
      <div className={styles.Login_containerBanner}></div>
    </section>
  );
}


