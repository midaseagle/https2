import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [term, setTerm] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://crudapi.co.uk/api/v1/todo', { name, surname, term, additionalInfo, isCompleted: false })
      .then(() => {
        navigate('/');
      })
      .catch(error => console.error('Error adding task:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="text"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        placeholder="Surname"
        required
      />
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Term"
        required
      />
      <textarea
        value={additionalInfo}
        onChange={(e) => setAdditionalInfo(e.target.value)}
        placeholder="Additional Information"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
