import React, { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Pokemon from '../models/pokemon';
import formatType from '../helpers/format-type';
import PokemonService from '../services/pokemon-service';
/**---------------------------------------------- */
  
type Props = {
  pokemon: Pokemon,
  isEditForm: boolean //true : si c'est pour l'edition et false si c'est pour l'ajout
}; 


type Field = {
  value: any,
  error?: string,
  isValid?: boolean
}

type Form = {
  picture: Field,
  name:Field,
  hp: Field,
  cp: Field,
  types: Field
}
//1. Nous avons déclaré deux types qui vont nous aider pour l'initialisation des valeurs de nos pokemons dans les inputs.
//2. Le type Field: pour modeliser un champ dans notre formulaire. Chaque champ aura une valeur, une erreur potentiel et une proprieté indiquant si la donnée saisie est valide ou non. 
//3. Le type Form: represente le formulaire avec les différents champs disponible.

/**---------------------------------------------- */


  
const PokemonForm: FunctionComponent<Props> = ({pokemon, isEditForm}) => {
  /**----------------------------------------------*/
  const [form, setForm] = useState<Form>({
      picture: {value: pokemon.picture},
      name: {value:pokemon.name, isValid:true},
      hp: {value:pokemon.hp, isValid:true},
      cp: {value:pokemon.cp, isValid:true},
      types: {value:pokemon.types, isValid:true},
  });//ces valeurs seront envoyées dans le value de chaque input
 /**--------------------------------------------- */
 const history = useHistory();
  /**--------------------------------------------- */

  const types: string[] = [
    'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
    'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
  ];//Ici on déclare une const 'types' qui contient tous les types de pokemon disponible afin de les afficher dans le formulaire.
  //En effet il faudra permettre aux users d'attribuer des types aux pokemons editer.

/**---------------------------------------------- */
  const hasType = (type: string): boolean =>{
    return form.types.value.includes(type); 
  }//Gestion des valeurs de types de pokemons pour les inputs. 
  //Cette méthode renvoie un boolean pour savoir si le type d'un pokemon appartient ou non à ce pokemon.

/**---------------------------------------------- */
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const fieldName: string = e.target.name;//c'est le nom du champs à modifier  
    const fieldValue: string = e.target.value; //c'est la nouvelle valeur saisie par l'utilisateur
    const newField = {[fieldName]: { value: fieldValue  }};//ici on regroupe les modifications du champs dans newField

    setForm({...form, ...newField});//on modife l'état de notre formulaire grace à la méthode seform. 
  }
  //Le role de cette méthode est de regair à l'action de l'user à chaque fois qu'il va modifier les données des champs (name, points de vie ou dégats du pokemon).
  /**--------------------------------------------- */

  const selectType = (type: string, e: React.ChangeEvent<HTMLInputElement>): void =>{
    const checked = e.target.checked;
    let newField: Field;

    if (checked){
      //si l'user coche un type, on l'ajoute à la liste des types du pokemon.
      const newTypes: string[] = form.types.value.concat([type]);
      newField = { value: newTypes }
    } else {
      //si l'user décoche un type, on le retire de la liste des types du pokémon. 

      const newTypes: string[] = form.types.value.filter((currentType: string)=> currentType !== type);
      newField = { value: newTypes };
    }
    setForm({...form, ...{types: newField}});
  }//Gestion de l'edition des types. 

  
const isAddForm = () =>{
  return !isEditForm
}

   /**---------------------------------------------*/
   const validateForm = () => {
    let newForm: Form = form;
    //Validator url
    if (isAddForm()){
        const start = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/';
        const end = '.png';

        if(!form.picture.value.startsWith(start) || form.picture.value.endsWith(end)){
          const errorMsg: string = "L'url n'est pas valide";
          const newfield: Field = {value: form.picture.value, error: errorMsg, isValid: false};
          newForm= {...form, ...{picture: newfield}}
        }else{
          const newfield: Field = {value: form.picture.value, error: '', isValid: true};
          newForm= {...form, ...{picture: newfield}}
        }
    }
    //Validator name
    if(!/^[a-zA-Zàéè ]{3,25}$/.test(form.name.value)) {
      const errorMsg: string = 'Le nom du pokémon est requis (1-25).';
      const newField: Field = {value: form.name.value, error: errorMsg, isValid: false};
      newForm = {...newForm, ...{name: newField} };   
  }else{
    const newField: Field = {value: form.name.value, error: '', isValid: true}; 
    newForm = {...newForm, ...{name: newField}};
  }
  //^[a-zA-Zàéè ]{3,25}$/: veut dire, je n'accepte que des chaines de caractère de 3 à 25 caractère de long qui ne peuvent contenir de lettres minuscule et majuscule ains que èéà.


     //Validator hp
     if(!/^[0-9]{1,3}$/.test(form.hp.value)) {
      const errorMsg: string = 'Les points de vie du pokémon sont compris entre 0 et 999';
      const newField: Field = {value: form.hp.value, error: errorMsg, isValid: false};
      newForm = {...newForm, ...{hp: newField}} 
  }else{
    const newField: Field ={value: form.hp.value, error: '', isValid: true}; 
    newForm = {...newForm, ...{hp: newField}}
  }
   ///^[0-9]{1,3}$/: je ne veux que des chiffres mais la limite c'est trois chiffre de long.ex: 1,15,150


    //Validator cp
    if(!/^[0-9]{1,3}$/.test(form.cp.value)) {
      const errorMsg: string = 'Les points de vie du pokémon sont compris entre 0 et 999';
      const newField: Field = {value: form.cp.value, error: errorMsg, isValid: false};
      newForm = {...newForm, ...{hp: newField}} 
  }else{
    const newField: Field ={value: form.cp.value, error: '', isValid: true}; 
    newForm = {...newForm, ...{hp: newField}};
  }
  setForm(newForm);
  return newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid;
  //ici on regarde si notre formulaire est valide ou non  et on retourne un boolean si on retourne vrai ce que les données sont valide sinon on ne fera rien.
}
//1.Gestion des validations des données du formulaire.
//2. Pour tester la validité d'un champ par rapport à un regex on utilise la méthode 'test'
   /**---------------------------------------------*/

   
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if(isFormValid){
      pokemon.picture = form.picture.value;
      pokemon.name = form.name.value
      pokemon.hp = form.hp.value
      pokemon.cp = form.cp.value
      pokemon.types = form.types.value
      
      isEditForm? updatePokemon() : addPokemon();
      
    }
  }//Gère le comportement de soumission du formulaire
  /**----------------------------------------------*/

   const istTypesvalid = (type: string): boolean =>{
    if (form.types.value.length === 1 && hasType(type)){
      return false;
     // si l'user a selectionné une seule case il faut l'empecher de la déselectionner.
    }
    if (form.types.value.length >= 3 && !hasType(type)){
      return false;
      // si l'user a déja seclectionné 3 cases alors il faut l'empecher de pouvoir selectionner d'autres cases.Mais il peut déselectionner les types deja présent pour pouvoir modifier un pokemon.
    }
    return true;
   }
   //Gestion des validations du champs type.
   /**---------------------------------------------*/

   const deletepokemon = () => {
    PokemonService.deletePokemon(pokemon).then(() => history.push(`/pokemons`));
  }
   /**---------------------------------------------*/
   const addPokemon = () => {
    PokemonService.addPokemon(pokemon).then(() => history.push('/pokemons'));
   }

   const updatePokemon = () => {
    PokemonService.updatePokemon(pokemon).then(() => history.push(`/pokemons/${pokemon.id}`));
   }
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable">
             {/*Afficher l'image dans le cas d'une édition.  */}
             {isEditForm && (
            <div className="card-image">
              <img src={pokemon.picture} alt={pokemon.name} style={{width: '250px', margin: '0 auto'}}/>
               {/*delete pokemon  */}
              <span className="btn-floating halfway-fab waves-effect waves-light">
                <i onClick={deletepokemon} className='material-icons'>delete</i>
              </span>
            </div>
            )}
            <div className="card-stacked">
              <div className="card-content">


              {/* Ajouter une image cas du formulaire d'ajout */}
              {isAddForm() && (

              <div className="form-group">
                  <label htmlFor="name">Image</label>
                  <input id="picture" name='picture' type="text" className="form-control" value={form.picture.value} onChange={e => handleInputChange(e)}></input>
                  {/* le message d'erreur */}
                  {form.picture.error &&
                    <div className='card-panel red acdcent-1'>
                        {form.picture.error}
                    </div>
                  }
                </div>
              )}

                {/* Pokemon name */}
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input id="name" name='name' type="text" className="form-control" value={form.name.value} onChange={e => handleInputChange(e)}></input>
                  {/* le message d'erreur */}
                  {form.name.error &&
                    <div className='card-panel red acdcent-1'>
                        {form.name.error}
                    </div>
                  }
                </div>
                {/* Pokemon hp */}
                <div className="form-group">
                  <label htmlFor="hp">Point de vie</label>
                  <input id="hp" name='hp' type="number" className="form-control" value={form.hp.value} onChange={e => handleInputChange(e)}></input>
                  {/* le message d'erreur */}
                  {form.hp.error &&
                    <div className='card-panel red acdcent-1'>
                        {form.hp.error}
                    </div>
                  }
                </div>
                {/* Pokemon cp */}
                <div className="form-group">
                  <label htmlFor="cp">Dégâts</label>
                  <input id="cp" name='cp' type="number" className="form-control" value={form.cp.value} onChange={e => handleInputChange(e)}></input>
                  {/* le message d'erreur */}
                  {form.cp.error &&
                    <div className='card-panel red acdcent-1'>
                        {form.cp.error}
                    </div>
                  }
                </div>
                {/* Pokemon types */}
                <div className="form-group">
                  <label>Types</label>
                  {types.map(type => (
                    <div key={type} style={{marginBottom: '10px'}}>
                      <label>
                        <input id={type} type="checkbox" className="filled-in" value={type} disabled={!istTypesvalid(type)} checked={hasType(type)} onChange={e => selectType(type, e)}></input>
                        {/* !istTypesvalid = si le type n'est pas valide on le véroue */}
                        <span>
                          <p className={formatType(type)}>{ type }</p>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-action center">
                {/* Submit button */}
                <button type="submit" className="btn">Valider</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
   
export default PokemonForm;