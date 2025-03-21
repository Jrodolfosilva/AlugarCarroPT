import { CreateCadastroCarroType, ParamsFilterType } from "@/utils/types"
import { baseURL } from "./config";


export async function GetCarros (paramsFilter:ParamsFilterType){

    const carros =  fetch(`${baseURL}carros/filtros/`,{
        method: "GET",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(paramsFilter)
    })
    const response = (await carros).json()

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