


import { baseURL } from "@/services/config"
import styles from "./reserva.module.css"
import { CarroType } from "@/utils/types";
import { redirect } from "next/dist/server/api-utils";
import { GetCarByID } from "@/services/carros";

 

export default  
async function Reserva ({searchParams}: {searchParams: { [key: string]: string | undefined }}){
    
    const {car,days,checkin,checkout} = searchParams

    const daysNumber = Number(days)
    const carro:CarroType = await GetCarByID(car)
       
    
   
 

   async function confirmarReserva (){
        'use server'
    }


    return(
        <section className={styles.containerReserva}>
            <h1>Confirme sua Reserva </h1>
            <div className={styles.containerReservaContent}>
                <div className={styles.dados}>
                    <div className={styles.dadosLogin}>
                        <h2>Cadastro</h2>
                        <form action={confirmarReserva}>
                            <label htmlFor="">
                                <span>Nome</span>
                                <input type="text" placeholder="Ex: João" />
                            </label>
                            <label htmlFor="">
                                <span>Apelido</span>
                                <input type="text" placeholder="Ex: Silva" />
                            </label>
                            <label htmlFor="">
                                <span>Email</span>
                                <input type="email" placeholder="Ex: email@email.com" />
                            </label>
                            <label htmlFor="">
                                <span>Telefone</span>
                                <input type="tel" placeholder="+351 999 999 999" />
                            </label>
                            
                            <span>Você já possui um conta? <button>Fazer login</button></span>
                        </form>
                    </div>
                    <div className={styles.dadosPagamento}>
                        <h2>Pagamento</h2>
                        <p>O cartão de pagamento deve estar em nome do condutor principal e este deve estar presente aquando do levantamento.</p>
                        <form action={confirmarReserva} >
                            <label htmlFor="">
                                <span>Número do Cartão</span>
                                <input type="text" placeholder="XXXX XXXX XXXX XXXX" />
                            </label>
                            <label htmlFor="">
                                <span>Data de validade</span>
                                <input type="text" placeholder="XX/XX" />
                            </label>
                            <label htmlFor="">
                                <span>CVC</span>
                                <input type="text" placeholder="123" />
                            </label>

                            <input type="submit" value="Confirmar"/>    
                        </form>
                    </div>
                    
                </div>


                <div className={styles.confirmacao}>
                    <h2>Resumo TOTAL</h2>
                    <p>{carro.veiculo}</p>
                    <p>Diária: €{carro.valor_diaria * daysNumber} / Dia</p>
                    <p>Retirada: {checkin&&new Date(checkin).toLocaleDateString('pt-BR')}</p>
                    <p>Devolução: {checkout&&new Date(checkout).toLocaleDateString('pt-BR')}</p>
                    
                    <p>Dias: {daysNumber}</p>
                    <p>Passageiros: {carro.quant}</p>
                    <p>Tipo do veículo: {carro.tipo}</p>
                    <p>Placa: {carro.placa}</p>
                    <p>Marca: {carro.marca}</p>
                </div>
            </div>
        </section>
    )
}