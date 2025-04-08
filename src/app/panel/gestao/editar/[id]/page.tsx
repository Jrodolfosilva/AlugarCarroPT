"use client"

import { usePathname, useSearchParams } from "next/navigation"
import styles from "./editar.module.css"


export default function Editar(){

    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    console.log(search)
    
    

    return(
        <section className={styles.containerCadastro}>
            <h1>Aqui será a EDIÇÃO dos carros!</h1>
        </section>
    )
}