import React, { useState } from 'react';
import axios from 'axios';
import './EditForm.css';

const EditExercise = ({ exercise, onSave, onCancel }) => {
  const [formValues, setFormValues] = useState({
    id: exercise.exercise_id,
    logo: exercise.logo,  
    instructions: exercise.instructions,
    title: exercise.title,
    exercise_picture: exercise.exercise_picture,  
    category: exercise.category,
  });

  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });

  const handleFileChange = async (e, field) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setFormValues(prevState => ({ ...prevState, [field]: base64 }));
      } catch (error) {
        console.error('Error converting file:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://3.14.144.6:3000/admin/exercises/${formValues.id}`, formValues, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        alert('Exercise updated successfully!');
        window.location.reload();
      } else {
        console.error('Failed to update exercise:', response);
        alert('Failed to update exercise.');
      }
    } catch (error) {
      console.error('Error updating exercise:', error);
      alert('An error occurred while updating the exercise.');
    }
  };

  return (
    <div className="edit-exercise-form">
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="logo">Logo</label>
          <input type="file" id="logo" onChange={(e) => handleFileChange(e, 'logo')} />
          {formValues.logo && <img src={formValues.logo} alt="Logo Preview" />}
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" value={formValues.title} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="instructions">Instructions</label>
          <textarea name="instructions" value={formValues.instructions} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="exercise_picture">Picture</label>
          <input type="file" id="exercise_picture" onChange={(e) => handleFileChange(e, 'exercise_picture')} />
          {formValues.exercise_picture && <img src={formValues.exercise_picture} alt="Exercise Preview" />}
        </div>
        <div className="form-group">
          <label>Category</label>
          <input type="text" name="category" value={formValues.category} onChange={handleChange} />
        </div>
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button type="submit" className="save-btn">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditExercise;
