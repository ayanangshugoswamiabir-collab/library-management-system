import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";


function MonthlyBorrowChart() {

  const data = [
    {
      month: "Jan",
      borrowed: 20,
    },
    {
      month: "Feb",
      borrowed: 35,
    },
    {
      month: "Mar",
      borrowed: 50,
    },
    {
      month: "Apr",
      borrowed: 30,
    },
    {
      month: "May",
      borrowed: 45,
    },
    {
      month: "Jun",
      borrowed: 60,
    },
  ];


  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

      <div className="mb-6">

        <h2 className="text-xl font-bold text-gray-800">
          Monthly Borrowing
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Book borrowing trends
        </p>

      </div>


      <ResponsiveContainer width="100%" height={300}>

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />


          <Bar
            dataKey="borrowed"
            fill="#2563eb"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>


    </div>
  );
}


export default MonthlyBorrowChart;