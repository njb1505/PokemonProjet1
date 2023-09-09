import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthenticationService from './services/authentication-service';
  
const PrivateRoute = ({ component: Component, ...rest }: any) => (
  <Route {...rest} render={(props) => {
    const isAuthenticated = AuthenticationService.isAuthenticated; // ici on demande à un app s'il y a un user deja connecté dans notre application
    if (!isAuthenticated) {    
      return <Redirect to={{ pathname: '/login' }} />//on redirige l'user vers la page de connexion s'il n'est pas connecté afin de s'authensifier. 
    }
  
    return <Component {...props} />// s'il est connecté on le dirige vers la liste des pokémons
  }} />
);
  
export default PrivateRoute;