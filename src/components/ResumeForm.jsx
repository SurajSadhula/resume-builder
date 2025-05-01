import React, { Fragment } from "react";
import styles from "./ResumeForm.module.css";
import { useForm, useFieldArray, Controller } from "react-hook-form";
// import axios from "axios";
import Select from "react-select";
import { HiSparkles } from "react-icons/hi";
import skills from "../data/skills.json";

const customSelectComponentStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",
    padding: "0.85rem 0.5rem",
    minHeight: "56px",
    backgroundColor: state.isFocused ? "#ffffff" : "#f8fafc",
    borderColor: state.isFocused ? "#90cdf4" : "#e2e8f0",
    borderWidth: "1px",
    borderRadius: "10px",
    boxShadow: state.isFocused ? "0 0 6px rgba(79, 70, 229, 0.2)" : "none",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    fontSize: "1.3rem",
    fontFamily: "inherit",
    "&:hover": {
      borderColor: "#007bff",
      backgroundColor: "#ffffff",
    },
  }),

  menu: (provided) => ({
    ...provided,
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    marginTop: "6px",
    padding: "8px 0",
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#90cdf4"
      : state.isFocused
      ? "#f5f3ff"
      : "transparent",
    color: state.isSelected ? "#ffffff" : "#2d3748",
    padding: "10px 18px",
    fontSize: "1.3rem",
    fontWeight: state.isSelected ? "600" : "400",
    "&:active": {
      backgroundColor: "#90cdf4",
      color: "#ffffff",
    },
    "&:hover": {
      backgroundColor: "#f5f3ff",
      color: "#2d3748",
    },
  }),

  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#eef2ff",
    borderRadius: "8px",
    padding: "4px 8px",
  }),

  multiValueLabel: (provided) => ({
    ...provided,
    color: "#2d3748",
    fontWeight: "500",
    fontSize: "1.3rem",
    padding: "0 6px",
  }),

  multiValueRemove: (provided) => ({
    ...provided,
    color: "#007bff",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#229dea",
    },
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "#94a3b8",
    fontSize: "1.3rem",
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#94a3b8",
    padding: "0 12px",
    "&:hover": {
      color: "#007bff",
    },
  }),

  clearIndicator: (provided) => ({
    ...provided,
    color: "#94a3b8",
    padding: "0 12px",
    "&:hover": {
      color: "#ef4444",
    },
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  input: (provided) => ({
    ...provided,
    color: "#2d3748",
    fontSize: "1.3rem",
    padding: "0.85rem 1.25rem",
  }),
};

const ResumeForm = ({ onGenerateData, togglePreview }) => {
  const skillOptions = skills.map((skill) => ({ value: skill, label: skill }));
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      workExperienceEntries: [
        {
          jobTitle: "",
          company: "",
          responsibilities: "",
        },
      ],
    },
  });

  // const fetchSkills = async (query) => {
  //   if (!query) return;
  //   try {
  //     const response = await fetch(
  //       `https://api.promptapi.com/skills?q=${query}`,
  //       {
  //         headers: { apikey: "testkey" },
  //       }
  //     );
  //     const data = await response.json();
  //     console.log("data - ", data);
  //     setSkillOptions("a");
  //   } catch (error) {
  //     console.error("Error fetching skills:", error);
  //   }
  // };

  // const submitHandler = async (data) => {
  //   const aiResponse = await axios.post("LAMBDA_ENDPOINT", {
  //     resumeData: data,
  //   });
  //   onGenerateAI(aiResponse.data);
  // };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "workExperienceEntries",
  });

  const submitHandler = (data) => {
    
    console.log("form data - ", data);
    togglePreview();
    onGenerateData(data);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Resume Builder</h2>
      <form onSubmit={handleSubmit(submitHandler)} autoComplete="off">
        {/* Full Name */}
        <div className={styles.formGroup}>
          <label htmlFor="fullName" className={styles.label}>
            Full Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            className={styles.input}
          />
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
        </div>
        {/* Professional Summary */}
        <div className={styles.formGroup}>
          <label htmlFor="summary" className={styles.label}>
            Professional Summary
          </label>
          <textarea
            {...register("summary", { required: "Summary is required" })}
            placeholder="Write a brief professional summary..."
            className={styles.textarea}
          />
          {errors.summary && (
            <span className={styles.error}>{errors.summary.message}</span>
          )}
        </div>
        {/* Work Experience */}
        {fields.map((item, index) => (
          <Fragment key={item.id}>
            <div className={styles.workExperienceContainer}>
              <div className={styles.workExperienceColumn}>
                <label className={styles.label}>Job Title</label>
                <input
                  {...register(`workExperienceEntries.${index}.jobTitle`, {
                    required: "Job title is required",
                  })}
                  placeholder="Software Developer"
                  className={styles.input}
                />
                {errors.workExperienceEntries?.[index]?.jobTitle && (
                  <span className={styles.error}>
                    {errors.workExperienceEntries[index].jobTitle.message}
                  </span>
                )}
              </div>
              <div className={styles.workExperienceColumn}>
                <label className={styles.label}>Company</label>
                <input
                  {...register(`workExperienceEntries.${index}.company`, {
                    required: "Company name is required",
                  })}
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Key Responsibilities</label>
              <textarea
                {...register(
                  `workExperienceEntries.${index}.responsibilities`,
                  { required: "Responsibilities are required" }
                )}
                placeholder="Enter responsibilities separated with semi-colon(;)"
                className={styles.textarea}
              />
            </div>
            {fields.length > 1 && (
              <div className={styles.addButtonContainer}>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className={styles.removeButton}
                >
                  - Remove
                </button>
              </div>
            )}
          </Fragment>
        ))}
        <div className={styles.addButtonContainer}>
          <button
            type="button"
            onClick={() =>
              append({ jobTitle: "", company: "", responsibilities: "" })
            }
            className={styles.addButton}
          >
            + Add Another Job
          </button>
        </div>

        {/* Skills Section */}
        <div className={styles.formGroup}>
          <label htmlFor="skills" className={styles.label}>
            Technical Skills
          </label>
          <Controller
            name="skills"
            control={control}
            rules={{ required: "Skills are required" }}
            render={({ field }) => (
              <Select
                styles={customSelectComponentStyles}
                {...field}
                options={skillOptions}
                isMulti
                placeholder="Type to search skills..."
                onChange={(selected) => field.onChange(selected)}
                value={field.value}
              />
            )}
          />
          {errors.skills && (
            <span className={styles.error}>{errors.skills.message}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <button type="submit" className={styles.button}>
            Generate AI Suggestions
            <HiSparkles />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResumeForm;
