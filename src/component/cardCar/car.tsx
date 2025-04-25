
import Image from "next/image"
import styles from "./car.module.css"
import { CarroType } from "@/utils/types"
import Link from "next/link"
import { deleteCarro } from "@/services/carros"


type Props ={
    carro: CarroType | undefined;
    client? : boolean;
    days?:number | undefined;
    checkin?: string | undefined
    checkout?: string | undefined
}

const CardCar = (carro:Props) => {
   
    const url = carro.client?`/reserva/?car=${carro.carro?.id}&days=${carro.days}&checkin=${carro.checkin}&checkout=${carro.checkout}`: `gestao/editar/${carro.carro?.id}`
    return(
       <li >
            <Link href={url} className={styles.containerCardCar}>
            
                <Image src={`http://localhost:8000${carro.carro?.foto}`} width={100} height={150} alt=""/>
                <div>
                    <h2>{carro.carro?.veiculo}</h2>
                    <span>Desde:</span>
                    <p><b>Valor</b>: €{carro.carro?.valor_diaria}/dia</p>
                    
                </div>
                <button>{carro.client?"Selecionar": "Editar"}</button>
            </Link>
       </li>
    )
}

export default CardCar