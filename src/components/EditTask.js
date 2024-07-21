import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditTask = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [term, setTerm] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://crudapi.co.uk/api/v1/todo/${id}`)
      .then(response => {
        const { name, surname, term, additionalInfo, isCompleted } = response.data;
        setTask({ name, surname, term, additionalInfo, isCompleted });
        setName(name);
        setSurname(surname);
        setTerm(term);
        setAdditionalInfo(additionalInfo);
      })
      .catch(error => console.error('Error fetching task:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://crudapi.co.uk/api/v1/todo/${id}`, { name, surname, term, additionalInfo, isCompleted: task.isCompleted })
      .then(() => {
        navigate('/');
      })
      .catch(error => console.error('Error updating task:', error));
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
      <button type="submit">Update Task</button>
    </form>
  );
};

export default EditTask;
