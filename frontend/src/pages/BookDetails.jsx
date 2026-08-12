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
  // Delete Notification State
  // ==========================================

  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const [deletedBookTitle, setDeletedBookTitle] = useState("");

  // ==========================================
  // Student Borrow Success Notification
  // ==========================================

  const [borrowSuccess, setBorrowSuccess] = useState(false);

  const [borrowedBookTitle, setBorrowedBookTitle] =
    useState("");

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
      // Student does NOT send userId.
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
          availableCopies: Math.max(
            0,
            previousBook.availableCopies - 1
          ),
        };
      });

      // ----------------------------------------
      // Show custom student success popup
      // ----------------------------------------

      setBorrowedBookTitle(book.title);

      setBorrowSuccess(true);

      // ----------------------------------------
      // Automatically close popup
      // ----------------------------------------

      setTimeout(() => {
        setBorrowSuccess(false);
      }, 3500);

      console.log(
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

      // ----------------------------------------
      // Show custom delete notification
      // ----------------------------------------

      setDeletedBookTitle(book.title);

      setDeleteSuccess(true);

      // ----------------------------------------
      // Return to Books page after notification
      // ----------------------------------------

      setTimeout(() => {
        navigate("/books");
      }, 1800);
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
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="absolute bottom-0 -left-40 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />

        <div className="relative z-10 flex min-h-screen items-center justify-center">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] px-10 py-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10">
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
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-red-600/10 blur-[120px]" />

        <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
          <div className="max-w-md rounded-3xl border border-red-400/20 bg-white/[0.05] p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
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
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500"
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
              className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"
            >
              Back to Books
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* ==========================================
          STUDENT BORROW SUCCESS NOTIFICATION
          STUDENT ONLY
      ========================================== */}

      {borrowSuccess && userRole === "Student" && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-slate-950/75 p-6 backdrop-blur-md">

          {/* Main ambient glow */}

          <div className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[140px]" />

          <div className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />

          <div className="pointer-events-none absolute -left-32 bottom-10 h-72 w-72 rounded-full bg-blue-600/10 blur-[100px]" />

          {/* ======================================
              SUCCESS CARD
          ====================================== */}

          <div className="borrow-success-popup relative w-full max-w-md overflow-hidden rounded-[2rem] border border-emerald-400/20 bg-slate-900/95 p-8 shadow-[0_45px_140px_rgba(0,0,0,0.75)] backdrop-blur-2xl">

            {/* Top glowing line */}

            <div className="absolute left-12 right-12 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />

            {/* Inner glow */}

            <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-emerald-500/15 blur-[80px]" />

            <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-cyan-500/10 blur-[80px]" />

            <div className="relative z-10">

              {/* ==================================
                  SUCCESS ICON
              ================================== */}

              <div className="mb-6 flex justify-center">

                <div className="relative">

                  {/* Outer ring */}

                  <div className="absolute -inset-3 rounded-full border border-emerald-400/10 animate-ping" />

                  <div className="absolute -inset-6 rounded-full border border-emerald-400/5" />

                  {/* Icon container */}

                  <div className="borrow-success-icon relative flex h-24 w-24 items-center justify-center rounded-full border border-emerald-400/30 bg-gradient-to-br from-emerald-500/25 via-emerald-400/10 to-cyan-500/10 shadow-[0_20px_60px_rgba(16,185,129,0.25)]">

                    <div className="absolute inset-2 rounded-full border border-emerald-300/10" />

                    <CheckCircle2
                      size={52}
                      strokeWidth={1.7}
                      className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.6)]"
                    />

                  </div>

                </div>

              </div>

              {/* ==================================
                  SUCCESS TEXT
              ================================== */}

              <div className="text-center">

                <div className="mb-2 flex items-center justify-center gap-2">

                  <Sparkles
                    size={17}
                    className="text-cyan-400"
                  />

                  <span className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-400">
                    Borrowing Complete
                  </span>

                  <Sparkles
                    size={17}
                    className="text-cyan-400"
                  />

                </div>

                <h2 className="text-3xl font-black tracking-tight text-white">
                  Book Borrowed
                </h2>

                <h3 className="mt-1 text-2xl font-black bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  Successfully!
                </h3>

                <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-slate-400">
                  The book has been successfully added
                  to your borrowing list.
                </p>

              </div>

              {/* ==================================
                  BOOK INFORMATION
              ================================== */}

              <div className="mt-7 rounded-2xl border border-emerald-400/10 bg-gradient-to-br from-emerald-500/[0.07] to-cyan-500/[0.04] p-4 shadow-inner">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10">

                    <BookOpen
                      size={22}
                      className="text-emerald-300"
                    />

                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-400/70">
                      Borrowed Book
                    </p>

                    <p
                      className="mt-1 truncate text-sm font-bold text-slate-200"
                      title={borrowedBookTitle}
                    >
                      {borrowedBookTitle}
                    </p>

                  </div>

                  <CheckCircle2
                    size={20}
                    className="shrink-0 text-emerald-400"
                  />

                </div>

              </div>

              {/* ==================================
                  BORROW PERIOD
              ================================== */}

              <div className="mt-4 flex items-center justify-between rounded-2xl border border-blue-400/10 bg-blue-500/[0.05] px-4 py-3">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">

                    <CalendarDays
                      size={17}
                      className="text-blue-300"
                    />

                  </div>

                  <div>

                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Borrow Period
                    </p>

                    <p className="mt-0.5 text-sm font-bold text-slate-200">
                      14 Days
                    </p>

                  </div>

                </div>

                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  Active
                </span>

              </div>

              {/* ==================================
                  PROGRESS
              ================================== */}

              <div className="mt-7">

                <div className="h-1 overflow-hidden rounded-full bg-white/5">

                  <div className="borrow-success-progress h-full w-full origin-left rounded-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-blue-500" />

                </div>

                <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
                  Book successfully added to your account
                </p>

              </div>

            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          DELETE SUCCESS NOTIFICATION
          ADMIN / LIBRARIAN ONLY
          UNCHANGED
      ========================================== */}

      {deleteSuccess && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/70 p-6 backdrop-blur-md">

          {/* Ambient red glow */}

          <div className="pointer-events-none absolute h-[450px] w-[450px] rounded-full bg-red-600/10 blur-[140px]" />

          {/* Notification Card */}

          <div className="animate-[deletePopup_0.35s_ease-out] relative w-full max-w-md overflow-hidden rounded-[2rem] border border-red-400/20 bg-slate-900/90 p-7 shadow-[0_40px_120px_rgba(0,0,0,0.7)] backdrop-blur-2xl">

            {/* Top Highlight */}

            <div className="absolute left-10 right-10 top-0 h-px bg-gradient-to-r from-transparent via-red-400/80 to-transparent" />

            {/* Red Glow */}

            <div className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-red-500/15 blur-[80px]" />

            {/* Bottom Glow */}

            <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-rose-600/10 blur-[80px]" />

            <div className="relative z-10">

              {/* Header */}

              <div className="flex items-start gap-4">

                {/* Icon */}

                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-red-400/20 bg-gradient-to-br from-red-500/20 via-rose-500/10 to-red-950/20 shadow-[0_15px_40px_rgba(239,68,68,0.22)]">

                  <div className="absolute inset-0 rounded-2xl bg-red-500/5 animate-pulse" />

                  <Trash2
                    size={27}
                    className="relative z-10 text-red-400"
                  />

                </div>

                {/* Text */}

                <div className="min-w-0 flex-1">

                  <div className="flex items-center gap-2">

                    <h3 className="text-xl font-black tracking-tight text-white">
                      Book Deleted
                    </h3>

                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-red-400"
                    />

                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    The book has been successfully
                    removed from your library.
                  </p>

                </div>
              </div>

              {/* Deleted Book */}

              <div className="mt-6 rounded-2xl border border-red-400/10 bg-red-500/[0.045] p-4 shadow-inner">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-400/10 bg-red-500/10">

                    <BookOpen
                      size={18}
                      className="text-red-300"
                    />

                  </div>

                  <div className="min-w-0">

                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-red-400/70">
                      Removed Book
                    </p>

                    <p
                      className="mt-1 truncate text-sm font-bold text-slate-200"
                      title={deletedBookTitle}
                    >
                      {deletedBookTitle}
                    </p>

                  </div>

                </div>
              </div>

              {/* Progress */}

              <div className="mt-6">

                <div className="h-1 overflow-hidden rounded-full bg-white/5">

                  <div className="h-full w-full origin-left animate-[deleteProgress_1.8s_linear_forwards] rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-red-400" />

                </div>

                <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
                  Returning to library collection...
                </p>

              </div>

            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          BACKGROUND LIGHTING
      ========================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -right-32 -top-48 h-[550px] w-[550px] rounded-full bg-blue-600/15 blur-[140px]" />

        <div className="absolute -left-48 top-[35%] h-[500px] w-[500px] rounded-full bg-purple-600/15 blur-[140px]" />

        <div className="absolute -bottom-56 right-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />

        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:55px_55px]" />

      </div>

      {/* ==========================================
          DECORATIVE 3D OBJECTS
      ========================================== */}

      <div className="pointer-events-none absolute right-[8%] top-20 hidden h-24 w-24 rotate-12 rounded-3xl border border-blue-300/10 bg-blue-400/[0.04] shadow-[0_25px_60px_rgba(59,130,246,0.12)] backdrop-blur-xl lg:block" />

      <div className="pointer-events-none absolute bottom-24 left-[8%] hidden h-16 w-16 -rotate-12 rounded-2xl border border-purple-300/10 bg-purple-400/[0.04] shadow-[0_20px_50px_rgba(168,85,247,0.12)] lg:block" />

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
            className="group inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-slate-300 shadow-[0_12px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.10] hover:text-white"
          >
            <ArrowLeft
              size={17}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to Books
          </button>

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-300">

            <Sparkles size={14} />

            BOOK DETAILS

          </div>

        </div>

        {/* ==========================================
            ERROR MESSAGE
        ========================================== */}

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-400/20 bg-red-500/10 px-5 py-4 text-sm text-red-300 backdrop-blur-xl">

            <AlertCircle size={18} />

            {error}

          </div>
        )}

        {/* ==========================================
            MAIN BOOK CARD
        ========================================== */}

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] shadow-[0_35px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl">

          <div className="pointer-events-none absolute left-10 right-10 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

          <div className="grid grid-cols-1 gap-0 lg:grid-cols-[0.9fr_1.1fr]">

            {/* ======================================
                BOOK COVER
            ====================================== */}

            <div className="relative flex min-h-[500px] items-center justify-center overflow-hidden border-b border-white/10 bg-gradient-to-br from-blue-950/50 via-indigo-950/30 to-slate-950/30 p-8 lg:border-b-0 lg:border-r lg:p-12">

              <div className="absolute h-80 w-80 rounded-full bg-blue-500/15 blur-[90px]" />

              <div className="absolute h-[430px] w-[300px] translate-x-5 translate-y-5 rotate-3 rounded-[1.5rem] border border-white/10 bg-indigo-500/[0.08] shadow-[0_30px_70px_rgba(0,0,0,0.4)]" />

              <div className="relative w-full max-w-[320px] transition-all duration-500 hover:-translate-y-3 hover:rotate-[-1deg]">

                {book.bookCover ? (
                  <img
                    src={book.bookCover}
                    alt={book.title}
                    className="relative h-[450px] w-full rounded-[1.5rem] border border-white/20 object-cover shadow-[0_35px_80px_rgba(0,0,0,0.55)]"
                  />
                ) : (
                  <div className="flex h-[450px] w-full flex-col items-center justify-center rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-950 text-slate-500 shadow-[0_35px_80px_rgba(0,0,0,0.55)]">

                    <BookOpen
                      size={70}
                      className="mb-5 text-slate-600"
                    />

                    <span className="text-sm font-medium">
                      No Image Available
                    </span>

                  </div>
                )}

                <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-white/10 via-transparent to-transparent" />

              </div>

            </div>

            {/* ======================================
                INFORMATION
            ====================================== */}

            <div className="p-7 md:p-10 lg:p-12">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-300">

                <Layers3 size={14} />

                {book.category}

              </div>

              <h1 className="max-w-2xl text-3xl font-black tracking-tight text-white md:text-4xl lg:text-5xl">
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

                <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07]">

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

                <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07]">

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

                <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07]">

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

                <div className="group rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.04] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1">

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

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.035] p-5">

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
                  {book.description ||
                    "No description available."}
                </p>

              </div>

              {/* ======================================
                  QR CODE
              ====================================== */}

              {book.qrCode && (
                <div className="mt-6 rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-cyan-400/[0.07] to-blue-500/[0.04] p-5">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">

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

                  <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3">

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
                <div className="mt-8 rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-500/[0.10] via-indigo-500/[0.06] to-cyan-400/[0.05] p-5 shadow-[0_20px_50px_rgba(37,99,235,0.12)]">

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10">

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
                          You can borrow this book for 14
                          days.
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
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 font-bold text-white shadow-[0_15px_35px_rgba(59,130,246,0.25)] transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                      <BookMarked size={18} />

                      {borrowing
                        ? "Borrowing..."
                        : book.availableCopies <= 0
                          ? "Unavailable"
                          : "Borrow Book"}

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
                      navigate(
                        `/books/${book._id}/edit`
                      )
                    }
                    className="group inline-flex items-center gap-2 rounded-2xl border border-blue-400/20 bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 font-bold text-white shadow-[0_15px_35px_rgba(59,130,246,0.25)] transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-[0_20px_45px_rgba(59,130,246,0.35)]"
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
                    className="group inline-flex items-center gap-2 rounded-2xl border border-red-400/20 bg-red-500/10 px-5 py-3.5 font-bold text-red-300 shadow-[0_12px_30px_rgba(127,29,29,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-red-500/15 hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-50"
                  >

                    <Trash2
                      size={17}
                      className="transition-transform duration-300 group-hover:rotate-[-8deg]"
                    />

                    {deleting
                      ? "Deleting..."
                      : "Delete Book"}

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

      {/* ==========================================
          ANIMATIONS
      ========================================== */}

      <style>
        {`

          /* ========================================
             STUDENT BORROW SUCCESS ANIMATION
          ======================================== */

          @keyframes borrowSuccessPopup {

            0% {
              opacity: 0;
              transform:
                translateY(35px)
                scale(0.82)
                rotateX(8deg);
            }

            60% {
              opacity: 1;
              transform:
                translateY(-5px)
                scale(1.03)
                rotateX(0deg);
            }

            100% {
              opacity: 1;
              transform:
                translateY(0)
                scale(1)
                rotateX(0deg);
            }

          }

          .borrow-success-popup {
            animation:
              borrowSuccessPopup
              0.55s
              cubic-bezier(0.16, 1, 0.3, 1)
              forwards;

            transform-style: preserve-3d;
          }


          /* ========================================
             SUCCESS ICON
          ======================================== */

          @keyframes successIcon {

            0% {
              opacity: 0;
              transform: scale(0.5) rotate(-15deg);
            }

            70% {
              opacity: 1;
              transform: scale(1.08) rotate(3deg);
            }

            100% {
              opacity: 1;
              transform: scale(1) rotate(0deg);
            }

          }

          .borrow-success-icon {
            animation:
              successIcon
              0.7s
              cubic-bezier(0.16, 1, 0.3, 1)
              0.1s
              both;
          }


          /* ========================================
             PROGRESS BAR
          ======================================== */

          @keyframes borrowSuccessProgress {

            from {
              transform: scaleX(1);
            }

            to {
              transform: scaleX(0);
            }

          }

          .borrow-success-progress {
            animation:
              borrowSuccessProgress
              3.5s
              linear
              forwards;
          }


          /* ========================================
             DELETE POPUP
             EXISTING ANIMATION
          ======================================== */

          @keyframes deletePopup {

            0% {
              opacity: 0;
              transform:
                translateY(20px)
                scale(0.94);
            }

            100% {
              opacity: 1;
              transform:
                translateY(0)
                scale(1);
            }

          }


          @keyframes deleteProgress {

            from {
              transform: scaleX(1);
            }

            to {
              transform: scaleX(0);
            }

          }

        `}
      </style>

    </div>
  );
}

export default BookDetails;