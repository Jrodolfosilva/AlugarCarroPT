'use client'

import styles from "./reserva.module.css"
import { useState } from "react"
import { redirect, useSearchParams } from "next/navigation"
import Image from "next/image"
import { criarAgendamento } from "@/services/agendamentos"
import { useEffect, useState as useAsyncState } from "react"
import { GetCarByID } from "@/services/carros"
import { CarroType } from "@/utils/types"

export default function Reserva() {
  const searchParams = useSearchParams()
  const car = searchParams.get("car")
  const days = searchParams.get("days")
  const checkin = searchParams.get("checkin")
  const checkout = searchParams.get("checkout")

  const daysNumber = Number(days)
  const [carro, setCarro] = useAsyncState<CarroType | null>(null)
  const [temConta, setTemConta] = useState(false)

  useEffect(() => {
    if (car) {
      GetCarByID(car).then(setCarro).catch(console.error)
    }
  }, [car])

  if (!carro) return <p>Carregando...</p>

  const valorTotal = Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(carro.valor_diaria * daysNumber)

  async function confirmarReserva(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const formData = new FormData()

    formData.append("email", data.get("email") as string)
    formData.append("password", data.get("senha") as string)

    if (!temConta) {
      formData.append("username", data.get("nome") as string)
      formData.append("telefone", data.get("telefone") as string)
      formData.append("nif", data.get("nif") as string)
    }

    if (checkin && checkout && carro) {
      formData.append("veiculo", carro.id.toString())
      formData.append("data_inicio", new Date(checkin).toLocaleDateString("pt-BR"))
      formData.append("data_fim", new Date(checkout).toLocaleDateString("pt-BR"))
    } else {
      return console.log("erro")
    }

    const response = await criarAgendamento(formData)
    if(response.error){
      alert(JSON.stringify(response.error))
    }
    else{
      alert("Reserva criada com sucesso!")
      redirect("/login")
    }
    console.log(response)
  }

  return (
    <section className={styles.containerReserva}>
      <h1>Confirme sua Reserva </h1>
      <div className={styles.containerReservaContent}>
        <form className={styles.dados} onSubmit={confirmarReserva}>
          <div className={styles.dadosLogin}>
            <h2>{temConta ? "Login" : "Cadastro"}</h2>

            <div className={styles.formCadastro}>
              {!temConta && (
                <>
                  <label htmlFor="nome">
                    <span>Nome</span>
                    <input name="nome" type="text" placeholder="Ex: João" />
                  </label>
                  <label htmlFor="nif">
                    <span>NIF</span>
                    <input name="nif" type="text" placeholder="00 000 000 00000" />
                  </label>
                  <label htmlFor="telefone">
                    <span>Telefone</span>
                    <input name="telefone" type="tel" placeholder="+351 999 999 999" />
                  </label>
                </>
              )}
              <label htmlFor="email">
                <span>Email</span>
                <input name="email" type="email" placeholder="Ex: email@email.com" />
              </label>
              <label htmlFor="senha">
                <span>Senha</span>
                <input name="senha" type="password" placeholder="***********" />
              </label>
            </div>

            <p>
              {temConta?"Não possui uma conta?":"Você possui uma conta?"}
              <button type="button" onClick={() => setTemConta(!temConta)}>
                Clique aqui
              </button>
            </p>
          </div>

          <div className={styles.dadosPagamento}>
            <h2>Pagamento</h2>
            <p>
              O cartão de pagamento deve estar em nome do condutor principal e este deve estar presente aquando do levantamento.
            </p>
            <label htmlFor="cartao">
              <span>Número do Cartão</span>
              <input name="cartao" type="text" placeholder="XXXX XXXX XXXX XXXX" />
            </label>
            <label htmlFor="validade">
              <span>Data de validade</span>
              <input name="validade" type="text" placeholder="XX/XX" />
            </label>
            <label htmlFor="cvc">
              <span>CVC</span>
              <input name="cvc" type="text" placeholder="123" />
            </label>
            <input type="submit" value="Confirmar" />
          </div>
        </form>

        <div className={styles.confirmacao}>
          <Image src={`http://localhost:8000${carro.foto}`} width={300} height={200} alt="" />
          <h2>Resumo TOTAL</h2>
          <p>{carro.veiculo}</p>
          <p>Diária: €{carro.valor_diaria}/Dia</p>
          <p>Retirada: {checkin && new Date(checkin).toLocaleDateString("pt-BR")}</p>
          <p>Devolução: {checkout && new Date(checkout).toLocaleDateString("pt-BR")}</p>
          <p>Duração: {daysNumber == 1 ? `${daysNumber}/dia` : `${daysNumber}/dias`}</p>
          <p>Passageiros: {carro.quant}</p>
          <p>Tipo do veículo: {carro.tipo}</p>
          <p>Placa: {carro.placa}</p>
          <p>Marca: {carro.marca}</p>
          <h3>Total: {valorTotal}</h3>
        </div>
      </div>
    </section>
  )
}
