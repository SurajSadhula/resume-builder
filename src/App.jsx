import { useState } from "react";
import "./App.module.css";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import styles from "./App.module.css";
function App() {
  const [resumeData, setResumeData] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  return (
    <div className={styles.appContainer}>

        <ResumeForm onGenerateData={(data) => setResumeData(data)} togglePreview={() => setShowPreview(true)}/>
        <div className={styles.buttonContainer}>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={styles.toggleButton}
          >
            {showPreview ? "Hide Resume Preview" : "Show Resume Preview"}
          </button>
        </div>
        {showPreview && <ResumePreview resumeData={resumeData} />}
    </div>
  );
}

export default App;
