import Image from "next/image"
import styles from "./car.module.css"

const CardCar = ()=>{

    return(
       <li className={styles.containerCardCar}>
            <Image src={"/pc.png"} width={100} height={100} alt=""/>
            <div>
                <h2>FIAT MOBI 1.0 RENAULT </h2>
                <p>Description car</p>
                <span>Status</span>
            </div>
       </li>
    )
}

export default CardCar