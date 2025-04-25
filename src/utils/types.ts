export type LoginUserType={
    email:string,
    password:string
}

export type CreateLoginType ={
    username : string,
    password : string,
    email : string,
    telefone : string,
    nif : string
}


export type CreateAgendamentoType ={
    email: string;
    password: string;
    username: string;
    telefone?: string;
    nif?: string;
    veiculo?: number;
    data_inicio: string; 
    data_fim: string;
}


export type EditAgendamentoType = {
    veiculo: number;
    data_inicio: string;
    data_fim: string;
    id:string
}


export type CreateCadastroCarroType={
    veiculo: string;
    quant:number;
    tipo:string;
    marca: string;
    transmissao: string;
    valor_diaria: string;
    categoria: string;
    foto: FileList;
    placa: string;
    data_inspecao: string;
}


export type ParamsFilterType ={
    quant?: string;
    tipo?: string;
    marca?: string;
    transmissao?: string;
    categoria?: string;
    valor_diaria?: string;
    data_init?: string;
    data_fim?: string;

}


export type CarroType = {
    id: string,
    veiculo: string,
    quant: string,
    tipo: string,
    marca: string,
    transmissao: string,
    valor_diaria: number,
    categoria: string,
    foto: string,
    placa: string,
    data_inspecao: string
}

export type TokenType ={
    token_type: string,
    exp: number,
    iat: number,
    jti: string,
    user_id: number
}

export type UserType = {
    name: string,
    email: string,
    password?: string,
    
}


export interface IUserLogin{
    Login: (user:UserType)=>Promise<void>,
}

export type UserContextType = {
    user?: UserType | null,
    login?: IUserLogin | null,
    date?: string
}



export type Agendamento = {
    userId: number;
    userId_nome: string;
    veiculo: number;
    veiculo_nome: string;
    veiculo_marca: string;
    data_inicio: string;
    data_fim: string;
    status: string;
    id: number  
  };
  