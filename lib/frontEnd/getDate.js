const getDate = (Datetime) => {
  const [year, month, day] = Datetime.split("T")[0].split("-");
  return `${day}/${month}/${year}`;
};
export { getDate };
