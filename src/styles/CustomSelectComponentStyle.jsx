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

export default customSelectComponentStyles;