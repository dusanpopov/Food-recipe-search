import React, {useState} from 'react';
import axios from "axios";
import {v4 as uuidv4} from "uuid";
import './App.css';

import {API_DATA} from "./components/APIDATA"
import Recipe from "./components/Recipe";
import Alert from "./components/Alert";


function App() {

const [query, setQuery] = useState("");
const [recipes, setRecipes] = useState([]);
const [alert, setAlert] = useState("");

const URL = `
https://api.edamam.com/search?q=${query}&app_id=${API_DATA.APP_ID}&app_key=${API_DATA.APP_KEY}
`

const fetchData = async () => {
  
    if(query !== ""){
    const result = await axios.get(URL);
    if(!result.data.more){
    return setAlert("No food with such name");
  }
    setRecipes(result.data.hits)
    setAlert("");
    setQuery("");
  } else {
    setAlert("Please fill the form");
  }
  
}

const searchRecipes = (e) => {
  setQuery(e.target.value);
}

const onSubmitHandler = (e) => {
  e.preventDefault();
  fetchData();
}

  return (
    <div className="App">
      <h1>Recipe Search</h1>

      <form className="search-form" onSubmit={onSubmitHandler}>
        {alert !== "" && <Alert alert={alert}/>}
        <input type="text" placeholder="Search" autoComplete="off" onChange={searchRecipes} value={query}/>
        <input type="submit" value="search" />
      </form>

      <div className="recipes">
        {recipes !== [] && recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
      
    </div>
  );
}

export default App;
