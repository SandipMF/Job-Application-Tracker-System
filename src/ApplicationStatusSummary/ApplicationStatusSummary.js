import React from "react";
import "./ApplicationStatusSummary.css";

export const ApplicationStatusSummary = (props) => {
  const { statusCount } = props;
  return (
    <div className="summary-row">
      <div className="indevidual-status">
        Job Application: {statusCount.totalJobApplicationCount}
      </div>
      <div className="indevidual-status">
        Applied: {statusCount.jobApplyStatusCount}
      </div>
      <div className="indevidual-status">
        Interviewing: {statusCount.jobInterviewingStatusCount}
      </div>
      <div className="indevidual-status hired">
        Hired: {statusCount.jobHiredStatusCount}
      </div>
      <div className="rejected">Rejected: {statusCount.jobRejectedStatusCount}</div>
    </div>
  );
};
