import { useState } from 'react';
import './App.css';

const App = () => {
  const [allRecipes, setAllRecipes] = useState(null);
  const getRecipes = async () => {
    return fetch(`${process.env.REACT_APP_DB_URL}/getmovies`)
    .then(response => response.json())
    .then(result => setAllRecipes(result[0]))
    .catch(err => console.log(err))
  };

  const displayRecipes = () => {
    if (allRecipes) {
      console.log(allRecipes)
      return allRecipes.map((recipe) => {
        return (
          <div key={recipe.id}>{recipe.title} {recipe.addedBy}</div>
        )
      })
    };
  };

  return (
    <div className="App">
      <h1>Newport Cookbook</h1>
      <button onClick={getRecipes}>Get Recipes</button>
      <div>
        {displayRecipes()}
      </div>
    </div>
  );
}

export default App;
