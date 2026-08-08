import {
  BookOpen,
  UserPlus,
  RotateCcw,
  Library,
} from "lucide-react";

function RecentActivity() {
  const activities = [
    {
      title: "Clean Code was borrowed",
      description: "Borrowed by a student",
      icon: BookOpen,
      time: "10 minutes ago",
    },
    {
      title: "New user registered",
      description: "A new student joined the library",
      icon: UserPlus,
      time: "30 minutes ago",
    },
    {
      title: "Book returned",
      description: "A borrowed book was returned",
      icon: RotateCcw,
      time: "1 hour ago",
    },
    {
      title: "New book added",
      description: "A new book was added to the library",
      icon: Library,
      time: "2 hours ago",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Recent Activity
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Latest activity in your library
          </p>
        </div>
      </div>

      <div className="space-y-5">

        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div
              key={index}
              className="flex items-center gap-4"
            >

              <div className="p-3 bg-blue-50 rounded-xl">
                <Icon
                  size={20}
                  className="text-blue-600"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-medium text-gray-800">
                  {activity.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {activity.description}
                </p>
              </div>

              <span className="text-xs text-gray-400">
                {activity.time}
              </span>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default RecentActivity;