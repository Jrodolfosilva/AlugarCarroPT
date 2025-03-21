import { CreateAgendamentoType, EditAgendamentoType } from "@/utils/types"
import { baseURL } from "./config";

export default async function GetAgendamento (token:string){

   try {
    const agendamento = await fetch(`${baseURL}agendamento/`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    const response = await agendamento.json();

    return response

   } catch (error) {

        return error

   }
}



export async function CreateAgendamento (agendamentoData:CreateAgendamentoType){
    try {
        const agendamento = await fetch("http://localhost:8000/api/v1/agendamento/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQyNTAzMDYwLCJpYXQiOjE3NDI1MDI3NjAsImp0aSI6ImQ3ZDc3Mjk3NTcxZDRiN2ZhYjFhMjZhYTUxNDkwZTYzIiwidXNlcl9pZCI6MX0.AROWH-47HM8Zh0PbFOTBmF-1ByMKD-KhJU1TiYp8oHY"
            },
            body: JSON.stringify(agendamentoData)
        })

        const response = await agendamento.json();

        return response

    } catch (error) {
        return error
    }
}



export async function UpdateAgendamento (agendamentoData:EditAgendamentoType){
    try {
        const agendamento = await fetch("http://localhost:8000/api/v1/agendamento/",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQyNTAzMDYwLCJpYXQiOjE3NDI1MDI3NjAsImp0aSI6ImQ3ZDc3Mjk3NTcxZDRiN2ZhYjFhMjZhYTUxNDkwZTYzIiwidXNlcl9pZCI6MX0.AROWH-47HM8Zh0PbFOTBmF-1ByMKD-KhJU1TiYp8oHY"
            },
            body: JSON.stringify(agendamentoData)
        })

        const response = await agendamento.json();
        return response

    } catch (error) {
        return error
    }
}