
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  BookOpen,
  User,
  Layers3,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Library,
  Sparkles,
  Boxes,
} from "lucide-react";

import { getBooks } from "../api/bookApi";

function Books() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================
  // Fetch Books
  // =====================================

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getBooks({
          search,
          category,
          sort,
          page,
          limit: 10,
        });

        setBooks(data.books || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.log(error);
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [search, category, sort, page]);

  // =====================================
  // Search Handler
  // =====================================

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // =====================================
  // Category Handler
  // =====================================

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  // =====================================
  // Sort Handler
  // =====================================

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  // =====================================
  // Pagination
  // =====================================

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  // =====================================
  // Loading
  // =====================================

  if (loading) {
    return (
      <div className="relative min-h-full overflow-hidden bg-slate-950 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[130px]" />

          <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[130px]" />

          <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
        </div>

        <div className="relative z-10 flex min-h-[70vh] items-center justify-center p-8">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] px-12 py-10 text-center shadow-[0_35px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
            <div className="absolute left-10 right-10 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-[0_15px_40px_rgba(59,130,246,0.4)] animate-pulse">
              <BookOpen size={28} className="text-white" />
            </div>

            <p className="mt-5 text-lg font-bold text-white">
              Loading library...
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Preparing your collection
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =====================================
  // Error
  // =====================================

  if (error) {
    return (
      <div className="relative min-h-full overflow-hidden bg-slate-950 text-white">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[130px]" />

        <div className="relative z-10 flex min-h-[70vh] items-center justify-center p-8">
          <div className="rounded-[2rem] border border-red-400/20 bg-red-500/10 p-10 text-center shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
            <p className="font-semibold text-red-300">
              {error}
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
    <div className="relative min-h-full overflow-hidden bg-gradient-to-br from-[#020617] via-[#0b1120] to-[#111a3a] p-5 text-white md:p-8">
      {/* =====================================
          BACKGROUND ATMOSPHERE
      ===================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Blue glow */}
        <div className="absolute -right-48 -top-48 h-[650px] w-[650px] rounded-full bg-blue-600/15 blur-[150px]" />

        {/* Purple glow */}
        <div className="absolute -left-48 top-[35%] h-[600px] w-[600px] rounded-full bg-purple-600/12 blur-[150px]" />

        {/* Cyan glow */}
        <div className="absolute bottom-[-300px] right-[20%] h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[150px]" />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:55px_55px]" />

        {/* Floating orb */}
        <div className="absolute right-[15%] top-[25%] h-3 w-3 rounded-full bg-blue-400/40 shadow-[0_0_30px_rgba(96,165,250,0.8)]" />

        <div className="absolute left-[12%] bottom-[20%] h-2 w-2 rounded-full bg-purple-400/40 shadow-[0_0_25px_rgba(168,85,247,0.8)]" />
      </div>

      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <div className="relative z-10 mx-auto max-w-[1600px]">
        {/* =====================================
            HEADER
        ===================================== */}

        <div className="mb-8 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            {/* Badge */}

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-blue-300 shadow-[0_8px_25px_rgba(59,130,246,0.1)] backdrop-blur-xl">
              <Sparkles size={14} />

              Admin Library

              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
            </div>

            <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
              Library
              <span className="block bg-gradient-to-r from-blue-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                Collection
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
              Explore, search, filter and manage every book available
              in your library collection.
            </p>
          </div>

          {/* Collection Counter */}

          <div className="group relative">
            {/* Back layer */}

            <div className="absolute inset-x-3 -bottom-2 h-full rounded-3xl bg-blue-500/10 blur-sm" />

            <div className="relative flex items-center gap-4 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.07] px-6 py-5 shadow-[0_25px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
              <div className="absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-300/20 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-[0_12px_30px_rgba(59,130,246,0.35)] transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                <Boxes size={25} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Current Page
                </p>

                <p className="mt-1 text-xl font-black text-white">
                  {books.length} Books
                </p>

                <p className="mt-1 text-xs text-blue-300">
                  Page {page} of {totalPages}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================
            FILTER PANEL
        ===================================== */}

        <div className="relative mb-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.3)] backdrop-blur-2xl md:p-6">
          {/* 3D top highlight */}

          <div className="absolute left-10 right-10 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

          {/* Corner glow */}

          <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-blue-500/10 blur-[70px]" />

          <div className="relative z-10">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/10 shadow-[0_8px_25px_rgba(59,130,246,0.1)]">
                <SlidersHorizontal size={18} className="text-blue-300" />
              </div>

              <div>
                <p className="text-sm font-bold text-white">
                  Explore Collection
                </p>

                <p className="text-xs text-slate-500">
                  Search, filter and organize your books
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Search */}

              <div className="group relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-blue-400"
                />

                <input
                  type="text"
                  placeholder="Search by title, author or ISBN..."
                  value={search}
                  onChange={handleSearchChange}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 py-4 pl-11 pr-4 text-sm text-white outline-none shadow-inner transition-all placeholder:text-slate-600 focus:border-blue-500/40 focus:bg-slate-950/80 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* Category */}

              <div className="group relative">
                <Layers3
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-blue-400"
                />

                <select
                  value={category}
                  onChange={handleCategoryChange}
                  className="w-full appearance-none rounded-2xl border border-white/10 bg-slate-950/60 py-4 pl-11 pr-4 text-sm text-slate-300 outline-none transition-all focus:border-blue-500/40 focus:bg-slate-950/80 focus:ring-4 focus:ring-blue-500/10"
                >
                  <option value="" className="bg-slate-900">
                    All Categories
                  </option>

                  <option value="Programming" className="bg-slate-900">
                    Programming
                  </option>

                  <option value="Database" className="bg-slate-900">
                    Database
                  </option>

                  <option value="AI" className="bg-slate-900">
                    AI
                  </option>

                  <option value="Science" className="bg-slate-900">
                    Science
                  </option>

                  <option value="History" className="bg-slate-900">
                    History
                  </option>
                </select>
              </div>

              {/* Sort */}

              <div className="group relative">
                <ArrowUpDown
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-blue-400"
                />

                <select
                  value={sort}
                  onChange={handleSortChange}
                  className="w-full appearance-none rounded-2xl border border-white/10 bg-slate-950/60 py-4 pl-11 pr-4 text-sm text-slate-300 outline-none transition-all focus:border-blue-500/40 focus:bg-slate-950/80 focus:ring-4 focus:ring-blue-500/10"
                >
                  <option value="" className="bg-slate-900">
                    Default Sorting
                  </option>

                  <option value="title" className="bg-slate-900">
                    Title A-Z
                  </option>

                  <option value="-title" className="bg-slate-900">
                    Title Z-A
                  </option>

                  <option value="-createdAt" className="bg-slate-900">
                    Newest First
                  </option>

                  <option value="createdAt" className="bg-slate-900">
                    Oldest First
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================
            BOOK GRID
        ===================================== */}

        {books.length === 0 ? (
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.05] p-16 text-center shadow-[0_35px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
            <div className="absolute left-1/2 top-0 h-px w-64 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.06] shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              <BookOpen size={34} className="text-slate-500" />
            </div>

            <p className="mt-6 text-xl font-bold text-slate-300">
              No books found
            </p>

            <p className="mt-2 text-sm text-slate-600">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {books.map((book) => (
              <div
                key={book._id}
                className="group relative transition-all duration-500 hover:-translate-y-3"
              >
                {/* =================================
                    3D SHADOW / BACK CARD
                ================================= */}

                <div className="absolute inset-x-3 -bottom-4 h-[96%] rounded-[2rem] border border-blue-400/5 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-purple-600/10 shadow-[0_25px_60px_rgba(0,0,0,0.25)] transition-all duration-500 group-hover:-bottom-5 group-hover:from-blue-600/15 group-hover:to-purple-600/10" />

                {/* Second depth layer */}

                <div className="absolute inset-x-6 -bottom-2 h-[98%] rounded-[2rem] border border-white/5 bg-white/[0.025]" />

                {/* =================================
                    MAIN CARD
                ================================= */}

                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.085] via-white/[0.055] to-white/[0.025] shadow-[0_25px_70px_rgba(0,0,0,0.38)] backdrop-blur-2xl transition-all duration-500 group-hover:border-blue-400/25 group-hover:shadow-[0_35px_90px_rgba(37,99,235,0.2)]">
                  {/* Top highlight */}

                  <div className="absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent" />

                  {/* Floating glow */}

                  <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/10 blur-[70px] transition-opacity duration-500 group-hover:bg-blue-500/20" />

                  {/* Book Cover */}

                  <div className="relative p-4">
                    <div className="relative h-60 overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_15px_35px_rgba(0,0,0,0.35)]">
                      {book.bookCover ? (
                        <img
                          src={book.bookCover}
                          alt={book.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-950">
                          <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-blue-300/10 bg-gradient-to-br from-blue-500/20 to-indigo-500/10 shadow-[0_20px_45px_rgba(59,130,246,0.2)] transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                            <BookOpen size={34} className="text-blue-300" />
                          </div>

                          <span className="mt-4 text-xs text-slate-500">
                            No Cover Available
                          </span>
                        </div>
                      )}

                      {/* Overlay */}

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                      {/* Category */}

                      <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-slate-950/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-200 shadow-lg backdrop-blur-xl">
                        {book.category || "Book"}
                      </div>

                      {/* Availability */}

                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-500/15 px-3 py-1.5 text-[10px] font-bold text-emerald-300 backdrop-blur-xl">
                        <CheckCircle2 size={12} />

                        {book.availableCopies} Available
                      </div>
                    </div>
                  </div>

                  {/* Book Information */}

                  <div className="px-5 pb-5">
                    <h2
                      className="truncate text-xl font-black text-white transition-colors duration-300 group-hover:text-blue-300"
                      title={book.title}
                    >
                      {book.title}
                    </h2>

                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                      <User size={14} className="text-blue-400/70" />

                      <span className="truncate">
                        {book.author}
                      </span>
                    </div>

                    {/* Divider */}

                    <div className="my-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    {/* Stats */}

                    <div className="grid grid-cols-2 gap-3">
                      {/* Total */}

                      <div className="group/stat rounded-2xl border border-white/5 bg-white/[0.035] p-3.5 shadow-inner transition-all duration-300 hover:bg-white/[0.06]">
                        <div className="flex items-center gap-2">
                          <Layers3
                            size={14}
                            className="text-slate-500"
                          />

                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Total
                          </span>
                        </div>

                        <p className="mt-1 text-xl font-black text-white">
                          {book.totalCopies}
                        </p>
                      </div>

                      {/* Available */}

                      <div className="rounded-2xl border border-emerald-400/10 bg-emerald-500/[0.045] p-3.5 shadow-inner transition-all duration-300 hover:bg-emerald-500/[0.08]">
                        <div className="flex items-center gap-2">
                          <CheckCircle2
                            size={14}
                            className="text-emerald-400"
                          />

                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Available
                          </span>
                        </div>

                        <p className="mt-1 text-xl font-black text-emerald-300">
                          {book.availableCopies}
                        </p>
                      </div>
                    </div>

                    {/* View Details */}

                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/books/${book._id}`)
                      }
                      className="group/button relative mt-5 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-3.5 text-sm font-black text-white shadow-[0_12px_30px_rgba(59,130,246,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(99,102,241,0.35)] active:translate-y-[1px]"
                    >
                      {/* Shine */}

                      <span className="absolute inset-y-0 -left-20 w-12 skew-x-[-20deg] bg-white/25 transition-all duration-700 group-hover/button:left-[115%]" />

                      <Eye size={16} />

                      View Details

                      <ChevronRight
                        size={16}
                        className="transition-transform duration-300 group-hover/button:translate-x-1"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =====================================
            PAGINATION
        ===================================== */}

        {totalPages > 1 && (
          <div className="relative mt-12 flex flex-wrap items-center justify-center gap-2 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
            <div className="absolute left-1/4 right-1/4 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

            {/* Previous */}

            <button
              type="button"
              onClick={handlePrevious}
              disabled={page === 1}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:-translate-y-0.5 hover:bg-white/[0.1] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={16} />

              Previous
            </button>

            {/* Pages */}

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((pageNumber) => (
              <button
                type="button"
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`min-h-10 min-w-10 rounded-xl border px-3 text-sm font-bold transition-all duration-200 ${
                  page === pageNumber
                    ? "scale-105 border-blue-400/20 bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-[0_10px_25px_rgba(59,130,246,0.35)]"
                    : "border-white/10 bg-white/[0.05] text-slate-400 hover:-translate-y-0.5 hover:bg-white/[0.1] hover:text-white"
                }`}
              >
                {pageNumber}
              </button>
            ))}

            {/* Next */}

            <button
              type="button"
              onClick={handleNext}
              disabled={page === totalPages}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:-translate-y-0.5 hover:bg-white/[0.1] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              Next

              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Footer */}

        <div className="mt-10 flex items-center justify-center gap-2 pb-4 text-xs text-slate-600">
          <Library size={14} />

          Advanced Library Management System
        </div>
      </div>
    </div>
  );
}

export default Books;
