import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Panel() {
  return (
    <section className={styles.containerPanel}>
      <div className={styles.Panel_containerForm}>
        <span>Panel</span>
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
      <div className={styles.Panel_containerBanner}></div>
    </section>
  );
}
