import * as React from 'react';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';

//const filter = createFilterOptions();

function AutoCompleteIngredients(props) {
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState(null);
    const [options, setOptions] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    function HandleDelete(index){
      props.items.splice(index, 1);
      console.log(props.items)
      props.Change(props.items);
    }
    function HandleChange(index, I, Q){
        console.log(props.items)
        props.items[index].name = I;
        props.items[index].quantity = Q;
        props.Change(props.items);
        console.log(props.items);
    }

    function addingredient(i) {
      props.Change([...props.items,{'name':i, 'quantity': 0}])
    }

    function getSuggestions(e){
      setLoading(true);
        let request = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        }
        console.log(e.target.value)
        fetch("http://127.0.0.1:8000/searchingredient/?search=" + e.target.value, request)
        .then(response => response.json()
        ).then(data => {console.log(data.results);setOptions(data.results);setLoading(false);})
    }
  
    return (
      <>
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              if (typeof newValue === 'string') {
                // timeout to avoid instant validation of the dialog's form.
                addingredient(newValue);
              } else {
                addingredient(newValue.name);
              }
            }}
            onInputChange={(event, newInputValue) => {
              getSuggestions(event)
              setInputValue(newInputValue);
            }}
            filterOptions={(x) => x}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="autocomplete-ingredients"
            options={options}
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === 'string') {
                return option;
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue;
              }
              // Regular option
              return option.name;
            }}
            renderOption={(props, option) => <li {...props}>{option.name}</li>}
            sx={{ width: 300 }}
            freeSolo
            renderInput={(params) => (
              <TextField {...params} label="Search or Add Ingredients" InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  </React.Fragment>
                ),
              }}/>
            )}
          />
      <div className="list">
            {console.log(props.items)}
            {props.type === 'ingredients' && props.items && props.items.map((item, index)=> (
                    <li>
                      {console.log(item)}
                    <TextField 
                        value={item.name}
                        type="text"
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: '25ch' }}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">g</InputAdornment>,
                        }}
                        onChange={(e) => {HandleChange(index,e.target.value,item.quantity)}}
                        />
                    <TextField
                    type="number"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                        endAdornment: <InputAdornment position="start">g</InputAdornment>,
                    }}
                    onChange={(e)=>{HandleChange(index,item.name,e.target.value)}}
                    />
                    </li>
                    //<IngredientsInput id={"ingredient" + index} Change={HandleChange} Delete={HandleDelete} ing={item.name}/>
            ))}
        </div>
        </>
    );
} export default AutoCompleteIngredients;