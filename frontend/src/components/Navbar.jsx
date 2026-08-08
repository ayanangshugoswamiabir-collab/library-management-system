
import { Bell, UserCircle, BookOpen } from "lucide-react";

function Navbar() {
  return (
    <nav
      className="
        relative
        z-50
        w-full
        px-7
        py-4

        flex
        justify-between
        items-center

        bg-gradient-to-r
        from-slate-950/95
        via-indigo-950/95
        to-slate-950/95

        backdrop-blur-2xl

        border-b
        border-white/10

        shadow-[0_10px_35px_rgba(0,0,0,0.35)]

        overflow-hidden
      "
    >

      {/* ======================================
          Background Glow
      ====================================== */}

      <div
        className="
          absolute
          -top-24
          left-1/4
          w-72
          h-40
          rounded-full
          bg-blue-500/10
          blur-3xl
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          -top-20
          right-1/4
          w-64
          h-40
          rounded-full
          bg-purple-500/10
          blur-3xl
          pointer-events-none
        "
      />

      {/* ======================================
          Left Side - Logo
      ====================================== */}

      <div
        className="
          relative
          flex
          items-center
          gap-4

          px-4
          py-2.5

          rounded-2xl

          bg-white/[0.055]
          backdrop-blur-xl

          border
          border-white/10

          shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_25px_rgba(0,0,0,0.3)]
        "
      >

        {/* 3D Book Icon */}

        <div
          className="
            flex
            items-center
            justify-center

            w-11
            h-11

            rounded-xl

            bg-gradient-to-br
            from-blue-500
            via-indigo-500
            to-purple-600

            border
            border-white/20

            shadow-[0_8px_20px_rgba(59,130,246,0.4)]

            transform
            rotate-[-3deg]

            transition-transform
            duration-300

            hover:rotate-0
            hover:scale-105
          "
        >
          <BookOpen
            className="text-white"
            size={24}
          />
        </div>

        {/* Title */}

        <div>
          <h1
            className="
              text-lg
              md:text-xl
              font-extrabold
              tracking-wide
              text-white
            "
          >
            Library Management System
          </h1>

          <p
            className="
              text-[9px]
              md:text-[10px]
              uppercase
              tracking-[0.25em]
              text-blue-300
              mt-0.5
            "
          >
            Smart Library Dashboard
          </p>
        </div>

      </div>


      {/* ======================================
          Right Side
      ====================================== */}

      <div
        className="
          relative
          flex
          items-center
          gap-4
        "
      >

        {/* ====================================
            Notification
        ==================================== */}

        <div
          className="
            group
            relative

            flex
            items-center
            justify-center

            w-12
            h-12

            rounded-xl

            bg-white/[0.055]
            backdrop-blur-xl

            border
            border-white/10

            cursor-pointer

            shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_8px_20px_rgba(0,0,0,0.25)]

            transition-all
            duration-300

            hover:bg-blue-500/15
            hover:border-blue-400/20
            hover:-translate-y-1
            hover:shadow-[0_10px_25px_rgba(59,130,246,0.25)]
          "
        >

          <Bell
            size={22}
            className="
              text-slate-300

              transition-all
              duration-300

              group-hover:text-blue-300
              group-hover:scale-110
            "
          />

          {/* Notification Badge */}

          <span
            className="
              absolute
              -top-1.5
              -right-1.5

              flex
              items-center
              justify-center

              min-w-[20px]
              h-5
              px-1

              rounded-full

              bg-gradient-to-br
              from-red-400
              to-rose-600

              text-white
              text-[10px]
              font-bold

              border
              border-white/20

              shadow-[0_4px_12px_rgba(244,63,94,0.5)]
            "
          >
            3
          </span>

        </div>


        {/* ====================================
            Profile
        ==================================== */}

        <div
          className="
            group

            flex
            items-center
            gap-3

            px-3
            py-2

            rounded-2xl

            bg-gradient-to-br
            from-white/[0.08]
            to-white/[0.03]

            backdrop-blur-xl

            border
            border-white/10

            cursor-pointer

            shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_25px_rgba(0,0,0,0.3)]

            transition-all
            duration-300

            hover:-translate-y-1
            hover:border-indigo-400/20
            hover:shadow-[0_12px_30px_rgba(99,102,241,0.2)]
          "
        >

          {/* User Icon */}

          <div
            className="
              flex
              items-center
              justify-center

              w-10
              h-10

              rounded-xl

              bg-gradient-to-br
              from-indigo-500/30
              to-purple-500/20

              border
              border-indigo-400/20

              shadow-[0_5px_15px_rgba(99,102,241,0.2)]

              group-hover:scale-105

              transition
            "
          >
            <UserCircle
              size={28}
              className="
                text-indigo-300
                group-hover:text-indigo-200
              "
            />
          </div>


          {/* User Details */}

          <div className="hidden sm:block">

            <p
              className="
                text-[9px]
                uppercase
                tracking-[0.18em]
                text-slate-500
              "
            >
              Logged in as
            </p>

            <span
              className="
                block
                text-sm
                font-bold
                text-white
                mt-0.5
              "
            >
              Admin
            </span>

          </div>

        </div>

      </div>


      {/* ======================================
          Bottom Highlight Line
      ====================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-px

          bg-gradient-to-r
          from-transparent
          via-blue-500/40
          to-transparent

          pointer-events-none
        "
      />

    </nav>
  );
}

export default Navbar;
