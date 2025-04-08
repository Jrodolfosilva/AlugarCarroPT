'use client'
import { useContext, useEffect, useState } from "react";
import CardCar from "@/component/cardCar/car";
import { GetCarrosByFiltro } from "@/services/carros";
import {CarroType, ParamsFilterType} from "../utils/types"
import styles from "./page.module.css";
import { contextUser } from "@/component/context/useContext";

type ChecksType ={
  checkin: string;
  checkout: string;
}

export default function Home() {
  
 
  const datenow = useContext(contextUser)?.date
  const [carros,setCarros] = useState<CarroType[]>()
  const [days,setDays] = useState<number>()
  const [checks,SetChecks] = useState<ChecksType>()

  async function filterCarros (e:React.FormEvent<HTMLElement>){
   
    e.preventDefault();
    
    const data =  new FormData(e.target as HTMLFormElement)
    const formData = new FormData();

    let retirada =  data.get("retirada") as string
    let devolucao =  data.get("devolucao") as string;
    
    
    if(retirada && devolucao){
      
      let retirada =  data.get("retirada") as string
      let devolucao =  data.get("devolucao") as string;
      
      formData.append('data_init', `${new Date(retirada).toLocaleDateString("pt-BR")}`);
      formData.append('data_fim', `${new Date(devolucao).toLocaleDateString("pt-BR")}`);

      formData.append('categoria', data.get('categoria') as string || "");
      formData.append('quant', data.get('passageiros') as string || "");
      formData.append('tipo', data.get("tipo") as string || "");
      formData.append('transmissao', data.get("transmissao") as string || "");
      formData.append('valor_diaria', data.get("diaria") as string || "");

      
      try {
        const response = await GetCarrosByFiltro(formData)

        setCarros(response)

        const time = (new Date(devolucao).getTime() -new Date(retirada).getTime() ) / (1000 * 60 * 60 * 24) + 1;   
        setDays(time)
        SetChecks({checkin: retirada, checkout: devolucao})
               
        
        
      } catch (error) {
        alert("Nenhum veículo encontrado!!")
      }

    }
    else{
      alert("Selecione a data de retirada e devolução")
    }
      
     
  }

  return (
    <section className={styles.containerHome}>
      <div className={styles.containerHome_banner}></div>
      <div className={styles.containerHome_filter}>
          <div>
            <form onSubmit={filterCarros}>

                  <label htmlFor="">
                    <span>Categoria</span>
                    <select name="categoria" id="categoria" defaultValue={""}>
                      <option value="" disabled>Selecione</option>
                      <option value="pequeno">Pequeno</option>
                      <option value="medio">Médio</option>
                      <option value="grande">Grande</option>
                      <option value="suv">SUV</option>
                      <option value="luxo">Luxo</option>
                    </select>
                  </label>

                  <label htmlFor="">
                    <span>Transmissão</span>
                    <select name="transmissao" id="transmissao" defaultValue={""}>
                      <option value="" disabled>Selecione</option>
                      <option value="automatico">Automático</option>
                      <option value="manual">Manual</option>
                    </select>
                  </label>

                  <label htmlFor="">
                    <span>Tipo do veículo</span>
                    <select name="tipo" id="tipo" defaultValue={""}>
                      <option value="" disabled>Selecione</option>
                      <option value="carro">Carro</option>
                      <option value="moto">Moto</option>
                    </select>
                  </label>

                  <label>
                    <span>Valor da Diária</span>
                    <input type="number" name="diaria" id="diaria" placeholder="Valor da Diária" />
                  </label>

                  <label htmlFor="">
                    <span>Retirada</span>
                    <input type="date" name="retirada" id="retirada" min={datenow}  />
                  </label>

                  <label htmlFor="">
                    <span>Devolução</span>
                    <input type="date" name="devolucao" id="devolucao"  min={datenow}   />
                  </label>

                  <label htmlFor="">
                    <span>Passageiros</span>
                    <select name="passageiros" id="passageiros" defaultValue={""}>
                      <option value="" disabled>Selecione</option>
                      <option value="1-4">1-4</option>
                      <option value="5-6">5-6</option>
                      <option value="7">mais de 7</option>
                    </select>
                  </label>

                  <input type="submit" value="Buscar" />
                
            </form>
          </div>
      </div>
      {carros&&<div className={styles.containerCarros}>
        <h2>Veículos disponíveis:</h2>
        <ul>
          {carros?.map((car:CarroType)=>(
            <CardCar checkin={checks?.checkin} checkout={checks?.checkout} days={days} carro={car} key={car.placa} client={true}/>
            
          ))}
        </ul>
        
      </div>}
    </section>
  );
}
