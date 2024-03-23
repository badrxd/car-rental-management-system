type RowObj = {
  brand: string;
  model: string;
  image: string;
  matricule: string;
  num_of_res: number;
};
export const RentedCarsData = (data) => {
  const cardata = [];
  data?.forEach((e) => {
    const obj = {
      brand: e.brand,
      model: e.model,
      image: e.image,
      matricule: e.matricule,
      num_of_res: e.num_of_res,
    };
    cardata.push(obj);
  });
  return cardata;
};
export default RentedCarsData;
