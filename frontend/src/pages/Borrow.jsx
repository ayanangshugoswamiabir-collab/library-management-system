import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  BookOpen,
  RotateCcw,
  Clock,
  History,
  AlertTriangle,
  RefreshCw,
  CheckCircle,
  User,
  CalendarDays,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import {
  getAllBorrows,
  returnBook,
} from "../api/borrowApi";

const Borrow = () => {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [returningId, setReturningId] = useState(null);

  // =====================================
  // Fetch Borrow Records
  // =====================================

  const fetchBorrows = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllBorrows();

      setBorrows(response?.borrows || []);
    } catch (err) {
      console.error("Error fetching borrow records:", err);

      setError(
        err?.response?.data?.message ||
          "Failed to fetch borrowing records."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Initial Fetch
  // =====================================

  useEffect(() => {
    let cancelled = false;

    const loadBorrows = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAllBorrows();

        if (!cancelled) {
          setBorrows(response?.borrows || []);
        }
      } catch (err) {
        console.error("Error fetching borrow records:", err);

        if (!cancelled) {
          setError(
            err?.response?.data?.message ||
              "Failed to fetch borrowing records."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadBorrows();

    return () => {
      cancelled = true;
    };
  }, []);

  // =====================================
  // Return Book
  // =====================================

  const handleReturnBook = async (borrowId) => {
    const confirmReturn = window.confirm(
      "Are you sure you want to return this book?"
    );

    if (!confirmReturn) return;

    try {
      setReturningId(borrowId);

      await returnBook(borrowId);

      alert("Book returned successfully.");

      await fetchBorrows();
    } catch (err) {
      console.error("Error returning book:", err);

      alert(
        err?.response?.data?.message ||
          "Failed to return the book."
      );
    } finally {
      setReturningId(null);
    }
  };

  // =====================================
  // Statistics
  // =====================================

  const totalIssued = borrows.length;

  const activeBorrowings = borrows.filter(
    (borrow) => borrow.status === "Borrowed"
  );

  const returnedBorrowings = borrows.filter(
    (borrow) => borrow.status === "Returned"
  );

  const overdueBorrowings = activeBorrowings.filter(
    (borrow) =>
      borrow.dueDate &&
      new Date(borrow.dueDate) < new Date()
  );

  // =====================================
  // Date Formatter
  // =====================================

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================
  // Overdue
  // =====================================

  const isOverdue = (borrow) => {
    if (borrow.status !== "Borrowed") return false;

    return (
      borrow.dueDate &&
      new Date(borrow.dueDate) < new Date()
    );
  };

  // =====================================
  // Loading
  // =====================================

  if (loading) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden bg-[#050816] text-white">
        {/* Ambient 3D lights */}

        <div className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-[130px]" />

        <div className="pointer-events-none absolute -right-32 top-1/4 h-[480px] w-[480px] rounded-full bg-violet-600/20 blur-[140px]" />

        <div className="pointer-events-none absolute bottom-[-200px] left-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[130px]" />

        <div className="relative z-10 flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="relative mx-auto h-24 w-24">
              <div className="absolute inset-0 rounded-[28px] bg-blue-500/20 blur-xl" />

              <div className="relative flex h-24 w-24 rotate-[-5deg] items-center justify-center rounded-[28px] border border-white/15 bg-gradient-to-br from-blue-500 to-violet-600 shadow-[0_25px_70px_rgba(59,130,246,0.4)]">
                <RefreshCw
                  size={34}
                  className="animate-spin text-white"
                />
              </div>
            </div>

            <p className="mt-7 text-lg font-black tracking-tight">
              Loading borrowing records...
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Preparing your library activity
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =====================================
  // Main UI
  // =====================================

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#050816] text-white">
      {/* =====================================
          3D BACKGROUND
      ===================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Main glow */}

        <div className="absolute -left-44 -top-44 h-[550px] w-[550px] rounded-full bg-blue-600/15 blur-[140px]" />

        <div className="absolute -right-40 top-[18%] h-[600px] w-[600px] rounded-full bg-violet-600/15 blur-[150px]" />

        <div className="absolute bottom-[-250px] left-[25%] h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[150px]" />

        {/* Floating 3D spheres */}

        <div className="absolute left-[12%] top-[18%] h-3 w-3 rounded-full bg-blue-400/60 shadow-[0_0_30px_rgba(96,165,250,0.8)]" />

        <div className="absolute right-[18%] top-[10%] h-2 w-2 rounded-full bg-violet-400/70 shadow-[0_0_25px_rgba(167,139,250,0.8)]" />

        <div className="absolute bottom-[20%] right-[12%] h-3 w-3 rounded-full bg-cyan-400/50 shadow-[0_0_30px_rgba(34,211,238,0.8)]" />

        {/* Grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
            [background-size:60px_60px]
          "
        />

        {/* Vignette */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(5,8,22,0.65)_100%)]" />
      </div>

      {/* =====================================
          CONTENT
      ===================================== */}

      <main className="relative z-10 mx-auto w-full max-w-[1550px] px-4 py-6 sm:px-6 lg:px-8">
        {/* =====================================
            HEADER
        ===================================== */}

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            {/* 3D Icon */}

            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-[22px] bg-blue-500/30 blur-xl" />

              <div className="relative flex h-14 w-14 rotate-[-4deg] items-center justify-center rounded-[20px] border border-white/15 bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-700 shadow-[0_18px_45px_rgba(59,130,246,0.35)]">
                <BookOpen size={26} />

                <div className="absolute right-1 top-1 h-2 w-2 rounded-full bg-white/70 shadow-[0_0_10px_white]" />
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="truncate text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
                  Borrowing System
                </h1>

                <Sparkles
                  size={18}
                  className="shrink-0 text-cyan-400"
                />
              </div>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Manage issues, returns, due dates and library history.
              </p>
            </div>
          </div>

          <button
            onClick={fetchBorrows}
            className="
              group
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-2xl
              border
              border-white/10
              bg-white/[0.07]
              px-5
              py-3
              text-sm
              font-bold
              text-white
              shadow-[0_15px_35px_rgba(0,0,0,0.25)]
              backdrop-blur-2xl
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-blue-400/30
              hover:bg-white/[0.11]
              hover:shadow-[0_20px_45px_rgba(37,99,235,0.18)]
            "
          >
            <RefreshCw
              size={17}
              className="transition-transform duration-700 group-hover:rotate-180"
            />

            Refresh
          </button>
        </div>

        {/* =====================================
            ERROR
        ===================================== */}

        {error && (
          <div className="relative mb-7 overflow-hidden rounded-2xl border border-red-400/20 bg-red-500/[0.08] p-4 shadow-[0_20px_50px_rgba(127,29,29,0.18)] backdrop-blur-2xl">
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-red-500/10 blur-2xl" />

            <div className="relative flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-400/20 bg-red-500/10">
                <AlertTriangle
                  size={19}
                  className="text-red-300"
                />
              </div>

              <span className="text-sm font-medium text-red-200">
                {error}
              </span>
            </div>
          </div>
        )}

        {/* =====================================
            QUICK ACTIONS
        ===================================== */}

        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {/* Issue */}

          <Link
            to="/issue-book"
            className="
              group
              relative
              overflow-hidden
              rounded-[24px]
              border
              border-blue-400/15
              bg-gradient-to-br
              from-blue-500/[0.12]
              via-white/[0.055]
              to-transparent
              p-5
              shadow-[0_20px_50px_rgba(0,0,0,0.28)]
              backdrop-blur-2xl
              transition-all
              duration-500
              hover:-translate-y-2
              hover:rotate-[0.5deg]
              hover:border-blue-400/30
              hover:shadow-[0_30px_65px_rgba(37,99,235,0.2)]
            "
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition-all duration-500 group-hover:bg-blue-500/20" />

            <div className="relative">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-300/15 bg-gradient-to-br from-blue-500/30 to-indigo-500/20 shadow-[0_10px_25px_rgba(59,130,246,0.18)] transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                <BookOpen
                  size={23}
                  className="text-blue-300"
                />
              </div>

              <h2 className="font-black text-white">
                Issue Book
              </h2>

              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                Issue a book to a student.
              </p>

              <div className="mt-5 flex items-center gap-1.5 text-xs font-black text-blue-300">
                Issue a Book

                <ArrowUpRight
                  size={14}
                  className="transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </div>
            </div>
          </Link>

          {/* Return */}

          <div className="group relative overflow-hidden rounded-[24px] border border-emerald-400/15 bg-gradient-to-br from-emerald-500/[0.10] via-white/[0.055] to-transparent p-5 shadow-[0_20px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-emerald-400/30 hover:shadow-[0_30px_65px_rgba(16,185,129,0.15)]">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/15 bg-emerald-500/10 shadow-[0_10px_25px_rgba(16,185,129,0.12)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <RotateCcw
                  size={23}
                  className="text-emerald-300"
                />
              </div>

              <h2 className="font-black text-white">
                Return Book
              </h2>

              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                Return currently borrowed books.
              </p>

              <div className="mt-5 text-xs font-black text-emerald-300">
                {activeBorrowings.length} Active Books
              </div>
            </div>
          </div>

          {/* Active */}

          <div className="group relative overflow-hidden rounded-[24px] border border-violet-400/15 bg-gradient-to-br from-violet-500/[0.10] via-white/[0.055] to-transparent p-5 shadow-[0_20px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-violet-400/30 hover:shadow-[0_30px_65px_rgba(139,92,246,0.15)]">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/15 bg-violet-500/10 shadow-[0_10px_25px_rgba(139,92,246,0.12)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Clock
                  size={23}
                  className="text-violet-300"
                />
              </div>

              <h2 className="font-black text-white">
                Active Borrowings
              </h2>

              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                Books currently issued.
              </p>

              <div className="mt-5 text-xs font-black text-violet-300">
                {activeBorrowings.length} Active
              </div>
            </div>
          </div>

          {/* History */}

          <div className="group relative overflow-hidden rounded-[24px] border border-orange-400/15 bg-gradient-to-br from-orange-500/[0.10] via-white/[0.055] to-transparent p-5 shadow-[0_20px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-orange-400/30 hover:shadow-[0_30px_65px_rgba(249,115,22,0.15)]">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-orange-500/10 blur-3xl" />

            <div className="relative">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-400/15 bg-orange-500/10 shadow-[0_10px_25px_rgba(249,115,22,0.12)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <History
                  size={23}
                  className="text-orange-300"
                />
              </div>

              <h2 className="font-black text-white">
                Borrowing History
              </h2>

              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                Previous and current records.
              </p>

              <div className="mt-5 text-xs font-black text-orange-300">
                {totalIssued} Records
              </div>
            </div>
          </div>
        </div>

        {/* =====================================
            OVERDUE
        ===================================== */}

        <div className="relative mb-8 overflow-hidden rounded-[24px] border border-red-400/15 bg-gradient-to-r from-red-500/[0.10] via-white/[0.04] to-transparent p-5 shadow-[0_20px_55px_rgba(127,29,29,0.18)] backdrop-blur-2xl">
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-red-500/10 blur-3xl" />

          <div className="relative flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-400/15 bg-red-500/10 shadow-[0_10px_30px_rgba(239,68,68,0.15)]">
              <AlertTriangle
                size={23}
                className="text-red-300"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="font-black text-red-200">
                Overdue Books
              </h2>

              <p className="mt-1 text-xs text-red-200/50">
                Books past their due date and still borrowed.
              </p>

              {overdueBorrowings.length > 0 ? (
                <p className="mt-2 text-xs font-black text-red-300">
                  {overdueBorrowings.length} overdue book
                  {overdueBorrowings.length !== 1
                    ? "s"
                    : ""}{" "}
                  found.
                </p>
              ) : (
                <p className="mt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                  <CheckCircle size={15} />
                  No overdue books.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* =====================================
            STATISTICS
        ===================================== */}

        <div className="mb-8">
          <div className="mb-5">
            <h2 className="text-xl font-black text-white">
              Borrowing Overview
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Real-time library circulation overview.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {/* Total */}

            <div className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.055] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/20 hover:shadow-[0_30px_60px_rgba(37,99,235,0.12)]">
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-500">
                    Total Issued
                  </p>

                  <BookOpen
                    size={16}
                    className="text-blue-400/60"
                  />
                </div>

                <p className="mt-2 text-3xl font-black text-white">
                  {totalIssued}
                </p>

                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />
                </div>
              </div>
            </div>

            {/* Active */}

            <div className="group relative overflow-hidden rounded-[24px] border border-blue-400/10 bg-white/[0.055] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/25">
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-500">
                    Active Borrowings
                  </p>

                  <Clock
                    size={16}
                    className="text-blue-400/60"
                  />
                </div>

                <p className="mt-2 text-3xl font-black text-blue-300">
                  {activeBorrowings.length}
                </p>

                <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-blue-300">
                  <Clock size={13} />
                  Currently issued
                </div>
              </div>
            </div>

            {/* Returned */}

            <div className="group relative overflow-hidden rounded-[24px] border border-emerald-400/10 bg-white/[0.055] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-emerald-400/25">
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-500">
                    Returned
                  </p>

                  <CheckCircle
                    size={16}
                    className="text-emerald-400/60"
                  />
                </div>

                <p className="mt-2 text-3xl font-black text-emerald-300">
                  {returnedBorrowings.length}
                </p>

                <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-emerald-300">
                  <CheckCircle size={13} />
                  Successfully returned
                </div>
              </div>
            </div>

            {/* Overdue */}

            <div className="group relative overflow-hidden rounded-[24px] border border-red-400/10 bg-white/[0.055] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-red-400/25">
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-red-500/10 blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-500">
                    Overdue
                  </p>

                  <AlertTriangle
                    size={16}
                    className="text-red-400/60"
                  />
                </div>

                <p className="mt-2 text-3xl font-black text-red-300">
                  {overdueBorrowings.length}
                </p>

                <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-red-300">
                  <AlertTriangle size={13} />
                  Requires attention
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================
            BORROWING RECORDS
        ===================================== */}

        <section className="relative w-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] shadow-[0_25px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
          {/* Decorative glow */}

          <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px]" />

          <div className="relative flex items-center justify-between gap-3 border-b border-white/10 p-5 sm:p-6">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white sm:text-xl">
                  Borrowing Records
                </h2>

                <Sparkles
                  size={15}
                  className="text-blue-400"
                />
              </div>

              <p className="mt-1 text-xs text-slate-500">
                All books issued through the library.
              </p>
            </div>

            <div className="flex h-10 min-w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/10 px-3 text-xs font-black text-blue-300 shadow-[0_10px_25px_rgba(37,99,235,0.12)]">
              {totalIssued}
            </div>
          </div>

          {/* Empty */}

          {borrows.length === 0 ? (
            <div className="p-12 text-center">
              <div className="relative mx-auto h-20 w-20">
                <div className="absolute inset-0 rounded-[24px] bg-blue-500/10 blur-xl" />

                <div className="relative flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/10 bg-white/5 shadow-[0_15px_40px_rgba(0,0,0,0.25)]">
                  <BookOpen
                    size={32}
                    className="text-slate-500"
                  />
                </div>
              </div>

              <h3 className="mt-6 font-black text-white">
                No borrowing records
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                No books have been issued yet.
              </p>

              <Link
                to="/issue-book"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-5 py-3 text-xs font-black text-white shadow-[0_15px_35px_rgba(37,99,235,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(37,99,235,0.35)]"
              >
                <BookOpen size={16} />
                Issue Your First Book
              </Link>
            </div>
          ) : (
            <>
              {/* =====================================
                  DESKTOP TABLE
              ===================================== */}

              <div className="hidden overflow-hidden lg:block">
                <table className="w-full table-fixed">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.025]">
                      <th className="w-[27%] px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                        Book
                      </th>

                      <th className="w-[19%] px-3 py-4 text-left text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                        Borrower
                      </th>

                      <th className="w-[13%] px-3 py-4 text-left text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                        Borrow Date
                      </th>

                      <th className="w-[13%] px-3 py-4 text-left text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                        Due Date
                      </th>

                      <th className="w-[11%] px-3 py-4 text-left text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                        Status
                      </th>

                      <th className="w-[7%] px-2 py-4 text-left text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                        Fine
                      </th>

                      <th className="w-[10%] px-3 py-4 text-right text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {borrows.map((borrow) => {
                      const overdue = isOverdue(borrow);

                      return (
                        <tr
                          key={borrow._id}
                          className="group border-b border-white/[0.055] transition-all duration-300 hover:bg-white/[0.035]"
                        >
                          {/* Book */}

                          <td className="px-5 py-5">
                            <div className="flex min-w-0 items-center gap-3">
                              {borrow.book?.bookCover ? (
                                <div className="relative shrink-0">
                                  <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-md" />

                                  <img
                                    src={borrow.book.bookCover}
                                    alt={borrow.book.title}
                                    className="relative h-16 w-11 rounded-xl border border-white/10 object-cover shadow-[6px_10px_25px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-2deg]"
                                  />
                                </div>
                              ) : (
                                <div className="flex h-16 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/20 to-violet-500/10 shadow-lg">
                                  <BookOpen
                                    size={18}
                                    className="text-blue-300"
                                  />
                                </div>
                              )}

                              <div className="min-w-0">
                                <p className="truncate text-sm font-black text-white">
                                  {borrow.book?.title ||
                                    "Unknown Book"}
                                </p>

                                <p className="truncate text-xs text-slate-500">
                                  {borrow.book?.author ||
                                    "Unknown Author"}
                                </p>

                                {borrow.book?.isbn && (
                                  <p className="mt-1 truncate text-[10px] text-slate-600">
                                    ISBN: {borrow.book.isbn}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Borrower */}

                          <td className="px-3 py-5">
                            <div className="flex min-w-0 items-center gap-2">
                              {borrow.user?.profileImage ? (
                                <img
                                  src={borrow.user.profileImage}
                                  alt={borrow.user.name}
                                  className="h-9 w-9 shrink-0 rounded-full border border-white/10 object-cover shadow-lg"
                                />
                              ) : (
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                                  <User
                                    size={14}
                                    className="text-slate-400"
                                  />
                                </div>
                              )}

                              <div className="min-w-0">
                                <p className="truncate text-xs font-bold text-white">
                                  {borrow.user?.name ||
                                    "Unknown User"}
                                </p>

                                <p className="truncate text-[10px] text-slate-600">
                                  {borrow.user?.email ||
                                    "No email"}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Borrow Date */}

                          <td className="px-3 py-5">
                            <div className="flex items-center gap-1.5 text-xs text-slate-400">
                              <CalendarDays
                                size={13}
                                className="shrink-0 text-slate-600"
                              />

                              {formatDate(
                                borrow.borrowDate
                              )}
                            </div>
                          </td>

                          {/* Due Date */}

                          <td className="px-3 py-5">
                            <div className="flex items-center gap-1.5">
                              <CalendarDays
                                size={13}
                                className={
                                  overdue
                                    ? "text-red-400"
                                    : "text-slate-600"
                                }
                              />

                              <span
                                className={
                                  overdue
                                    ? "text-xs font-black text-red-300"
                                    : "text-xs text-slate-400"
                                }
                              >
                                {formatDate(
                                  borrow.dueDate
                                )}
                              </span>
                            </div>
                          </td>

                          {/* Status */}

                          <td className="px-3 py-5">
                            {borrow.status ===
                            "Returned" ? (
                              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/15 bg-emerald-500/10 px-2.5 py-1.5 text-[10px] font-black text-emerald-300 shadow-[0_5px_15px_rgba(16,185,129,0.08)]">
                                <CheckCircle size={11} />
                                Returned
                              </span>
                            ) : overdue ? (
                              <span className="inline-flex items-center gap-1 rounded-full border border-red-400/15 bg-red-500/10 px-2.5 py-1.5 text-[10px] font-black text-red-300 shadow-[0_5px_15px_rgba(239,68,68,0.08)]">
                                <AlertTriangle size={11} />
                                Overdue
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full border border-blue-400/15 bg-blue-500/10 px-2.5 py-1.5 text-[10px] font-black text-blue-300 shadow-[0_5px_15px_rgba(59,130,246,0.08)]">
                                <Clock size={11} />
                                Borrowed
                              </span>
                            )}
                          </td>

                          {/* Fine */}

                          <td className="px-2 py-5">
                            <span
                              className={
                                borrow.fine > 0
                                  ? "text-xs font-black text-red-300"
                                  : "text-xs text-slate-500"
                              }
                            >
                              ₹{borrow.fine || 0}
                            </span>
                          </td>

                          {/* Action */}

                          <td className="px-3 py-5 text-right">
                            {borrow.status ===
                            "Borrowed" ? (
                              <button
                                onClick={() =>
                                  handleReturnBook(
                                    borrow._id
                                  )
                                }
                                disabled={
                                  returningId ===
                                  borrow._id
                                }
                                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-3.5 py-2.5 text-[11px] font-black text-white shadow-[0_10px_25px_rgba(16,185,129,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(16,185,129,0.28)] disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <RotateCcw
                                  size={13}
                                  className={
                                    returningId ===
                                    borrow._id
                                      ? "animate-spin"
                                      : ""
                                  }
                                />

                                {returningId ===
                                borrow._id
                                  ? "Returning"
                                  : "Return"}
                              </button>
                            ) : (
                              <span className="text-[10px] font-semibold text-slate-600">
                                Completed
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* =====================================
                  MOBILE / TABLET
              ===================================== */}

              <div className="grid gap-4 p-4 lg:hidden">
                {borrows.map((borrow) => {
                  const overdue = isOverdue(borrow);

                  return (
                    <div
                      key={borrow._id}
                      className="group relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.035] p-4 shadow-[0_15px_40px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-white/15"
                    >
                      <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-blue-500/5 blur-3xl" />

                      {/* Book */}

                      <div className="relative flex items-start gap-3">
                        {borrow.book?.bookCover ? (
                          <img
                            src={borrow.book.bookCover}
                            alt={borrow.book.title}
                            className="h-20 w-14 shrink-0 rounded-xl border border-white/10 object-cover shadow-[6px_10px_25px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-2deg]"
                          />
                        ) : (
                          <div className="flex h-20 w-14 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-blue-500/10 shadow-lg">
                            <BookOpen
                              size={20}
                              className="text-blue-300"
                            />
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <h3 className="truncate font-black text-white">
                            {borrow.book?.title ||
                              "Unknown Book"}
                          </h3>

                          <p className="truncate text-xs text-slate-500">
                            {borrow.book?.author ||
                              "Unknown Author"}
                          </p>

                          <div className="mt-3">
                            {borrow.status ===
                            "Returned" ? (
                              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/15 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-black text-emerald-300">
                                <CheckCircle size={11} />
                                Returned
                              </span>
                            ) : overdue ? (
                              <span className="inline-flex items-center gap-1 rounded-full border border-red-400/15 bg-red-500/10 px-2.5 py-1 text-[10px] font-black text-red-300">
                                <AlertTriangle size={11} />
                                Overdue
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full border border-blue-400/15 bg-blue-500/10 px-2.5 py-1 text-[10px] font-black text-blue-300">
                                <Clock size={11} />
                                Borrowed
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Details */}

                      <div className="relative mt-5 grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
                          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
                            Borrower
                          </p>

                          <p className="mt-1 truncate text-xs font-bold text-white">
                            {borrow.user?.name ||
                              "Unknown User"}
                          </p>
                        </div>

                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
                          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
                            Fine
                          </p>

                          <p
                            className={
                              borrow.fine > 0
                                ? "mt-1 text-xs font-black text-red-300"
                                : "mt-1 text-xs text-slate-400"
                            }
                          >
                            ₹{borrow.fine || 0}
                          </p>
                        </div>

                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
                          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
                            Borrow Date
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {formatDate(
                              borrow.borrowDate
                            )}
                          </p>
                        </div>

                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
                          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
                            Due Date
                          </p>

                          <p
                            className={
                              overdue
                                ? "mt-1 text-xs font-black text-red-300"
                                : "mt-1 text-xs text-slate-400"
                            }
                          >
                            {formatDate(
                              borrow.dueDate
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Action */}

                      {borrow.status ===
                        "Borrowed" && (
                        <button
                          onClick={() =>
                            handleReturnBook(
                              borrow._id
                            )
                          }
                          disabled={
                            returningId ===
                            borrow._id
                          }
                          className="relative mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-3 text-xs font-black text-white shadow-[0_12px_30px_rgba(16,185,129,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(16,185,129,0.28)] disabled:opacity-50"
                        >
                          <RotateCcw
                            size={14}
                            className={
                              returningId ===
                              borrow._id
                                ? "animate-spin"
                                : ""
                            }
                          />

                          {returningId ===
                          borrow._id
                            ? "Returning..."
                            : "Return Book"}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default Borrow;