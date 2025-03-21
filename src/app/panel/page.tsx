'use client'

import styles from "./page.module.css";
import Link from "next/link";
import { Auth } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cooikes from "js-cookie";

export default function Panel() {

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

   if(response.access){

   Cooikes.set("token",JSON.stringify(response),{expires:1})
    router.push('/panel/gestao  ')

   }
   else{
    
    setError(response.error)


   }

  
  }


  return (
    <section className={styles.containerPanel}>
      <div className={styles.Panel_containerForm}>
        <span>Panel</span>
        <h1>Acesse sua conta</h1>
        <form onSubmit={acesso}>
          <label htmlFor="">
            <input type="email" name="email" id="email" placeholder="joao@mail.com" />
          </label>
          <label htmlFor="">
            <input type="password" name="password" placeholder="password" id="password" />
          </label>
         
          <input type="submit" value="Entrar" />
        
        </form>
      </div>
      <div className={styles.Panel_containerBanner}></div>
    </section>
  );
}
