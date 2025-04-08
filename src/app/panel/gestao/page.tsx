"use client"

import Link from "next/link"
import styles from "./page.module.css"
import CardCar from "@/component/cardCar/car"
import { useEffect, useState } from "react"
import { CarroType } from "@/utils/types"
import { GetCarros } from "@/services/carros"

export default function Gestão (){
    const [carros,setCarros] = useState<CarroType[] | undefined>(undefined);

    useEffect(()=>{
       
        (async()=>{
            GetCarros()
            .then((data)=>setCarros(data))
            .catch((error)=>alert("ererrororr"))

        })()

    },[]);

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
                    {
                        carros?.map((car)=>(
                            <CardCar key={car.placa} carro={car}/>
                        ))
                    }
                    
                    
                </ul>
            </div>
        </section>
    )
}