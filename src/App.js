import { useState } from 'react';
import './App.css';

const App = () => {
  const [allRecipes, setAllRecipes] = useState(null);
  const [recipeToAdd, setRecipeToAdd] = useState({picture: null, notes: []});
  const [postResponse, setPostResponse] = useState(null);
  // const [addRecipeError, setAddRecipeError] = useState(false);

  const getRecipes = async () => {
    return fetch(`${process.env.REACT_APP_DB_URL}/getrecipes`)
    .then(response => response.json())
    .then(result => setAllRecipes(result[0]))
    .catch(err => console.log(err))
  };

  const displayRecipes = () => {
    if (allRecipes) {
      return allRecipes.map((recipe) => {
        return (
          <div key={recipe.id}>{recipe.title} {recipe.addedBy}</div>
        )
      })
    };
  };

  // const checkForRecipeError = () => {
  //   recipeToAdd.title ? setAddRecipeError(false) : setAddRecipeError(true);
  //   recipeToAdd.description ? setAddRecipeError(false) : setAddRecipeError(true);
  //   recipeToAdd.instructions ? setAddRecipeError(false) : setAddRecipeError(true);
  //   recipeToAdd.categories ? setAddRecipeError(false) : setAddRecipeError(true);
  //   recipeToAdd.addedBy ? setAddRecipeError(false) : setAddRecipeError(true);
  // };

  const postNewRecipe = () => {
    // checkForRecipeError();
    // if (!addRecipeError) {
      const recipeToAddFullDetails = {...recipeToAdd, dateAdded: "2023-12-12 12:12:12", isFavorite: false }
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(recipeToAddFullDetails)
      };
      return fetch(`${process.env.REACT_APP_DB_URL}/postnewrecipe`, requestOptions)
      .then((response) => setPostResponse(response.json()))
      .then(() => console.log(postResponse))
      .catch(err => console.log(err))
    // }
  };

  const updateRecipeToAdd = (e, field) => {
    setRecipeToAdd({...recipeToAdd, [field]: e.target.value});
  };

  return (
    <div className="App">
      <h1>Newport Cookbook</h1>
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
        <button onClick={postNewRecipe}>Submit New Recipe</button>
      </form>
      <button onClick={getRecipes}>Get All Recipes</button>
      <div>
        {displayRecipes()}
      </div>
    </div>
  );
}

export default App;
