import Link from "next/link"
import styles from "./page.module.css"
import CardCar from "@/component/cardCar/car"

export default function Gestão (){
    return(
        <section className={styles.containerGestao}>
            <div className={styles.containerGestao_navBar}>
                <div>
                    <span>Gestão</span>
                    <h1>Carros</h1>
                </div>
                <div>
                    <Link href="gestao/cadastrar">Cadastrar</Link>
                </div>
            </div>
            <div className={styles.containerGestao_listCar}>
                <ul>
                    <CardCar/>
                    <CardCar/>
                    <CardCar/>
                    <CardCar/>
                    <CardCar/>
                    <CardCar/>
                </ul>
            </div>
        </section>
    )
}