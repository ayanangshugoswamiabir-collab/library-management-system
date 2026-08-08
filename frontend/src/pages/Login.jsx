import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BookOpen,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Library,
  Sparkles,
  Users,
  GraduationCap,
  Database,
  Zap,
  BookMarked,
  BarChart3,
  Clock3,
  CheckCircle2,
  CircleUserRound,
  LibraryBig,
  ChevronRight,
} from "lucide-react";

import api from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", formData);

      console.log("LOGIN RESPONSE:", response.data);
      console.log("USER ROLE:", response.data.user?.role);
      console.log("TOKEN:", response.data.token);

      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/dashboard");
    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] text-white">

      {/* =========================================================
          BACKGROUND ATMOSPHERE
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div
          className="
            absolute
            -left-[300px]
            -top-[250px]
            h-[850px]
            w-[850px]
            rounded-full
            bg-blue-700/20
            blur-[180px]
          "
        />

        <div
          className="
            absolute
            -right-[300px]
            top-[5%]
            h-[850px]
            w-[850px]
            rounded-full
            bg-violet-700/20
            blur-[180px]
          "
        />

        <div
          className="
            absolute
            bottom-[-400px]
            left-[30%]
            h-[800px]
            w-[800px]
            rounded-full
            bg-cyan-500/10
            blur-[180px]
          "
        />

        {/* Grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.045]
            bg-[linear-gradient(rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.55)_1px,transparent_1px)]
            bg-[size:65px_65px]
          "
        />

        {/* Radial vignette */}

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_15%,rgba(2,6,23,0.72)_100%)]
          "
        />

      </div>


      {/* =========================================================
          FLOATING 3D SHAPES
      ========================================================= */}

      {/* Large transparent cube */}

      <div
        className="
          pointer-events-none
          absolute
          left-[47%]
          top-[7%]
          hidden
          h-32
          w-32
          rotate-[18deg]
          rounded-[34px]
          border
          border-blue-300/10
          bg-blue-400/[0.025]
          shadow-[0_40px_100px_rgba(37,99,235,0.12)]
          backdrop-blur-sm
          lg:block
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-[49%]
          top-[10%]
          hidden
          h-24
          w-24
          rotate-[18deg]
          rounded-[28px]
          border
          border-white/[0.07]
          bg-white/[0.025]
          lg:block
        "
      />

      {/* Floating circle */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-[13%]
          left-[49%]
          hidden
          h-20
          w-20
          rounded-full
          border
          border-cyan-300/10
          bg-cyan-400/[0.025]
          shadow-[0_0_60px_rgba(34,211,238,0.1)]
          lg:block
        "
      />

      {/* Small diamond */}

      <div
        className="
          pointer-events-none
          absolute
          right-[7%]
          top-[25%]
          hidden
          h-8
          w-8
          rotate-45
          rounded-lg
          border
          border-purple-300/20
          bg-purple-400/5
          lg:block
        "
      />

      {/* =========================================================
          MAIN
      ========================================================= */}

      <div className="relative z-10 flex min-h-screen">

        {/* =======================================================
            LEFT 3D HERO
        ======================================================= */}

        <section
          className="
            relative
            hidden
            overflow-hidden
            border-r
            border-white/[0.08]
            lg:flex
            lg:w-[57%]
          "
        >

          {/* Deep background */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-br
              from-[#071536]
              via-[#090f2b]
              to-[#030712]
            "
          />

          {/* Lighting */}

          <div
            className="
              absolute
              left-[8%]
              top-[25%]
              h-[500px]
              w-[500px]
              rounded-full
              bg-blue-500/10
              blur-[130px]
            "
          />

          <div
            className="
              absolute
              bottom-[5%]
              right-[0%]
              h-[450px]
              w-[450px]
              rounded-full
              bg-indigo-500/10
              blur-[130px]
            "
          />


          {/* =====================================================
              GIANT 3D RING
          ===================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              -right-[250px]
              top-[18%]
              h-[650px]
              w-[650px]
              rounded-full
              border
              border-blue-400/[0.07]
              shadow-[0_0_120px_rgba(59,130,246,0.05)]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -right-[160px]
              top-[27%]
              h-[470px]
              w-[470px]
              rounded-full
              border
              border-indigo-400/[0.06]
            "
          />


          {/* =====================================================
              LEFT CONTENT
          ===================================================== */}

          <div
            className="
              relative
              z-10
              flex
              w-full
              flex-col
              justify-between
              p-12
              xl:p-16
            "
          >

            {/* ===================================================
                BRAND
            =================================================== */}

            <div className="flex items-center gap-4">

              <div
                className="
                  relative
                  flex
                  h-16
                  w-16
                  rotate-[-5deg]
                  items-center
                  justify-center
                  rounded-[22px]
                  border
                  border-white/20
                  bg-gradient-to-br
                  from-blue-400
                  via-indigo-500
                  to-violet-600
                  shadow-[0_25px_60px_rgba(37,99,235,0.4)]
                  transition-all
                  duration-500
                  hover:rotate-0
                  hover:scale-110
                "
              >

                <LibraryBig size={30} />

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
                    border-[#080e28]
                    bg-cyan-400
                    shadow-[0_0_20px_rgba(34,211,238,0.9)]
                  "
                >

                  <CheckCircle2 size={10} />

                </div>

              </div>


              <div>

                <h1 className="text-xl font-black tracking-wide">
                  Library Management System
                </h1>

                <p className="mt-1 text-xs text-blue-200/40">
                  Next-generation library platform
                </p>

              </div>

            </div>


            {/* ===================================================
                HERO
            =================================================== */}

            <div className="max-w-2xl">

              {/* Badge */}

              <div
                className="
                  mb-7
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-blue-300/10
                  bg-blue-400/[0.06]
                  px-4
                  py-2
                  shadow-[0_15px_40px_rgba(37,99,235,0.1)]
                  backdrop-blur-xl
                "
              >

                <span
                  className="
                    flex
                    h-5
                    w-5
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-400/15
                  "
                >

                  <Sparkles
                    size={12}
                    className="text-cyan-300"
                  />

                </span>

                <span className="text-xs font-semibold tracking-wide text-blue-100/80">
                  Intelligent Library Ecosystem
                </span>

              </div>


              {/* Main heading */}

              <h2
                className="
                  text-5xl
                  font-black
                  leading-[0.98]
                  tracking-[-0.055em]
                  xl:text-[76px]
                "
              >

                Manage.

                <span
                  className="
                    block
                    bg-gradient-to-r
                    from-blue-300
                    via-cyan-300
                    to-indigo-300
                    bg-clip-text
                    py-2
                    text-transparent
                  "
                >
                  Discover.
                </span>

                <span className="block text-white/80">
                  Simplify.
                </span>

              </h2>


              <p
                className="
                  mt-7
                  max-w-xl
                  text-base
                  leading-relaxed
                  text-blue-100/50
                  xl:text-lg
                "
              >
                A modern library ecosystem designed to manage
                books, students, borrowing, returns and library
                operations from one intelligent workspace.
              </p>


              {/* =================================================
                  3D FEATURE STACK
              ================================================= */}

              <div className="relative mt-10 max-w-xl">

                {/* Back card */}

                <div
                  className="
                    absolute
                    left-5
                    right-5
                    top-5
                    h-full
                    rounded-3xl
                    border
                    border-blue-400/[0.05]
                    bg-blue-500/[0.02]
                  "
                />

                {/* Main feature panel */}

                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/[0.09]
                    bg-white/[0.045]
                    p-5
                    shadow-[0_30px_70px_rgba(0,0,0,0.25)]
                    backdrop-blur-2xl
                  "
                >

                  {/* top shine */}

                  <div
                    className="
                      absolute
                      left-10
                      right-10
                      top-0
                      h-px
                      bg-gradient-to-r
                      from-transparent
                      via-blue-300/30
                      to-transparent
                    "
                  />


                  <div className="grid grid-cols-3 gap-3">

                    {/* Books */}

                    <div
                      className="
                        group
                        rounded-2xl
                        border
                        border-white/[0.06]
                        bg-black/20
                        p-4
                        transition
                        hover:-translate-y-1
                        hover:bg-white/[0.05]
                      "
                    >

                      <div
                        className="
                          mb-3
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-xl
                          bg-blue-500/10
                          text-blue-300
                        "
                      >

                        <BookMarked size={19} />

                      </div>

                      <p className="text-sm font-bold">
                        Books
                      </p>

                      <p className="mt-1 text-[10px] text-white/30">
                        Collection
                      </p>

                    </div>


                    {/* Users */}

                    <div
                      className="
                        group
                        rounded-2xl
                        border
                        border-white/[0.06]
                        bg-black/20
                        p-4
                        transition
                        hover:-translate-y-1
                        hover:bg-white/[0.05]
                      "
                    >

                      <div
                        className="
                          mb-3
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-xl
                          bg-purple-500/10
                          text-purple-300
                        "
                      >

                        <CircleUserRound size={19} />

                      </div>

                      <p className="text-sm font-bold">
                        Members
                      </p>

                      <p className="mt-1 text-[10px] text-white/30">
                        Users
                      </p>

                    </div>


                    {/* Analytics */}

                    <div
                      className="
                        group
                        rounded-2xl
                        border
                        border-white/[0.06]
                        bg-black/20
                        p-4
                        transition
                        hover:-translate-y-1
                        hover:bg-white/[0.05]
                      "
                    >

                      <div
                        className="
                          mb-3
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-xl
                          bg-cyan-500/10
                          text-cyan-300
                        "
                      >

                        <BarChart3 size={19} />

                      </div>

                      <p className="text-sm font-bold">
                        Analytics
                      </p>

                      <p className="mt-1 text-[10px] text-white/30">
                        Insights
                      </p>

                    </div>

                  </div>


                  {/* Bottom stats */}

                  <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">

                    <div className="flex items-center gap-2">

                      <div
                        className="
                          h-2
                          w-2
                          rounded-full
                          bg-emerald-400
                          shadow-[0_0_12px_rgba(52,211,153,0.8)]
                        "
                      />

                      <span className="text-[10px] text-white/35">
                        System operational
                      </span>

                    </div>


                    <div className="flex items-center gap-2 text-[10px] text-white/30">

                      <Clock3 size={12} />

                      Real-time management

                    </div>

                  </div>

                </div>

              </div>


              {/* =================================================
                  FEATURE STRIP
              ================================================= */}

              <div className="mt-7 flex items-center gap-6">

                <div className="flex items-center gap-2.5">

                  <ShieldCheck
                    size={16}
                    className="text-emerald-300"
                  />

                  <span className="text-xs text-white/40">
                    Secure
                  </span>

                </div>

                <div className="h-5 w-px bg-white/10" />

                <div className="flex items-center gap-2.5">

                  <Zap
                    size={16}
                    className="text-yellow-300"
                  />

                  <span className="text-xs text-white/40">
                    Fast
                  </span>

                </div>

                <div className="h-5 w-px bg-white/10" />

                <div className="flex items-center gap-2.5">

                  <Users
                    size={16}
                    className="text-blue-300"
                  />

                  <span className="text-xs text-white/40">
                    Multi-user
                  </span>

                </div>

                <div className="h-5 w-px bg-white/10" />

                <div className="flex items-center gap-2.5">

                  <Database
                    size={16}
                    className="text-purple-300"
                  />

                  <span className="text-xs text-white/40">
                    Centralized
                  </span>

                </div>

              </div>

            </div>


            {/* Footer */}

            <div className="flex items-center justify-between">

              <p className="text-xs text-white/20">
                © 2026 Library Management System
              </p>

              <p className="flex items-center gap-2 text-[10px] text-white/20">
                <ShieldCheck size={12} />
                Enterprise-grade access
              </p>

            </div>

          </div>

        </section>


        {/* =======================================================
            RIGHT LOGIN
        ======================================================= */}

        <section
          className="
            relative
            flex
            min-h-screen
            w-full
            items-center
            justify-center
            overflow-hidden
            bg-gradient-to-br
            from-[#020617]
            via-[#080d20]
            to-[#100b25]
            px-5
            py-12
            lg:w-[43%]
          "
        >

          {/* Right atmosphere */}

          <div
            className="
              pointer-events-none
              absolute
              right-[-180px]
              top-[-180px]
              h-[500px]
              w-[500px]
              rounded-full
              bg-blue-500/10
              blur-[140px]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              bottom-[-200px]
              left-[-180px]
              h-[500px]
              w-[500px]
              rounded-full
              bg-violet-500/10
              blur-[140px]
            "
          />


          {/* =====================================================
              MOBILE BRAND
          ===================================================== */}

          <div
            className="
              absolute
              left-5
              top-5
              flex
              items-center
              gap-3
              lg:hidden
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-gradient-to-br
                from-blue-500
                to-indigo-600
                shadow-[0_15px_35px_rgba(59,130,246,0.3)]
              "
            >

              <Library size={21} />

            </div>

            <div>

              <p className="text-sm font-black">
                LMS
              </p>

              <p className="text-[10px] text-white/35">
                Library Management
              </p>

            </div>

          </div>


          {/* =====================================================
              LOGIN WRAPPER
          ===================================================== */}

          <div className="relative z-10 w-full max-w-[470px]">

            {/* Huge bottom shadow */}

            <div
              className="
                pointer-events-none
                absolute
                inset-x-8
                -bottom-10
                h-[90%]
                rounded-[40px]
                bg-blue-600/15
                blur-3xl
              "
            />

            {/* Back 3D card */}

            <div
              className="
                pointer-events-none
                absolute
                inset-x-4
                -bottom-5
                h-[98%]
                rounded-[38px]
                border
                border-indigo-400/[0.08]
                bg-gradient-to-br
                from-blue-500/[0.08]
                via-indigo-500/[0.04]
                to-purple-500/[0.08]
                shadow-[0_30px_90px_rgba(0,0,0,0.35)]
              "
            />


            {/* =================================================
                LOGIN CARD
            ================================================= */}

            <div
              className="
                relative
                overflow-hidden
                rounded-[38px]
                border
                border-white/[0.13]
                bg-white/[0.065]
                p-7
                shadow-[0_40px_120px_rgba(0,0,0,0.55)]
                backdrop-blur-3xl
                sm:p-9
              "
            >

              {/* Gradient top border */}

              <div
                className="
                  absolute
                  left-0
                  right-0
                  top-0
                  h-[3px]
                  bg-gradient-to-r
                  from-blue-500
                  via-cyan-400
                  to-purple-500
                "
              />

              {/* Glass reflection */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -top-24
                  left-1/2
                  h-48
                  w-[80%]
                  -translate-x-1/2
                  rounded-full
                  bg-blue-400/5
                  blur-3xl
                "
              />

              {/* Corner glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-24
                  -top-24
                  h-64
                  w-64
                  rounded-full
                  bg-blue-500/10
                  blur-3xl
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-24
                  -left-24
                  h-64
                  w-64
                  rounded-full
                  bg-purple-500/10
                  blur-3xl
                "
              />


              {/* =================================================
                  LOGIN HEADER
              ================================================= */}

              <div className="relative mb-8">

                <div className="mb-5 flex items-center justify-between">

                  {/* Logo */}

                  <div
                    className="
                      relative
                      flex
                      h-16
                      w-16
                      rotate-[-5deg]
                      items-center
                      justify-center
                      rounded-[22px]
                      border
                      border-white/20
                      bg-gradient-to-br
                      from-blue-500
                      via-indigo-500
                      to-purple-600
                      shadow-[0_20px_50px_rgba(59,130,246,0.4)]
                      transition-all
                      duration-300
                      hover:rotate-0
                      hover:scale-105
                    "
                  >

                    <BookOpen size={28} />

                    <div
                      className="
                        absolute
                        -right-1
                        -top-1
                        h-3.5
                        w-3.5
                        rounded-full
                        border-2
                        border-[#10152a]
                        bg-cyan-400
                        shadow-[0_0_18px_rgba(34,211,238,0.9)]
                      "
                    />

                  </div>


                  {/* Secure badge */}

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-emerald-400/10
                      bg-emerald-400/[0.05]
                      px-3
                      py-1.5
                      text-[10px]
                      font-semibold
                      text-emerald-300/70
                    "
                  >

                    <span
                      className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-emerald-400
                        shadow-[0_0_10px_rgba(52,211,153,0.9)]
                      "
                    />

                    Secure

                  </div>

                </div>


                <div className="mb-2 flex items-center gap-2">

                  <Sparkles
                    size={13}
                    className="text-cyan-300"
                  />

                  <span
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.22em]
                      text-blue-300/60
                    "
                  >
                    Welcome back
                  </span>

                </div>


                <h2
                  className="
                    text-3xl
                    font-black
                    tracking-[-0.04em]
                    text-white
                    sm:text-[38px]
                  "
                >
                  Sign in to your
                  <span
                    className="
                      ml-2
                      bg-gradient-to-r
                      from-blue-300
                      to-cyan-300
                      bg-clip-text
                      text-transparent
                    "
                  >
                    library.
                  </span>
                </h2>


                <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
                  Continue managing your books, members and
                  borrowing activity.
                </p>

              </div>


              {/* =================================================
                  ERROR
              ================================================= */}

              {error && (
                <div
                  className="
                    relative
                    mb-6
                    overflow-hidden
                    rounded-2xl
                    border
                    border-red-400/20
                    bg-red-500/[0.08]
                    p-4
                    shadow-[0_15px_35px_rgba(239,68,68,0.08)]
                  "
                >

                  <div
                    className="
                      absolute
                      bottom-0
                      left-0
                      top-0
                      w-1
                      bg-gradient-to-b
                      from-red-400
                      to-red-600
                    "
                  />

                  <div className="flex items-start gap-3">

                    <div
                      className="
                        flex
                        h-6
                        w-6
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-red-500/20
                        text-xs
                        font-black
                        text-red-300
                      "
                    >
                      !
                    </div>

                    <p className="text-sm leading-relaxed text-red-300">
                      {error}
                    </p>

                  </div>

                </div>
              )}


              {/* =================================================
                  FORM
              ================================================= */}

              <form
                onSubmit={handleSubmit}
                className="relative space-y-5"
              >

                {/* EMAIL */}

                <div>

                  <label
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-slate-200
                    "
                  >

                    <Mail
                      size={14}
                      className="text-blue-400"
                    />

                    Email address

                  </label>


                  <div className="group relative">

                    <Mail
                      size={18}
                      className="
                        absolute
                        left-4
                        top-1/2
                        z-10
                        -translate-y-1/2
                        text-slate-500
                        transition
                        group-focus-within:text-blue-400
                      "
                    />


                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      className="
                        w-full
                        rounded-2xl
                        border
                        border-white/10
                        bg-[#020617]/60
                        py-4
                        pl-11
                        pr-4
                        text-sm
                        text-white
                        outline-none
                        placeholder:text-slate-600
                        shadow-[inset_0_3px_12px_rgba(0,0,0,0.25)]
                        transition-all
                        duration-300
                        focus:border-blue-400/40
                        focus:bg-[#020617]/80
                        focus:ring-4
                        focus:ring-blue-500/10
                        focus:shadow-[0_10px_35px_rgba(37,99,235,0.08),inset_0_3px_12px_rgba(0,0,0,0.25)]
                      "
                      required
                    />

                  </div>

                </div>


                {/* PASSWORD */}

                <div>

                  <label
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-slate-200
                    "
                  >

                    <Lock
                      size={14}
                      className="text-purple-400"
                    />

                    Password

                  </label>


                  <div className="group relative">

                    <Lock
                      size={18}
                      className="
                        absolute
                        left-4
                        top-1/2
                        z-10
                        -translate-y-1/2
                        text-slate-500
                        transition
                        group-focus-within:text-purple-400
                      "
                    />


                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      className="
                        w-full
                        rounded-2xl
                        border
                        border-white/10
                        bg-[#020617]/60
                        py-4
                        pl-11
                        pr-12
                        text-sm
                        text-white
                        outline-none
                        placeholder:text-slate-600
                        shadow-[inset_0_3px_12px_rgba(0,0,0,0.25)]
                        transition-all
                        duration-300
                        focus:border-purple-400/40
                        focus:bg-[#020617]/80
                        focus:ring-4
                        focus:ring-purple-500/10
                        focus:shadow-[0_10px_35px_rgba(168,85,247,0.08),inset_0_3px_12px_rgba(0,0,0,0.25)]
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
                        right-2
                        top-1/2
                        -translate-y-1/2
                        rounded-xl
                        p-2.5
                        text-slate-500
                        transition-all
                        hover:bg-white/5
                        hover:text-white
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

                </div>


                {/* FORGOT */}

                <div className="flex justify-end">

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/forgot-password")
                    }
                    className="
                      group
                      flex
                      items-center
                      gap-1
                      text-xs
                      font-semibold
                      text-blue-400
                      transition
                      hover:text-cyan-300
                    "
                  >

                    Forgot password?

                    <ChevronRight
                      size={13}
                      className="transition group-hover:translate-x-0.5"
                    />

                  </button>

                </div>


                {/* =================================================
                    SUBMIT
                ================================================= */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    group
                    relative
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    overflow-hidden
                    rounded-2xl
                    border
                    border-blue-300/20
                    bg-gradient-to-r
                    from-blue-600
                    via-indigo-600
                    to-purple-600
                    py-4
                    font-bold
                    text-white
                    shadow-[0_18px_45px_rgba(59,130,246,0.3)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:from-blue-500
                    hover:via-indigo-500
                    hover:to-purple-500
                    hover:shadow-[0_25px_60px_rgba(99,102,241,0.42)]
                    active:translate-y-0
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >

                  {/* Shine */}

                  <span
                    className="
                      absolute
                      inset-y-0
                      -left-24
                      w-20
                      skew-x-[-20deg]
                      bg-white/25
                      transition-all
                      duration-700
                      group-hover:left-[120%]
                    "
                  />

                  {/* Glow */}

                  <span
                    className="
                      absolute
                      bottom-0
                      left-1/4
                      right-1/4
                      h-px
                      bg-white/60
                    "
                  />


                  {loading ? (
                    <>
                      <span
                        className="
                          h-5
                          w-5
                          animate-spin
                          rounded-full
                          border-2
                          border-white/30
                          border-t-white
                        "
                      />

                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in to Dashboard

                      <ArrowRight
                        size={18}
                        className="
                          transition-all
                          duration-300
                          group-hover:translate-x-1
                        "
                      />
                    </>
                  )}

                </button>

              </form>


              {/* =================================================
                  DIVIDER
              ================================================= */}

              <div className="my-7 flex items-center gap-4">

                <div className="h-px flex-1 bg-white/[0.08]" />

                <span
                  className="
                    whitespace-nowrap
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-white/20
                  "
                >
                  LMS Platform
                </span>

                <div className="h-px flex-1 bg-white/[0.08]" />

              </div>


              {/* =================================================
                  REGISTER
              ================================================= */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/[0.06]
                  bg-white/[0.025]
                  p-4
                  text-center
                "
              >

                <p className="text-sm text-slate-500">

                  Don't have an account?{" "}

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/register")
                    }
                    className="
                      font-bold
                      text-blue-400
                      transition
                      hover:text-cyan-300
                    "
                  >
                    Create account
                  </button>

                </p>

              </div>


              {/* =================================================
                  TRUST STRIP
              ================================================= */}

              <div className="mt-5 grid grid-cols-3 gap-2">

                <div
                  className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-1
                    rounded-xl
                    border
                    border-white/[0.05]
                    bg-white/[0.02]
                    py-3
                  "
                >

                  <ShieldCheck
                    size={14}
                    className="text-emerald-400/70"
                  />

                  <span className="text-[9px] text-white/25">
                    JWT Secure
                  </span>

                </div>


                <div
                  className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-1
                    rounded-xl
                    border
                    border-white/[0.05]
                    bg-white/[0.02]
                    py-3
                  "
                >

                  <GraduationCap
                    size={14}
                    className="text-blue-400/70"
                  />

                  <span className="text-[9px] text-white/25">
                    Role Based
                  </span>

                </div>


                <div
                  className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-1
                    rounded-xl
                    border
                    border-white/[0.05]
                    bg-white/[0.02]
                    py-3
                  "
                >

                  <Database
                    size={14}
                    className="text-purple-400/70"
                  />

                  <span className="text-[9px] text-white/25">
                    Protected
                  </span>

                </div>

              </div>

            </div>


            {/* Security footer */}

            <div
              className="
                mt-6
                flex
                items-center
                justify-center
                gap-2
                text-[10px]
                text-white/20
              "
            >

              <ShieldCheck size={13} />

              Secure authentication powered by JWT

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}

export default Login;