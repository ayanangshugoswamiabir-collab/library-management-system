
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getBookById,
  updateBook,
} from "../api/bookApi";

import {
  ArrowLeft,
  BookOpen,
  UserRound,
  Hash,
  Tags,
  Building2,
  FileText,
  Layers3,
  Image as ImageIcon,
  Upload,
  Save,
  Sparkles,
} from "lucide-react";


function EditBook() {

  const { id } = useParams();

  const navigate = useNavigate();


  const [formData, setFormData] = useState({

    title: "",
    author: "",
    isbn: "",
    category: "",
    publisher: "",
    description: "",
    totalCopies: 1,

  });


  const [existingImage, setExistingImage] = useState("");

  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");




  // =====================================
  // Fetch Existing Book
  // =====================================

  useEffect(() => {

    const fetchBook = async () => {

      try {

        const data = await getBookById(id);

        setFormData({

          title: data.title || "",

          author: data.author || "",

          isbn: data.isbn || "",

          category: data.category || "",

          publisher: data.publisher || "",

          description: data.description || "",

          totalCopies: data.totalCopies || 1,

        });

        setExistingImage(data.bookCover || "");

      } catch (error) {

        console.log(error);

        setError("Failed to load book");

      } finally {

        setLoading(false);

      }

    };

    fetchBook();

  }, [id]);




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

      setSaving(true);

      setError("");

      const bookFormData = new FormData();

      bookFormData.append(
        "title",
        formData.title
      );

      bookFormData.append(
        "author",
        formData.author
      );

      bookFormData.append(
        "isbn",
        formData.isbn
      );

      bookFormData.append(
        "category",
        formData.category
      );

      bookFormData.append(
        "publisher",
        formData.publisher
      );

      bookFormData.append(
        "description",
        formData.description
      );

      bookFormData.append(
        "totalCopies",
        formData.totalCopies
      );


      // Add new image only if selected

      if (image) {

        bookFormData.append(
          "bookCover",
          image
        );

      }


      await updateBook(
        id,
        bookFormData
      );


      alert(
        "Book updated successfully"
      );


      navigate(
        `/books/${id}`
      );


    } catch (error) {

      console.log(error);

      setError(
        error.response?.data?.message ||
        "Failed to update book"
      );

    } finally {

      setSaving(false);

    }

  };




  // =====================================
  // Loading
  // =====================================

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-950 flex items-center justify-center">

        <div className="text-center">

          <div
            className="
              mx-auto
              w-12
              h-12
              rounded-2xl
              border-2
              border-blue-500/30
              border-t-blue-400
              animate-spin
            "
          />

          <p className="mt-5 text-slate-400 font-medium">
            Loading book...
          </p>

        </div>

      </div>

    );

  }




  // =====================================
  // Error
  // =====================================

  if (error && !formData.title) {

    return (

      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

        <div
          className="
            max-w-md
            w-full
            rounded-3xl
            border
            border-red-500/20
            bg-white/[0.05]
            backdrop-blur-xl
            p-8
            text-center
            shadow-[0_30px_80px_rgba(0,0,0,0.4)]
          "
        >

          <div
            className="
              mx-auto
              w-14
              h-14
              rounded-2xl
              bg-red-500/10
              border
              border-red-500/20
              flex
              items-center
              justify-center
              text-red-400
            "
          >
            !
          </div>

          <p className="mt-5 text-red-300 font-semibold">
            {error}
          </p>

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
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-indigo-950
        text-white
        p-5
        md:p-8
      "
    >

      {/* =====================================
          BACKGROUND GLOW
      ===================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div
          className="
            absolute
            -top-48
            -right-48
            w-[650px]
            h-[650px]
            rounded-full
            bg-blue-600/15
            blur-[140px]
          "
        />

        <div
          className="
            absolute
            top-1/3
            -left-56
            w-[600px]
            h-[600px]
            rounded-full
            bg-purple-600/10
            blur-[140px]
          "
        />

        <div
          className="
            absolute
            -bottom-64
            right-1/3
            w-[550px]
            h-[550px]
            rounded-full
            bg-cyan-500/10
            blur-[140px]
          "
        />

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




      {/* =====================================
          DECORATIVE 3D OBJECTS
      ===================================== */}

      <div
        className="
          pointer-events-none
          absolute
          top-20
          right-[12%]
          hidden
          xl:block
          w-28
          h-28
          rounded-[2rem]
          rotate-12
          bg-blue-400/[0.04]
          border
          border-blue-300/10
          backdrop-blur-xl
          shadow-[0_30px_70px_rgba(37,99,235,0.15)]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-20
          left-[18%]
          hidden
          xl:block
          w-20
          h-20
          rounded-3xl
          -rotate-12
          bg-purple-400/[0.04]
          border
          border-purple-300/10
          shadow-[0_25px_60px_rgba(168,85,247,0.15)]
        "
      />




      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <div className="relative z-10 max-w-6xl mx-auto">


        {/* =====================================
            TOP HEADER
        ===================================== */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">


          <div>

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
                border-blue-400/20
                text-blue-300
                text-xs
                font-semibold
                uppercase
                tracking-wider
                mb-3
              "
            >

              <Sparkles size={13} />

              Book Management

            </div>


            <h1
              className="
                text-3xl
                md:text-4xl
                font-black
                tracking-tight
              "
            >
              Edit Book
            </h1>


            <p className="mt-2 text-slate-400">
              Update the information and cover of this book.
            </p>

          </div>


          {/* Back Button */}

          <button
            type="button"
            onClick={() => navigate(`/books/${id}`)}
            className="
              group
              inline-flex
              items-center
              gap-2
              px-5
              py-3
              rounded-2xl
              bg-white/[0.06]
              border
              border-white/10
              text-slate-300
              font-semibold
              backdrop-blur-xl
              shadow-[0_15px_35px_rgba(0,0,0,0.25)]
              hover:bg-white/[0.10]
              hover:text-white
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >

            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />

            Back to Details

          </button>

        </div>




        {/* =====================================
            ERROR MESSAGE
        ===================================== */}

        {error && (

          <div
            className="
              mb-6
              p-4
              rounded-2xl
              bg-red-500/10
              border
              border-red-500/20
              text-red-300
              shadow-[0_15px_35px_rgba(239,68,68,0.08)]
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  w-8
                  h-8
                  rounded-xl
                  bg-red-500/10
                  flex
                  items-center
                  justify-center
                  font-bold
                "
              >
                !
              </div>

              {error}

            </div>

          </div>

        )}




        {/* =====================================
            3D FORM CONTAINER
        ===================================== */}

        <div className="relative">


          {/* Bottom Shadow */}

          <div
            className="
              absolute
              inset-x-6
              -bottom-5
              h-full
              rounded-[2rem]
              bg-blue-600/10
              blur-2xl
              pointer-events-none
            "
          />


          {/* Back Layer */}

          <div
            className="
              absolute
              inset-x-3
              -bottom-3
              h-full
              rounded-[2rem]
              bg-gradient-to-br
              from-indigo-500/10
              to-blue-500/[0.03]
              border
              border-white/5
              pointer-events-none
            "
          />


          {/* Main Card */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[2rem]
              border
              border-white/10
              bg-white/[0.055]
              backdrop-blur-2xl
              shadow-[0_30px_90px_rgba(0,0,0,0.45)]
            "
          >

            {/* Top highlight */}

            <div
              className="
                absolute
                top-0
                left-10
                right-10
                h-px
                bg-gradient-to-r
                from-transparent
                via-blue-300/50
                to-transparent
              "
            />

            {/* Top gradient line */}

            <div
              className="
                absolute
                top-0
                left-0
                right-0
                h-1
                bg-gradient-to-r
                from-blue-500
                via-indigo-500
                to-cyan-400
              "
            />



            <form onSubmit={handleSubmit}>


              {/* =====================================
                  FORM HEADER
              ===================================== */}

              <div
                className="
                  p-6
                  md:p-8
                  border-b
                  border-white/10
                  bg-gradient-to-r
                  from-blue-500/[0.06]
                  via-transparent
                  to-purple-500/[0.04]
                "
              >

                <div className="flex items-center gap-4">

                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-gradient-to-br
                      from-blue-500
                      via-indigo-500
                      to-purple-600
                      flex
                      items-center
                      justify-center
                      border
                      border-white/20
                      shadow-[0_15px_35px_rgba(59,130,246,0.3)]
                      rotate-[-3deg]
                    "
                  >

                    <BookOpen size={25} />

                  </div>


                  <div>

                    <h2 className="text-xl font-bold">
                      Book Information
                    </h2>

                    <p className="text-sm text-slate-400 mt-1">
                      Make changes to the selected book.
                    </p>

                  </div>

                </div>

              </div>




              {/* =====================================
                  FORM BODY
              ===================================== */}

              <div className="p-6 md:p-8">


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


                  {/* Title */}

                  <div className="lg:col-span-2">

                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-2">

                      <BookOpen size={16} className="text-blue-400" />

                      Book Title

                    </label>

                    <div className="relative">

                      <input
                        type="text"
                        name="title"
                        placeholder="Book Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="
                          w-full
                          px-4
                          py-3.5
                          rounded-2xl
                          bg-slate-950/45
                          border
                          border-white/10
                          outline-none
                          text-white
                          placeholder:text-slate-600
                          shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)]
                          focus:border-blue-500/50
                          focus:ring-4
                          focus:ring-blue-500/10
                          focus:bg-slate-950/60
                          transition-all
                        "
                        required
                      />

                    </div>

                  </div>




                  {/* Author */}

                  <div>

                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-2">

                      <UserRound size={16} className="text-purple-400" />

                      Author

                    </label>

                    <input
                      type="text"
                      name="author"
                      placeholder="Author"
                      value={formData.author}
                      onChange={handleChange}
                      className="
                        w-full
                        px-4
                        py-3.5
                        rounded-2xl
                        bg-slate-950/45
                        border
                        border-white/10
                        outline-none
                        text-white
                        placeholder:text-slate-600
                        shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)]
                        focus:border-purple-500/50
                        focus:ring-4
                        focus:ring-purple-500/10
                        transition-all
                      "
                      required
                    />

                  </div>




                  {/* ISBN */}

                  <div>

                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-2">

                      <Hash size={16} className="text-cyan-400" />

                      ISBN

                    </label>

                    <input
                      type="text"
                      name="isbn"
                      placeholder="ISBN"
                      value={formData.isbn}
                      onChange={handleChange}
                      className="
                        w-full
                        px-4
                        py-3.5
                        rounded-2xl
                        bg-slate-950/45
                        border
                        border-white/10
                        outline-none
                        text-white
                        placeholder:text-slate-600
                        shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)]
                        focus:border-cyan-500/50
                        focus:ring-4
                        focus:ring-cyan-500/10
                        transition-all
                      "
                      required
                    />

                  </div>




                  {/* Category */}

                  <div>

                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-2">

                      <Tags size={16} className="text-pink-400" />

                      Category

                    </label>

                    <input
                      type="text"
                      name="category"
                      placeholder="Category"
                      value={formData.category}
                      onChange={handleChange}
                      className="
                        w-full
                        px-4
                        py-3.5
                        rounded-2xl
                        bg-slate-950/45
                        border
                        border-white/10
                        outline-none
                        text-white
                        placeholder:text-slate-600
                        shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)]
                        focus:border-pink-500/50
                        focus:ring-4
                        focus:ring-pink-500/10
                        transition-all
                      "
                      required
                    />

                  </div>




                  {/* Publisher */}

                  <div>

                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-2">

                      <Building2 size={16} className="text-emerald-400" />

                      Publisher

                    </label>

                    <input
                      type="text"
                      name="publisher"
                      placeholder="Publisher"
                      value={formData.publisher}
                      onChange={handleChange}
                      className="
                        w-full
                        px-4
                        py-3.5
                        rounded-2xl
                        bg-slate-950/45
                        border
                        border-white/10
                        outline-none
                        text-white
                        placeholder:text-slate-600
                        shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)]
                        focus:border-emerald-500/50
                        focus:ring-4
                        focus:ring-emerald-500/10
                        transition-all
                      "
                    />

                  </div>




                  {/* Total Copies */}

                  <div>

                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-2">

                      <Layers3 size={16} className="text-orange-400" />

                      Total Copies

                    </label>

                    <input
                      type="number"
                      name="totalCopies"
                      min="1"
                      placeholder="Total Copies"
                      value={formData.totalCopies}
                      onChange={handleChange}
                      className="
                        w-full
                        px-4
                        py-3.5
                        rounded-2xl
                        bg-slate-950/45
                        border
                        border-white/10
                        outline-none
                        text-white
                        placeholder:text-slate-600
                        shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)]
                        focus:border-orange-500/50
                        focus:ring-4
                        focus:ring-orange-500/10
                        transition-all
                      "
                      required
                    />

                  </div>




                  {/* Description */}

                  <div className="lg:col-span-2">

                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-2">

                      <FileText size={16} className="text-blue-400" />

                      Description

                    </label>

                    <textarea
                      name="description"
                      placeholder="Book Description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="6"
                      className="
                        w-full
                        px-4
                        py-3.5
                        rounded-2xl
                        bg-slate-950/45
                        border
                        border-white/10
                        outline-none
                        text-white
                        placeholder:text-slate-600
                        resize-none
                        shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)]
                        focus:border-blue-500/50
                        focus:ring-4
                        focus:ring-blue-500/10
                        transition-all
                      "
                    />

                  </div>


                </div>




                {/* =====================================
                    IMAGE SECTION
                ===================================== */}

                <div className="mt-8 pt-8 border-t border-white/10">

                  <div className="flex items-center gap-3 mb-5">

                    <div
                      className="
                        w-10
                        h-10
                        rounded-xl
                        bg-purple-500/10
                        border
                        border-purple-400/20
                        flex
                        items-center
                        justify-center
                      "
                    >

                      <ImageIcon
                        size={19}
                        className="text-purple-400"
                      />

                    </div>

                    <div>

                      <h3 className="font-bold text-white">
                        Book Cover
                      </h3>

                      <p className="text-xs text-slate-500">
                        Manage the visual cover of this book.
                      </p>

                    </div>

                  </div>




                  <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-7">


                    {/* Existing Image */}

                    {existingImage ? (

                      <div>

                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                          Current Cover
                        </p>

                        <div
                          className="
                            relative
                            group
                            rounded-2xl
                            overflow-hidden
                            border
                            border-white/10
                            bg-slate-950/50
                            shadow-[0_20px_45px_rgba(0,0,0,0.35)]
                          "
                        >

                          <img
                            src={existingImage}
                            alt={formData.title}
                            className="
                              w-full
                              h-64
                              object-cover
                              transition-transform
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
                              to-transparent
                              pointer-events-none
                            "
                          />

                        </div>

                      </div>

                    ) : (

                      <div>

                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                          Current Cover
                        </p>

                        <div
                          className="
                            h-64
                            rounded-2xl
                            border
                            border-dashed
                            border-white/10
                            bg-slate-950/30
                            flex
                            flex-col
                            items-center
                            justify-center
                            text-slate-600
                          "
                        >

                          <BookOpen size={35} />

                          <p className="mt-3 text-sm">
                            No cover image
                          </p>

                        </div>

                      </div>

                    )}




                    {/* Upload */}

                    <div>

                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                        Replace Cover
                      </p>

                      <label
                        className="
                          group
                          relative
                          flex
                          flex-col
                          items-center
                          justify-center
                          min-h-64
                          rounded-2xl
                          border
                          border-dashed
                          border-blue-400/20
                          bg-blue-500/[0.03]
                          hover:bg-blue-500/[0.07]
                          hover:border-blue-400/40
                          cursor-pointer
                          transition-all
                          duration-300
                        "
                      >

                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />

                        <div
                          className="
                            w-14
                            h-14
                            rounded-2xl
                            bg-blue-500/10
                            border
                            border-blue-400/20
                            flex
                            items-center
                            justify-center
                            text-blue-400
                            group-hover:scale-110
                            group-hover:rotate-3
                            transition-all
                            duration-300
                          "
                        >

                          <Upload size={23} />

                        </div>

                        <p className="mt-5 font-semibold text-slate-200">
                          Choose a new cover
                        </p>

                        <p className="mt-2 text-xs text-slate-500">
                          PNG, JPG or JPEG
                        </p>


                        {image && (

                          <div
                            className="
                              mt-5
                              px-4
                              py-2
                              rounded-xl
                              bg-emerald-500/10
                              border
                              border-emerald-400/20
                              text-emerald-300
                              text-xs
                              font-semibold
                              max-w-[90%]
                              truncate
                            "
                          >
                            {image.name}
                          </div>

                        )}

                      </label>

                    </div>


                  </div>

                </div>




                {/* =====================================
                    ACTIONS
                ===================================== */}

                <div
                  className="
                    mt-10
                    pt-7
                    border-t
                    border-white/10
                    flex
                    flex-col-reverse
                    sm:flex-row
                    sm:justify-end
                    gap-3
                  "
                >

                  <button
                    type="button"
                    onClick={() => navigate(`/books/${id}`)}
                    className="
                      px-6
                      py-3.5
                      rounded-2xl
                      bg-white/[0.05]
                      border
                      border-white/10
                      text-slate-300
                      font-semibold
                      hover:bg-white/[0.10]
                      hover:text-white
                      transition-all
                    "
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    disabled={saving}
                    className="
                      group
                      relative
                      overflow-hidden
                      flex
                      items-center
                      justify-center
                      gap-2
                      px-7
                      py-3.5
                      rounded-2xl
                      bg-gradient-to-r
                      from-blue-600
                      via-indigo-600
                      to-purple-600
                      border
                      border-white/10
                      text-white
                      font-bold
                      shadow-[0_15px_35px_rgba(59,130,246,0.3)]
                      hover:shadow-[0_20px_45px_rgba(99,102,241,0.4)]
                      hover:-translate-y-1
                      active:translate-y-0
                      transition-all
                      duration-300
                      disabled:opacity-60
                      disabled:cursor-not-allowed
                      disabled:hover:translate-y-0
                    "
                  >

                    {/* Shine */}

                    <span
                      className="
                        absolute
                        inset-y-0
                        -left-20
                        w-16
                        bg-white/20
                        skew-x-[-20deg]
                        group-hover:left-[110%]
                        transition-all
                        duration-700
                      "
                    />


                    <Save
                      size={18}
                      className="relative"
                    />

                    <span className="relative">

                      {saving
                        ? "Updating Book..."
                        : "Update Book"
                      }

                    </span>

                  </button>

                </div>


              </div>

            </form>

          </div>

        </div>


        {/* =====================================
            FOOTER NOTE
        ===================================== */}

        <div className="flex items-center justify-center gap-2 mt-7 text-xs text-slate-600">

          <Sparkles size={13} />

          Keep your library collection up to date.

        </div>


      </div>

    </div>

  );

}


export default EditBook;

