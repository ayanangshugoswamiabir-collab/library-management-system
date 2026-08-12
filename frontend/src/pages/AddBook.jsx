import { useEffect, useState } from "react";

import {
  BookOpen,
  UserRound,
  Hash,
  Layers3,
  Building2,
  FileText,
  ImagePlus,
  Plus,
  Sparkles,
  LibraryBig,
  CheckCircle2,
  XCircle,
  X,
  LoaderCircle,
  Upload,
} from "lucide-react";

import { addBook } from "../api/bookApi";

function AddBook() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    publisher: "",
    description: "",
    totalCopies: 1,
  });

  const [image, setImage] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================
  // Auto hide notifications
  // =====================================

  useEffect(() => {
    if (!successMessage && !errorMessage) return;

    const timer = setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 4500);

    return () => clearTimeout(timer);
  }, [successMessage, errorMessage]);

  // =====================================
  // Handle Input Changes
  // =====================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear errors when user starts editing
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  // =====================================
  // Handle Image
  // =====================================

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (!selectedImage) return;

    setImage(selectedImage);

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  // =====================================
  // Submit
  // =====================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");
    setLoading(true);

    try {
      const bookFormData = new FormData();

      bookFormData.append("title", formData.title);
      bookFormData.append("author", formData.author);
      bookFormData.append("isbn", formData.isbn);
      bookFormData.append("category", formData.category);
      bookFormData.append("publisher", formData.publisher);
      bookFormData.append("description", formData.description);
      bookFormData.append("totalCopies", formData.totalCopies);

      // Initially all copies are available
      bookFormData.append(
        "availableCopies",
        formData.totalCopies
      );

      if (image) {
        bookFormData.append("bookCover", image);
      }

      const response = await addBook(bookFormData);

      console.log("BOOK ADDED:", response);

      // =====================================
      // SUCCESS
      // =====================================

      setSuccessMessage(
        "Book has been successfully added to your library collection."
      );

      // Reset form
      setFormData({
        title: "",
        author: "",
        isbn: "",
        category: "",
        publisher: "",
        description: "",
        totalCopies: 1,
      });

      setImage(null);

    } catch (error) {
      console.log("ADD BOOK ERROR:", error.response || error);

      // =====================================
      // ERROR
      // =====================================

      setErrorMessage(
        error.response?.data?.message ||
          "Failed to add book. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Close Notification
  // =====================================

  const closeNotification = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  // =====================================
  // UI
  // =====================================

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#030712]
        px-4
        py-6
        text-white
        sm:px-6
        lg:px-8
      "
    >

      {/* =====================================
          GLOBAL 3D BACKGROUND
      ===================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        {/* Blue Orb */}

        <div
          className="
            absolute
            -left-40
            -top-40
            h-[520px]
            w-[520px]
            rounded-full
            bg-blue-600/15
            blur-[130px]
          "
        />

        {/* Purple Orb */}

        <div
          className="
            absolute
            -right-40
            top-[18%]
            h-[600px]
            w-[600px]
            rounded-full
            bg-violet-600/12
            blur-[150px]
          "
        />

        {/* Cyan Orb */}

        <div
          className="
            absolute
            bottom-[-250px]
            left-[30%]
            h-[550px]
            w-[550px]
            rounded-full
            bg-cyan-500/8
            blur-[140px]
          "
        />

        {/* Grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            bg-[linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)]
            bg-[size:55px_55px]
          "
        />

        {/* Top Light */}

        <div
          className="
            absolute
            left-1/2
            top-0
            h-[2px]
            w-[70%]
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-blue-400/50
            to-transparent
            blur-sm
          "
        />

        {/* Decorative Ring */}

        <div
          className="
            absolute
            -right-40
            top-[35%]
            h-[500px]
            w-[500px]
            rounded-full
            border
            border-blue-400/[0.035]
            shadow-[0_0_100px_rgba(59,130,246,0.04)]
          "
        />

        <div
          className="
            absolute
            -left-40
            bottom-[10%]
            h-[400px]
            w-[400px]
            rounded-full
            border
            border-purple-400/[0.035]
          "
        />

      </div>


      {/* =====================================
          3D NOTIFICATIONS
      ===================================== */}

      {(successMessage || errorMessage) && (
        <div
          className="
            fixed
            right-5
            top-5
            z-[9999]
            w-[380px]
            max-w-[calc(100vw-40px)]
            animate-[notificationIn_.45s_ease-out]
          "
        >

          <div
            className={`
              relative
              overflow-hidden
              rounded-[26px]
              border
              ${
                successMessage
                  ? "border-emerald-400/20"
                  : "border-red-400/20"
              }
              bg-[#07101f]/95
              p-5
              shadow-[0_30px_90px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.08)]
              backdrop-blur-2xl
            `}
          >

            {/* Notification Glow */}

            <div
              className={`
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-48
                w-48
                rounded-full
                blur-[70px]
                ${
                  successMessage
                    ? "bg-emerald-400/15"
                    : "bg-red-400/15"
                }
              `}
            />

            {/* Top Highlight */}

            <div
              className={`
                absolute
                left-8
                right-8
                top-0
                h-px
                ${
                  successMessage
                    ? "bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent"
                    : "bg-gradient-to-r from-transparent via-red-300/70 to-transparent"
                }
              `}
            />

            <div className="relative flex items-start gap-4">

              {/* Notification Icon */}

              <div
                className={`
                  relative
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]
                  ${
                    successMessage
                      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300 shadow-[0_10px_30px_rgba(16,185,129,0.12)]"
                      : "border-red-400/20 bg-red-400/10 text-red-300 shadow-[0_10px_30px_rgba(239,68,68,0.12)]"
                  }
                `}
              >

                {successMessage ? (
                  <CheckCircle2 size={24} />
                ) : (
                  <XCircle size={24} />
                )}

              </div>


              {/* Notification Content */}

              <div className="min-w-0 flex-1">

                <div className="flex items-center gap-2">

                  <h3
                    className={`
                      text-xs
                      font-black
                      uppercase
                      tracking-[0.18em]
                      ${
                        successMessage
                          ? "text-emerald-300"
                          : "text-red-300"
                      }
                    `}
                  >
                    {successMessage
                      ? "Book Added"
                      : "Action Failed"}
                  </h3>

                  {successMessage && (
                    <Sparkles
                      size={13}
                      className="animate-pulse text-cyan-300"
                    />
                  )}

                </div>

                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {successMessage || errorMessage}
                </p>

              </div>


              {/* Close Button */}

              <button
                type="button"
                onClick={closeNotification}
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-500
                  transition-all
                  hover:bg-white/5
                  hover:text-white
                "
                aria-label="Close notification"
              >
                <X size={15} />
              </button>

            </div>


            {/* Notification Status */}

            <div className="relative mt-4 flex items-center gap-2">

              <div
                className={`
                  h-1.5
                  w-1.5
                  rounded-full
                  ${
                    successMessage
                      ? "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]"
                      : "bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.9)]"
                  }
                `}
              />

              <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/25">
                {successMessage
                  ? "Library system updated"
                  : "Please check your information"}
              </span>

            </div>


            {/* Progress */}

            <div
              className={`
                absolute
                bottom-0
                left-0
                h-[2px]
                w-full
                origin-left
                animate-[notificationProgress_4.5s_linear]
                ${
                  successMessage
                    ? "bg-emerald-400"
                    : "bg-red-400"
                }
              `}
            />

          </div>

        </div>
      )}


      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-5xl
        "
      >

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="mb-8">

          <div className="flex items-center gap-4">

            {/* 3D Icon */}

            <div
              className="
                relative
                flex
                h-14
                w-14
                shrink-0
                rotate-[-4deg]
                items-center
                justify-center
                rounded-2xl
                border
                border-blue-300/20
                bg-gradient-to-br
                from-blue-500
                via-indigo-600
                to-violet-700
                shadow-[0_20px_45px_rgba(37,99,235,0.35),inset_0_1px_1px_rgba(255,255,255,0.3)]
                transition
                duration-500
                hover:rotate-0
                hover:scale-105
              "
            >

              <div
                className="
                  absolute
                  inset-[1px]
                  rounded-2xl
                  bg-gradient-to-br
                  from-white/20
                  via-transparent
                  to-transparent
                "
              />

              <LibraryBig
                size={27}
                className="relative text-white drop-shadow-lg"
              />

              <div
                className="
                  absolute
                  -bottom-1
                  -right-1
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-[#030712]
                  bg-cyan-400
                  text-[#030712]
                  shadow-[0_0_18px_rgba(34,211,238,0.8)]
                "
              >
                <CheckCircle2 size={11} />
              </div>

            </div>


            {/* Header Text */}

            <div className="min-w-0">

              <div className="flex items-center gap-2">

                <h1
                  className="
                    text-3xl
                    font-black
                    tracking-tight
                    text-white
                    drop-shadow-[0_4px_20px_rgba(255,255,255,0.08)]
                    md:text-4xl
                  "
                >
                  Add New Book
                </h1>

                <Sparkles
                  size={18}
                  className="animate-pulse text-cyan-400"
                />

              </div>

              <p className="mt-1 text-sm text-slate-400">
                Expand your library collection with a new title.
              </p>

            </div>

          </div>


          {/* Header Status */}

          <div className="mt-5 flex items-center gap-3">

            <div
              className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-emerald-400/10
                bg-emerald-400/[0.04]
                px-3
                py-1.5
              "
            >

              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-emerald-400
                  shadow-[0_0_10px_rgba(52,211,153,0.8)]
                "
              />

              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-300/60">
                Library System Online
              </span>

            </div>

          </div>

        </div>


        {/* =====================================
            MAIN 3D CARD
        ===================================== */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[30px]
            border
            border-white/[0.12]
            bg-white/[0.045]
            shadow-[0_40px_100px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.08)]
            backdrop-blur-2xl
          "
        >

          {/* Card Top Highlight */}

          <div
            className="
              pointer-events-none
              absolute
              left-[8%]
              right-[8%]
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-blue-400/50
              to-transparent
            "
          />


          {/* Card Glow */}

          <div
            className="
              pointer-events-none
              absolute
              -right-32
              -top-32
              h-80
              w-80
              rounded-full
              bg-blue-500/10
              blur-[90px]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-32
              -left-32
              h-80
              w-80
              rounded-full
              bg-violet-500/10
              blur-[90px]
            "
          />


          <div className="relative p-5 sm:p-7 md:p-9">

            {/* =====================================
                CARD HEADER
            ===================================== */}

            <div
              className="
                mb-8
                flex
                items-center
                gap-4
                border-b
                border-white/[0.08]
                pb-7
              "
            >

              <div
                className="
                  relative
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-blue-300/15
                  bg-gradient-to-br
                  from-blue-500/20
                  to-indigo-600/10
                  shadow-[0_15px_35px_rgba(37,99,235,0.18),inset_0_1px_1px_rgba(255,255,255,0.08)]
                "
              >

                <BookOpen
                  size={27}
                  className="
                    text-blue-300
                    drop-shadow-[0_3px_8px_rgba(96,165,250,0.5)]
                  "
                />

              </div>

              <div>

                <h2 className="text-xl font-bold text-white">
                  Book Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Enter the details of the book you want to add.
                </p>

              </div>

            </div>


            {/* =====================================
                FORM
            ===================================== */}

            <form
              onSubmit={handleSubmit}
              className="relative space-y-6"
            >

              {/* =====================================
                  TITLE + AUTHOR
              ===================================== */}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* TITLE */}

                <div
                  className="
                    group
                    rounded-2xl
                    border
                    border-white/[0.06]
                    bg-black/10
                    p-4
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-blue-400/15
                    hover:bg-white/[0.025]
                    hover:shadow-[0_15px_35px_rgba(37,99,235,0.08)]
                  "
                >

                  <label
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-slate-300
                    "
                  >

                    <BookOpen
                      size={15}
                      className="text-blue-400"
                    />

                    Book Title

                  </label>

                  <input
                    type="text"
                    name="title"
                    placeholder="Enter book title"
                    value={formData.title}
                    onChange={handleChange}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-[#050b18]/80
                      px-4
                      py-3.5
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-slate-600
                      shadow-[inset_0_3px_10px_rgba(0,0,0,0.25),0_5px_15px_rgba(0,0,0,0.08)]
                      transition-all
                      focus:border-blue-400/40
                      focus:bg-blue-500/[0.03]
                      focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08),inset_0_3px_10px_rgba(0,0,0,0.25)]
                    "
                    required
                  />

                </div>


                {/* AUTHOR */}

                <div
                  className="
                    group
                    rounded-2xl
                    border
                    border-white/[0.06]
                    bg-black/10
                    p-4
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-indigo-400/15
                    hover:bg-white/[0.025]
                    hover:shadow-[0_15px_35px_rgba(99,102,241,0.08)]
                  "
                >

                  <label
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-slate-300
                    "
                  >

                    <UserRound
                      size={15}
                      className="text-indigo-400"
                    />

                    Author

                  </label>

                  <input
                    type="text"
                    name="author"
                    placeholder="Enter author name"
                    value={formData.author}
                    onChange={handleChange}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-[#050b18]/80
                      px-4
                      py-3.5
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-slate-600
                      shadow-[inset_0_3px_10px_rgba(0,0,0,0.25),0_5px_15px_rgba(0,0,0,0.08)]
                      transition-all
                      focus:border-indigo-400/40
                      focus:bg-indigo-500/[0.03]
                      focus:shadow-[0_0_0_3px_rgba(99,102,241,0.08),inset_0_3px_10px_rgba(0,0,0,0.25)]
                    "
                    required
                  />

                </div>

              </div>


              {/* =====================================
                  ISBN + CATEGORY
              ===================================== */}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* ISBN */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/[0.06]
                    bg-black/10
                    p-4
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-cyan-400/15
                    hover:shadow-[0_15px_35px_rgba(34,211,238,0.06)]
                  "
                >

                  <label
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-slate-300
                    "
                  >

                    <Hash
                      size={15}
                      className="text-cyan-400"
                    />

                    ISBN

                  </label>

                  <input
                    type="text"
                    name="isbn"
                    placeholder="Enter ISBN number"
                    value={formData.isbn}
                    onChange={handleChange}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-[#050b18]/80
                      px-4
                      py-3.5
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-slate-600
                      shadow-[inset_0_3px_10px_rgba(0,0,0,0.25)]
                      transition-all
                      focus:border-cyan-400/40
                      focus:shadow-[0_0_0_3px_rgba(34,211,238,0.08),inset_0_3px_10px_rgba(0,0,0,0.25)]
                    "
                    required
                  />

                </div>


                {/* CATEGORY */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/[0.06]
                    bg-black/10
                    p-4
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-purple-400/15
                    hover:shadow-[0_15px_35px_rgba(168,85,247,0.06)]
                  "
                >

                  <label
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-slate-300
                    "
                  >

                    <Layers3
                      size={15}
                      className="text-purple-400"
                    />

                    Category

                  </label>

                  <input
                    type="text"
                    name="category"
                    placeholder="e.g. Programming"
                    value={formData.category}
                    onChange={handleChange}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-[#050b18]/80
                      px-4
                      py-3.5
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-slate-600
                      shadow-[inset_0_3px_10px_rgba(0,0,0,0.25)]
                      transition-all
                      focus:border-purple-400/40
                      focus:shadow-[0_0_0_3px_rgba(168,85,247,0.08),inset_0_3px_10px_rgba(0,0,0,0.25)]
                    "
                    required
                  />

                </div>

              </div>


              {/* =====================================
                  PUBLISHER + COPIES
              ===================================== */}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* PUBLISHER */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/[0.06]
                    bg-black/10
                    p-4
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-emerald-400/15
                    hover:shadow-[0_15px_35px_rgba(52,211,153,0.06)]
                  "
                >

                  <label
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-slate-300
                    "
                  >

                    <Building2
                      size={15}
                      className="text-emerald-400"
                    />

                    Publisher

                  </label>

                  <input
                    type="text"
                    name="publisher"
                    placeholder="Enter publisher"
                    value={formData.publisher}
                    onChange={handleChange}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-[#050b18]/80
                      px-4
                      py-3.5
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-slate-600
                      shadow-[inset_0_3px_10px_rgba(0,0,0,0.25)]
                      transition-all
                      focus:border-emerald-400/40
                      focus:shadow-[0_0_0_3px_rgba(52,211,153,0.08),inset_0_3px_10px_rgba(0,0,0,0.25)]
                    "
                  />

                </div>


                {/* COPIES */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/[0.06]
                    bg-black/10
                    p-4
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-orange-400/15
                    hover:shadow-[0_15px_35px_rgba(251,146,60,0.06)]
                  "
                >

                  <label
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-slate-300
                    "
                  >

                    <Layers3
                      size={15}
                      className="text-orange-400"
                    />

                    Total Copies

                  </label>

                  <input
                    type="number"
                    name="totalCopies"
                    placeholder="Total copies"
                    value={formData.totalCopies}
                    onChange={handleChange}
                    min="1"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-[#050b18]/80
                      px-4
                      py-3.5
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-slate-600
                      shadow-[inset_0_3px_10px_rgba(0,0,0,0.25)]
                      transition-all
                      focus:border-orange-400/40
                      focus:shadow-[0_0_0_3px_rgba(251,146,60,0.08),inset_0_3px_10px_rgba(0,0,0,0.25)]
                    "
                  />

                </div>

              </div>


              {/* =====================================
                  DESCRIPTION
              ===================================== */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/[0.06]
                  bg-black/10
                  p-4
                  transition-all
                  duration-300
                  hover:border-pink-400/15
                  hover:shadow-[0_15px_35px_rgba(236,72,153,0.05)]
                "
              >

                <label
                  className="
                    mb-2
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-slate-300
                  "
                >

                  <FileText
                    size={15}
                    className="text-pink-400"
                  />

                  Book Description

                </label>

                <textarea
                  name="description"
                  placeholder="Write a short description about this book..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-white/10
                    bg-[#050b18]/80
                    px-4
                    py-3.5
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-slate-600
                    shadow-[inset_0_3px_10px_rgba(0,0,0,0.25)]
                    transition-all
                    focus:border-pink-400/40
                    focus:shadow-[0_0_0_3px_rgba(236,72,153,0.08),inset_0_3px_10px_rgba(0,0,0,0.25)]
                  "
                />

              </div>


              {/* =====================================
                  IMAGE UPLOAD
              ===================================== */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/[0.06]
                  bg-black/10
                  p-4
                  transition-all
                  hover:border-cyan-400/10
                "
              >

                <label
                  className="
                    mb-3
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-slate-300
                  "
                >

                  <ImagePlus
                    size={15}
                    className="text-cyan-400"
                  />

                  Book Cover Image

                </label>


                <label
                  className="
                    group
                    relative
                    flex
                    min-h-[190px]
                    cursor-pointer
                    flex-col
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-2xl
                    border
                    border-dashed
                    border-white/15
                    bg-gradient-to-br
                    from-white/[0.035]
                    to-black/20
                    px-5
                    py-7
                    text-center
                    shadow-[inset_0_2px_20px_rgba(0,0,0,0.2)]
                    transition-all
                    duration-500
                    hover:-translate-y-1
                    hover:border-blue-400/40
                    hover:bg-blue-500/[0.035]
                    hover:shadow-[0_20px_45px_rgba(37,99,235,0.12),inset_0_2px_20px_rgba(0,0,0,0.2)]
                  "
                >

                  {/* Upload Glow */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      h-32
                      w-32
                      rounded-full
                      bg-blue-500/10
                      blur-3xl
                      transition
                      duration-500
                      group-hover:bg-blue-500/20
                    "
                  />


                  {image ? (
                    <div className="relative z-10 flex flex-col items-center">

                      <div
                        className="
                          relative
                          mb-4
                          overflow-hidden
                          rounded-2xl
                          border
                          border-blue-300/20
                          bg-black/40
                          shadow-[0_20px_40px_rgba(0,0,0,0.4)]
                        "
                      >

                        <img
                          src={URL.createObjectURL(image)}
                          alt="Book cover preview"
                          className="
                            h-28
                            w-20
                            object-cover
                            transition
                            duration-500
                            group-hover:scale-105
                          "
                        />

                        <div
                          className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-black/40
                            via-transparent
                            to-white/10
                          "
                        />

                      </div>

                      <div className="flex items-center gap-2">

                        <CheckCircle2
                          size={15}
                          className="text-emerald-400"
                        />

                        <p className="max-w-[250px] truncate text-sm font-semibold text-slate-300">
                          {image.name}
                        </p>

                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        Click to replace image
                      </p>

                    </div>
                  ) : (
                    <>
                      {/* Upload Icon */}

                      <div
                        className="
                          relative
                          mb-4
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center
                          rounded-2xl
                          border
                          border-blue-300/20
                          bg-gradient-to-br
                          from-blue-500/20
                          to-indigo-500/10
                          shadow-[0_15px_30px_rgba(37,99,235,0.15),inset_0_1px_1px_rgba(255,255,255,0.1)]
                          transition-all
                          duration-500
                          group-hover:-translate-y-2
                          group-hover:rotate-3
                        "
                      >

                        <Upload
                          size={24}
                          className="text-blue-300"
                        />

                      </div>

                      <p className="relative text-sm font-semibold text-slate-300">
                        Choose a book cover
                      </p>

                      <p className="relative mt-1 text-xs text-slate-500">
                        PNG, JPG or JPEG
                      </p>

                      <p className="relative mt-3 text-[10px] uppercase tracking-[0.15em] text-white/20">
                        Click or drag your image here
                      </p>
                    </>
                  )}


                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                </label>

              </div>


              {/* =====================================
                  SUBMIT
              ===================================== */}

              <div className="pt-2">

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    group
                    relative
                    w-full
                    overflow-hidden
                    rounded-2xl
                    border
                    border-blue-300/20
                    bg-gradient-to-r
                    from-blue-600
                    via-indigo-600
                    to-violet-600
                    px-5
                    py-4
                    text-sm
                    font-bold
                    text-white
                    shadow-[0_20px_45px_rgba(37,99,235,0.30),inset_0_1px_1px_rgba(255,255,255,0.18)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:scale-[1.005]
                    hover:shadow-[0_28px_60px_rgba(37,99,235,0.40),inset_0_1px_1px_rgba(255,255,255,0.2)]
                    active:translate-y-0
                    active:scale-[0.998]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    disabled:hover:translate-y-0
                    disabled:hover:scale-100
                  "
                >

                  {/* Shine */}

                  <span
                    className="
                      absolute
                      inset-0
                      -translate-x-full
                      bg-gradient-to-r
                      from-transparent
                      via-white/20
                      to-transparent
                      transition-transform
                      duration-700
                      group-hover:translate-x-full
                    "
                  />


                  {/* Top Highlight */}

                  <span
                    className="
                      absolute
                      left-[10%]
                      right-[10%]
                      top-0
                      h-px
                      bg-white/30
                    "
                  />


                  <span className="relative flex items-center justify-center gap-2">

                    {loading ? (
                      <>
                        <LoaderCircle
                          size={19}
                          className="animate-spin"
                        />

                        Adding Book...
                      </>
                    ) : (
                      <>
                        <Plus
                          size={19}
                          className="
                            transition-transform
                            duration-300
                            group-hover:rotate-90
                          "
                        />

                        Add Book to Library
                      </>
                    )}

                  </span>

                </button>

              </div>

            </form>

          </div>

        </div>


        {/* =====================================
            BOTTOM INFO
        ===================================== */}

        <div
          className="
            mt-6
            flex
            flex-wrap
            items-center
            justify-center
            gap-3
            text-center
            text-xs
            text-slate-600
          "
        >

          <BookOpen size={14} />

          <span>
            Your book will initially have all copies available.
          </span>

          <span className="hidden h-1 w-1 rounded-full bg-slate-700 sm:block" />

          <span className="text-slate-700">
            Library inventory system
          </span>

        </div>

      </div>

      {/* =====================================
          ANIMATIONS
      ===================================== */}

      <style>
        {`
          @keyframes notificationIn {
            from {
              opacity: 0;
              transform: translateX(35px) scale(0.94);
            }

            to {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }

          @keyframes notificationProgress {
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

export default AddBook;