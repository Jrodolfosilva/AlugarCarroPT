'use client'
import Cookies from "js-cookie";
import styles from "./cadastrar.module.css";
import { cadastroCarro } from "@/services/carros";
import { useState, useEffect } from "react";
import { baseURL } from "@/services/config";

export default function Cadastrar() {
  const [mensagem, setMensagem] = useState("");
  const [dadosSelect, setDadosSelect] = useState({
    categoriaVeiculo: [],
    quantVeiculo: [],
    tipoVeiculo: [],
    transVe: []
  });

  useEffect(() => {
    console.log("Token:", Cookies.get("tokenAdmin"));

    async function fetchSelectData() {
      try {
        const res = await fetch(`${baseURL}/info/dados/list/`);
        const data = await res.json();
        setDadosSelect(data);
      } catch (error) {
        console.error("Erro ao carregar os dados dos selects:", error);
      }
    }

    fetchSelectData();
  }, []);

  

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setMensagem("");
      const token = Cookies.get("tokenAdmin");
      const form = e.currentTarget;
      const formData = new FormData(form);
      
      console.log(formData.get("trasmissao"));
      
      const dataIso = formData.get("data_inspecao") as string;
      
     
      if (dataIso) {
        const data = new Date(dataIso);
        const dataBr = data.toLocaleDateString("pt-BR"); 
        formData.set("data_inspecao", dataBr);
      }

    try {
      if (!token) {
        setMensagem("Você não está logado");
        return;
      }

      const response = await cadastroCarro(formData, JSON.parse(token).access);

      if (!response.error) {
        alert("Carro cadastrado com sucesso!");
        form.reset();
      } else {
        const data = await response.json();
        setMensagem(data.error || "Erro ao cadastrar o carro.");
      }
    } catch (error) {
      setMensagem("Erro na requisição.");
    }
  }

  return (
    <section className={styles.containerCadastro}>
      <nav className="bread ">
        <ul>
          <li><a href="/">Home /</a></li>
          <li><a href="/admin/gestao">Gestão /</a></li>
          <li>Cadastrar</li> 
        </ul>
      </nav>
      <h1>Aqui será o cadastro dos carros!</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome</span>
            <input type="text" name="veiculo" placeholder="Ex: Fiat Kwid 1.6 flex" required />
          </label>
          <label>
            <span>Placa</span>
            <input type="text" name="placa" placeholder="XXX XXXX" required />
          </label>
          <label>
            <span>Categoria</span>
            <select name="categoria" required defaultValue="">
              <option value="" disabled>Selecionar</option>
              {dadosSelect.categoriaVeiculo.map((item: any) => (
                <option key={item.id} value={item.id}>{item.categoria}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Tipo</span>
            <select name="tipo" required defaultValue="">
              <option value="" disabled>Selecionar</option>
              {dadosSelect.tipoVeiculo.map((item: any) => (
                <option key={item.id} value={item.id}>{item.tipo}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Marca</span>
            <select name="marca" required defaultValue="">
              <option value="" disabled>Selecionar</option>
              <option value="kia">Kia</option>
              <option value="renault">Renault</option>
            </select>
          </label>
          <label>
            <span>Transmissão</span>
            <select name="transmissao" required defaultValue="">
              <option value="" disabled>Selecionar</option>
              {dadosSelect.transVe.map((item: any) => (
                <option key={item.id} value={item.id}>{item.transmissao}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Diária</span>
            <input type="text" name="valor_diaria" placeholder="Ex: 10 euro" required />
          </label>
          <label>
            <span>Capacidade</span>
            <select name="quant" required defaultValue="">
              <option value="" disabled>Selecionar</option>
              {dadosSelect.quantVeiculo.map((item: any) => (
                <option key={item.id} value={item.id}>{item.quant}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Última inspeção</span>
            <input type="date" name="data_inspecao" required />
          </label>
          <label>
            <span>Imagem de Capa</span>
            <input type="file" name="foto" accept="image/*" required />
          </label>

          <input type="submit" value="Cadastrar" />
          {mensagem && <p>{mensagem}</p>}
        </form>
      </div>
    </section>
  );
}
