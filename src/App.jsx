import { useState } from "react";
import "./App.css";
function App() {
  const [texto, setTexto] = useState("");
  const [tarefas, setTarefas] = useState([]);
  const [filtro, setFiltro] = useState("todas");
  function adicionarTarefa(evento) {
    evento.preventDefault();
    const textoLimpo = texto.trim();
    if (textoLimpo === "") return;
    const novaTarefa = { id: Date.now(), texto: textoLimpo, concluida: false };
    setTarefas((anteriores) => [...anteriores, novaTarefa]);
    setTexto("");
  }
  function alternarConclusao(id) {
    setTarefas((anteriores) =>
      anteriores.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa,
      ),
    );
  }
  function removerTarefa(id) {
    setTarefas((anteriores) => anteriores.filter((tarefa) => tarefa.id !== id));
  }
  function limparConcluidas() {
    setTarefas((anteriores) =>
      anteriores.filter((tarefa) => !tarefa.concluida),
    );
  }
  const total = tarefas.length;
  const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length;
  const pendentes = total - concluidas;
  const tarefasVisiveis = tarefas.filter((tarefa) => {
    if (filtro === "pendentes") return !tarefa.concluida;
    if (filtro === "concluidas") return tarefa.concluida;
    return true;
  });
  return (
    <>
      <main className="organizador">
        <h1>Organizador de tarefas</h1>
        <form onSubmit={adicionarTarefa}>
          <label htmlFor="nova-tarefa">Nova tarefa</label>
          <div className="campo-tarefa">
            <input
              id="nova-tarefa"
              type="text"
              value={texto}
              onChange={(evento) => setTexto(evento.target.value)}
              placeholder="Digite uma tarefa"
            />
            <button type="submit">Adicionar</button>
          </div>
        </form>
        <p>
          Total: {total} | Concluídas: {concluidas} | Pendentes: {pendentes}
        </p>
        <div className="filtros">
          <button type="button" onClick={() => setFiltro("todas")}>
            Todas
          </button>
          <button type="button" onClick={() => setFiltro("pendentes")}>
            Pendentes
          </button>
          <button type="button" onClick={() => setFiltro("concluidas")}>
            Concluídas
          </button>
        </div>
        <ul>
          {tarefasVisiveis.length === 0 && <li>Nenhuma tarefa para exibir.</li>}
          {tarefasVisiveis.map((tarefa) => (
            <li key={tarefa.id}>
              <label>
                <input
                  type="checkbox"
                  checked={tarefa.concluida}
                  onChange={() => alternarConclusao(tarefa.id)}
                />
                {tarefa.texto}
              </label>
              <button type="button" onClick={() => removerTarefa(tarefa.id)}>
                Remover
              </button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={limparConcluidas}>
          Limpar concluídas
        </button>
      </main>
    </>
  );
}
export default App;
