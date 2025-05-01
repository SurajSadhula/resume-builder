import React, { useRef } from "react";
import jsPDF from "jspdf";
import styles from "./ResumeReview.module.css";
import { MdOutlineFileDownload } from "react-icons/md";

const ResumePreview = ({ resumeData }) => {
  const reportTemplateRef = useRef(null);
  const exportPDF = () => {
    const resumeElement = document.getElementById("resume-preview");
    if (!resumeElement) return;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    doc.html(resumeElement, {
      callback: (pdf) => {
        pdf.save("Resume.pdf");
      },
      x: 0,
      y: 0,
      autoPaging: "text",
      margin: [5, 0, 15, 0],
      html2canvas: {
        allowTaint: true,
        letterRendering: true,
        logging: false,
        scale: 0.2,
      },
    });
  };

  return (
    <div ref={reportTemplateRef}>
      <div id="resume-preview" className={styles.resumeContainer}>
        <div className={styles.resumeHeader}>
          <h1>{resumeData.name || "Your Name"}</h1>
        </div>
        <h2 className={styles.resumeSectionTitle}>Professional Summary</h2>
        <div className={styles.resumeSection}>
          <p>{resumeData.summary || "Your Professional Summary..."}</p>
        </div>

        <h2 className={styles.resumeSectionTitle}>Work Experience</h2>
        <div className={styles.resumeSection}>
          {resumeData.workExperienceEntries ? (
            resumeData.workExperienceEntries.map((entry, index) => (
              <div key={index} className={styles.workExperienceItem}>
                <div className={styles.jobHeader}>
                  <h3>{entry.jobTitle || "Job Title"}</h3>
                  <span className={styles.divider}>|</span>
                  <h4>{entry.company || "Company Name"}</h4>
                </div>{" "}
                <ul>
                  {entry.responsibilities
                    ?.split(";")
                    .map(
                      (responsibility, i) =>
                        responsibility.trim() && (
                          <li key={i}>{responsibility.trim()}</li>
                        )
                    )}
                </ul>
              </div>
            ))
          ) : (
            <p>Your Work Experience...</p>
          )}
        </div>
        <h2 className={styles.resumeSectionTitle}>Skills</h2>
        <div className={styles.resumeSection}>
          <ul>
            {resumeData.skills ? (
              resumeData.skills.map((skill, index) => (
                <li key={index}>{skill.label || skill}</li>
              ))
            ) : (
              <li>Your Skill</li>
            )}
          </ul>
        </div>
      </div>
      <div className={styles.exportContainer}>
        <button onClick={exportPDF} className={styles.exportButton}>
          <MdOutlineFileDownload />
          Export PDF
        </button>
      </div>
    </div>
  );
};

export default ResumePreview;
