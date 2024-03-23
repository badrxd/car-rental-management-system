type RowObj = {
  reservation_number: string;
  status: string;
  amount: number;
  start_date: string;
  end_date: string;
  id: string;
};
export const ReservationsTableData = (data) => {
  const cardata = [];
  data?.forEach((e) => {
    const obj = {
      reservation_number: e.reservation_number,
      status: e.model,
      amount: e.image,
      start_date: e.Date_range.start_date,
      end_date: e.num_of_res.end_date,
      id:e.id,
    };
    cardata.push(obj);
  });
  return cardata;
};
export default ReservationsTableData;
