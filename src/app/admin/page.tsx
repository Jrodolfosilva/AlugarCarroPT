'use client'

import styles from "./page.module.css";
import Link from "next/link";
import { Auth } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

export default function Panel() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function acesso(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const { email, password } = e.currentTarget;

    const user = {
      email: email.value,
      password: password.value
    };

    const response = await Auth(user);
    console.log(response);

    if (response.access) {
      Cookies.set("tokenAdmin", JSON.stringify(response), { expires: 1 });
      router.push('/admin/gestao');
    } else {
      setError(response.error || "Erro ao realizar login. Verifique as credenciais.");
    }
  }

  return (
    <section className={styles.containerPanel}>
      <div className={styles.Panel_containerForm}>
        <span>Panel</span>
        <h1>Acesse sua conta</h1>
        <form onSubmit={acesso}>
          <label htmlFor="email">
            <input type="email" name="email" id="email" placeholder="joao@mail.com" required />
          </label>
          <label htmlFor="password">
            <input type="password" name="password" placeholder="Senha" id="password" required />
          </label>
          <input type="submit" value="Entrar" />
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
      <div className={styles.Panel_containerBanner}></div>
    </section>
  );
}
