export const formDataToObject = async (formDataObject, formData) => {
    formData.forEach((value, item) => {
        formDataObject[item] = value;
    });
};