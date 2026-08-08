
import {
  LayoutDashboard,
  BookOpen,
  Repeat,
  Users,
  Settings,
  PlusCircle,
  LogOut,
  BookMarked,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  // ==========================================
  // Get Logged-in User
  // ==========================================

  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Failed to read user information:", error);
  }

  const role = user?.role;

  const isStudent = role === "Student";

  const isStaff =
    role === "Admin" ||
    role === "Librarian";

  // ==========================================
  // Logout
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  return (
    <aside
      className="
        relative
        z-30
        flex
        min-h-screen
        w-64
        shrink-0
        flex-col
        overflow-hidden
        bg-gradient-to-b
        from-[#020617]
        via-[#0f172a]
        to-[#111827]
        text-white
        border-r
        border-white/10
        shadow-[12px_0_45px_rgba(2,6,23,0.55)]
      "
    >

      {/* ==========================================
          3D Ambient Lighting
      ========================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -top-32
          -left-32
          h-80
          w-80
          rounded-full
          bg-blue-600/30
          blur-[90px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          top-[35%]
          -right-32
          h-72
          w-72
          rounded-full
          bg-indigo-600/20
          blur-[100px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          left-10
          h-80
          w-80
          rounded-full
          bg-cyan-500/10
          blur-[100px]
        "
      />

      {/* ==========================================
          3D Decorative Objects
      ========================================== */}

      <div
        className="
          pointer-events-none
          absolute
          right-[-35px]
          top-28
          h-28
          w-28
          rotate-12
          rounded-[2rem]
          bg-gradient-to-br
          from-blue-400/15
          to-indigo-500/5
          border
          border-blue-300/10
          shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_25px_50px_rgba(0,0,0,0.35)]
          backdrop-blur-md
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-32
          left-[-45px]
          h-24
          w-24
          -rotate-12
          rounded-[1.8rem]
          bg-white/[0.03]
          border
          border-white/10
          shadow-[0_20px_50px_rgba(0,0,0,0.35)]
        "
      />

      {/* ==========================================
          Main Content
      ========================================== */}

      <div className="relative z-10 flex min-h-screen flex-col p-5">

        {/* ==========================================
            Role Card
        ========================================== */}

        {role && (
          <div className="mb-7">

            <div
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-gradient-to-br
                from-white/[0.12]
                via-white/[0.06]
                to-white/[0.02]
                p-4
                shadow-[0_15px_35px_rgba(0,0,0,0.35)]
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_20px_45px_rgba(0,0,0,0.45)]
              "
            >

              <div
                className="
                  pointer-events-none
                  absolute
                  left-0
                  right-0
                  top-0
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-blue-300/60
                  to-transparent
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-8
                  -top-8
                  h-20
                  w-20
                  rounded-full
                  bg-blue-500/20
                  blur-2xl
                "
              />

              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-200/60">
                Logged in as
              </p>

              <p className="mt-1 text-sm font-bold text-white">
                {role}
              </p>

            </div>

          </div>
        )}

        {/* ==========================================
            Navigation
        ========================================== */}

        <ul className="space-y-3">

          {/* ======================================
              Dashboard
          ====================================== */}

          <li>
            <Link
              to="/dashboard"
              className="
                group
                relative
                flex
                items-center
                gap-3
                overflow-hidden
                rounded-2xl
                p-3.5
                text-slate-300
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-white/[0.09]
                hover:text-white
                hover:shadow-[0_12px_28px_rgba(0,0,0,0.30)]
              "
            >

              <span
                className="
                  absolute
                  left-0
                  top-2
                  bottom-2
                  w-1
                  rounded-r-full
                  bg-blue-500
                  opacity-0
                  transition
                  group-hover:opacity-100
                "
              />

              <LayoutDashboard
                size={20}
                className="
                  transition-all
                  duration-300
                  group-hover:scale-110
                  group-hover:text-blue-400
                "
              />

              <span className="font-medium">
                Dashboard
              </span>

            </Link>
          </li>


          {/* ======================================
              Books
          ====================================== */}

          <li>
            <Link
              to="/books"
              className="
                group
                relative
                flex
                items-center
                gap-3
                overflow-hidden
                rounded-2xl
                p-3.5
                text-slate-300
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-white/[0.09]
                hover:text-white
                hover:shadow-[0_12px_28px_rgba(0,0,0,0.30)]
              "
            >

              <span
                className="
                  absolute
                  left-0
                  top-2
                  bottom-2
                  w-1
                  rounded-r-full
                  bg-cyan-400
                  opacity-0
                  transition
                  group-hover:opacity-100
                "
              />

              <BookOpen
                size={20}
                className="
                  transition-all
                  duration-300
                  group-hover:scale-110
                  group-hover:text-cyan-400
                "
              />

              <span className="font-medium">
                Books
              </span>

            </Link>
          </li>


          {/* ======================================
              STUDENT — MY BORROWED BOOKS
          ====================================== */}

          {isStudent && (
            <li>
              <Link
                to="/my-borrowed-books"
                className="
                  group
                  relative
                  flex
                  items-center
                  gap-3
                  overflow-hidden
                  rounded-2xl
                  p-3.5
                  text-slate-300
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/[0.09]
                  hover:text-white
                  hover:shadow-[0_12px_28px_rgba(0,0,0,0.30)]
                "
              >

                <span
                  className="
                    absolute
                    left-0
                    top-2
                    bottom-2
                    w-1
                    rounded-r-full
                    bg-emerald-400
                    opacity-0
                    transition
                    group-hover:opacity-100
                  "
                />

                <BookMarked
                  size={20}
                  className="
                    transition-all
                    duration-300
                    group-hover:scale-110
                    group-hover:text-emerald-400
                  "
                />

                <span className="font-medium">
                  My Borrowed Books
                </span>

              </Link>
            </li>
          )}


          {/* ======================================
              BORROWING — STAFF ONLY
          ====================================== */}

          {isStaff && (
            <li>
              <Link
                to="/borrow"
                className="
                  group
                  relative
                  flex
                  items-center
                  gap-3
                  overflow-hidden
                  rounded-2xl
                  p-3.5
                  text-slate-300
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/[0.09]
                  hover:text-white
                  hover:shadow-[0_12px_28px_rgba(0,0,0,0.30)]
                "
              >

                <span
                  className="
                    absolute
                    left-0
                    top-2
                    bottom-2
                    w-1
                    rounded-r-full
                    bg-purple-400
                    opacity-0
                    transition
                    group-hover:opacity-100
                  "
                />

                <Repeat
                  size={20}
                  className="
                    transition-all
                    duration-300
                    group-hover:scale-110
                    group-hover:text-purple-400
                  "
                />

                <span className="font-medium">
                  Borrowing
                </span>

              </Link>
            </li>
          )}


          {/* ======================================
              STAFF
          ====================================== */}

          {isStaff && (
            <>

              {/* Add Book */}

              <li>
                <Link
                  to="/add-book"
                  className="
                    group
                    relative
                    flex
                    items-center
                    gap-3
                    overflow-hidden
                    rounded-2xl
                    p-3.5
                    text-slate-300
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-white/[0.09]
                    hover:text-white
                    hover:shadow-[0_12px_28px_rgba(0,0,0,0.30)]
                  "
                >

                  <PlusCircle
                    size={20}
                    className="
                      transition-all
                      duration-300
                      group-hover:scale-110
                      group-hover:text-emerald-400
                    "
                  />

                  <span className="font-medium">
                    Add Book
                  </span>

                </Link>
              </li>


              {/* Users */}

              <li>
                <Link
                  to="/users"
                  className="
                    group
                    relative
                    flex
                    items-center
                    gap-3
                    overflow-hidden
                    rounded-2xl
                    p-3.5
                    text-slate-300
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-white/[0.09]
                    hover:text-white
                    hover:shadow-[0_12px_28px_rgba(0,0,0,0.30)]
                  "
                >

                  <Users
                    size={20}
                    className="
                      transition-all
                      duration-300
                      group-hover:scale-110
                      group-hover:text-orange-400
                    "
                  />

                  <span className="font-medium">
                    Users
                  </span>

                </Link>
              </li>


              {/* Settings */}

              <li>
                <Link
                  to="/settings"
                  className="
                    group
                    relative
                    flex
                    items-center
                    gap-3
                    overflow-hidden
                    rounded-2xl
                    p-3.5
                    text-slate-300
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-white/[0.09]
                    hover:text-white
                    hover:shadow-[0_12px_28px_rgba(0,0,0,0.30)]
                  "
                >

                  <Settings
                    size={20}
                    className="
                      transition-all
                      duration-300
                      group-hover:rotate-45
                      group-hover:text-pink-400
                    "
                  />

                  <span className="font-medium">
                    Settings
                  </span>

                </Link>
              </li>

            </>
          )}

        </ul>


        {/* ==========================================
            Bottom
        ========================================== */}

        <div className="mt-auto pt-8">

          {/* Student Portal */}

          {isStudent && (
            <div
              className="
                mb-4
                rounded-2xl
                border
                border-white/10
                bg-gradient-to-br
                from-white/[0.09]
                to-white/[0.02]
                p-4
                shadow-[0_15px_35px_rgba(0,0,0,0.30)]
                backdrop-blur-xl
              "
            >

              <p className="text-xs font-bold text-blue-200">
                Student Portal
              </p>

              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Browse books, manage your borrowing activity
                and track your library history.
              </p>

            </div>
          )}


          {/* Library Management */}

          {isStaff && (
            <div
              className="
                mb-4
                rounded-2xl
                border
                border-white/10
                bg-gradient-to-br
                from-white/[0.09]
                to-white/[0.02]
                p-4
                shadow-[0_15px_35px_rgba(0,0,0,0.30)]
                backdrop-blur-xl
              "
            >

              <p className="text-xs font-bold text-blue-200">
                Library Management
              </p>

              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Manage books, users and library operations
                from your dashboard.
              </p>

            </div>
          )}


          {/* Logout */}

          <button
            type="button"
            onClick={handleLogout}
            className="
              group
              flex
              w-full
              items-center
              gap-3
              rounded-2xl
              p-3.5
              text-red-400
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-red-500/10
              hover:text-red-300
              hover:shadow-[0_12px_28px_rgba(127,29,29,0.25)]
            "
          >

            <LogOut
              size={20}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />

            <span className="font-medium">
              Logout
            </span>

          </button>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;
