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

export async function buscarCarros (){
    try {
        const data = await fetch(`${baseURL}carros`,{
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
    
export async function cadastroCarro  (carroData:FormData, token:string){

    try {
        const carro = await fetch(`${baseURL}cadastro/carros/`,{
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: carroData
        }
        );
    
        const reponse =  await carro.json() 

        return reponse

    } catch (error) {
        return {"error":error}
    }
}


export async function atualizarCarro(carroData: FormData, token: string,) {
    try {
      const carro = await fetch(`${baseURL}cadastro/carros/`, {
        method: "PUT", 
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: carroData,    
      });
  
      const response = await carro.json();
  
      return response; 
  
    } catch (error) {
      return { "error": error }; 
    }
}

export async function deleteCarro(token: string, carroId: string) {
        try {
          const data = new FormData();
          data.append('id', carroId.toString());
      
          const response = await fetch(`${baseURL}cadastro/carros/`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: data,
          });
      
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Erro ao excluir o veículo');
          }
      
          const result = await response.json();
          console.log(result.message);
          return result; // Retorna o resultado da exclusão
      
        } catch (error) {
          console.error(error);
          return { error: 'Erro ao excluir o veículo' };
        }
      }