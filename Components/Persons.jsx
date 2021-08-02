import React from "react";

function Persons({ persons, deleteHandler }) {
  // const label =

  return (
    <ul>
      {persons.map((personObj) => (
        <li key={personObj.id}>
          {personObj.name} {personObj.number}{" "}
          <button onClick={() => deleteHandler(personObj.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default Persons;
