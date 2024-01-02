// import { useState } from 'react';
import './App.css';

const App = () => {
  // const [allRecipes, setAllRecipes] = useState(null);
  const getRecipes = async () => {
    // return fetch(`${process.env.REACT_APP_DB_URL}/getmovies`)
    // .then(response => {
    //   if (!response.ok) {
    //     throw Error(`Failed to fetch movies`)
    //   }
    //   setAllRecipes(response.json())
    // })
    // .catch(err => console.log(err))
    const response = fetch(`${process.env.REACT_APP_DB_URL}/getmovies`);
    const result = (await response).json();
    console.log(result)
    return result;
  };

  // const displayRecipes = () => {
  //   if (allRecipes) {
  //     console.log(allRecipes)
      // return allRecipes.map((recipe) => {
      //   return (
      //     <div key={recipe.id}>{recipe.movieName}</div>
      //   )
      // })
  //   };
  // };

  return (
    <div className="App">
      <h1>Newport Cookbook</h1>
      <button onClick={getRecipes}>Get Recipes</button>
      <div>
        {/* {displayRecipes()} */}
      </div>
    </div>
  );
}

export default App;
