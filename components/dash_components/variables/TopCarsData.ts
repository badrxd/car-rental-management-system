type RowObj = {
  brand: string;
  model: string;
  matricule: string;
  num_of_res: number;
  status: string;
};

export const CarsData = (data) => {
  const customers = [];
  data.forEach((e) => {
    const obj = {
      brand: e.brand,
      model: e.model,
      matricule: e.matricule,
      num_of_res: e.num_of_res,
      status: e.status,
    };
    customers.push(obj);
  });
  return customers;
};
export default CarsData;
