export const formDataToObject = async (formDataObject, formData) => {
  formData.forEach((value, item) => {
    if (value !== null || value === "") {
      formDataObject[item] = value;
    }
  });
};
