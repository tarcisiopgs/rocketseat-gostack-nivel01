import React, {useEffect, useState} from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then(({data}) => setRepositories(data))
      .catch(error => console.log(error));
  }, []);

  async function handleAddRepository() {
    try{
      const {data: repository} = await api.post('repositories', {
        title: `Novo repositório ${Date.now()}`,
        url: 'https://www.softmakers.com.br',
        techs: ['js', 'php']
      });
      setRepositories([...repositories, repository]);
    }catch (e) {
      return e;
    }
  }

  async function handleRemoveRepository(id) {
    try{
      await api.delete(`repositories/${id}`);
      setRepositories(repositories.length > 1
        ? repositories.filter(repository => id !== repository.id)
        : []
      );
    }catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({id, title}) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>
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
