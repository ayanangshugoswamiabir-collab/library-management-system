
import { useState } from "react";

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

  // =====================================
  // Handle Input Changes
  // =====================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =====================================
  // Handle Image
  // =====================================

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // =====================================
  // Submit
  // =====================================

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      bookFormData.append("availableCopies", formData.totalCopies);

      if (image) {
        bookFormData.append("bookCover", image);
      }

      const response = await addBook(bookFormData);

      console.log(response);

      alert("Book added successfully");

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
      console.log(error.response || error);

      alert(
        error.response?.data?.message ||
          "Failed to add book"
      );
    }
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
          3D BACKGROUND
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

        {/* Top shine */}

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
      </div>

      {/* =====================================
          CONTENT
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
                rotate-[-4deg]
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
            </div>

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
          {/* Card top highlight */}

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

          {/* Decorative 3D glow */}

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
                  className="text-blue-300 drop-shadow-[0_3px_8px_rgba(96,165,250,0.5)]"
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
                  "
                >
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300">
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
                  "
                >
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300">
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
                  "
                >
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300">
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
                  "
                >
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300">
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
                  "
                >
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300">
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
                  "
                >
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300">
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
                "
              >
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300">
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
                "
              >
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300">
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
                    min-h-[170px]
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
                  {/* Upload glow */}

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
                    <ImagePlus
                      size={25}
                      className="text-blue-300"
                    />
                  </div>

                  <p className="relative text-sm font-semibold text-slate-300">
                    {image
                      ? image.name
                      : "Choose a book cover"}
                  </p>

                  <p className="relative mt-1 text-xs text-slate-500">
                    PNG, JPG or JPEG
                  </p>

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

                  {/* Top highlight */}

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
                    <Plus
                      size={19}
                      className="transition-transform duration-300 group-hover:rotate-90"
                    />

                    Add Book to Library
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
            items-center
            justify-center
            gap-2
            text-center
            text-xs
            text-slate-600
          "
        >
          <BookOpen size={14} />

          Your book will initially have all copies available.
        </div>
      </div>
    </div>
  );
}

export default AddBook;

