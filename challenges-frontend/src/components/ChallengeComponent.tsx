import React, { useState, useEffect } from "react";
import ApiClient from "../services/ApiClient";
import { LastAttemptsComponent } from "./LastAttemptsComponent";

export function ChallengeComponent() {
  // Declare state variables
  const [factorA, setFactorA] = useState("");
  const [factorB, setFactorB] = useState("");
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [guess, setGuess] = useState("");
  const [lastAttempts, setLastAttempts] = useState<any[]>([]);

  // UseEffect() called twice when mounted is due to <React.StrictMode> in index.tsx 
  // see: https://stackoverflow.com/a/71982736/9265852
  useEffect(() => {
    console.log("useEffect")
    ApiClient.challenge().then(res => {
      if (res.ok) {
        res.json().then(json => {
          setFactorA(json.factorA);
          setFactorB(json.factorB);
        });
      } else {
        setMessage("Can't reach the server");
      }
    }
    );
  }, []);

  const handleSubmitEvent = (event: React.FormEvent<HTMLFormElement>) => {
    // To prevent the default behavior of browser after form submission, namely refreshing the whole page
    event.preventDefault();

    ApiClient.sendGuess(user, parseInt(factorA), parseInt(factorB), parseInt(guess)).then(res => {
      if (res.ok) {
        res.json().then(json => {
          if (json.correct) {
            setMessage("Congratulations! Your guess is correct");
          } else {
            setMessage("Oops! Your guess " + json.resultAttempt + " is wrong, but try again!");
          }
          updateLastAttempts(user);
        });
      } else {
        setMessage("Error: server error or not available");
      }
    });
  }

  const updateLastAttempts = (userAlias: string) => {
    ApiClient.getAttempts(userAlias).then(res => {
      if(res.ok){
        let attempts : any[] = [];
        res.json().then(data => {
          data.forEach((item: any) => {attempts.push(item);});
          setLastAttempts(attempts);
        });
      }
    });
  }

  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
    //console.log("user ch");
  }
  const handleGuessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(event.target.value);
    //console.log("guess ch");
  }

  return (
    <div>
      <div>

        <h3>Your new challenge is</h3>
        <h1>
          {factorA} x {factorB}
        </h1>
      </div>

      <form onSubmit={handleSubmitEvent}>
        <label>
          Your alias:
          <input type="text" maxLength={12}
            name="user"
            value={user}
            onChange={handleUserChange} />
        </label>
        <br />
        <label>
          Your guess:
          <input type="number" min="0"
            name="guess"
            value={guess}
            onChange={handleGuessChange} />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>

      <h4>{message}</h4>


      {lastAttempts.length > 0 &&
        <LastAttemptsComponent lastAttempts={lastAttempts} />
      }

    </div>
  );

}