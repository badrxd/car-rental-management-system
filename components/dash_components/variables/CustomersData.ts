type RowObj = {
  name: string;
  phone: string;
  license_id: string;
  num_of_res: number;
  spending: number;
};
export const CustomersData = (data) => {
  const customers = [];
  data.forEach((e) => {
    const obj = {
      name: e.full_name,
      phone: e.phone,
      license_id: e.driver_id,
      num_of_res: e.num_of_res,
      spending: e.spending,
    };
    customers.push(obj);
  });
  return customers;
};
export default CustomersData;
