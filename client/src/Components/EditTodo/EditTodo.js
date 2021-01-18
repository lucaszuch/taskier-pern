import React, {Fragment, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


function EditTodo({todo}) {
  //Set states
  const [description, setDescription] = useState(todo.description);
  const [show, setShow] = useState(false);

  //Modal handlers
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Handle input changes
  const handleBtnEditChanges = el => {
    setDescription(el.target.value);
  }

  //Handles description changes
  const updateDescription = async ev => {
    ev.preventDefault();
    try {
      const data = {description};
      const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`,
      {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(data)
      });

    } catch (err) {
      console.error(err.message);      
    }
  }
  //render()
  return (
    <Fragment>
      <Button variant="info"
              onClick={handleShow}
              id={`#id${todo.todo_is}`}>
        <i class="fa fa-pencil"></i>
      </Button>

      <Modal show={show}
             onHide={handleClose}
             id={`#id${todo.todo_is}`}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={handleBtnEditChanges}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"
                  onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"
                  onClick={(e) => {
                    updateDescription(e);
                    handleClose();}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}

export default EditTodo;