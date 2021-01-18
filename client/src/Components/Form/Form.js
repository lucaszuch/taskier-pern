import React from 'react';
import './Form.css';



function Form({description, setDescription}) {

  //Handling input change
  const handleChange = el => {
    setDescription(el.target.value);
  }

  //Submitting new todo
  const onSubmitFrom = async ev => {
    ev.preventDefault();
    try {
      const data = {description};
      const response = await fetch('http://localhost:5000/todos', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      });
      console.log(response);
      setDescription("");
      
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
               placeholder="Add a new task.." required
               onChange={handleChange}
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