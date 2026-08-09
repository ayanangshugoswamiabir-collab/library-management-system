
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Lock, Eye, EyeOff, CheckCircle2, ArrowRight } from "lucide-react";
import api from "../api/axios";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.put(
        `/auth/reset-password/${token}`,
        { password }
      );

      setMessage(
        response.data.message || "Password reset successful."
      );

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("RESET PASSWORD ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Unable to reset password. The link may be invalid or expired."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-5">

      <div className="w-full max-w-md">

        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.06] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl">

          {/* Top glow */}
          <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />

          {/* Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 text-white shadow-[0_20px_50px_rgba(59,130,246,0.35)]">
            <Lock size={28} />
          </div>

          <div className="mt-6 text-center">

            <h1 className="text-3xl font-black text-white">
              Reset Password
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Create a new secure password for your library account.
            </p>

          </div>

          {/* Success */}
          {message && (
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">

              <CheckCircle2
                size={20}
                className="mt-0.5 shrink-0 text-emerald-400"
              />

              <p className="text-sm text-emerald-300">
                {message}
              </p>

            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-500/10 p-4">

              <p className="text-sm text-red-300">
                {error}
              </p>

            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-5"
          >

            {/* Password */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-200">
                New Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-[#020617]/60 py-4 pl-11 pr-12 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-400/40 focus:ring-4 focus:ring-blue-500/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl p-2.5 text-slate-500 hover:bg-white/5 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            {/* Confirm Password */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-200">
                Confirm Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-[#020617]/60 py-4 pl-11 pr-12 text-sm text-white outline-none placeholder:text-slate-600 focus:border-purple-400/40 focus:ring-4 focus:ring-purple-500/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl p-2.5 text-slate-500 hover:bg-white/5 hover:text-white"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-4 font-bold text-white shadow-[0_18px_45px_rgba(59,130,246,0.3)] transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Resetting...
                </>
              ) : (
                <>
                  Reset Password
                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />
                </>
              )}

            </button>

          </form>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-6 w-full text-center text-sm font-semibold text-blue-400 hover:text-cyan-300"
          >
            Back to Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default ResetPassword;
