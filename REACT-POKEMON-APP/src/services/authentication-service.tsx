export default class AuthentificationService{
  static isAuthenticated: boolean = false; //permet de savoir si l'user est connecté ou pas par dédaut c'est false. 

  static login(username: string, password: string): Promise<boolean> {
    const isAuthenticated = (username === 'pikachu' && password === 'pikachu');


    return new Promise(resolve => {
      setTimeout(() => {
        this.isAuthenticated = isAuthenticated;
        resolve(isAuthenticated);
      }, 1000);
    });
  }
}