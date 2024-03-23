type RowObj = {
  fullName: string;
  licenseId: string;
  phone: string;
  num_of_res: number;
  spending: string;
  balcklist: boolean;
  id: string;
};
export const AllCarsTableData = (data) => {
  const customerData = [];
  data?.forEach((e) => {
    const obj = {
      fullName: e.full_name,
      licenseId: e.driver_id,
      phone: e.phone,
      num_of_res: e.num_of_res,
      spending: e.spending,
      balcklist:e.balcklist,
      id:e.id,
    };
    customerData.push(obj);
  });
  return customerData;
};
export default AllCarsTableData;
