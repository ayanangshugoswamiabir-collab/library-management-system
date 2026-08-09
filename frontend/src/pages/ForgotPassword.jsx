
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  LibraryBig,
  LockKeyhole,
  Cpu,
  Fingerprint,
} from "lucide-react";

import api from "../api/axios";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await api.post(
        "/auth/forgot-password",
        { email }
      );

      setMessage(
        response.data?.message ||
          "Password reset email sent successfully."
      );
    } catch (err) {
      console.error("FORGOT PASSWORD ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Unable to send password reset email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">

      {/* =====================================================
          3D BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Main blue orb */}
        <div
          className="
            absolute
            -left-[220px]
            -top-[220px]
            h-[700px]
            w-[700px]
            rounded-full
            bg-blue-600/20
            blur-[130px]
          "
        />

        {/* Purple orb */}
        <div
          className="
            absolute
            -right-[250px]
            top-[10%]
            h-[700px]
            w-[700px]
            rounded-full
            bg-violet-600/20
            blur-[140px]
          "
        />

        {/* Cyan orb */}
        <div
          className="
            absolute
            bottom-[-300px]
            left-[30%]
            h-[650px]
            w-[650px]
            rounded-full
            bg-cyan-500/10
            blur-[140px]
          "
        />

        {/* Technical grid */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.045]
            bg-[linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)]
            bg-[size:55px_55px]
          "
        />

        {/* Radial center lighting */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08),transparent_55%)]
          "
        />

      </div>


      {/* =====================================================
          FLOATING TECH ELEMENTS
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 hidden lg:block">

        <div
          className="
            absolute
            left-[10%]
            top-[25%]
            flex
            h-12
            w-12
            rotate-12
            items-center
            justify-center
            rounded-2xl
            border
            border-blue-400/20
            bg-blue-500/5
            text-blue-400/40
            shadow-[0_20px_50px_rgba(37,99,235,0.15)]
            backdrop-blur-xl
          "
        >
          <Cpu size={20} />
        </div>

        <div
          className="
            absolute
            right-[12%]
            bottom-[25%]
            flex
            h-14
            w-14
            -rotate-12
            items-center
            justify-center
            rounded-2xl
            border
            border-purple-400/20
            bg-purple-500/5
            text-purple-400/40
            shadow-[0_20px_50px_rgba(139,92,246,0.15)]
            backdrop-blur-xl
          "
        >
          <Fingerprint size={23} />
        </div>

      </div>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">

        <div className="relative w-full max-w-[500px]">

          {/* Outer 3D glow */}
          <div
            className="
              absolute
              -inset-1
              rounded-[38px]
              bg-gradient-to-r
              from-blue-500/20
              via-cyan-400/10
              to-purple-600/20
              blur-xl
            "
          />

          {/* 3D shadow layer */}
          <div
            className="
              absolute
              left-5
              right-5
              top-5
              h-full
              rounded-[38px]
              bg-blue-950/50
              blur-2xl
            "
          />

          {/* =================================================
              MAIN GLASS CARD
          ================================================= */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[36px]
              border
              border-white/[0.12]
              bg-slate-950/70
              p-7
              shadow-[0_40px_100px_rgba(0,0,0,0.65)]
              backdrop-blur-2xl
              sm:p-9
            "
          >

            {/* Top neon line */}
            <div
              className="
                absolute
                left-0
                right-0
                top-0
                h-[2px]
                bg-gradient-to-r
                from-transparent
                via-cyan-400
                to-transparent
              "
            />

            {/* Corner glow */}
            <div
              className="
                absolute
                -right-20
                -top-20
                h-40
                w-40
                rounded-full
                bg-blue-500/10
                blur-3xl
              "
            />


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="relative mb-8 flex items-start justify-between">

              {/* 3D Logo */}
              <div
                className="
                  relative
                  flex
                  h-[68px]
                  w-[68px]
                  rotate-[-5deg]
                  items-center
                  justify-center
                  rounded-[22px]
                  border
                  border-blue-300/20
                  bg-gradient-to-br
                  from-blue-500
                  via-indigo-600
                  to-purple-700
                  shadow-[0_20px_45px_rgba(37,99,235,0.4),inset_0_1px_1px_rgba(255,255,255,0.25)]
                  transition-all
                  duration-500
                  hover:rotate-0
                  hover:scale-110
                  hover:shadow-[0_25px_60px_rgba(37,99,235,0.55)]
                "
              >

                <LibraryBig size={30} />

                {/* Floating light */}
                <div
                  className="
                    absolute
                    -right-1
                    -top-1
                    h-3
                    w-3
                    rounded-full
                    border
                    border-slate-950
                    bg-cyan-300
                    shadow-[0_0_18px_rgba(34,211,238,1)]
                  "
                />

              </div>


              {/* Security badge */}
              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-emerald-400/20
                  bg-emerald-400/[0.06]
                  px-3
                  py-1.5
                  shadow-[inset_0_1px_10px_rgba(52,211,153,0.05)]
                "
              >

                <span
                  className="
                    h-1.5
                    w-1.5
                    animate-pulse
                    rounded-full
                    bg-emerald-400
                    shadow-[0_0_12px_rgba(52,211,153,1)]
                  "
                />

                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300/80">
                  Secure
                </span>

              </div>

            </div>


            {/* =================================================
                TITLE
            ================================================= */}

            <div className="relative mb-8">

              <div className="mb-3 flex items-center gap-2">

                <Sparkles
                  size={14}
                  className="text-cyan-300"
                />

                <span
                  className="
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.25em]
                    text-cyan-300/60
                  "
                >
                  Identity Recovery Protocol
                </span>

              </div>


              <h1
                className="
                  text-3xl
                  font-black
                  tracking-[-0.045em]
                  text-white
                  sm:text-[40px]
                "
              >
                Recover your{" "}
                <span
                  className="
                    bg-gradient-to-r
                    from-blue-300
                    via-cyan-300
                    to-purple-400
                    bg-clip-text
                    text-transparent
                  "
                >
                  password
                </span>
              </h1>


              <p className="mt-4 max-w-[410px] text-sm leading-7 text-slate-400">
                Enter your registered email address. Our secure
                authentication system will generate a password
                recovery link for your account.
              </p>

            </div>


            {/* =================================================
                STATUS MESSAGE
            ================================================= */}

            {message && (
              <div
                className="
                  relative
                  mb-6
                  overflow-hidden
                  rounded-2xl
                  border
                  border-emerald-400/20
                  bg-emerald-500/[0.07]
                  p-4
                  shadow-[inset_0_1px_20px_rgba(52,211,153,0.04)]
                "
              >

                <div className="absolute left-0 top-0 h-full w-[2px] bg-emerald-400" />

                <div className="flex items-start gap-3">

                  <div
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-emerald-400/20
                      bg-emerald-400/10
                    "
                  >
                    <CheckCircle2
                      size={16}
                      className="text-emerald-300"
                    />
                  </div>

                  <p className="text-sm leading-relaxed text-emerald-300">
                    {message}
                  </p>

                </div>

              </div>
            )}


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
                  bg-red-500/[0.07]
                  p-4
                "
              >

                <div className="absolute left-0 top-0 h-full w-[2px] bg-red-400" />

                <p className="text-sm leading-relaxed text-red-300">
                  {error}
                </p>

              </div>
            )}


            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              <div>

                <label
                  className="
                    mb-2.5
                    flex
                    items-center
                    gap-2
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-slate-300
                  "
                >

                  <Mail
                    size={14}
                    className="text-blue-400"
                  />

                  Email Address

                </label>


                <div className="group relative">

                  {/* Input glow */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      -inset-[1px]
                      rounded-2xl
                      bg-gradient-to-r
                      from-blue-500/0
                      via-cyan-400/0
                      to-purple-500/0
                      opacity-0
                      blur-sm
                      transition
                      duration-300
                      group-focus-within:from-blue-500/30
                      group-focus-within:via-cyan-400/20
                      group-focus-within:to-purple-500/30
                      group-focus-within:opacity-100
                    "
                  />

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
                      duration-300
                      group-focus-within:text-cyan-400
                    "
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    autoComplete="email"
                    required
                    className="
                      relative
                      w-full
                      rounded-2xl
                      border
                      border-white/10
                      bg-black/40
                      py-4
                      pl-11
                      pr-4
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-slate-600
                      shadow-[inset_0_4px_15px_rgba(0,0,0,0.3)]
                      transition-all
                      duration-300
                      focus:border-cyan-400/40
                      focus:bg-black/55
                      focus:ring-4
                      focus:ring-cyan-500/10
                    "
                  />

                </div>

              </div>


              {/* =================================================
                  SUBMIT BUTTON
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
                  shadow-[0_18px_45px_rgba(37,99,235,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_25px_55px_rgba(37,99,235,0.45)]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >

                {/* Moving shine */}
                <span
                  className="
                    absolute
                    inset-y-0
                    -left-20
                    w-20
                    skew-x-[-20deg]
                    bg-white/20
                    blur-md
                    transition-all
                    duration-700
                    group-hover:left-[120%]
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

                    Sending reset link...
                  </>
                ) : (
                  <>
                    Send Reset Link

                    <ArrowRight
                      size={18}
                      className="transition-all duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}

              </button>

            </form>


            {/* =================================================
                BACK TO LOGIN
            ================================================= */}

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="
                mt-7
                flex
                w-full
                items-center
                justify-center
                gap-2
                text-sm
                font-semibold
                text-slate-500
                transition
                duration-300
                hover:text-white
              "
            >

              <ArrowLeft
                size={16}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />

              Back to Login

            </button>


            {/* =================================================
                FOOTER
            ================================================= */}

            <div
              className="
                mt-7
                flex
                items-center
                justify-center
                gap-2
                border-t
                border-white/[0.06]
                pt-6
                text-[10px]
                uppercase
                tracking-[0.12em]
                text-white/20
              "
            >

              <LockKeyhole size={13} />

              <span>
                JWT Protected Authentication
              </span>

              <ShieldCheck size={13} />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;
