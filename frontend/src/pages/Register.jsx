
import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  ShieldCheck,
  Library,
  Sparkles,
  ArrowRight,
  Users,
  BookOpen,
  Eye,
  EyeOff,
} from "lucide-react";

import api from "../api/axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /* ==========================================
     Handle Input
  ========================================== */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) {
      setError("");
    }

    if (message) {
      setMessage("");
    }
  };

  /* ==========================================
     Register
  ========================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await api.post(
        "/auth/register",
        formData
      );

      console.log(response.data);

      setMessage(
        "Registration successful! Please verify your email."
      );

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "Student",
      });
    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.message ||
        "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        relative
        overflow-hidden

        bg-gradient-to-br
        from-slate-950
        via-indigo-950
        to-slate-950

        text-white
      "
    >

      {/* ==========================================
          GLOBAL BACKGROUND
      ========================================== */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* Blue Glow */}

        <div
          className="
            absolute
            -top-48
            -left-48

            w-[600px]
            h-[600px]

            rounded-full

            bg-blue-600/20

            blur-[130px]
          "
        />

        {/* Purple Glow */}

        <div
          className="
            absolute
            top-1/4
            right-[-220px]

            w-[600px]
            h-[600px]

            rounded-full

            bg-purple-600/20

            blur-[140px]
          "
        />

        {/* Cyan Glow */}

        <div
          className="
            absolute
            bottom-[-300px]
            left-1/3

            w-[650px]
            h-[650px]

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

            opacity-[0.035]

            bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]

            bg-[size:55px_55px]
          "
        />

      </div>


      {/* ==========================================
          FLOATING 3D OBJECTS
      ========================================== */}

      <div
        className="
          absolute
          top-20
          left-[12%]

          hidden
          lg:block

          w-28
          h-28

          rounded-[2rem]

          bg-blue-400/[0.05]

          border
          border-blue-300/10

          backdrop-blur-xl

          rotate-12

          shadow-[0_25px_60px_rgba(37,99,235,0.15)]

          pointer-events-none
        "
      />

      <div
        className="
          absolute
          bottom-24
          right-[12%]

          hidden
          lg:block

          w-16
          h-16

          rounded-2xl

          bg-purple-400/[0.07]

          border
          border-purple-300/10

          rotate-[-18deg]

          shadow-[0_20px_40px_rgba(168,85,247,0.15)]

          pointer-events-none
        "
      />


      {/* ==========================================
          MAIN
      ========================================== */}

      <div
        className="
          relative
          z-10

          min-h-screen

          flex
          items-center
          justify-center

          px-5
          py-10
        "
      >

        <div
          className="
            w-full
            max-w-5xl

            grid
            lg:grid-cols-2

            gap-10
            lg:gap-16

            items-center
          "
        >


          {/* ======================================
              LEFT BRANDING
          ====================================== */}

          <div className="hidden lg:block">

            {/* Brand */}

            <div className="flex items-center gap-4 mb-10">

              <div
                className="
                  relative

                  w-14
                  h-14

                  rounded-2xl

                  bg-gradient-to-br
                  from-blue-400
                  via-indigo-500
                  to-purple-600

                  border
                  border-white/20

                  flex
                  items-center
                  justify-center

                  shadow-[0_15px_35px_rgba(59,130,246,0.35)]

                  rotate-[-3deg]

                  hover:rotate-0
                  hover:scale-105

                  transition-all
                  duration-300
                "
              >

                <Library size={27} />

                <div
                  className="
                    absolute
                    -bottom-1
                    -right-1

                    w-4
                    h-4

                    rounded-full

                    bg-cyan-400

                    border-2
                    border-indigo-900

                    shadow-[0_0_15px_rgba(34,211,238,0.8)]
                  "
                />

              </div>


              <div>

                <h1 className="text-xl font-black tracking-wide">
                  Library Management System
                </h1>

                <p className="text-xs text-blue-200/60 mt-1">
                  Smart Library Platform
                </p>

              </div>

            </div>


            {/* Hero */}

            <div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2

                  px-4
                  py-2

                  rounded-full

                  bg-white/[0.07]

                  border
                  border-white/10

                  backdrop-blur-xl

                  text-sm
                  text-blue-100

                  mb-7

                  shadow-[0_10px_30px_rgba(0,0,0,0.15)]
                "
              >

                <Sparkles
                  size={15}
                  className="text-cyan-300"
                />

                Join the Library

              </div>


              <h2
                className="
                  text-5xl
                  xl:text-6xl

                  font-black

                  leading-[1.03]

                  tracking-tight
                "
              >

                Build your

                <span className="block text-blue-200 mt-2">
                  library
                </span>

                experience.

              </h2>


              <p
                className="
                  mt-7

                  text-blue-100/60

                  text-lg

                  leading-relaxed

                  max-w-lg
                "
              >
                Create your account and get access to a
                smarter way to manage books, borrowing,
                members and library operations.
              </p>


              {/* Feature Cards */}

              <div
                className="
                  grid
                  grid-cols-2

                  gap-4

                  mt-9
                "
              >

                {/* Users */}

                <div
                  className="
                    p-5

                    rounded-2xl

                    bg-white/[0.07]

                    border
                    border-white/10

                    backdrop-blur-xl

                    shadow-[0_15px_40px_rgba(0,0,0,0.18)]

                    hover:-translate-y-2

                    hover:bg-white/[0.10]

                    transition-all
                    duration-300
                  "
                >

                  <div
                    className="
                      w-11
                      h-11

                      rounded-xl

                      bg-blue-400/15

                      border
                      border-blue-200/10

                      flex
                      items-center
                      justify-center

                      mb-4
                    "
                  >

                    <Users
                      size={20}
                      className="text-blue-200"
                    />

                  </div>

                  <p className="font-bold">
                    Multi-user
                  </p>

                  <p className="text-xs text-blue-100/40 mt-2">
                    Student, Librarian & Admin
                  </p>

                </div>


                {/* Books */}

                <div
                  className="
                    p-5

                    rounded-2xl

                    bg-white/[0.07]

                    border
                    border-white/10

                    backdrop-blur-xl

                    shadow-[0_15px_40px_rgba(0,0,0,0.18)]

                    hover:-translate-y-2

                    hover:bg-white/[0.10]

                    transition-all
                    duration-300
                  "
                >

                  <div
                    className="
                      w-11
                      h-11

                      rounded-xl

                      bg-purple-400/15

                      border
                      border-purple-200/10

                      flex
                      items-center
                      justify-center

                      mb-4
                    "
                  >

                    <BookOpen
                      size={20}
                      className="text-purple-200"
                    />

                  </div>

                  <p className="font-bold">
                    Smart Library
                  </p>

                  <p className="text-xs text-blue-100/40 mt-2">
                    Everything in one place
                  </p>

                </div>

              </div>

            </div>


            {/* Footer */}

            <p className="text-sm text-blue-100/30 mt-12">
              © 2026 Library Management System
            </p>

          </div>


          {/* ======================================
              REGISTER CARD
          ====================================== */}

          <div className="relative">

            {/* Deep Glow */}

            <div
              className="
                absolute

                inset-x-6
                -bottom-7

                h-full

                rounded-[2rem]

                bg-blue-600/10

                blur-2xl
              "
            />


            {/* Back 3D Layer */}

            <div
              className="
                absolute

                inset-x-3
                -bottom-3

                h-full

                rounded-[2rem]

                bg-gradient-to-br
                from-indigo-500/20
                to-blue-500/10

                border
                border-white/10

                shadow-[0_20px_50px_rgba(0,0,0,0.25)]
              "
            />


            {/* Main Card */}

            <div
              className="
                relative

                rounded-[2rem]

                p-7
                sm:p-9

                bg-white/[0.075]

                backdrop-blur-2xl

                border
                border-white/15

                shadow-[0_30px_80px_rgba(0,0,0,0.45)]

                overflow-hidden
              "
            >

              {/* Top Gradient */}

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


              {/* Glass Highlight */}

              <div
                className="
                  absolute
                  top-0
                  left-8
                  right-8

                  h-px

                  bg-gradient-to-r
                  from-transparent
                  via-white/40
                  to-transparent
                "
              />


              {/* ==================================
                  CARD HEADER
              ================================== */}

              <div className="mb-7 pt-2">

                <div
                  className="
                    relative

                    w-14
                    h-14

                    rounded-2xl

                    bg-gradient-to-br
                    from-blue-500
                    via-indigo-500
                    to-purple-600

                    text-white

                    flex
                    items-center
                    justify-center

                    mb-5

                    border
                    border-white/20

                    shadow-[0_12px_30px_rgba(59,130,246,0.35)]

                    rotate-[-3deg]

                    hover:rotate-0
                    hover:scale-105

                    transition-all
                    duration-300
                  "
                >

                  <User size={25} />

                  <div
                    className="
                      absolute
                      -top-1
                      -right-1

                      w-3
                      h-3

                      rounded-full

                      bg-cyan-400

                      border-2
                      border-slate-900

                      shadow-[0_0_15px_rgba(34,211,238,0.8)]
                    "
                  />

                </div>


                <h2
                  className="
                    text-3xl

                    font-black

                    text-white

                    tracking-tight
                  "
                >
                  Create Account
                </h2>


                <p className="text-slate-400 mt-2 text-sm">
                  Register to access your library account.
                </p>

              </div>


              {/* ==================================
                  SUCCESS MESSAGE
              ================================== */}

              {message && (
                <div
                  className="
                    mb-5

                    p-4

                    rounded-2xl

                    bg-emerald-500/10

                    border
                    border-emerald-400/20

                    text-emerald-300

                    text-sm

                    shadow-[0_8px_20px_rgba(16,185,129,0.08)]
                  "
                >

                  <div className="flex items-start gap-3">

                    <ShieldCheck
                      size={18}
                      className="shrink-0 mt-0.5"
                    />

                    <span>
                      {message}
                    </span>

                  </div>

                </div>
              )}


              {/* ==================================
                  ERROR MESSAGE
              ================================== */}

              {error && (
                <div
                  className="
                    mb-5

                    p-4

                    rounded-2xl

                    bg-red-500/10

                    border
                    border-red-400/20

                    text-red-300

                    text-sm
                  "
                >

                  <div className="flex items-start gap-2">

                    <span
                      className="
                        flex
                        items-center
                        justify-center

                        w-5
                        h-5

                        rounded-full

                        bg-red-500/20

                        text-red-300

                        font-bold

                        text-xs
                      "
                    >
                      !
                    </span>

                    <span>
                      {error}
                    </span>

                  </div>

                </div>
              )}


              {/* ==================================
                  FORM
              ================================== */}

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                {/* Name */}

                <div className="relative group">

                  <User
                    size={18}
                    className="
                      absolute

                      left-4
                      top-1/2

                      -translate-y-1/2

                      text-slate-500

                      transition

                      group-focus-within:text-blue-400
                    "
                  />

                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    className="
                      w-full

                      pl-11
                      pr-4

                      py-3.5

                      bg-slate-950/50

                      border
                      border-white/10

                      rounded-2xl

                      outline-none

                      text-white

                      placeholder:text-slate-600

                      transition-all
                      duration-200

                      focus:bg-slate-950/70

                      focus:border-blue-500/50

                      focus:ring-4
                      focus:ring-blue-500/10
                    "
                    required
                  />

                </div>


                {/* Email */}

                <div className="relative group">

                  <Mail
                    size={18}
                    className="
                      absolute

                      left-4
                      top-1/2

                      -translate-y-1/2

                      text-slate-500

                      transition

                      group-focus-within:text-blue-400
                    "
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className="
                      w-full

                      pl-11
                      pr-4

                      py-3.5

                      bg-slate-950/50

                      border
                      border-white/10

                      rounded-2xl

                      outline-none

                      text-white

                      placeholder:text-slate-600

                      transition-all
                      duration-200

                      focus:bg-slate-950/70

                      focus:border-blue-500/50

                      focus:ring-4
                      focus:ring-blue-500/10
                    "
                    required
                  />

                </div>


                {/* Password */}

                <div className="relative group">

                  <Lock
                    size={18}
                    className="
                      absolute

                      left-4
                      top-1/2

                      -translate-y-1/2

                      text-slate-500

                      transition

                      group-focus-within:text-blue-400
                    "
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    className="
                      w-full

                      pl-11
                      pr-12

                      py-3.5

                      bg-slate-950/50

                      border
                      border-white/10

                      rounded-2xl

                      outline-none

                      text-white

                      placeholder:text-slate-600

                      transition-all
                      duration-200

                      focus:bg-slate-950/70

                      focus:border-blue-500/50

                      focus:ring-4
                      focus:ring-blue-500/10
                    "
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="
                      absolute

                      right-3
                      top-1/2

                      -translate-y-1/2

                      p-2

                      rounded-xl

                      text-slate-500

                      hover:text-slate-200

                      hover:bg-white/5

                      transition
                    "
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >

                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}

                  </button>

                </div>


                {/* Role */}

                <div>

                  <label
                    className="
                      block

                      text-xs

                      font-semibold

                      text-slate-400

                      mb-2

                      ml-1
                    "
                  >
                    Account Role
                  </label>

                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="
                      w-full

                      px-4

                      py-3.5

                      bg-slate-950/50

                      border
                      border-white/10

                      rounded-2xl

                      outline-none

                      text-white

                      transition-all

                      focus:bg-slate-950/70

                      focus:border-blue-500/50

                      focus:ring-4
                      focus:ring-blue-500/10
                    "
                  >

                    <option
                      value="Student"
                      className="bg-slate-900"
                    >
                      Student
                    </option>

                    <option
                      value="Librarian"
                      className="bg-slate-900"
                    >
                      Librarian
                    </option>

                    <option
                      value="Admin"
                      className="bg-slate-900"
                    >
                      Admin
                    </option>

                  </select>

                </div>


                {/* ==================================
                    REGISTER BUTTON
                ================================== */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    group

                    relative

                    w-full

                    flex
                    items-center
                    justify-center
                    gap-2

                    overflow-hidden

                    bg-gradient-to-r
                    from-blue-600
                    via-indigo-600
                    to-purple-600

                    hover:from-blue-500
                    hover:via-indigo-500
                    hover:to-purple-500

                    active:translate-y-[2px]

                    text-white

                    py-3.5

                    rounded-2xl

                    font-bold

                    border
                    border-white/10

                    shadow-[0_12px_30px_rgba(59,130,246,0.3)]

                    hover:shadow-[0_18px_40px_rgba(99,102,241,0.4)]

                    transition-all
                    duration-200

                    disabled:opacity-60

                    disabled:cursor-not-allowed
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


                  {loading ? (
                    <>
                      <span
                        className="
                          w-4
                          h-4

                          border-2
                          border-white/30
                          border-t-white

                          rounded-full

                          animate-spin
                        "
                      />

                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account

                      <ArrowRight
                        size={18}
                        className="
                          transition

                          group-hover:translate-x-1
                        "
                      />

                    </>
                  )}

                </button>

              </form>


              {/* ==================================
                  DIVIDER
              ================================== */}

              <div className="flex items-center gap-4 my-6">

                <div className="flex-1 h-px bg-white/10" />

                <span
                  className="
                    text-[10px]

                    font-medium

                    text-slate-600

                    uppercase

                    tracking-wider

                    whitespace-nowrap
                  "
                >
                  Library Management System
                </span>

                <div className="flex-1 h-px bg-white/10" />

              </div>


              {/* ==================================
                  LOGIN LINK
              ================================== */}

              <p
                className="
                  text-center

                  text-sm

                  text-slate-500
                "
              >

                Already have an account?{" "}

                <button
                  type="button"
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                  className="
                    font-bold

                    text-blue-400

                    hover:text-cyan-300

                    transition
                  "
                >
                  Sign in
                </button>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;
