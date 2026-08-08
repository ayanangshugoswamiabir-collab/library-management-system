
import { useEffect, useState } from "react";

import {
  BookOpen,
  UserRound,
  Library,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Users,
  Layers3,
} from "lucide-react";

import { getBooks } from "../api/bookApi";
import { getUsers } from "../api/userApi";
import { issueBook } from "../api/borrowApi";


const IssueBook = () => {

  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  const [bookId, setBookId] = useState("");
  const [userId, setUserId] = useState("");

  const [loadingBooks, setLoadingBooks] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [issuing, setIssuing] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  // =====================================
  // Fetch Books
  // =====================================

  useEffect(() => {

    const fetchBooks = async () => {

      try {

        setLoadingBooks(true);

        const data = await getBooks();

        setBooks(data.books || []);

      } catch (error) {

        console.error(
          "Failed to fetch books:",
          error
        );

        setError(
          error.response?.data?.message ||
          "Failed to load books."
        );

      } finally {

        setLoadingBooks(false);

      }

    };


    fetchBooks();

  }, []);



  // =====================================
  // Fetch Users
  // =====================================

  useEffect(() => {

    const fetchUsers = async () => {

      try {

        setLoadingUsers(true);

        const data = await getUsers();

        setUsers(data.users || []);

      } catch (error) {

        console.error(
          "Failed to fetch users:",
          error
        );

        setError(
          error.response?.data?.message ||
          "Failed to load users."
        );

      } finally {

        setLoadingUsers(false);

      }

    };


    fetchUsers();

  }, []);



  // =====================================
  // Issue Book
  // =====================================

  const handleIssueBook = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");


    // Validate Book

    if (!bookId) {

      setError("Please select a book.");

      return;

    }


    //Validate Student

    if (!userId) {

      setError("Please select a student.");

      return;

    }


    try {

      setIssuing(true);


      const data = await issueBook(
         userId,
         bookId
        );

      console.log(
        "Book issued successfully:",
        data
      );


      setSuccess(
        data.message ||
        "Book issued successfully."
      );


      // Reset selections

      setBookId("");
      setUserId("");


      // Refresh books so availableCopies
      // immediately reflects the new value

      const updatedBooks = await getBooks();

      setBooks(updatedBooks.books || []);


    } catch (error) {

      console.error(
        "Failed to issue book:",
        error
      );


      setError(
        error.response?.data?.message ||
        "Failed to issue book."
      );

    } finally {

      setIssuing(false);

    }

  };



  // =====================================
  // Selected Book
  // =====================================

  const selectedBook = books.find(
    (book) => book._id === bookId
  );


  // =====================================
  // Selected Student
  // =====================================

  const selectedStudent = users.find(
    (user) => user._id === userId
  );



  return (

    <div
      className="
        min-h-full
        relative
        overflow-hidden

        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-indigo-950

        p-5
        md:p-8
      "
    >

      {/* =====================================
          BACKGROUND ATMOSPHERE
      ===================================== */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        <div
          className="
            absolute
            -top-48
            -right-40
            w-[550px]
            h-[550px]
            rounded-full
            bg-blue-600/10
            blur-[130px]
          "
        />

        <div
          className="
            absolute
            top-1/3
            -left-56
            w-[500px]
            h-[500px]
            rounded-full
            bg-indigo-600/10
            blur-[130px]
          "
        />

        <div
          className="
            absolute
            bottom-[-300px]
            right-1/4
            w-[600px]
            h-[600px]
            rounded-full
            bg-cyan-500/5
            blur-[150px]
          "
        />

        {/* Subtle grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.025]

            bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]

            bg-[size:50px_50px]
          "
        />

      </div>



      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <div
        className="
          relative
          z-10

          max-w-6xl
          mx-auto
        "
      >


        {/* =====================================
            HEADER
        ===================================== */}

        <div className="mb-8">

          {/* Badge */}

          <div
            className="
              inline-flex
              items-center
              gap-2

              px-3
              py-1.5

              rounded-full

              bg-blue-500/10
              border
              border-blue-400/15

              text-blue-300

              text-xs
              font-semibold

              mb-4
            "
          >

            <Library size={14} />

            Borrowing Management

          </div>


          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-end
              md:justify-between
              gap-5
            "
          >

            <div>

              <h1
                className="
                  text-4xl
                  md:text-5xl

                  font-black
                  tracking-tight

                  text-white
                "
              >

                Issue Book

              </h1>


              <p
                className="
                  mt-3
                  text-slate-400
                  max-w-xl
                  leading-relaxed
                "
              >

                Issue a book to a student and create
                a new borrowing record in the library.

              </p>

            </div>


            {/* Header Icon */}

            <div
              className="
                relative

                w-20
                h-20

                rounded-[1.5rem]

                bg-gradient-to-br
                from-blue-500
                via-indigo-600
                to-purple-700

                border
                border-white/10

                shadow-[0_20px_45px_rgba(59,130,246,0.28)]

                flex
                items-center
                justify-center

                rotate-3
              "
            >

              <div
                className="
                  absolute
                  inset-1

                  rounded-[1.25rem]

                  border
                  border-white/10
                "
              />

              <BookOpen
                size={32}
                className="
                  text-white
                  -rotate-3
                "
              />

              <Sparkles
                size={13}
                className="
                  absolute
                  top-3
                  right-3
                  text-blue-200
                "
              />

            </div>

          </div>

        </div>



        {/* =====================================
            ALERTS
        ===================================== */}

        {error && (

          <div
            className="
              mb-6

              flex
              items-start
              gap-3

              rounded-2xl

              border
              border-red-400/20

              bg-red-500/10

              backdrop-blur-xl

              px-5
              py-4

              text-red-300

              shadow-[0_15px_40px_rgba(239,68,68,0.08)]
            "
          >

            <AlertCircle
              size={20}
              className="mt-0.5 shrink-0"
            />

            <div>

              <p className="font-bold">
                Unable to issue book
              </p>

              <p className="mt-1 text-sm text-red-300/80">
                {error}
              </p>

            </div>

          </div>

        )}



        {success && (

          <div
            className="
              mb-6

              flex
              items-start
              gap-3

              rounded-2xl

              border
              border-emerald-400/20

              bg-emerald-500/10

              backdrop-blur-xl

              px-5
              py-4

              text-emerald-300

              shadow-[0_15px_40px_rgba(16,185,129,0.08)]
            "
          >

            <CheckCircle2
              size={20}
              className="mt-0.5 shrink-0"
            />

            <div>

              <p className="font-bold">
                Book issued successfully
              </p>

              <p className="mt-1 text-sm text-emerald-300/80">
                {success}
              </p>

            </div>

          </div>

        )}



        {/* =====================================
            MAIN GRID
        ===================================== */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[1fr_0.72fr]
            gap-6
            items-start
          "
        >


          {/* =====================================
              ISSUE FORM
          ===================================== */}

          <div className="relative">

            {/* 3D Back Layer */}

            <div
              className="
                absolute
                inset-x-4
                -bottom-4
                h-full

                rounded-[2rem]

                bg-gradient-to-br
                from-blue-600/10
                to-indigo-600/10

                border
                border-white/5

                shadow-[0_25px_55px_rgba(0,0,0,0.25)]
              "
            />


            {/* Main Card */}

            <div
              className="
                relative

                rounded-[2rem]

                bg-white/[0.065]

                border
                border-white/10

                backdrop-blur-2xl

                shadow-[0_25px_70px_rgba(0,0,0,0.30)]

                overflow-hidden

                p-6
                md:p-8
              "
            >

              {/* Top Glow */}

              <div
                className="
                  absolute
                  top-0
                  left-12
                  right-12
                  h-px

                  bg-gradient-to-r
                  from-transparent
                  via-blue-400/50
                  to-transparent
                "
              />


              {/* Card Header */}

              <div className="flex items-center gap-4 mb-8">

                <div
                  className="
                    w-12
                    h-12

                    rounded-2xl

                    bg-gradient-to-br
                    from-blue-500
                    to-indigo-600

                    flex
                    items-center
                    justify-center

                    shadow-[0_10px_30px_rgba(59,130,246,0.25)]
                  "
                >

                  <BookOpen
                    size={21}
                    className="text-white"
                  />

                </div>


                <div>

                  <h2 className="text-lg font-black text-white">
                    Create Borrowing Record
                  </h2>

                  <p className="text-xs text-slate-500 mt-1">
                    Select a book and the student receiving it
                  </p>

                </div>

              </div>



              <form onSubmit={handleIssueBook}>


                {/* =====================================
                    BOOK SELECTION
                ===================================== */}

                <div className="mb-7">

                  <label
                    htmlFor="book"
                    className="
                      mb-3
                      flex
                      items-center
                      gap-2

                      text-sm
                      font-bold
                      text-slate-200
                    "
                  >

                    <BookOpen
                      size={15}
                      className="text-blue-400"
                    />

                    Select Book

                  </label>


                  <div className="relative">

                    <select
                      id="book"
                      value={bookId}
                      onChange={(e) => setBookId(e.target.value)}
                      disabled={loadingBooks || issuing}
                      className="
                        appearance-none

                        w-full

                        rounded-2xl

                        border
                        border-white/10

                        bg-slate-950/60

                        px-4
                        py-4
                        pr-12

                        text-slate-200

                        outline-none

                        transition-all

                        focus:border-blue-500/40
                        focus:ring-4
                        focus:ring-blue-500/10

                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >

                      <option
                        value=""
                        className="bg-slate-900"
                      >

                        {loadingBooks
                          ? "Loading books..."
                          : "Choose a book from the collection"}

                      </option>


                      {books
                        .filter(
                          (book) => book.availableCopies > 0
                        )
                        .map((book) => (

                          <option
                            key={book._id}
                            value={book._id}
                            className="bg-slate-900"
                          >

                            {book.title} — Available:{" "}
                            {book.availableCopies}

                          </option>

                        ))}

                    </select>

                    <ArrowRight
                      size={17}
                      className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        rotate-90
                        text-slate-500
                        pointer-events-none
                      "
                    />

                  </div>


                  {/* Selected Book Preview */}

                  {selectedBook && (

                    <div
                      className="
                        mt-3

                        flex
                        items-center
                        gap-3

                        p-3

                        rounded-xl

                        bg-blue-500/[0.06]

                        border
                        border-blue-400/10
                      "
                    >

                      <div
                        className="
                          w-9
                          h-9
                          rounded-lg

                          bg-blue-500/10

                          flex
                          items-center
                          justify-center

                          shrink-0
                        "
                      >

                        <Layers3
                          size={16}
                          className="text-blue-400"
                        />

                      </div>


                      <div className="min-w-0">

                        <p className="text-xs text-slate-500">
                          Available copies
                        </p>

                        <p className="text-sm font-bold text-blue-300">
                          {selectedBook.availableCopies} copies available
                        </p>

                      </div>

                    </div>

                  )}

                </div>



                {/* =====================================
                    STUDENT SELECTION
                ===================================== */}

                <div className="mb-8">

                  <label
                    htmlFor="student"
                    className="
                      mb-3
                      flex
                      items-center
                      gap-2

                      text-sm
                      font-bold
                      text-slate-200
                    "
                  >

                    <UserRound
                      size={15}
                      className="text-indigo-400"
                    />

                    Select Student

                  </label>


                  <div className="relative">

                    <select
                      id="student"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      disabled={loadingUsers || issuing}
                      className="
                        appearance-none

                        w-full

                        rounded-2xl

                        border
                        border-white/10

                        bg-slate-950/60

                        px-4
                        py-4
                        pr-12

                        text-slate-200

                        outline-none

                        transition-all

                        focus:border-indigo-500/40
                        focus:ring-4
                        focus:ring-indigo-500/10

                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >

                      <option
                        value=""
                        className="bg-slate-900"
                      >

                        {loadingUsers
                          ? "Loading students..."
                          : "Choose a student"}

                      </option>


                      {users
                        .filter(
                          (user) => user.role === "Student"
                        )
                        .map((user) => (

                          <option
                            key={user._id}
                            value={user._id}
                            className="bg-slate-900"
                          >

                            {user.name} — {user.email}

                          </option>

                        ))}

                    </select>

                    <ArrowRight
                      size={17}
                      className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        rotate-90
                        text-slate-500
                        pointer-events-none
                      "
                    />

                  </div>


                  {/* Selected Student Preview */}

                  {selectedStudent && (

                    <div
                      className="
                        mt-3

                        flex
                        items-center
                        gap-3

                        p-3

                        rounded-xl

                        bg-indigo-500/[0.06]

                        border
                        border-indigo-400/10
                      "
                    >

                      <div
                        className="
                          w-9
                          h-9

                          rounded-lg

                          bg-indigo-500/10

                          flex
                          items-center
                          justify-center

                          shrink-0
                        "
                      >

                        <UserRound
                          size={16}
                          className="text-indigo-400"
                        />

                      </div>


                      <div className="min-w-0">

                        <p className="text-xs text-slate-500">
                          Selected student
                        </p>

                        <p className="text-sm font-bold text-indigo-300 truncate">
                          {selectedStudent.name}
                        </p>

                      </div>

                    </div>

                  )}

                </div>



                {/* =====================================
                    ISSUE BUTTON
                ===================================== */}

                <button
                  type="submit"
                  disabled={
                    issuing ||
                    loadingBooks ||
                    loadingUsers
                  }
                  className="
                    group

                    relative

                    w-full

                    overflow-hidden

                    flex
                    items-center
                    justify-center
                    gap-2

                    rounded-2xl

                    bg-gradient-to-r
                    from-blue-600
                    via-indigo-600
                    to-purple-600

                    border
                    border-white/10

                    px-5
                    py-4

                    text-white

                    font-black

                    shadow-[0_15px_35px_rgba(59,130,246,0.25)]

                    hover:shadow-[0_20px_45px_rgba(99,102,241,0.32)]

                    hover:-translate-y-0.5

                    active:translate-y-[1px]

                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    disabled:hover:translate-y-0

                    transition-all
                    duration-300
                  "
                >

                  {/* Shine */}

                  <span
                    className="
                      absolute
                      inset-y-0
                      -left-20
                      w-14

                      bg-white/20

                      skew-x-[-20deg]

                      group-hover:left-[110%]

                      transition-all
                      duration-700
                    "
                  />


                  <BookOpen
                    size={18}
                  />

                  {issuing
                    ? "Issuing Book..."
                    : "Issue Book"}

                  {!issuing && (
                    <ArrowRight
                      size={17}
                      className="
                        transition-transform
                        group-hover:translate-x-1
                      "
                    />
                  )}

                </button>


              </form>

            </div>

          </div>



          {/* =====================================
              RIGHT INFORMATION PANEL
          ===================================== */}

          <div className="space-y-5">


            {/* Borrow Preview */}

            <div
              className="
                relative

                rounded-[2rem]

                bg-white/[0.065]

                border
                border-white/10

                backdrop-blur-2xl

                shadow-[0_25px_60px_rgba(0,0,0,0.28)]

                overflow-hidden

                p-6
              "
            >

              <div
                className="
                  absolute
                  top-0
                  left-8
                  right-8
                  h-px

                  bg-gradient-to-r
                  from-transparent
                  via-indigo-400/40
                  to-transparent
                "
              />


              <div className="flex items-center gap-3 mb-6">

                <div
                  className="
                    w-11
                    h-11

                    rounded-xl

                    bg-gradient-to-br
                    from-indigo-500/20
                    to-purple-500/20

                    border
                    border-indigo-400/10

                    flex
                    items-center
                    justify-center
                  "
                >

                  <Sparkles
                    size={19}
                    className="text-indigo-300"
                  />

                </div>


                <div>

                  <h3 className="font-black text-white">
                    Issue Preview
                  </h3>

                  <p className="text-xs text-slate-500 mt-1">
                    Review before issuing
                  </p>

                </div>

              </div>


              {/* Book */}

              <div
                className="
                  p-4

                  rounded-2xl

                  bg-slate-950/40

                  border
                  border-white/5

                  mb-3
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-10
                      h-10

                      rounded-xl

                      bg-blue-500/10

                      flex
                      items-center
                      justify-center
                    "
                  >

                    <BookOpen
                      size={17}
                      className="text-blue-400"
                    />

                  </div>


                  <div className="min-w-0">

                    <p className="text-[10px] uppercase tracking-wider text-slate-600 font-bold">
                      Book
                    </p>

                    <p className="text-sm font-bold text-white truncate">
                      {selectedBook?.title || "No book selected"}
                    </p>

                  </div>

                </div>

              </div>


              {/* Student */}

              <div
                className="
                  p-4

                  rounded-2xl

                  bg-slate-950/40

                  border
                  border-white/5
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-10
                      h-10

                      rounded-xl

                      bg-indigo-500/10

                      flex
                      items-center
                      justify-center
                    "
                  >

                    <UserRound
                      size={17}
                      className="text-indigo-400"
                    />

                  </div>


                  <div className="min-w-0">

                    <p className="text-[10px] uppercase tracking-wider text-slate-600 font-bold">
                      Student
                    </p>

                    <p className="text-sm font-bold text-white truncate">
                      {selectedStudent?.name || "No student selected"}
                    </p>

                  </div>

                </div>

              </div>

            </div>



            {/* Library Stats */}

            <div
              className="
                relative

                rounded-[2rem]

                bg-white/[0.045]

                border
                border-white/10

                backdrop-blur-xl

                shadow-[0_20px_50px_rgba(0,0,0,0.22)]

                p-6
              "
            >

              <div className="flex items-center gap-3 mb-5">

                <div
                  className="
                    w-10
                    h-10

                    rounded-xl

                    bg-emerald-500/10

                    border
                    border-emerald-400/10

                    flex
                    items-center
                    justify-center
                  "
                >

                  <Library
                    size={18}
                    className="text-emerald-400"
                  />

                </div>


                <div>

                  <p className="text-sm font-black text-white">
                    Library Overview
                  </p>

                  <p className="text-xs text-slate-500">
                    Current collection
                  </p>

                </div>

              </div>


              <div className="grid grid-cols-2 gap-3">


                <div
                  className="
                    p-4

                    rounded-xl

                    bg-white/[0.035]

                    border
                    border-white/5
                  "
                >

                  <BookOpen
                    size={15}
                    className="text-blue-400 mb-2"
                  />

                  <p className="text-2xl font-black text-white">
                    {books.length}
                  </p>

                  <p className="text-[10px] uppercase tracking-wide text-slate-600 mt-1">
                    Books
                  </p>

                </div>


                <div
                  className="
                    p-4

                    rounded-xl

                    bg-white/[0.035]

                    border
                    border-white/5
                  "
                >

                  <Users
                    size={15}
                    className="text-indigo-400 mb-2"
                  />

                  <p className="text-2xl font-black text-white">
                    {
                      users.filter(
                        (user) => user.role === "Student"
                      ).length
                    }
                  </p>

                  <p className="text-[10px] uppercase tracking-wide text-slate-600 mt-1">
                    Students
                  </p>

                </div>

              </div>

            </div>


            {/* Info */}

            <div
              className="
                rounded-2xl

                border
                border-blue-400/10

                bg-blue-500/[0.045]

                p-5
              "
            >

              <div className="flex gap-3">

                <CheckCircle2
                  size={18}
                  className="
                    text-blue-400
                    mt-0.5
                    shrink-0
                  "
                />

                <div>

                  <p className="text-sm font-bold text-blue-200">
                    Ready to issue?
                  </p>

                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Select an available book and a student.
                    The borrowing record will be created automatically.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};


export default IssueBook;

