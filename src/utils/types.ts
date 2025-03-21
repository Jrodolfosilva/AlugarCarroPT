export type LoginUserType={
    email:string,
    password:string
}

export type CreateLoginType ={

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
    valor_diario?: string;
    data_init?: string;
    data_fim?: string;

}