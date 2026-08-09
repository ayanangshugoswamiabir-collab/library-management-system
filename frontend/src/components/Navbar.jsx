
import { Bell, UserCircle, BookOpen } from "lucide-react";

function Navbar() {
  return (
    <nav
      className="
        relative
        z-50
        w-full
        px-6
        py-4

        flex
        justify-between
        items-center

        bg-gradient-to-r
        from-[#050816]
        via-[#111936]
        to-[#070b1c]

        border-b
        border-white/[0.08]

        shadow-[0_15px_50px_rgba(0,0,0,0.55)]

        overflow-hidden
      "
    >
      {/* =====================================================
          Ambient 3D Background Lighting
      ===================================================== */}

      <div
        className="
          absolute
          -top-28
          left-[18%]
          w-80
          h-52
          rounded-full
          bg-blue-500/15
          blur-[90px]
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          -top-24
          right-[18%]
          w-80
          h-52
          rounded-full
          bg-purple-600/15
          blur-[90px]
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          bottom-[-120px]
          left-1/2
          -translate-x-1/2
          w-[500px]
          h-48
          rounded-full
          bg-indigo-500/10
          blur-[100px]
          pointer-events-none
        "
      />

      {/* =====================================================
          LEFT — 3D BRAND
      ===================================================== */}

      <div
        className="
          relative
          group

          flex
          items-center
          gap-4

          px-4
          py-2.5

          rounded-2xl

          bg-gradient-to-br
          from-white/[0.10]
          via-white/[0.045]
          to-white/[0.02]

          backdrop-blur-2xl

          border
          border-white/[0.12]

          shadow-[
            inset_0_1px_0_rgba(255,255,255,0.12),
            inset_0_-1px_0_rgba(0,0,0,0.35),
            0_12px_30px_rgba(0,0,0,0.35),
            0_25px_50px_rgba(37,99,235,0.08)
          ]

          transition-all
          duration-500

          hover:-translate-y-1
          hover:border-blue-400/20
          hover:shadow-[
            inset_0_1px_0_rgba(255,255,255,0.16),
            0_18px_40px_rgba(0,0,0,0.45),
            0_25px_60px_rgba(59,130,246,0.12)
          ]
        "
      >
        {/* Top Glass Highlight */}

        <div
          className="
            absolute
            top-0
            left-6
            right-6
            h-px
            bg-gradient-to-r
            from-transparent
            via-white/25
            to-transparent
          "
        />

        {/* =================================================
            3D BOOK ICON
        ================================================= */}

        <div className="relative">
          {/* Glow behind icon */}

          <div
            className="
              absolute
              inset-0
              rounded-2xl
              bg-blue-500/30
              blur-xl
              opacity-60
              group-hover:opacity-100
              transition
              duration-500
            "
          />

          {/* Icon Container */}

          <div
            className="
              relative

              flex
              items-center
              justify-center

              w-12
              h-12

              rounded-2xl

              bg-gradient-to-br
              from-blue-400
              via-indigo-500
              to-purple-700

              border
              border-white/20

              shadow-[
                inset_0_2px_2px_rgba(255,255,255,0.35),
                inset_0_-4px_8px_rgba(0,0,0,0.25),
                0_8px_0_rgba(30,41,99,0.65),
                0_14px_25px_rgba(59,130,246,0.35)
              ]

              rotate-[-4deg]

              transition-all
              duration-500

              group-hover:rotate-0
              group-hover:scale-110
              group-hover:-translate-y-1
            "
          >
            <BookOpen
              size={25}
              strokeWidth={2.2}
              className="
                text-white
                drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]
              "
            />
          </div>
        </div>

        {/* =================================================
            BRAND TEXT
        ================================================= */}

        <div>
          <h1
            className="
              text-base
              md:text-xl

              font-black
              tracking-tight

              text-white

              drop-shadow-[0_3px_8px_rgba(0,0,0,0.35)]
            "
          >
            Library Management System
          </h1>

          <div className="flex items-center gap-2 mt-1">
            <span
              className="
                w-1.5
                h-1.5
                rounded-full
                bg-blue-400
                shadow-[0_0_10px_rgba(96,165,250,0.9)]
              "
            />

            <p
              className="
                text-[9px]
                md:text-[10px]

                uppercase
                tracking-[0.28em]

                font-semibold

                text-blue-300/90
              "
            >
              Smart Library Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          RIGHT SIDE
      ===================================================== */}

      <div
        className="
          relative
          flex
          items-center
          gap-3
          md:gap-4
        "
      >
        {/* =================================================
            NOTIFICATION
        ================================================= */}

        <div
          className="
            group
            relative

            flex
            items-center
            justify-center

            w-12
            h-12

            rounded-2xl

            bg-gradient-to-br
            from-white/[0.09]
            to-white/[0.025]

            backdrop-blur-2xl

            border
            border-white/[0.11]

            cursor-pointer

            shadow-[
              inset_0_1px_0_rgba(255,255,255,0.12),
              inset_0_-2px_5px_rgba(0,0,0,0.25),
              0_8px_20px_rgba(0,0,0,0.35)
            ]

            transition-all
            duration-300

            hover:-translate-y-1
            hover:scale-105
            hover:bg-blue-500/10
            hover:border-blue-400/25
            hover:shadow-[0_15px_35px_rgba(59,130,246,0.18)]
          "
        >
          {/* Inner Glow */}

          <div
            className="
              absolute
              inset-2
              rounded-xl
              bg-blue-500/0
              blur-md

              group-hover:bg-blue-500/15

              transition
              duration-300
            "
          />

          <Bell
            size={21}
            strokeWidth={2}
            className="
              relative
              z-10

              text-slate-300

              transition-all
              duration-300

              group-hover:text-blue-300
              group-hover:scale-110
              group-hover:rotate-[-8deg]

              drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]
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

              min-w-[21px]
              h-[21px]
              px-1

              rounded-full

              bg-gradient-to-br
              from-red-400
              via-rose-500
              to-red-700

              text-white
              text-[10px]
              font-black

              border
              border-white/30

              shadow-[
                inset_0_1px_2px_rgba(255,255,255,0.4),
                0_5px_15px_rgba(244,63,94,0.55)
              ]

              animate-pulse
            "
          >
            3
          </span>
        </div>

        {/* =================================================
            PROFILE
        ================================================= */}

        <div
          className="
            group
            relative

            flex
            items-center
            gap-3

            px-3
            py-2

            rounded-2xl

            bg-gradient-to-br
            from-white/[0.10]
            via-white/[0.045]
            to-white/[0.02]

            backdrop-blur-2xl

            border
            border-white/[0.12]

            cursor-pointer

            shadow-[
              inset_0_1px_0_rgba(255,255,255,0.13),
              inset_0_-2px_6px_rgba(0,0,0,0.25),
              0_10px_25px_rgba(0,0,0,0.35)
            ]

            transition-all
            duration-400

            hover:-translate-y-1
            hover:border-indigo-400/30
            hover:shadow-[0_18px_40px_rgba(99,102,241,0.18)]
          "
        >
          {/* Top Reflection */}

          <div
            className="
              absolute
              top-0
              left-5
              right-5
              h-px
              bg-gradient-to-r
              from-transparent
              via-white/25
              to-transparent
            "
          />

          {/* =================================================
              USER AVATAR
          ================================================= */}

          <div className="relative">
            {/* Avatar Glow */}

            <div
              className="
                absolute
                inset-0
                rounded-xl
                bg-indigo-500/25
                blur-lg

                group-hover:bg-purple-500/30

                transition
                duration-500
              "
            />

            <div
              className="
                relative

                flex
                items-center
                justify-center

                w-10
                h-10

                rounded-xl

                bg-gradient-to-br
                from-indigo-500/40
                via-indigo-600/25
                to-purple-600/30

                border
                border-indigo-300/20

                shadow-[
                  inset_0_1px_2px_rgba(255,255,255,0.18),
                  inset_0_-3px_6px_rgba(0,0,0,0.25),
                  0_7px_15px_rgba(99,102,241,0.25)
                ]

                transition-all
                duration-300

                group-hover:scale-110
                group-hover:rotate-3
              "
            >
              <UserCircle
                size={27}
                strokeWidth={1.8}
                className="
                  text-indigo-200

                  group-hover:text-white

                  transition-colors
                  duration-300

                  drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]
                "
              />
            </div>
          </div>

          {/* =================================================
              USER DETAILS
          ================================================= */}

          <div className="hidden sm:block pr-2">
            <p
              className="
                text-[8px]
                uppercase
                tracking-[0.2em]
                font-semibold
                text-slate-500
              "
            >
              Logged in as
            </p>

            <span
              className="
                block
                text-sm
                font-extrabold

                text-white

                mt-0.5

                drop-shadow-[0_2px_5px_rgba(0,0,0,0.35)]
              "
            >
              Admin
            </span>
          </div>

          {/* Small Status Dot */}

          <span
            className="
              absolute
              bottom-1.5
              left-[39px]

              w-2.5
              h-2.5

              rounded-full

              bg-emerald-400

              border
              border-[#111936]

              shadow-[0_0_10px_rgba(52,211,153,0.8)]
            "
          />
        </div>
      </div>

      {/* =====================================================
          BOTTOM LASER LIGHT
      ===================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-px

          bg-gradient-to-r
          from-transparent
          via-blue-400/60
          to-transparent

          shadow-[0_0_12px_rgba(59,130,246,0.5)]

          pointer-events-none
        "
      />

      {/* Secondary light reflection */}

      <div
        className="
          absolute
          bottom-[-1px]
          left-1/4
          right-1/4
          h-3

          bg-blue-500/10
          blur-md

          pointer-events-none
        "
      />
    </nav>
  );
}

export default Navbar;
