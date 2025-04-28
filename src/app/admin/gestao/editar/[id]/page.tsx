"use client";
import Cookies from "js-cookie";
import styles from "./editar.module.css";
import { atualizarCarro, deleteCarro } from "@/services/carros";
import { useState, useEffect } from "react";
import { usePathname,useRouter  } from "next/navigation";  
import { baseURL } from "@/services/config";



export default function Editar() {
  const [mensagem, setMensagem] = useState("");
  const [dadosSelect, setDadosSelect] = useState({
    categoriaVeiculo: [],
    quantVeiculo: [],
    tipoVeiculo: [],
    transVe: []
  });
  const [carro, setCarro] = useState<any>({
    id: "",
    veiculo: "",
    quant: "",
    tipo: "",
    marca: "",
    transmissao: "",
    valor_diaria: "",
    categoria: "",
    foto: "",
    placa: "",
    data_inspecao: "",
  });

  const pathname = usePathname();  
  const id = pathname.split("/").pop();  
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchCarroData(); 
    }

    async function fetchSelectData() {
      try {
        const res = await fetch(`${baseURL}info/dados/list/`);
        const data = await res.json();
        setDadosSelect(data);
      } catch (error) {
        console.error("Erro ao carregar os dados dos selects:", error);
      }
    }

    fetchSelectData();
  }, []);  

 
const fetchCarroData = async () => {
    try {
      const res = await fetch(`${baseURL}carro/${id}`);
      const data = await res.json();

    
      const [day, month, year] = data.data_inspecao.split('/');
      const dataFormatada = `${year}-${month}-${day}`;

      setCarro({ ...data, data_inspecao: dataFormatada }); 
    } catch (error) {
      console.error("Erro ao buscar os dados do carro:", error);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMensagem("");
    const token = Cookies.get("tokenAdmin");
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      if (!token) {
        setMensagem("Você não está logado");
        return;
      }
      if(!id) {
        setMensagem("ID do carro não encontrado");
        return;
      }
      formData.append("id", id);
      const response = await atualizarCarro(formData, JSON.parse(token).access);

      if (!response.error) {
        alert("Carro alterado com sucesso!");
        fetchCarroData()
      } else {
        const data = await response.json();
        setMensagem(data.error || "Erro ao alterar o carro.");
      }
    } catch (error) {
      setMensagem("Erro na requisição.");
    }
  }

  async function handleDelete() {
    const confirmar = confirm("Tem certeza que deseja excluir este veículo?");
    if (!confirmar) return;
    const token = Cookies.get("tokenAdmin");
    if (!token || !id) {
      setMensagem("Não foi possível excluir o carro.");
      return;
    }
    const response = await deleteCarro(JSON.parse(token).access, id);
    if (!response.error) {
      alert("Carro excluído com sucesso!");
      router.push("/admin/gestao");
      
    } else {
      setMensagem(response.error);
    }
  }


  return (
    <section className={styles.containerCadastro}>
      <nav className="bread">
        <ul>
          <li><a href="/">Home /</a></li>
          <li><a href="/admin/gestao">Gestão /</a></li>
          <li>Editar</li> 
        </ul>
      </nav>
      
     
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome</span>
            <input
              type="text"
              name="veiculo"
              value={carro.veiculo}
              onChange={(e) => setCarro({ ...carro, veiculo: e.target.value })}
              placeholder="Ex: Fiat Kwid 1.6 flex"
              required
            />
          </label>
          <label>
            <span>Placa</span>
            <input
              type="text"
              name="placa"
              value={carro.placa}
              onChange={(e) => setCarro({ ...carro, placa: e.target.value })}
              placeholder="XXX XXXX"
              required
            />
          </label>
          <label>
            <span>Categoria</span>
            <select name="categoria" required value={carro.categoria} onChange={(e) => setCarro({ ...carro, categoria: e.target.value })}>
              <option value="" disabled>Selecionar</option>
              {dadosSelect.categoriaVeiculo.map((item: any) => (
                <option key={item.id} value={item.id}>{item.categoria}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Tipo</span>
            <select name="tipo" required value={carro.tipo} onChange={(e) => setCarro({ ...carro, tipo: e.target.value })}>
              <option value="" disabled>Selecionar</option>
              {dadosSelect.tipoVeiculo.map((item: any) => (
                <option key={item.id} value={item.id}>{item.tipo}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Marca</span>
            <select name="marca" required value={carro.marca} onChange={(e) => setCarro({ ...carro, marca: e.target.value })}>
              <option value="" disabled>Selecionar</option>
              <option value="kia">Kia</option>
              <option value="renault">Renault</option>
            </select>
          </label>
          <label>
            <span>Transmissão</span>
            <select name="transmissao" required value={carro.transmissao} onChange={(e) => setCarro({ ...carro, transmissao: e.target.value })}>
              <option value="" disabled>Selecionar</option>
              {dadosSelect.transVe.map((item: any) => (
                <option key={item.id} value={item.id}>{item.transmissao}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Diária</span>
            <input
              type="text"
              name="valor_diaria"
              value={carro.valor_diaria}
              onChange={(e) => setCarro({ ...carro, valor_diaria: e.target.value })}
              placeholder="Ex: 10 euro"
              required
            />
          </label>
          <label>
            <span>Capacidade</span>
            <select name="quant" required value={carro.quant} onChange={(e) => setCarro({ ...carro, quant: e.target.value })}>
              <option value="" disabled>Selecionar</option>
              {dadosSelect.quantVeiculo.map((item: any) => (
                <option key={item.id} value={item.id}>{item.quant}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Última inspeção</span>
            <input
              type="date"
              name="data_inspecao"
              value={carro.data_inspecao}
              onChange={(e) => setCarro({ ...carro, data_inspecao: e.target.value })}
              required
            />
          </label>
          <label>
            <span>Imagem de Capa</span>
            <input type="file" name="foto" accept="image/*" />
          </label>

          <input type="submit" value="Alterar" />
          <button type="button" onClick={handleDelete} className={styles.excluirCarro}>Excluir Veículo</button>
          {mensagem && <p>{mensagem}</p>}
        </form>
      </div>
    </section>
  );
}
