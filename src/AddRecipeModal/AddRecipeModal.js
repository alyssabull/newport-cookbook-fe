import { addRecipeFields } from "../utils.js";
import './AddRecipeModal.css';

export const AddRecipeModal = ({ closeModal, updateRecipeToAdd, postNewRecipe, recipeToAdd, setRecipeToAdd }) => {
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

    const handleSelectImage = (event) => {
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
            setRecipeToAdd({...recipeToAdd, picture: fileReader.result});
        });
        fileReader.readAsDataURL(file);
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
                <button onClick={(e) => postNewRecipe(e)}>Submit New Recipe</button>
            </form>
        </div>
    )
};