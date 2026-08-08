
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  getBookById,
  deleteBook,
} from "../api/bookApi";

import { studentBorrowBook } from "../api/borrowApi";

import {
  ArrowLeft,
  BookOpen,
  UserRound,
  Hash,
  Layers3,
  Building2,
  Library,
  Package,
  Pencil,
  Trash2,
  ShieldCheck,
  QrCode,
  CalendarDays,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  BookMarked,
} from "lucide-react";


function BookDetails() {

  const { id } = useParams();

  const navigate = useNavigate();


  // ==========================================
  // Book State
  // ==========================================

  const [book, setBook] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [deleting, setDeleting] = useState(false);

  const [borrowing, setBorrowing] = useState(false);


  // ==========================================
  // Get User Role From JWT
  // ==========================================

  const [userRole] = useState(() => {

    try {

      const token = localStorage.getItem("token");

      if (!token) {
        return "";
      }

      const decodedPayload = JSON.parse(
        atob(token.split(".")[1])
      );

      return decodedPayload.role || "";

    } catch (error) {

      console.error(
        "Failed to decode user token:",
        error
      );

      return "";

    }

  });


  // ==========================================
  // Fetch Book Details
  // ==========================================

  useEffect(() => {

    const fetchBook = async () => {

      try {

        setLoading(true);

        setError("");

        const data = await getBookById(id);

        setBook(data);

      } catch (error) {

        console.error(error);

        setError(
          error.response?.data?.message ||
          "Failed to load book details"
        );

      } finally {

        setLoading(false);

      }

    };

    fetchBook();

  }, [id]);


  // ==========================================
  // Borrow Book - Student
  // ==========================================

  const handleBorrow = async () => {

    if (!book) {
      return;
    }


    // ------------------------------------------
    // Check Availability
    // ------------------------------------------

    if (book.availableCopies <= 0) {

      setError(
        "This book is currently unavailable."
      );

      return;

    }


    try {

      setBorrowing(true);

      setError("");


      // ----------------------------------------
      // IMPORTANT:
      // Student does NOT send userId.
      //
      // Backend gets student ID from:
      // req.user.id
      // ----------------------------------------

     const response = await studentBorrowBook(
          book._id
        );
      

      // ----------------------------------------
      // Update available copies immediately
      // ----------------------------------------

      setBook((previousBook) => {

        if (!previousBook) {
          return previousBook;
        }

        return {
          ...previousBook,
          availableCopies:
            Math.max(
              0,
              previousBook.availableCopies - 1
            ),
        };

      });


      alert(
        response?.message ||
        "Book borrowed successfully"
      );

    } catch (error) {

      console.error(error);

      setError(
        error.response?.data?.message ||
        "Failed to borrow book"
      );

    } finally {

      setBorrowing(false);

    }

  };


  // ==========================================
  // Delete Book
  // ==========================================

  const handleDelete = async () => {

    if (!book) {
      return;
    }


    const confirmed = window.confirm(
      `Are you sure you want to delete "${book.title}"?`
    );


    if (!confirmed) {
      return;
    }


    try {

      setDeleting(true);

      setError("");

      await deleteBook(id);

      alert("Book deleted successfully");

      navigate("/books");

    } catch (error) {

      console.error(error);

      setError(
        error.response?.data?.message ||
        "Failed to delete book"
      );

      setDeleting(false);

    }

  };


  // ==========================================
  // Loading State
  // ==========================================

  if (loading) {

    return (
      <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="absolute bottom-0 -left-40 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />

        <div className="relative z-10 flex min-h-screen items-center justify-center">

          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/[0.06]
              px-10
              py-8
              text-center
              shadow-[0_30px_80px_rgba(0,0,0,0.45)]
              backdrop-blur-xl
            "
          >

            <div
              className="
                mx-auto
                mb-5
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-blue-400/20
                bg-blue-500/10
              "
            >

              <BookOpen
                size={25}
                className="animate-pulse text-blue-400"
              />

            </div>

            <p className="text-lg font-bold">
              Loading book details...
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Preparing your book information
            </p>

          </div>

        </div>

      </div>
    );

  }


  // ==========================================
  // Error State
  // ==========================================

  if (error && !book) {

    return (
      <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-red-600/10 blur-[120px]" />

        <div className="relative z-10 flex min-h-screen items-center justify-center p-6">

          <div
            className="
              max-w-md
              rounded-3xl
              border
              border-red-400/20
              bg-white/[0.05]
              p-8
              text-center
              shadow-[0_30px_80px_rgba(0,0,0,0.45)]
              backdrop-blur-xl
            "
          >

            <AlertCircle
              size={45}
              className="mx-auto mb-5 text-red-400"
            />

            <h2 className="text-xl font-bold">
              Something went wrong
            </h2>

            <p className="mt-3 text-sm text-slate-400">
              {error}
            </p>

            <button
              type="button"
              onClick={() => navigate("/books")}
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-blue-600
                px-5
                py-3
                font-semibold
                transition
                hover:bg-blue-500
              "
            >

              <ArrowLeft size={17} />

              Back to Books

            </button>

          </div>

        </div>

      </div>
    );

  }


  // ==========================================
  // Book Not Found
  // ==========================================

  if (!book) {

    return (
      <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

        <div className="relative z-10 flex min-h-screen items-center justify-center">

          <div className="text-center">

            <BookOpen
              size={55}
              className="mx-auto mb-5 text-slate-600"
            />

            <h2 className="text-2xl font-bold">
              Book not found
            </h2>

            <button
              type="button"
              onClick={() => navigate("/books")}
              className="
                mt-6
                rounded-xl
                bg-blue-600
                px-5
                py-3
                font-semibold
                hover:bg-blue-500
              "
            >

              Back to Books

            </button>

          </div>

        </div>

      </div>
    );

  }


  return (

    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-slate-950
        text-white
      "
    >

      {/* ==========================================
          BACKGROUND LIGHTING
      ========================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div
          className="
            absolute
            -top-48
            -right-32
            h-[550px]
            w-[550px]
            rounded-full
            bg-blue-600/15
            blur-[140px]
          "
        />

        <div
          className="
            absolute
            top-[35%]
            -left-48
            h-[500px]
            w-[500px]
            rounded-full
            bg-purple-600/15
            blur-[140px]
          "
        />

        <div
          className="
            absolute
            -bottom-56
            right-1/4
            h-[500px]
            w-[500px]
            rounded-full
            bg-cyan-500/10
            blur-[140px]
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
            bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
            bg-[size:55px_55px]
          "
        />

      </div>


      {/* ==========================================
          DECORATIVE 3D OBJECTS
      ========================================== */}

      <div
        className="
          pointer-events-none
          absolute
          right-[8%]
          top-20
          hidden
          h-24
          w-24
          rotate-12
          rounded-3xl
          border
          border-blue-300/10
          bg-blue-400/[0.04]
          shadow-[0_25px_60px_rgba(59,130,246,0.12)]
          backdrop-blur-xl
          lg:block
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-24
          left-[8%]
          hidden
          h-16
          w-16
          -rotate-12
          rounded-2xl
          border
          border-purple-300/10
          bg-purple-400/[0.04]
          shadow-[0_20px_50px_rgba(168,85,247,0.12)]
          lg:block
        "
      />


      {/* ==========================================
          MAIN CONTENT
      ========================================== */}

      <div className="relative z-10 mx-auto max-w-7xl p-5 md:p-8 lg:p-10">


        {/* ==========================================
            TOP BAR
        ========================================== */}

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

          <button
            type="button"
            onClick={() => navigate("/books")}
            className="
              group
              inline-flex
              items-center
              gap-2
              rounded-2xl
              border
              border-white/10
              bg-white/[0.06]
              px-4
              py-3
              text-sm
              font-semibold
              text-slate-300
              shadow-[0_12px_30px_rgba(0,0,0,0.25)]
              backdrop-blur-xl
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-white/[0.10]
              hover:text-white
            "
          >

            <ArrowLeft
              size={17}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to Books

          </button>


          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-blue-400/20
              bg-blue-500/10
              px-4
              py-2
              text-xs
              font-semibold
              text-blue-300
            "
          >

            <Sparkles size={14} />

            BOOK DETAILS

          </div>

        </div>


        {/* ==========================================
            ERROR MESSAGE
        ========================================== */}

        {error && (

          <div
            className="
              mb-6
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-red-400/20
              bg-red-500/10
              px-5
              py-4
              text-sm
              text-red-300
              backdrop-blur-xl
            "
          >

            <AlertCircle size={18} />

            {error}

          </div>

        )}


        {/* ==========================================
            MAIN BOOK CARD
        ========================================== */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            border
            border-white/10
            bg-white/[0.055]
            shadow-[0_35px_100px_rgba(0,0,0,0.45)]
            backdrop-blur-2xl
          "
        >

          <div
            className="
              pointer-events-none
              absolute
              left-10
              right-10
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-white/40
              to-transparent
            "
          />

          <div
            className="
              absolute
              left-0
              right-0
              top-0
              h-1
              bg-gradient-to-r
              from-blue-500
              via-indigo-500
              to-cyan-400
            "
          />


          <div className="grid grid-cols-1 gap-0 lg:grid-cols-[0.9fr_1.1fr]">


            {/* ======================================
                BOOK COVER
            ====================================== */}

            <div
              className="
                relative
                flex
                min-h-[500px]
                items-center
                justify-center
                overflow-hidden
                border-b
                border-white/10
                bg-gradient-to-br
                from-blue-950/50
                via-indigo-950/30
                to-slate-950/30
                p-8
                lg:border-b-0
                lg:border-r
                lg:p-12
              "
            >

              <div
                className="
                  absolute
                  h-80
                  w-80
                  rounded-full
                  bg-blue-500/15
                  blur-[90px]
                "
              />


              <div
                className="
                  absolute
                  h-[430px]
                  w-[300px]
                  translate-x-5
                  translate-y-5
                  rotate-3
                  rounded-[1.5rem]
                  border
                  border-white/10
                  bg-indigo-500/[0.08]
                  shadow-[0_30px_70px_rgba(0,0,0,0.4)]
                "
              />


              <div
                className="
                  relative
                  w-full
                  max-w-[320px]
                  transition-all
                  duration-500
                  hover:-translate-y-3
                  hover:rotate-[-1deg]
                "
              >

                {book.bookCover ? (

                  <img
                    src={book.bookCover}
                    alt={book.title}
                    className="
                      relative
                      h-[450px]
                      w-full
                      rounded-[1.5rem]
                      border
                      border-white/20
                      object-cover
                      shadow-[0_35px_80px_rgba(0,0,0,0.55)]
                    "
                  />

                ) : (

                  <div
                    className="
                      flex
                      h-[450px]
                      w-full
                      flex-col
                      items-center
                      justify-center
                      rounded-[1.5rem]
                      border
                      border-white/10
                      bg-gradient-to-br
                      from-slate-800
                      via-slate-900
                      to-indigo-950
                      text-slate-500
                      shadow-[0_35px_80px_rgba(0,0,0,0.55)]
                    "
                  >

                    <BookOpen
                      size={70}
                      className="mb-5 text-slate-600"
                    />

                    <span className="text-sm font-medium">
                      No Image Available
                    </span>

                  </div>

                )}


                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    rounded-[1.5rem]
                    bg-gradient-to-br
                    from-white/10
                    via-transparent
                    to-transparent
                  "
                />

              </div>

            </div>


            {/* ======================================
                INFORMATION
            ====================================== */}

            <div className="p-7 md:p-10 lg:p-12">


              <div
                className="
                  mb-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-cyan-400/20
                  bg-cyan-400/10
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  text-cyan-300
                "
              >

                <Layers3 size={14} />

                {book.category}

              </div>


              <h1
                className="
                  max-w-2xl
                  text-3xl
                  font-black
                  tracking-tight
                  text-white
                  md:text-4xl
                  lg:text-5xl
                "
              >

                {book.title}

              </h1>


              <div className="mt-4 flex items-center gap-2 text-slate-400">

                <UserRound
                  size={18}
                  className="text-blue-400"
                />

                <span>

                  Written by{" "}

                  <span className="font-semibold text-slate-200">
                    {book.author}
                  </span>

                </span>

              </div>


              <div className="my-8 h-px bg-white/10" />


              {/* ======================================
                  INFORMATION GRID
              ====================================== */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">


                {/* ISBN */}

                <div
                  className="
                    group
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    p-4
                    shadow-[0_12px_30px_rgba(0,0,0,0.18)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-white/[0.07]
                  "
                >

                  <div className="mb-3 flex items-center gap-2">

                    <Hash
                      size={17}
                      className="text-blue-400"
                    />

                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      ISBN
                    </span>

                  </div>

                  <p className="break-all font-semibold text-slate-200">
                    {book.isbn}
                  </p>

                </div>


                {/* Publisher */}

                <div
                  className="
                    group
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    p-4
                    shadow-[0_12px_30px_rgba(0,0,0,0.18)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-white/[0.07]
                  "
                >

                  <div className="mb-3 flex items-center gap-2">

                    <Building2
                      size={17}
                      className="text-purple-400"
                    />

                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Publisher
                    </span>

                  </div>

                  <p className="font-semibold text-slate-200">
                    {book.publisher || "Not specified"}
                  </p>

                </div>


                {/* Total Copies */}

                <div
                  className="
                    group
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    p-4
                    shadow-[0_12px_30px_rgba(0,0,0,0.18)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-white/[0.07]
                  "
                >

                  <div className="mb-3 flex items-center gap-2">

                    <Package
                      size={17}
                      className="text-orange-400"
                    />

                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Total Copies
                    </span>

                  </div>

                  <p className="text-xl font-black text-white">
                    {book.totalCopies}
                  </p>

                </div>


                {/* Available Copies */}

                <div
                  className="
                    group
                    rounded-2xl
                    border
                    border-emerald-400/10
                    bg-emerald-400/[0.04]
                    p-4
                    shadow-[0_12px_30px_rgba(0,0,0,0.18)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                  "
                >

                  <div className="mb-3 flex items-center gap-2">

                    <CheckCircle2
                      size={17}
                      className="text-emerald-400"
                    />

                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Available Copies
                    </span>

                  </div>

                  <p className="text-xl font-black text-emerald-300">
                    {book.availableCopies}
                  </p>

                </div>

              </div>


              {/* ======================================
                  DESCRIPTION
              ====================================== */}

              <div
                className="
                  mt-6
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.035]
                  p-5
                "
              >

                <div className="mb-3 flex items-center gap-2">

                  <Library
                    size={18}
                    className="text-blue-400"
                  />

                  <h2 className="font-bold text-white">
                    Description
                  </h2>

                </div>

                <p className="text-sm leading-7 text-slate-400">
                  {book.description || "No description available."}
                </p>

              </div>


              {/* ======================================
                  QR CODE
              ====================================== */}

              {book.qrCode && (

                <div
                  className="
                    mt-6
                    rounded-2xl
                    border
                    border-cyan-400/15
                    bg-gradient-to-br
                    from-cyan-400/[0.07]
                    to-blue-500/[0.04]
                    p-5
                  "
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-cyan-400/20
                        bg-cyan-400/10
                      "
                    >

                      <QrCode
                        size={22}
                        className="text-cyan-300"
                      />

                    </div>

                    <div>

                      <h2 className="font-bold text-white">
                        Book QR Code
                      </h2>

                      <p className="text-xs text-slate-500">
                        Unique identification code
                      </p>

                    </div>

                  </div>

                  <div
                    className="
                      mt-4
                      rounded-xl
                      border
                      border-white/10
                      bg-slate-950/50
                      px-4
                      py-3
                    "
                  >

                    <p className="break-all font-mono text-sm font-semibold tracking-wider text-cyan-300">
                      {book.qrCode}
                    </p>

                  </div>

                </div>

              )}


              {/* ======================================
                  STUDENT BORROW SECTION
              ====================================== */}

              {userRole === "Student" && (

                <div
                  className="
                    mt-8
                    rounded-3xl
                    border
                    border-blue-400/20
                    bg-gradient-to-br
                    from-blue-500/[0.10]
                    via-indigo-500/[0.06]
                    to-cyan-400/[0.05]
                    p-5
                    shadow-[0_20px_50px_rgba(37,99,235,0.12)]
                  "
                >

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-4">

                      <div
                        className="
                          flex
                          h-12
                          w-12
                          shrink-0
                          items-center
                          justify-center
                          rounded-2xl
                          border
                          border-blue-400/20
                          bg-blue-500/10
                        "
                      >

                        <BookMarked
                          size={23}
                          className="text-blue-300"
                        />

                      </div>

                      <div>

                        <h2 className="font-bold text-white">
                          Borrow this book
                        </h2>

                        <p className="mt-1 text-xs text-slate-400">
                          You can borrow this book for 14 days.
                        </p>

                      </div>

                    </div>


                    <button
                      type="button"
                      onClick={handleBorrow}
                      disabled={
                        borrowing ||
                        book.availableCopies <= 0
                      }
                      className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        bg-gradient-to-r
                        from-blue-600
                        to-indigo-600
                        px-6
                        py-3.5
                        font-bold
                        text-white
                        shadow-[0_15px_35px_rgba(59,130,246,0.25)]
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:from-blue-500
                        hover:to-indigo-500
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >

                      <BookMarked size={18} />

                      {borrowing
                        ? "Borrowing..."
                        : book.availableCopies <= 0
                          ? "Unavailable"
                          : "Borrow Book"
                      }

                    </button>

                  </div>

                </div>

              )}


              {/* ======================================
                  ADMIN / LIBRARIAN ACTIONS
              ====================================== */}

              {(userRole === "Admin" ||
                userRole === "Librarian") && (

                <div className="mt-8 flex flex-wrap gap-3">


                  {/* Edit */}

                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/books/${book._id}/edit`)
                    }
                    className="
                      group
                      inline-flex
                      items-center
                      gap-2
                      rounded-2xl
                      border
                      border-blue-400/20
                      bg-gradient-to-r
                      from-blue-600
                      to-indigo-600
                      px-5
                      py-3.5
                      font-bold
                      text-white
                      shadow-[0_15px_35px_rgba(59,130,246,0.25)]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:from-blue-500
                      hover:to-indigo-500
                      hover:shadow-[0_20px_45px_rgba(59,130,246,0.35)]
                    "
                  >

                    <Pencil
                      size={17}
                      className="transition-transform group-hover:rotate-[-8deg]"
                    />

                    Edit Book

                  </button>


                  {/* Delete */}

                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="
                      group
                      inline-flex
                      items-center
                      gap-2
                      rounded-2xl
                      border
                      border-red-400/20
                      bg-red-500/10
                      px-5
                      py-3.5
                      font-bold
                      text-red-300
                      shadow-[0_12px_30px_rgba(127,29,29,0.18)]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-red-500/15
                      hover:text-red-200
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >

                    <Trash2 size={17} />

                    {deleting
                      ? "Deleting..."
                      : "Delete Book"
                    }

                  </button>

                </div>

              )}


              {/* ======================================
                  SECURITY NOTE
              ====================================== */}

              <div className="mt-7 flex items-center gap-2 text-xs text-slate-600">

                <ShieldCheck size={14} />

                Library book information

                <span className="text-slate-700">
                  •
                </span>

                Securely managed

              </div>

            </div>

          </div>

        </div>


        {/* ==========================================
            FOOTER INFO
        ========================================== */}

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-600">

          <CalendarDays size={14} />

          Library Management System

        </div>

      </div>

    </div>

  );

}


export default BookDetails;
