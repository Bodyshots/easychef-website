import '../../components/globals.css';
import './createrecipe.css';
import React, { useState, useEffect} from 'react';
import FormCard from '../../components/FormCard';
import AnimatePage from '../../components/AnimatePage';
import AOS from "aos";
import "aos/dist/aos.css";
import LongTextInput from '../../components/LongTextInput';
import { Button } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { useContext } from 'react';

function CreateRecipe() {

    const location = useLocation();

    const {setError} = useContext(UserContext);
    const navigate = useNavigate();

    let [recipename, setRecipeName] = useState('');
    let [description, setDescription] = useState('');
    let [instructions, setInstructions] = useState(["Step1", "Step2", "Step3"]);
    let [ingredients, setIngredients] = useState([{'name':'test', 'quantity':100}]);
    let [diet, setDiet] = useState(null);
    let [cuisine, setCuisine] = useState('AR');
    let [prep_time, setPrep] = useState('');
    let [cook_time,setCook] = useState('');
    let [servings, setServings] = useState(1);
    let [cookingtimetag, setCookTag] = useState('');
    let [files, setFiles] = useState(null)


    useEffect(() => {
      AOS.init({ duration: 1000 });
    }, []);

    let sendInstructions = (id) => {
      let step_num = 1;
      instructions.forEach(i => {
        let request = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + String(localStorage.getItem('access'))},
          body: JSON.stringify({'step_num': step_num, 'description': i})
        }
        fetch("http://127.0.0.1:8000/recipes/"+ id + "/addstep/", request)
        .then(response => response.json()
          .then(data => ({
            data: data,
            response: response
          })
          ).then(res => {
            if (res.response.ok) {
                console.log('instruction' + step_num + ' added')
            } step_num ++;
          }));
      }
      )
    }

    let sendIngredients = (id) => {
      console.log(ingredients);
      instructions.forEach(i => {
        console.log(i)
        let request = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + String(localStorage.getItem('access'))},
          body: JSON.stringify({'name': i.name, 'quantity': i.quantity})
        }
        fetch("http://127.0.0.1:8000/recipes/"+ id + "/addingredient/", request)
        .then(response => response.json()
          .then(data => ({
            data: data,
            response: response
          })
          ).then(res => {
            if (res.response.ok) {
                console.log('ingredient' + ' added')
            }
          }));
      }
      )
    }

    let sendFiles = (id) => {
      console.log(files)
      files.map((file) => { 
        if (file.type.slice(0,5) === 'image'){
          console.log(file)
          let formdata = new FormData();
            formdata.append('image', URL.createObjectURL(file))
          let request = {
          method: 'POST',
          headers: {'Authorization': 'Bearer ' + String(localStorage.getItem('access'))},
          body: formdata }
          console.log(request.body)
          fetch("http://127.0.0.1:8000/recipes/" + id + "/addimage/", request)
          .then(response => response.json()
          .then(data => ({
            data: data,
            response: response
          })
          ).then(res => {
            if (res.response.ok) {
                console.log('image added to recipe')
            }
          }));
        } 

      })
    }

    let submit = () => {
      if (recipename && description && prep_time && cook_time && servings && cuisine && diet) {
        let request = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + String(localStorage.getItem('access'))},
          body: JSON.stringify({ 'name':recipename, 'description': description, 'cuisine': cuisine, 'prep_time': prep_time, 'cook_time': cook_time,
          'servings': servings, 'diets': diet ,'cookingtimetag': cookingtimetag})
        }
        fetch("http://127.0.0.1:8000/recipes/addrecipe/", request)
        .then(response => response.json()
        .then(data => ({
            data: data,
            response: response
        })
        ).then(res => {
          if (res.response.ok) {
            sendIngredients(res.data.recipe_details.id);
            sendFiles(res.data.recipe_details.id);
            sendInstructions(res.data.recipe_details.id);
        }
        }));
      } else {
        let error = "";
        if (!recipename) {
          error += "Recipe Name is Missing! \n"
        }
        if (!description) {
          error += "Recipe Description is Missing! \n"
        }
        if (!ingredients) {
          error += "Recipe Ingredients is Missing! \n"
        }
        if (!instructions) {
          error += "Recipe Instructions is Missing! \n"
        }
        if (!cook_time) {
          error += "Recipe Cooking Time is Missing! \n"
        }
        if (!prep_time) {
          error += "Recipe Preparation Time is Missing! \n"
        }
        setError(error);
      }
    }
    return ( localStorage.getItem('access') ? 
        (<AnimatePage>
            <div className="createrecipecontainer">
              <h1 className='createrecipeh'> Create A Recipe</h1>
              <div className="recipeformgrid" id="recipeformgrid">
                <div className="formcol">
                  <div className='formrow' data-aos="fade-up">
                    <FormCard  className='recipename' title='Recipe Name:' placeholder='Enter Recipe Name' type='shorttext' Change={setRecipeName}/>
                  </div>
                  <div className='formrow' data-aos="fade-up">
                    <FormCard  className='recipedescription' title='Recipe Description:' placeholder='Enter Recipe Description' type='longtext' Change={setDescription}/>
                  </div>
                  <div className='formrow' data-aos="fade-up">
                    <FormCard  className='recipemedia' title='Recipe Media:' placeholder='Enter Recipe Name' type='file' files={files} Change={setFiles}/>
                  </div>
                  <div className='formrow' data-aos="fade-up">
                    <FormCard  className='recipeinstructions' title='Recipe Instruction:' placeholder='Enter Recipe Instruction' type='list' list={instructions} Change={setInstructions}/>
                  </div>
                </div>
                <div className="formcol">
                  <div className='formrow' data-aos="fade-up">
                    <FormCard  className='recipediet' title='Recipe Diet:' placeholder='Enter Recipe Name' type='radio' Change={setDiet}/>
                  </div>
                  <div className='formrow' data-aos="fade-up">
                    <FormCard  className='recipeingredients' title='Recipe Ingredients:' placeholder='Enter Recipe Ingredient' type='ingredientsearch' items={ingredients} Change={setIngredients}/>
                  </div>
                  <div className='formrow' data-aos="fade-up">
                    <FormCard  className='recipeservings' title='Recipe Servings:' placeholder='Enter Recipe Servings:' type='servingsslider' Change={setServings}/>
                  </div>
                  <div className='formrow' data-aos="fade-up">
                    <FormCard  className='recipepreptime' title='Recipe Preparation Time:' placeholder='Hours:Minutes:Seconds' type='timefield' Change={setPrep}/>
                  </div>
                  <div className='formrow' data-aos="fade-up">
                    <FormCard  className='recipecooktime' title='Recipe Cooking Time:' placeholder='Hours:Minutes:Seconds' type='timefield' Change={setCook}/>
                  </div>
                </div>
              </div>
              <button className='createrecipe' onClick={()=>{submit()}}>Create Recipe</button>
            </div>
        </AnimatePage>): (<Navigate to='/unauthorized' state={{path: location.pathname}} />)
    )
}

export default CreateRecipe;