import React, { useState } from "react";
import "./EditApplication.css";
import "../ApplicationForm/ApplicationForm.css";

export const EditApplication = (props) => {
  const { applicationData, onCancel, onSave } = props;
  const [formData, setFormData] = useState(applicationData);
  
  const handleOnSubmit = (event) => {
    event.preventDefault();
    
    onSave(formData);
  };

  const handleOnValueChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  return (
    <div className="edit-form">
      <div className="edit-content">
        <h3>Edit Job Application</h3>
        <div className="form-section">
          <form className="application-form" onSubmit={handleOnSubmit}>
            <div>
              <label>Company:</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleOnValueChange}
                required
              />
            </div>
            <div>
              <label>Role:</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleOnValueChange}
                required
              />
            </div>
            <div>
              <label>Type:</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleOnValueChange}
                required
              >
                <option>Onsite</option>
                <option>Remote</option>
                <option>Hybrid</option>
              </select>
            </div>
            {formData.jobType !== "Remote" && (
              <div>
                <label>Location:</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleOnValueChange}
                  required
                />
              </div>
            )}

            <div>
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleOnValueChange}
              />
            </div>
            <div>
              <label>Status:</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleOnValueChange}
                required
              >
                <option>Applied</option>
                <option>Interviewing</option>
                <option>Rejected</option>
                <option>Hired</option>
              </select>
            </div>
            <div>
              <label>Note:</label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleOnValueChange}
                rows={3}
                placeholder="Write your notes..."
              />
            </div>

            <button type="submit">Update Application</button>
            <button onClick={onCancel}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
};
