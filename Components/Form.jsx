import React from 'react'

function Form({noteSubmitHandler, nameChangeHandler, numberChangeHandler, newName, newNumber}) {
    return (
      <form onSubmit={noteSubmitHandler}>
        <div>
          name: <input value={newName} onChange={nameChangeHandler} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={numberChangeHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
}

export default Form;