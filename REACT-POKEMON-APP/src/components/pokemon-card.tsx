import React, { FunctionComponent, useState } from 'react';
import Pokemon from '../models/pokemon';
import './pokemon-card.css'; //importation du fichier css
import formatDate from '../helpers/format-date';
import formatType from '../helpers/format-type';
import { useHistory} from 'react-router-dom';
  
type Props = {
  pokemon: Pokemon,
  borderColor?: string//une props par défaut ou facultative grace au point d'interrogation. 
  
}; //on a typé notre propos


  
const PokemonCard: FunctionComponent<Props> = ({pokemon, borderColor='#009688'}) => {

    const [color, setColor]= useState<string>();
    const history  = useHistory();//on recupere un objet qui prend l'historique du navigateur depuis le Hook que nous avons importé.

    const showBorder = () =>{
      setColor(borderColor);
    }
    
    const hideBorder = () =>{
      setColor('#f5f5f5'); // on remet la bordure en gris
    }
    //Grace au Hook useState on modifie la valeur de color avec les f(x)s showBorder et hideBorder en ajoutant les evenements ci-dessous : onMouseLeave et onMouseEnter(voir dans le cahier).


    const goTopokemon = (id:number) => {
        history.push(`/pokemons/${id}`);
    }
    //Permet de nous diriger vers la page pokemon-detail.tsx
   //On peut utiliser LInk ou le Hook useHistory pour nous diriger vers d'autres routes

  return (
    <div className="col s6 m4" onClick={()=>goTopokemon(pokemon.id)} onMouseEnter={showBorder} onMouseLeave={hideBorder}>
      <div className="card horizontal" style={{borderColor: color }}>
        <div className="card-image"> 
          <img src={pokemon.picture} alt={pokemon.name}/>
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>{pokemon.name}</p>

            {/* --formatDate-- */}
            <p><small>{formatDate(pokemon.created)}
            </small></p>
             
            {/* <p><small>{pokemon.created.toString()}</small></p> */}

            {/* --formatType-- */}
            {pokemon.types.map(type =>(
              <span key={type} className={formatType(type)}>{type}</span>
            ))}
            
          </div>
        </div>
      </div> 
    </div>
  );
}
  

/**
 1. Ce composant(pokemon.card) est chargé d'afficher le pokemon.

 2.Pour passer une props dans un composant: on le passe en parametre dans la f(x) qui represente notre composant voir la ligne avec la const PokemonCard:

 3.Du coup la prop qu'on a passé est pokemon mais on ne sait si c'est un string, un nombre ou ... d'où la raison de typer notre prod (Voir le cours de type script sur la création des types)

 4. On a typé notre f(x) avec le type Props (voir les generics en TypeScript);
*/
export default PokemonCard;