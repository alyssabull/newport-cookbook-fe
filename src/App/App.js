import { useState } from 'react';
import { Header } from '../Header/Header';
import './App.css';

const App = () => {
  const [allRecipes, setAllRecipes] = useState(null);
  const [recipeToAdd, setRecipeToAdd] = useState({picture: "", notes: ""});

  console.log(allRecipes)

  const getRecipes = async () => {
    return fetch(`${process.env.REACT_APP_DB_URL}/getrecipes`)
    .then(response => response.json())
    .then(result => setAllRecipes(result[0]))
    .catch(err => console.log(err))
  };

  // // useMemo these values
  // const displayRecipes = () => {
  //   if (allRecipes) {
  //     return allRecipes.map((recipe) => {
  //       return (
  //         <div key={recipe.id}>{recipe.title} {recipe.addedBy}</div>
  //       )
  //     })
  //   };
  // };

  const postNewRecipe = (e) => {
    e.preventDefault();
    const recipeToAddFullDetails = {...recipeToAdd, dateAdded: "2023-12-12 12:12:12", isFavorite: "false" };
    console.log('recipeToAddFullDetails', recipeToAddFullDetails)
    const requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeToAddFullDetails)
    };
    console.log(requestOptions.body.picture)
    return fetch(`${process.env.REACT_APP_DB_URL}/postnewrecipe`, requestOptions)
    .then(response => alert('hello!'))
    .catch(err => console.log(err))
  }; 

  const updateRecipeToAdd = (e, field) => {
    setRecipeToAdd({...recipeToAdd, [field]: e.target.value});
  };

  return (
    <div className="App">
      <Header></Header>
      <form className="form">
        <div>
          <label>Title</label>
          <input type="text" onChange={(e) => updateRecipeToAdd(e, "title")}></input>
        </div>
        <div>
          <label>Description</label>
          <input type="text" onChange={(e) => updateRecipeToAdd(e, "description")}></input>
        </div>
        <div>
          <label>Details</label>
          <input type="text" onChange={(e) => updateRecipeToAdd(e, "details")}></input>
        </div>
        <div>
          <label>Instructions</label>
          <textarea type="text" onChange={(e) => updateRecipeToAdd(e, "instructions")}></textarea>
        </div>
        <div>
          <label>Categories</label>
          <input type="text" onChange={(e) => updateRecipeToAdd(e, "categories")}></input>
        </div>
        <div>
          <label>Added By</label>
          <input type="text" onChange={(e) => updateRecipeToAdd(e, "addedBy")}></input>
        </div>
        <button onClick={(e) => postNewRecipe(e)}>Submit New Recipe</button>
      </form>
      <button onClick={getRecipes}>Get All Recipes</button>
      <div>
        {/* {displayRecipes()} */}
      </div>
    </div>
  );
}

export default App;