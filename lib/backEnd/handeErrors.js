const handeErrors = (error) => {
  let message = "Internal Server Erorr";
  if (error?.code) {
    switch (error.code) {
      case "P2002":
        return (message = "Matricule belong to another car");
      default:
        return message;
    }
  }
  if (error?.name) {
    switch (error.code) {
      case "PrismaClientValidationError":
        return (message = "The attribute are invalid.");
      default:
        return message;
    }
  }
  return message;
};
export default handeErrors;
