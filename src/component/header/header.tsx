"use client"

import Link from "next/link"
import Styles from "./styles.module.css"
import Image from "next/image"
import { useEffect, useState } from "react"

const Header = ()=>{
    const [access, setAccess] = useState<boolean>(false)
    useEffect(()=>{
        const token = localStorage.getItem('token')
        token&&setAccess(true)

    },[])

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
                    <li><Link href={"/panel"}>Admin</Link></li>
                    <li><Link href={"/panel/gestao/cadastrar"}>Cadastrar carro</Link></li>
                    <li><Link href={"/panel/gestao/"}>Carros Cadastrados</Link></li>
                    <li><Link href={""}>Contacto</Link></li>
                    <li><Link href={access?"/login":"/login"}>
                    <Image
                    src={"/avatar.png"}
                    width={25}
                    height={25}
                    quality={100}
                    alt=""
                    />
                    {access?"Minha conta":"Login"}</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header