import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterBox from "../Components/FilterBox";
import Form from "../Components/Form";
import Persons from "../Components/Persons";
import Notification from "../Components/Notification";
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("add name");
  const [newNumber, setNewNumber] = useState("add number");
  const [notificationMessage, setNotificationMessage] = useState('');

  const messageDisplayer = (message) => {
    setNotificationMessage(message)
    setTimeout(() => setNotificationMessage(''), 3500)
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  const nameChangeHandler = (e) => {
    setNewName(e.target.value);
  };

  const numberChangeHandler = (e) => {
    setNewNumber(e.target.value);
  };

  const noteSubmitHandler = (e) => {
    e.preventDefault();
    const NameExists = persons.find((personObj) => {
      return personObj.name.includes(newName) && personObj.number === newNumber;
    });

    const changeNumber = persons.find((personObj) => {
      return personObj.name.includes(newName) && personObj.number !== newNumber;
    });

    if (NameExists) {
      messageDisplayer(
        `${newName} with number ${newNumber} already exists in the Phonebook`
      );
    } else if (changeNumber) {
      if (
        window.confirm(
          `${changeNumber.name} is already added to the phonebook, replace old number with new one?`
        )
      ) {
        const updatedObj = { ...changeNumber, number: newNumber };
        axios
          .put(`http://localhost:3001/persons/${updatedObj.id}`, updatedObj)
          .then((response) => {
            setPersons(
              persons.map((p) => {
                return p.id !== updatedObj.id ? p : response.data;
              })
            );
            setNewName("");
            setNewNumber("");
            messageDisplayer(`${updatedObj.name}'s number has been updated`)
          });
      }
    } else {
      const newNameObj = { name: newName, number: newNumber };
      axios
        .post("http://localhost:3001/persons", newNameObj)
        .then((response) => {
          setPersons(persons.concat(response.data));
        });
      messageDisplayer(`new number added`)
    }
  };

  const searchHandler = (e) => {
    const pp = e.target.value.toLowerCase();
    const filteredPersons = persons.filter((personObj) =>
      personObj.name.toLowerCase().includes(pp)
    );
    filteredPersons.length !== 0
      ? setPersons(filteredPersons)
      : setPersons(persons);
  };

  const deleteHandler = (id) => {
    console.log(`the id ${id} needs to be deleted`);
    const url = `http://localhost:3001/persons/${id}`;
    axios
      .delete(url)
      .then(setPersons(persons.filter((person) => person.id !== id)));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterBox searchHandler={searchHandler} />
      <Notification message = {notificationMessage}/>
      <h2>Add a Number</h2>
      <Form
        noteSubmitHandler={noteSubmitHandler}
        nameChangeHandler={nameChangeHandler}
        numberChangeHandler={numberChangeHandler}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} deleteHandler={deleteHandler} />
    </div>
  );
};

export default App;
