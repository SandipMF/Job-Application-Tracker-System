import { useEffect, useState } from "react";
import "./App.css";
import { ApplicationForm } from "./ApplicationForm/ApplicationForm";
import { ApplicationList } from "./ApplicationList/ApplicationList";
import { ApplicationStatusSummary } from "./ApplicationStatusSummary/ApplicationStatusSummary";
import { EditApplication } from "./EditApplication/EditApplication";

function App() {
  let applications = [];
  // localStorage.removeItem("job_applications");
  if (localStorage.getItem("job_applications") === null) {
    applications = [];
  } else {
    applications = JSON.parse(localStorage.getItem("job_applications"));
  }

  const [jobApplicationsData, setJobApplicationsData] = useState(applications);
  const [isEditJobApplication, setIsEditJobApplication] = useState(null);
  const [applicationStatusCount, setApplicationStatusCount] = useState({
    totalJobApplicationCount: 0,
    jobApplyStatusCount: 0,
    jobInterviewingStatusCount: 0,
    jobHiredStatusCount: 0,
    jobRejectedStatusCount: 0,
  });

  useEffect(() => {
    if (jobApplicationsData && jobApplicationsData.length > 0) {
      let totalJobApplicationCount = jobApplicationsData.length;
      let jobApplyStatusCount = 0;
      let jobInterviewingStatusCount = 0;
      let jobHiredStatusCount = 0;
      let jobRejectedStatusCount = 0;

      jobApplicationsData.forEach((application) => {
        if (application.status === "Applied") {
          jobApplyStatusCount += 1;
        } else if (application.status === "Interviewing") {
          jobInterviewingStatusCount += 1;
        } else if (application.status === "Rejected") {
          jobRejectedStatusCount += 1;
        } else {
          //Hired
          jobHiredStatusCount += 1;
        }
      });

      setApplicationStatusCount({
        totalJobApplicationCount: totalJobApplicationCount,
        jobApplyStatusCount: jobApplyStatusCount,
        jobInterviewingStatusCount: jobInterviewingStatusCount,
        jobHiredStatusCount: jobHiredStatusCount,
        jobRejectedStatusCount: jobRejectedStatusCount,
      });
    }
  }, [jobApplicationsData]);

  const addNewJobApplication = (data) => {
    const id = crypto.randomUUID();
    const newJobApplication = {
      id: id,
      company: data.company,
      role: data.role,
      jobType: data.jobType,
      location: data.location,
      date: data.date,
      status: data.status,
      note: data.note,
    };

    setJobApplicationsData((previousData) => {
      const updatedData = Array.isArray(previousData)
        ? [...jobApplicationsData, newJobApplication]
        : [newJobApplication];

      localStorage.setItem("job_applications", JSON.stringify(updatedData));

      return updatedData;
    });
  };

  const saveEditedApplicationData = (data) => {
    setIsEditJobApplication(null);
    console.log("saveEditedApplicationData: ", data);

    const updatedData = jobApplicationsData.map((application) =>
      application.id === data.id ? data : application
    );

    setJobApplicationsData(updatedData);
    localStorage.setItem("job_applications", JSON.stringify(updatedData));
  };

  const handleOnDeleteApplication = (data) => {
    const updatedArray = jobApplicationsData.filter(
      (application) => application.id !== data.id
    );
    setJobApplicationsData(updatedArray);
    localStorage.setItem("job_applications", JSON.stringify(updatedArray));
  };

  return (
    <div className="App">
      <h2>Job Application Tracker System</h2>
      <ApplicationStatusSummary statusCount={applicationStatusCount} />
      {/*  */}
      <div className="form-with-table">
        {/* left section form */}
        <ApplicationForm onSubmit={addNewJobApplication} />
        {/* right section for table */}
        <ApplicationList
          applicationsData={jobApplicationsData || []}
          onEdit={(data) => {
            setIsEditJobApplication(data);
          }}
          onDelete={(data) => {
            handleOnDeleteApplication(data);
          }}
        />
      </div>
      {isEditJobApplication && (
        <EditApplication
          applicationData={isEditJobApplication}
          onCancel={() => setIsEditJobApplication(null)}
          onSave={saveEditedApplicationData}
        />
      )}
    </div>
  );
}

export default App;
