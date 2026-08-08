import { BookOpen, TrendingUp } from "lucide-react";

function PopularBooks() {
  const books = [
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      borrowCount: 12,
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      borrowCount: 9,
    },
    {
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt",
      borrowCount: 7,
    },
    {
      title: "Design Patterns",
      author: "Erich Gamma",
      borrowCount: 6,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Most Borrowed Books
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Popular books in your library
          </p>
        </div>

        <TrendingUp
          size={24}
          className="text-blue-600"
        />

      </div>


      {/* Books */}
      <div className="space-y-4">

        {books.map((book, index) => (
          <div
            key={book.title}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition"
          >

            {/* Rank */}
            <div className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 font-bold rounded-lg">
              {index + 1}
            </div>


            {/* Book Icon */}
            <div className="p-2 bg-gray-100 rounded-lg">
              <BookOpen
                size={20}
                className="text-gray-600"
              />
            </div>


            {/* Book Information */}
            <div className="flex-1">

              <h3 className="font-medium text-gray-800">
                {book.title}
              </h3>

              <p className="text-sm text-gray-500">
                {book.author}
              </p>

            </div>


            {/* Borrow Count */}
            <div className="text-right">

              <p className="font-semibold text-gray-800">
                {book.borrowCount}
              </p>

              <p className="text-xs text-gray-400">
                borrows
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default PopularBooks;