import React, { FunctionComponent, useState } from 'react';
import PokemonForm from '../components/pokemon-form';
import Pokemon from '../models/pokemon';

 

  
const PokemonAdd: FunctionComponent = () => {
    
  const [id] = useState<number>(new Date().getTime());//on génère un id unique pour notre futur pokemon. 
  const [pokemon] = useState<Pokemon>(new Pokemon(id));// ici on crée un pokemon vierge en lui passant cet id

  return (
    <div className='row'>
      <h2 className='header center'>Ajouter un Pokémon
      </h2>
      <PokemonForm pokemon={pokemon} isEditForm={false}></PokemonForm>
    </div>
  );
}
  
export default PokemonAdd; 