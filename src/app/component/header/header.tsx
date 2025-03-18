import Link from "next/link"
import Styles from "./styles.module.css"
import Image from "next/image"
const Header = ()=>{
    return(
        <header className={Styles.containerHeader}>
            <Link href={"/"}>
                <Image
                    src={"/logo-alugarcarro.png"}
                    width={200}
                    height={40}
                    alt="Logo alugarCarro"
                    
                />
            </Link>
            <nav>
                <ul>
                    <li><Link href={"/"}>Home</Link></li>
                    <li><Link href={""}>Sobre</Link></li>
                    <li><Link href={""}>Aluguel de Carros</Link></li>
                    <li><Link href={""}>Contacto</Link></li>
                    <li><Link href={"/login"}>
                    <Image
                    src={"/avatar.png"}
                    width={25}
                    height={25}
                    quality={100}
                    alt=""
                    />
                    Login</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header