import { useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import { AddRecipeModal } from '../AddRecipeModal/AddRecipeModal';
import { Buffer } from "buffer";
import Modal from 'react-modal';
import './App.css';

const App = () => {
  const [allRecipes, setAllRecipes] = useState(null);
  const [recipeToAdd, setRecipeToAdd] = useState({notes: ""});
  const [addRecipeModalIsOpen, setAddRecipeModalIsOpen] = useState(false)

  const getRecipes = async () => {
    return fetch(`${process.env.REACT_APP_DB_URL}/getrecipes`)
    .then(response => response.json())
    .then(result => setAllRecipes(result[0]))
    .catch(err => console.log(err))
  };

  const postNewRecipe = (e) => {
    e.preventDefault();
    const recipeToAddFullDetails = {...recipeToAdd, dateAdded: "2023-12-12 12:12:12", isFavorite: "false" };
    const requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeToAddFullDetails)
    };
    return fetch(`${process.env.REACT_APP_DB_URL}/postnewrecipe`, requestOptions)
    .then(() => {
      closeModal();
      getRecipes();
    })
    .catch(err => console.log(err))
  }; 

  const deleteRecipe = (id) => {
    return fetch(`${process.env.REACT_APP_DB_URL}/deleterecipe/${id}`, {
      method: 'DELETE',
    })
    .then(() => getRecipes())
    .catch(err => console.log(err))
  };

  const displayRecipes = () => {
    return allRecipes.map((recipe) => {
      return(
        <div key={recipe.id} className="recipe-card">
          <div>Recipe {recipe.id}</div>
          <div>{recipe.title}</div>
          <div>{recipe.description}</div>
          <div>{recipe.details}</div>
          <div>{recipe.instructions}</div>
          <div>{recipe.addedBy}</div>
          <div>{recipe.isFavorite}</div>
          <div>{recipe.categories}</div>
          <div>{recipe.notes}</div>
          <div>{recipe.dateAdded}</div>
          <img src={recipe.picture} alt="preview" className="image-preview"/>
          <button onClick={() => deleteRecipe(recipe.id)}>Delete Recipe</button>
        </div>
      )
    })
  };

  const updateRecipeToAdd = (e, field) => {
    setRecipeToAdd({...recipeToAdd, [field]: e.target.value});
  };

  const closeModal = () => {
    setAddRecipeModalIsOpen(false);
  };

  useEffect(() => {
    if (!allRecipes) {
      getRecipes();
    };
    Modal.setAppElement('body');
  });

  return (
    <div className="App">
      <Header></Header>
      <Modal
          isOpen={addRecipeModalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Add Recipe Modal"
        >
          <AddRecipeModal 
            closeModal={closeModal}
            updateRecipeToAdd={updateRecipeToAdd}
            postNewRecipe={postNewRecipe}
            recipeToAdd={recipeToAdd}
            setRecipeToAdd={setRecipeToAdd}
          />
      </Modal>
      <button onClick={() => setAddRecipeModalIsOpen(true)}>Add Recipe</button>
      <div className="recipe-card-container">
        {allRecipes && displayRecipes()}
      </div>
    </div>
  );
}

export default App;