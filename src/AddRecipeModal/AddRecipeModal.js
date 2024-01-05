import { useState } from 'react';
import { addRecipeFields } from "../utils.js";
import axios from 'axios';
import './AddRecipeModal.css';

export const AddRecipeModal = ({ closeModal, updateRecipeToAdd, postNewRecipe, recipeToAdd, setRecipeToAdd }) => {
    const [file, setFile] = useState();

    const createAddRecipeFields = () => {
        return addRecipeFields.map((field) => {
            return(
                <div key={field.id}>
                    <label>{field.label}</label>
                    <input type="text" onChange={(e) => updateRecipeToAdd(e, field.name)}></input>
                </div>
            )
        })
    };

    const handleSelectImage = (e) => {
        setFile(e.target.files[0]);
        // setRecipeToAdd({...recipeToAdd, picture: e.target.files[0]})
        // const file = event.target.files[0];
        // const fileReader = new FileReader();
        // fileReader.addEventListener("load", () => {
        //     setRecipeToAdd({...recipeToAdd, picture: fileReader.result});
        // });
        // fileReader.readAsDataURL(file);
    };

    const handleUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file);
        axios.post(`${process.env.REACT_APP_DB_URL}/upload`, formData)
        .then((result) => {
            if(result.data.Status === "Success") {
                console.log("Worked")
            } else {
                console.log("Broken :-(")
            }
        })
        .catch(err => console.log(err))
    };

    return(
        <div>
            <div className="close-modal-button">
                <button onClick={() => closeModal()}>X</button>
            </div>
            <form className="form">
                <h2>Add new recipe</h2>
                {createAddRecipeFields()}
                <input type="file" onChange={handleSelectImage}/>
                    {recipeToAdd.picture ?
                    <img src={recipeToAdd.picture} alt="preview" className="image-preview"/> : null
                }
                <button onClick={(e) => handleUpload(e)}>Submit Photo</button>
                <button onClick={(e) => postNewRecipe(e)}>Submit New Recipe</button>
            </form>
        </div>
    )
};