
/**
 * If the api server is not in the same domain as this frontend react app, we can use a react proxy to overcome CORS error.
 * Please do this ONLY in DEVELOPMENT environment 
 * Simply add "proxy":"http://<api-server-domain>" to package.json
 * Details: https://create-react-app.dev/docs/proxying-api-requests-in-development/
 */
class ApiClient {

  static challenge(): Promise<Response> {
    console.log("get");
    return fetch('/challenges/random', {
      method: 'GET',
    });
  }

  static sendGuess(user: string, factorA: number, factorB: number, guess: number): Promise<Response> {
    console.log("fetch");
    return fetch('/attempts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userAlias: user,
        factorA: factorA,
        factorB: factorB,
        guess: guess
      })
    });
  }

  static getAttempts(userAlias: string): Promise<Response> {
    console.log("Get attempts for " + userAlias);
    return fetch('/attempts?alias=' + userAlias);
  }
}

export default ApiClient;