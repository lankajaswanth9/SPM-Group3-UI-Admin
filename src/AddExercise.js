import React, { useState } from 'react';
import axios from 'axios';
import './AddExercise.css';


const AddExercise = ({ onSaveSuccess, onCancel }) => {
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const [logo, setLogo] = useState(null);
  const [picture, setPicture] = useState(null);
  const [errors, setErrors] = useState({});

  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });

  const handleSave = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!title) newErrors.title = 'Title is required.';
    if (!instructions) newErrors.instructions = 'Instructions are required.';
    if (!category) newErrors.category = 'Category is required.';
    if (!logo) newErrors.logo = 'Logo is required.';
    if (!picture) newErrors.picture = 'Picture is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    
    const logoBase64 = logo ? await fileToBase64(logo) : '';
    const pictureBase64 = picture ? await fileToBase64(picture) : '';

    const formData = {
      title,
      instructions,
      category,
      logo: logoBase64,
      exercise_picture: pictureBase64,
    };

    try {
      const response = await axios.post('http://3.14.144.6:3000/admin/exercises', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        alert('Exercise added successfully!');
        window.location.reload();
      } else {
        setErrors({ submit: 'Failed to add exercise.' });
      }
    } catch (error) {
      console.error('Error adding exercise:', error);
      setErrors({ submit: 'An error occurred while adding the exercise.' });
    }
  };

  return (
    <form className="add-exercise-form" onSubmit={handleSave}>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        {errors.title && <div className="error">{errors.title}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="instructions">Instructions:</label>
        <textarea id="instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
        {errors.instructions && <div className="error">{errors.instructions}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <input id="category" type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        {errors.category && <div className="error">{errors.category}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="logo">Logo:</label>
        <input id="logo" type="file" onChange={(e) => setLogo(e.target.files[0])} />
        {errors.logo && <div className="error">{errors.logo}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="picture">Picture:</label>
        <input id="picture" type="file" onChange={(e) => setPicture(e.target.files[0])} />
        {errors.picture && <div className="error">{errors.picture}</div>}
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
        <button type="submit" className="save-btn">Add Exercise</button>
      </div>
    </form>
  );
};

export default AddExercise;
