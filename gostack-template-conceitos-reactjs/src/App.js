import React, { useState, useEffect } from "react";
import api from "services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositorie] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      const repo = response.data;
      setRepositorie(repo);
    });
  }, []);

  async function handleAddRepository() {
    const newRepo = {
      id: Date.now(),
      title: `Desafio ReactJS`,
      url: "http://github.com/suknaic",
      techs: ["react", "react native"],
    };

    setRepositorie([...repositories, newRepo]);
  }

  async function handleRemoveRepository(id) {
    const indexForDelete = repositories.findIndex((index) => index.id === id); // retorna o index desejado
    const repoList = [...repositories]; // copia do repositorio para manipulacao

    repoList.splice(indexForDelete, 1); // deleto o index desejado

    setRepositorie([...repoList]); // recria o repositorio no state da aplicacao
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
