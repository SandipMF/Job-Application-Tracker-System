import React from "react";
import "./ApplicationList.css";

export const ApplicationList = (props) => {
  const { applicationsData, onEdit, onDelete } = props;
  return (
    <div className="application-list-section">
      <h3>Job Application Table</h3>
      <div>
        <table className="application-list-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(applicationsData) &&
              applicationsData.map((application) => {
                return (
                  <tr>
                    <td>{application.company}</td>
                    <td>{application.role}</td>
                    <td>{application.jobType}</td>
                    <td>{application.status}</td>
                    <td>
                      <button
                        onClick={() => {
                          onEdit(application);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          onDelete(application);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
