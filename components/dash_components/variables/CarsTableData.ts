type RowObj = {
  brand: string;
  model: string;
  image: string;
  matricule: string;
  num_of_res: number;
  status:string;
  id:string;
};
export const CarsTableData = (data) => {
  const cardata = [];
  data.forEach((e) => {
    const obj = {
      brand: e.brand,
      model: e.model,
      image: e.image,
      matricule: e.matricule,
      num_of_res: e.num_of_res,
      status:e.status,
      id:e.id,
    };
    cardata.push(obj);
  });
  return cardata;
};
export default CarsTableData;
