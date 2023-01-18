import React, { useState, useEffect } from "react";

export function LastAttemptsComponent(prop: any) {

  return (
    <table>
      <thead>
        <tr>
          <th>Challenge</th>
          <th>Your guess</th>
          <th>Correct</th>
        </tr>
      </thead>
      <tbody>
        {prop.lastAttempts.map((a:any) =>
          <tr key={a.id}
            style={{ color: a.correct ? 'green' : 'red' }}>
            <td>{a.factorA} x {a.factorB}</td>
            <td>{a.resultAttempt}</td>
            <td>{a.correct ? "Correct" :
              ("Incorrect (" + a.factorA * a.factorB + ")")}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}