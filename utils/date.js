const getDateFormate = () => {
  const date = new Date();
  const dateString = date.toLocaleDateString().split("/");
  const dateFormate = `${dateString[2]}-${dateString[1]}-${dateString[0]}`;
  return dateFormate;
};

export { getDateFormate };
