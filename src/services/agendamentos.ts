import { CreateAgendamentoType, EditAgendamentoType,Agendamento } from "@/utils/types"
import { baseURL } from "./config";









export async function criarAgendamento (agendamentoData:FormData){
    try {
        const agendamento = await fetch(`${baseURL}agendamento/`,{
            method:"POST",
            body:agendamentoData
        })

        const response = await agendamento.json();
        return response

    } catch (error) {
        console.log(error)  
        return {error:"Erro ao criar agendamento"}
    }
}







export async function buscarAgendamento(token: string | undefined) {
    if (!token) {
      console.warn("Token não encontrado!");
      return null;
    }
  
    try {
      const response = await fetch("http://localhost/api/v1/agendamento/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      });
  
     
  
      const data: Agendamento[] = await response.json();
      return data;
    } catch (err) {
      console.error("Erro ao buscar agendamentos:", err);
      return null;
    }
  }
  




export async function atualizarAgendamento(
    token: string,
    formData: FormData
  ) {
    if (!token) {
      console.warn("Token não encontrado!");
      return null;
    }
  
    try {
      const response = await fetch("http://localhost/api/v1/agendamento/", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          
        },
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        
        return { error: errorData };
      }
  
      const data = await response.json();
      return data;


    } catch (error) {
     
      return { error: "Erro ao atualizar agendamento" };
    }
  }
  



  export async function excluirAgendamento(token: string, id: number) {
    return fetch(`http://localhost/api/v1/agendamento/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
  }
  