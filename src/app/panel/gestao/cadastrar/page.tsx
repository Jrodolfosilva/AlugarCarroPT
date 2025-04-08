import styles from "./cadastrar.module.css"


export default function Cadastrar(){
    return(
        <section className={styles.containerCadastro}>
            <span>Cadastro</span>
            <h1>Aqui será o cadastro dos carros!</h1>
            <div>
                <form action="">
                    <label htmlFor="">
                        <span>Nome</span>
                        <input type="text" name="veiculo" id="veiculo" placeholder="Ex: Fiat Kwid 1.6 flex" />
                    </label>
                    <label htmlFor="">
                        <span>Placa</span>
                        <input type="text" name="placa" id="placa"  placeholder="XXX XXXX"/>
                    </label>
                    <label htmlFor="">
                        <span>Categoria</span>
                        <select name="categoria" id="categoria" defaultValue={""}>
                            <option value={""} disabled>Selecionar</option>
                            <option value="suv">SUV</option>
                            <option value="suv">SUV</option>
                            <option value="suv">SUV</option>
                            <option value="suv">SUV</option>
                        </select>
                    </label>

                    <label htmlFor="">
                        <span>Tipo</span>
                        <select name="tipo" id="tipo" defaultValue={""}>
                            <option value={""} disabled>Selecionar</option>
                            <option value="carro">Carro</option>
                            <option value="motocicleta">motocicleta</option>
                        </select>
                    </label>
                    <label htmlFor="">
                        <span>Marca</span>
                        <select name="marca" id="marca" defaultValue={""}>
                            <option value={""} disabled>Selecionar</option>
                            <option value="kia">Kia</option>
                            <option value="renault">Renault</option>
                        </select>
                    </label>
                    <label htmlFor="">
                        <span>Transmissão</span>
                        <select name="trasmissao" id="trasmissao" defaultValue={""}>
                            <option value={""} disabled>Selecionar</option>
                            <option value="auto">Auto</option>
                            <option value="semi">Semi</option>
                            <option value="manual">Manual</option>
                        </select>
                    </label>
                    <label htmlFor="">
                        <span>Diária</span>
                        <input type="text" name="valor_diaria" id="valor_diaria" placeholder="Ex 10 euro" />
                    </label>
                    <label htmlFor="">
                        <span>Capacidade</span>
                        <select name="quant" id="quant" defaultValue={""}>
                            <option value={""} disabled>Selecionar</option>
                            <option value="3">3 Pessoas</option>
                            <option value="4">4 Pessoas</option>
                            <option value="5">5 Pessoas</option>
                            <option value="7">7 ou mais Pessoas</option>
                        </select>
                    </label>    

                    <label htmlFor="">
                        <span>Última inspeção</span>
                        <input type="date" name="data_inspecao" id="data_inspecao" />
                    </label>
                    <label htmlFor="">
                        <span>Imagem de Capa</span>
                        <input type="file" name="foto" id="foto" accept="image/*" />
                    </label>

                    <input type="submit" value="Cadastrar" />
                </form>

            </div>
        </section>
    )
}