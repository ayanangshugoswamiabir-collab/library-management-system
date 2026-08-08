import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";


function CategoryDistributionChart() {

  const data = [
    {
      name: "Programming",
      value: 40,
    },
    {
      name: "Fiction",
      value: 30,
    },
    {
      name: "Science",
      value: 20,
    },
    {
      name: "Others",
      value: 10,
    },
  ];


  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#f59e0b",
    "#9333ea",
  ];


  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">


      {/* Header */}
      <div className="mb-6">

        <h2 className="text-xl font-bold text-gray-800">
          Book Categories
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Distribution of books by category
        </p>

      </div>



      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>

        <PieChart>


          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >

            {data.map((entry, index) => (

              <Cell
                key={`cell-${index}`}
                fill={COLORS[index]}
              />

            ))}

          </Pie>


          <Tooltip />


          <Legend />

        </PieChart>

      </ResponsiveContainer>


    </div>
  );
}


export default CategoryDistributionChart;