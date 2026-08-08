function StatCard({ title, value, icon: Icon, description }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition duration-300">

      {/* Top Section */}
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {value}
          </h2>
        </div>


        {/* Icon */}
        <div className="p-3 bg-blue-50 rounded-xl">
          <Icon
            size={26}
            className="text-blue-600"
          />
        </div>

      </div>


      {/* Description */}
      <p className="text-xs text-gray-400 mt-4">
        {description}
      </p>

    </div>
  );
}

export default StatCard;