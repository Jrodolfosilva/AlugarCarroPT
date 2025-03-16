import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Login() {
  return (
    <section className={styles.containerLogin}>
      <div className={styles.Login_containerForm}>
        <span>Login</span>
        <h1>Acesse sua conta</h1>
        <form>
          <label htmlFor="">
            <input type="email" name="email" id="" placeholder="joao@mail.com" />
          </label>
          <label htmlFor="">
            <input type="password" name="password" placeholder="Senha" id="" />
          </label>
          <p>Você ainda não possui uma conta?<Link href={""}> Criar conta</Link></p>
          <input type="submit" value="Entrar" />
        </form>
      </div>
      <div className={styles.Login_containerBanner}></div>
    </section>
  );
}
