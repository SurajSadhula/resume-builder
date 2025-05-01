import React, { Fragment } from "react";
import styles from "../styles/ResumeForm.module.css";
import { useForm, useFieldArray, Controller } from "react-hook-form";
// import axios from "axios";
import Select from "react-select";
import { HiSparkles } from "react-icons/hi";
import skills from "../data/skills.json";
import customSelectComponentStyles from "../styles/CustomSelectComponentStyle";

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
                {errors.workExperienceEntries?.[index]?.company && (
                  <span className={styles.error}>
                    {errors.workExperienceEntries[index].company.message}
                  </span>
                )}
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
              {errors.workExperienceEntries?.[index]?.responsibilities && (
                <span className={styles.error}>
                  {errors.workExperienceEntries[index].responsibilities.message}
                </span>
              )}
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
