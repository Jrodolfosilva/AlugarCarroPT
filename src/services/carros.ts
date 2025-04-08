import { CreateCadastroCarroType, ParamsFilterType } from "@/utils/types"
import { baseURL } from "./config";


export async function GetCarrosByFiltro (filtro:FormData){
    console.log(filtro)
    try {
        const carros = await fetch(`${baseURL}carros/filtros/`,{
            method: "POST",
            body:filtro
            
        })
        const response = await carros.json()
    
        return response
        
    } catch (error) {
        
        return error
    }


}

export async function GetCarByID (id:string|undefined){
    try {
        const data = await fetch(`${baseURL}carro/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const response = await data.json()
    
        return response

    } catch (error) {
        return {"error":error}
    }
}
    
export async function CreateCarro (carroData:CreateCadastroCarroType){

    try {
        const carro = await fetch(`${baseURL}cadastro/carros/`,{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(carroData)
        }
        );
    
        const reponse =  await carro.json() 

        return reponse

    } catch (error) {
        return error
    }
}