
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Clock3,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  Loader2,
  BookMarked,
  Sparkles,
  Library,
  WalletCards,
} from "lucide-react";

import {
  getBorrowHistory,
  studentReturnBook,
} from "../api/borrowApi";

function MyBorrowedBooks() {
  const navigate = useNavigate();

  const [borrowHistory, setBorrowHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState(null);
  const [error, setError] = useState("");

  // ==========================================
  // Get logged-in user's ID from JWT
  // ==========================================

  const getUserIdFromToken = () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return null;
      }

      const payload = JSON.parse(atob(token.split(".")[1]));

      return payload.id || payload._id || payload.userId || null;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  };

  // ==========================================
  // Fetch student's borrow history
  // ==========================================

  useEffect(() => {
    const fetchBorrowHistory = async () => {
      try {
        setLoading(true);
        setError("");

        const userId = getUserIdFromToken();

        if (!userId) {
          setError("Unable to identify your account.");
          return;
        }

        const data = await getBorrowHistory(userId);

        setBorrowHistory(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch borrow history:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load your borrowed books."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowHistory();
  }, []);

  // ==========================================
  // Return Book
  // ==========================================

  const handleReturnBook = async (borrowId) => {
    try {
      setReturningId(borrowId);
      setError("");

      await studentReturnBook(borrowId);

      setBorrowHistory((previousHistory) =>
        previousHistory.map((borrow) =>
          borrow._id === borrowId
            ? {
                ...borrow,
                status: "Returned",
                returnDate: new Date().toISOString(),
                fine: calculateFine(borrow.dueDate),
              }
            : borrow
        )
      );
    } catch (error) {
      console.error("Failed to return book:", error);

      setError(
        error.response?.data?.message ||
          "Failed to return the book."
      );
    } finally {
      setReturningId(null);
    }
  };

  // ==========================================
  // Calculate current fine
  // ==========================================

  const calculateFine = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);

    if (now <= due) {
      return 0;
    }

    const difference = now - due;

    const lateDays = Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );

    return lateDays * 5;
  };

  // ==========================================
  // Format Date
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==========================================
  // Loading State
  // ==========================================

  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">

        {/* Ambient lighting */}

        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[140px]" />

        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[140px]" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />

        <div className="relative z-10 flex min-h-screen items-center justify-center p-6">

          <div
            className="
              relative
              overflow-hidden
              rounded-[2rem]
              border
              border-white/10
              bg-white/[0.055]
              px-12
              py-10
              text-center
              shadow-[0_40px_100px_rgba(0,0,0,0.55)]
              backdrop-blur-2xl
            "
          >

            <div className="pointer-events-none absolute left-1/2 top-0 h-1 w-32 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

            <div
              className="
                mx-auto
                mb-6
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                border
                border-blue-400/20
                bg-blue-500/10
                shadow-[0_15px_40px_rgba(59,130,246,0.18)]
              "
            >
              <Loader2
                size={30}
                className="animate-spin text-blue-400"
              />
            </div>

            <h2 className="text-xl font-black">
              Loading your books...
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Fetching your borrowing history
            </p>

          </div>

        </div>
      </div>
    );
  }

  // ==========================================
  // Derived statistics
  // ==========================================

  const activeBooks = borrowHistory.filter(
    (borrow) => borrow.status !== "Returned"
  ).length;

  const overdueBooks = borrowHistory.filter(
    (borrow) =>
      borrow.status !== "Returned" &&
      new Date() > new Date(borrow.dueDate)
  ).length;

  const totalFine = borrowHistory.reduce((total, borrow) => {
    if (borrow.status === "Returned") {
      return total + (borrow.fine || 0);
    }

    return total + calculateFine(borrow.dueDate);
  }, 0);

  // ==========================================
  // Main UI
  // ==========================================

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">

      {/* ==========================================
          BACKGROUND LIGHTING
      ========================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-blue-600/15 blur-[150px]" />

        <div className="absolute -left-48 top-[35%] h-[550px] w-[550px] rounded-full bg-purple-600/15 blur-[150px]" />

        <div className="absolute -bottom-60 right-[15%] h-[550px] w-[550px] rounded-full bg-cyan-500/10 blur-[150px]" />

        <div className="absolute left-[40%] top-[20%] h-[300px] w-[300px] rounded-full bg-indigo-500/[0.06] blur-[120px]" />

        {/* Grid */}

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
          top-28
          hidden
          h-24
          w-24
          rotate-12
          rounded-3xl
          border
          border-blue-300/10
          bg-blue-400/[0.035]
          shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_30px_70px_rgba(0,0,0,0.35)]
          backdrop-blur-xl
          lg:block
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-32
          left-[7%]
          hidden
          h-20
          w-20
          -rotate-12
          rounded-3xl
          border
          border-purple-300/10
          bg-purple-400/[0.035]
          shadow-[0_25px_60px_rgba(0,0,0,0.35)]
          lg:block
        "
      />


      {/* ==========================================
          CONTENT
      ========================================== */}

      <div className="relative z-10 mx-auto max-w-7xl p-5 md:p-8 lg:p-10">


        {/* ==========================================
            HEADER
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
              bg-white/[0.055]
              px-4
              py-3
              text-sm
              font-semibold
              text-slate-300
              shadow-[0_15px_35px_rgba(0,0,0,0.25)]
              backdrop-blur-xl
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-white/[0.10]
              hover:text-white
              hover:shadow-[0_20px_45px_rgba(0,0,0,0.35)]
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
              font-bold
              tracking-wide
              text-blue-300
              shadow-[0_10px_30px_rgba(59,130,246,0.10)]
            "
          >

            <Sparkles size={14} />

            MY BORROWED BOOKS

          </div>

        </div>


        {/* ==========================================
            HERO HEADER
        ========================================== */}

        <div className="mb-9">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <div className="mb-3 flex items-center gap-2">

                <div className="h-px w-8 bg-blue-500" />

                <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
                  Student Library
                </p>

              </div>

              <h1
                className="
                  text-4xl
                  font-black
                  tracking-tight
                  text-white
                  drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]
                  md:text-5xl
                "
              >
                My Borrowed Books
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">
                View the books you have borrowed, monitor due dates,
                track fines, and return active books.
              </p>

            </div>

          </div>

        </div>


        {/* ==========================================
            ERROR
        ========================================== */}

        {error && (
          <div
            className="
              mb-7
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
              shadow-[0_15px_40px_rgba(127,29,29,0.15)]
              backdrop-blur-xl
            "
          >

            <AlertCircle size={18} />

            {error}

          </div>
        )}


        {/* ==========================================
            STAT CARDS
        ========================================== */}

        {borrowHistory.length > 0 && (
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {/* Total */}

            <div
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-gradient-to-br
                from-white/[0.09]
                to-white/[0.025]
                p-5
                shadow-[0_25px_60px_rgba(0,0,0,0.30)]
                backdrop-blur-2xl
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-white/20
                hover:shadow-[0_35px_80px_rgba(0,0,0,0.40)]
              "
            >

              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl" />

              <div className="flex items-center justify-between">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-blue-400/20
                    bg-blue-500/10
                  "
                >
                  <Library
                    size={20}
                    className="text-blue-400"
                  />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                  Total
                </span>

              </div>

              <p className="mt-5 text-3xl font-black">
                {borrowHistory.length}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Books borrowed
              </p>

            </div>


            {/* Active */}

            <div
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-gradient-to-br
                from-white/[0.09]
                to-white/[0.025]
                p-5
                shadow-[0_25px_60px_rgba(0,0,0,0.30)]
                backdrop-blur-2xl
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-emerald-400/20
                hover:shadow-[0_35px_80px_rgba(0,0,0,0.40)]
              "
            >

              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl" />

              <div className="flex items-center justify-between">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-emerald-400/20
                    bg-emerald-500/10
                  "
                >
                  <BookMarked
                    size={20}
                    className="text-emerald-400"
                  />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                  Active
                </span>

              </div>

              <p className="mt-5 text-3xl font-black text-emerald-300">
                {activeBooks}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Currently borrowed
              </p>

            </div>


            {/* Overdue */}

            <div
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-gradient-to-br
                from-white/[0.09]
                to-white/[0.025]
                p-5
                shadow-[0_25px_60px_rgba(0,0,0,0.30)]
                backdrop-blur-2xl
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-red-400/20
                hover:shadow-[0_35px_80px_rgba(0,0,0,0.40)]
              "
            >

              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-red-500/10 blur-2xl" />

              <div className="flex items-center justify-between">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-red-400/20
                    bg-red-500/10
                  "
                >
                  <AlertCircle
                    size={20}
                    className="text-red-400"
                  />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                  Attention
                </span>

              </div>

              <p className="mt-5 text-3xl font-black text-red-300">
                {overdueBooks}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Overdue books
              </p>

            </div>


            {/* Fine */}

            <div
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-gradient-to-br
                from-white/[0.09]
                to-white/[0.025]
                p-5
                shadow-[0_25px_60px_rgba(0,0,0,0.30)]
                backdrop-blur-2xl
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-orange-400/20
                hover:shadow-[0_35px_80px_rgba(0,0,0,0.40)]
              "
            >

              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-orange-500/10 blur-2xl" />

              <div className="flex items-center justify-between">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-orange-400/20
                    bg-orange-500/10
                  "
                >
                  <WalletCards
                    size={20}
                    className="text-orange-400"
                  />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                  Fine
                </span>

              </div>

              <p className="mt-5 text-3xl font-black text-orange-300">
                ₹{totalFine}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Current fine amount
              </p>

            </div>

          </div>
        )}


        {/* ==========================================
            EMPTY STATE
        ========================================== */}

        {borrowHistory.length === 0 ? (

          <div
            className="
              relative
              overflow-hidden
              rounded-[2.5rem]
              border
              border-white/10
              bg-white/[0.045]
              p-12
              text-center
              shadow-[0_40px_100px_rgba(0,0,0,0.45)]
              backdrop-blur-2xl
            "
          >

            <div className="absolute left-1/2 top-0 h-1 w-40 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

            <div className="relative z-10">

              <div
                className="
                  mx-auto
                  mb-6
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-[2rem]
                  border
                  border-blue-400/20
                  bg-gradient-to-br
                  from-blue-500/15
                  to-indigo-500/5
                  shadow-[0_25px_60px_rgba(59,130,246,0.15)]
                "
              >
                <BookOpen
                  size={42}
                  className="text-blue-400"
                />
              </div>

              <h2 className="text-2xl font-black">
                No borrowing history
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-400">
                You haven't borrowed any books yet. Browse the
                library and borrow your first book.
              </p>

              <button
                type="button"
                onClick={() => navigate("/books")}
                className="
                  mt-7
                  inline-flex
                  items-center
                  gap-2
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-600
                  to-indigo-600
                  px-7
                  py-3.5
                  font-bold
                  shadow-[0_18px_40px_rgba(59,130,246,0.25)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:from-blue-500
                  hover:to-indigo-500
                  hover:shadow-[0_25px_55px_rgba(59,130,246,0.35)]
                "
              >
                <BookOpen size={17} />

                Browse Books
              </button>

            </div>

          </div>

        ) : (

          /* ==========================================
             BORROWED BOOK CARDS
          ========================================== */

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">

            {borrowHistory.map((borrow) => {

              const book = borrow.book;

              if (!book) {
                return null;
              }

              const isReturned =
                borrow.status === "Returned";

              const isOverdue =
                !isReturned &&
                new Date() > new Date(borrow.dueDate);

              const currentFine = isOverdue
                ? calculateFine(borrow.dueDate)
                : borrow.fine || 0;

              return (
                <div
                  key={borrow._id}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[2rem]
                    border
                    border-white/10
                    bg-gradient-to-br
                    from-white/[0.075]
                    via-white/[0.045]
                    to-white/[0.02]
                    shadow-[0_30px_80px_rgba(0,0,0,0.40)]
                    backdrop-blur-2xl
                    transition-all
                    duration-500
                    hover:-translate-y-3
                    hover:border-white/20
                    hover:shadow-[0_45px_100px_rgba(0,0,0,0.55)]
                  "
                >

                  {/* Top light */}

                  <div className="absolute left-8 right-8 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                  <div className="absolute left-0 right-0 top-0 z-20 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />


                  {/* ======================================
                      BOOK COVER
                  ====================================== */}

                  <div className="relative h-[290px] overflow-hidden bg-slate-950">

                    {/* Background glow */}

                    <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[70px]" />

                    {book.bookCover ? (

                      <img
                        src={book.bookCover}
                        alt={book.title}
                        className="
                          relative
                          h-full
                          w-full
                          object-cover
                          transition-all
                          duration-700
                          group-hover:scale-110
                          group-hover:rotate-[1deg]
                        "
                      />

                    ) : (

                      <div
                        className="
                          relative
                          flex
                          h-full
                          flex-col
                          items-center
                          justify-center
                          bg-gradient-to-br
                          from-slate-800
                          via-slate-900
                          to-indigo-950
                        "
                      >

                        <BookOpen
                          size={60}
                          className="mb-4 text-slate-600"
                        />

                        <span className="text-xs font-medium text-slate-500">
                          No Cover Available
                        </span>

                      </div>

                    )}


                    {/* Cover overlay */}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-slate-950/20" />

                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#020617] to-transparent" />


                    {/* Status */}

                    <div className="absolute right-4 top-5">

                      {isReturned ? (

                        <span
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            border
                            border-emerald-400/20
                            bg-emerald-500/15
                            px-3
                            py-1.5
                            text-xs
                            font-bold
                            text-emerald-300
                            shadow-[0_10px_25px_rgba(16,185,129,0.12)]
                            backdrop-blur-xl
                          "
                        >
                          <CheckCircle2 size={13} />

                          Returned
                        </span>

                      ) : isOverdue ? (

                        <span
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            border
                            border-red-400/20
                            bg-red-500/15
                            px-3
                            py-1.5
                            text-xs
                            font-bold
                            text-red-300
                            shadow-[0_10px_25px_rgba(239,68,68,0.12)]
                            backdrop-blur-xl
                          "
                        >
                          <AlertCircle size={13} />

                          Overdue
                        </span>

                      ) : (

                        <span
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            border
                            border-blue-400/20
                            bg-blue-500/15
                            px-3
                            py-1.5
                            text-xs
                            font-bold
                            text-blue-300
                            shadow-[0_10px_25px_rgba(59,130,246,0.12)]
                            backdrop-blur-xl
                          "
                        >
                          <BookMarked size={13} />

                          Borrowed
                        </span>

                      )}

                    </div>


                    {/* Floating book icon */}

                    <div
                      className="
                        absolute
                        bottom-4
                        left-5
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-white/10
                        bg-black/30
                        shadow-[0_15px_35px_rgba(0,0,0,0.35)]
                        backdrop-blur-xl
                      "
                    >
                      <BookOpen
                        size={19}
                        className="text-cyan-300"
                      />
                    </div>

                  </div>


                  {/* ======================================
                      CARD CONTENT
                  ====================================== */}

                  <div className="p-6">

                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                      {book.category || "Book"}
                    </p>

                    <h2 className="line-clamp-2 text-xl font-black leading-tight text-white">
                      {book.title}
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      by{" "}
                      <span className="font-semibold text-slate-300">
                        {book.author}
                      </span>
                    </p>


                    {/* ==================================
                        DATE CARDS
                    ================================== */}

                    <div className="mt-6 space-y-3">

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          rounded-2xl
                          border
                          border-white/10
                          bg-black/10
                          px-4
                          py-3.5
                          shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]
                        "
                      >

                        <div className="flex items-center gap-2.5 text-slate-500">

                          <CalendarDays
                            size={16}
                            className="text-blue-400"
                          />

                          <span className="text-xs font-medium">
                            Borrowed
                          </span>

                        </div>

                        <span className="text-xs font-bold text-slate-300">
                          {formatDate(borrow.borrowDate)}
                        </span>

                      </div>


                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          rounded-2xl
                          border
                          border-white/10
                          bg-black/10
                          px-4
                          py-3.5
                          shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]
                        "
                      >

                        <div className="flex items-center gap-2.5 text-slate-500">

                          <Clock3
                            size={16}
                            className={
                              isOverdue
                                ? "text-red-400"
                                : "text-purple-400"
                            }
                          />

                          <span className="text-xs font-medium">
                            Due Date
                          </span>

                        </div>

                        <span
                          className={`text-xs font-bold ${
                            isOverdue
                              ? "text-red-400"
                              : "text-slate-300"
                          }`}
                        >
                          {formatDate(borrow.dueDate)}
                        </span>

                      </div>

                    </div>


                    {/* ==================================
                        FINE
                    ================================== */}

                    {currentFine > 0 && (
                      <div
                        className="
                          mt-4
                          rounded-2xl
                          border
                          border-red-400/20
                          bg-red-500/10
                          px-4
                          py-3.5
                          shadow-[0_12px_30px_rgba(127,29,29,0.12)]
                        "
                      >

                        <div className="flex items-center justify-between">

                          <div className="flex items-center gap-2">

                            <WalletCards
                              size={15}
                              className="text-red-400"
                            />

                            <span className="text-xs font-bold text-red-300">
                              Current Fine
                            </span>

                          </div>

                          <span className="font-black text-red-400">
                            ₹{currentFine}
                          </span>

                        </div>

                      </div>
                    )}


                    {/* ==================================
                        RETURN BUTTON
                    ================================== */}

                    {!isReturned && (

                      <button
                        type="button"
                        onClick={() =>
                          handleReturnBook(borrow._id)
                        }
                        disabled={
                          returningId === borrow._id
                        }
                        className="
                          group/return
                          mt-6
                          flex
                          w-full
                          items-center
                          justify-center
                          gap-2
                          rounded-2xl
                          border
                          border-emerald-400/20
                          bg-gradient-to-r
                          from-emerald-500/15
                          to-teal-500/10
                          px-5
                          py-3.5
                          font-bold
                          text-emerald-300
                          shadow-[0_15px_35px_rgba(16,185,129,0.08)]
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:border-emerald-400/30
                          hover:bg-emerald-500/20
                          hover:shadow-[0_20px_45px_rgba(16,185,129,0.16)]
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                        "
                      >

                        {returningId === borrow._id ? (

                          <>
                            <Loader2
                              size={17}
                              className="animate-spin"
                            />

                            Returning...
                          </>

                        ) : (

                          <>
                            <RotateCcw
                              size={17}
                              className="transition-transform duration-300 group-hover/return:-rotate-45"
                            />

                            Return Book
                          </>

                        )}

                      </button>

                    )}


                    {/* ==================================
                        RETURNED STATE
                    ================================== */}

                    {isReturned && (

                      <div
                        className="
                          mt-6
                          flex
                          items-center
                          justify-center
                          gap-2
                          rounded-2xl
                          border
                          border-emerald-400/10
                          bg-emerald-500/[0.05]
                          px-5
                          py-3.5
                          text-sm
                          font-bold
                          text-emerald-400/70
                        "
                      >

                        <CheckCircle2 size={17} />

                        Book Returned

                      </div>

                    )}

                  </div>

                </div>
              );
            })}

          </div>
        )}


        {/* ==========================================
            FOOTER
        ========================================== */}

        <div className="mt-12 flex items-center justify-center gap-2 text-xs text-slate-600">

          <BookOpen size={14} />

          Library Management System

        </div>

      </div>
    </div>
  );
}

export default MyBorrowedBooks;

