import React, { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import Pokemon from '../models/pokemon';
import PokemonService from '../services/pokemon-service';
 
const PokemonSearch: FunctionComponent = () => {
  
  const [term, setTerm] = useState<string>('');//cet état définit le term de recherche saisie par l'user
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);// cet état pour stocker les pokémons correspondant aux termes de rechers
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value;
    setTerm(term);
 
    if(term.length <= 1) {
      setPokemons([]);
      return;
    }// on veirifie que term saisie par l'user saisie 2 caractères de long.
 
    PokemonService.searchPokemon(term).then(pokemons => setPokemons(pokemons));
  }
  
  return (
    <div className="row"> 
    <div className="col s12 m6 offset-m3"> 
      <div className="card"> 
      <div className="card-content"> 
        <div className="input-field"> 
        <input type="text" placeholder="Rechercher un pokémon" value={term} onChange={e => handleInputChange(e)} /> 
        </div> 
        <div className='collection'>
        {pokemons.map((pokemon) => (
          <Link key={pokemon.id} to={`/pokemons/${pokemon.id}`} className="collection-item">
            {pokemon.name}
          </Link>
           //on liste les pokemons récupérés depuis le state qui correspond au resultat de la recherhce. si l'user clique sur le nom d'un pokemon on le redirige dans la page detail de ce pokemon.
        ))}
        </div> 
      </div> 
      </div> 
    </div> 
    </div>
  );
}
  
export default PokemonSearch;