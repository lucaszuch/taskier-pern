import React from 'react';

function Form({description, setDescription, setChangeTodos}) {
  //Submitting new todo
  const onSubmitFrom = async e => {
    e.preventDefault();
    try {
      const data = {description};
      const response = await fetch('http://localhost:5000/dashboard/todos', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          jwt_token: localStorage.token
        },
        body: JSON.stringify(data)
      });
      
      //Converts response to json
      const parseResponse = await response.json();
      console.log(parseResponse);

      //Resets form
      setChangeTodos(true);
      setDescription('');

    } catch (err) {
      console.error(err.message);
    }
  }

  //Render()
  return (
    <div className="FormBox">
      <div className="FormTitle">
        <h1>TASKIER</h1>
      </div>
      <form className="FormWrapper"
            onSubmit={onSubmitFrom}>
        <input type="text"
               className="form-control"
               value={description}
               placeholder="Add a new task" required
               onChange={(e) => setDescription(e.target.value)}
               >
        </input>
        <button type="submit"
                className="btn btn-primary">
          <i class="fa fa-plus"></i>
        </button>
      </form>
    </div>
  );
}

export default Form;