"use client"

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { buscarAgendamento, atualizarAgendamento, excluirAgendamento } from "@/services/agendamentos";
import type { Agendamento } from "@/utils/types";
import Styles from "./page.module.css";

export default function Account() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [originalDataInicio, setOriginalDataInicio] = useState(""); 
  const [originalDataFim, setOriginalDataFim] = useState(""); 

  useEffect(() => {
    const tokenUser = Cookies.get("tokenUser");
    if (!tokenUser) return;
    const token = JSON.parse(tokenUser);

    buscarAgendamento(token.access).then((data) => {
      if (data) {
        setAgendamentos(data);
      }
    });
  }, []);

  const hoje = new Date().toISOString().split("T")[0];

  const formatarData = (data: string) => {
    if (!data) return "Data inválida";

    if (data.includes("-")) {
      const [ano, mes, dia] = data.split("-");
      return `${dia}/${mes}/${ano}`;
    }

    if (data.includes("/")) {
      return data;
    }

    return "Data inválida";
  };

  const handleReagendarClick = (agendamento: Agendamento) => {
    setEditingId(agendamento.id);
    setDataInicio(agendamento.data_inicio);
    setDataFim(agendamento.data_fim);
    setOriginalDataInicio(agendamento.data_inicio); 
    setOriginalDataFim(agendamento.data_fim); 
  };

  const handleDeleteClick = async (id: number) => {
    const confirmar = confirm("Deseja realmente excluir este agendamento?");
    if (!confirmar) return;

    const tokenUser = Cookies.get("tokenUser");
    if (!tokenUser) return;
    const token = JSON.parse(tokenUser);

    const response = await excluirAgendamento(token.access, id);

    if (response.ok) {
      alert("Agendamento excluído com sucesso!");
      const novos = await buscarAgendamento(token.access);
      if (novos) setAgendamentos(novos);
    } else {
      alert("Erro ao excluir o agendamento.");
    }
  };

  const calcularDias = (data1: string, data2: string) => {
    const d1 = new Date(data1);
    const d2 = new Date(data2);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    agendamentoId: number,
    veiculoId: number
  ) => {
    e.preventDefault();
    const tokenUser = Cookies.get("tokenUser");
    if (!tokenUser) return;
    const token = JSON.parse(tokenUser);

    const diasOriginais = calcularDias(originalDataInicio, originalDataFim);
    const diasNovos = calcularDias(dataInicio, dataFim);

    if (diasNovos > diasOriginais) {
      alert(`O novo intervalo de datas não pode ser maior que ${diasOriginais} dias. 
      O intervalo possível para o reagendamento é de até ${diasOriginais} dias entre ${formatarData(originalDataInicio)} e ${formatarData(originalDataFim)}.`);
      return;
    }

    const formData = new FormData();
    formData.append("id", String(agendamentoId));
    formData.append("veiculo", String(veiculoId));
    formData.append("data_inicio", formatarData(dataInicio));
    formData.append("data_fim", formatarData(dataFim));

    const resultado = await atualizarAgendamento(token.access, formData);

    if (resultado.error) {
      alert(JSON.stringify(resultado.error));
      return;
    }
    alert("Agendamento reagendado com sucesso!");
    setEditingId(null);
    buscarAgendamento(token.access).then((data) => {
      if (data) setAgendamentos(data);
    });
  };

  return (
    <section className={Styles.containerPerfil}>
      <h1>Aluguéis</h1>
      <br />
      <hr />
      <br />

      {agendamentos.length > 0 ? (
        <ul className={Styles.listaAgendamentos}>
          {agendamentos.map((ag, i) => (
            <li key={i} className={Styles.cardAgendamento}>
              
              <strong>{ag.veiculo_nome}</strong> ({ag.veiculo_marca})<br />
              De: {formatarData(ag.data_inicio)} até {formatarData(ag.data_fim)}<br />
              Status: <em>{ag.status}</em>
              <div className={Styles.botoes}>
                <button
                  onClick={() => handleDeleteClick(ag.id)}
                  className={Styles.btnExcluir}
                >
                  Excluir
                </button>
                <button
                  onClick={() => handleReagendarClick(ag)}
                  className={Styles.btnReagendar}
                >
                  Reagendar
                </button>
              </div>

              {editingId === ag.id && (
                <form
                  className={Styles.formularioReagendamento}
                  onSubmit={(e) => handleSubmit(e, ag.id, ag.veiculo)}
                >
                  <div className={Styles.campoFormulario}>
                    <label>Nova data de início:</label>
                    <input
                      type="date"
                      min={hoje}
                      value={dataInicio}
                      onChange={(e) => setDataInicio(e.target.value)}
                      required
                    />
                  </div>
                  <div className={Styles.campoFormulario}>
                    <label>Nova data de fim:</label>
                    <input
                      type="date"
                      min={dataInicio || hoje}
                      value={dataFim}
                      onChange={(e) => setDataFim(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className={Styles.btnAtualizar}>
                    Atualizar
                  </button>
                </form>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum agendamento encontrado.</p>
      )}
    </section>
  );
}
