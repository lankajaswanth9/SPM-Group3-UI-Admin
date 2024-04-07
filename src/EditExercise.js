import React, { useState } from 'react';
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

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormValues(prevState => ({ ...prevState, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    onSave(formValues);
  };

  return (
    <div className="edit-exercise-form">
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="logo">Logo</label>
          <input type="file" id="logo" onChange={(e) => handleFileChange(e, 'logo')} />
          {typeof formValues.logo === 'string' && <img src={formValues.logo} alt="Logo Preview" />}
        </div>
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" value={formValues.title} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Instructions</label>
          <textarea name="instructions" value={formValues.instructions} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="exercise_picture">Picture</label>
          <input type="file" id="exercise_picture" onChange={(e) => handleFileChange(e, 'exercise_picture')} />
          {typeof formValues.exercise_picture === 'string' && <img src={formValues.exercise_picture} alt="Exercise Preview" />}
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
