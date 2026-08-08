function DashboardSkeleton() {
  return (
    <div className="animate-pulse">


      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-8">

        <div>

          <div className="h-8 bg-gray-200 rounded w-48"></div>

          <div className="h-4 bg-gray-200 rounded w-64 mt-3"></div>

        </div>


        <div className="h-14 bg-gray-200 rounded-xl w-36"></div>

      </div>





      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">


        {[1, 2, 3, 4].map((item) => (

          <div
            key={item}
            className="bg-white p-6 rounded-2xl border border-gray-100"
          >

            <div className="h-4 bg-gray-200 rounded w-24"></div>

            <div className="h-10 bg-gray-200 rounded w-20 mt-4"></div>

            <div className="h-3 bg-gray-200 rounded w-32 mt-4"></div>

          </div>

        ))}


      </div>





      {/* Bottom Sections Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">


        <div className="h-72 bg-gray-200 rounded-2xl"></div>


        <div className="h-72 bg-gray-200 rounded-2xl"></div>


      </div>




      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">


        <div className="h-80 bg-gray-200 rounded-2xl"></div>


        <div className="h-80 bg-gray-200 rounded-2xl"></div>


      </div>



    </div>
  );
}


export default DashboardSkeleton;