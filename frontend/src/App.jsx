
function App() {
  return (
    <div
      className="
        min-h-screen
        relative
        overflow-hidden

        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-indigo-950
      "
    >

      {/* ==========================================
          3D BACKGROUND LIGHTING
      ========================================== */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* Blue Glow */}

        <div
          className="
            absolute
            -top-48
            -left-48
            w-[650px]
            h-[650px]
            rounded-full
            bg-blue-600/10
            blur-[140px]
          "
        />

        {/* Indigo Glow */}

        <div
          className="
            absolute
            top-1/3
            -right-48
            w-[650px]
            h-[650px]
            rounded-full
            bg-indigo-600/10
            blur-[150px]
          "
        />

        {/* Cyan Glow */}

        <div
          className="
            absolute
            -bottom-64
            left-1/3
            w-[600px]
            h-[600px]
            rounded-full
            bg-cyan-500/5
            blur-[140px]
          "
        />

        {/* Subtle Grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.025]

            bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]

            bg-[size:50px_50px]
          "
        />

      </div>


      {/* ==========================================
          CONTENT
      ========================================== */}

      <div
        className="
          relative
          z-10

          min-h-screen

          flex
          flex-col
          items-center
          justify-center

          text-center

          px-6
        "
      >

        {/* 3D Icon */}

        <div
          className="
            w-20
            h-20

            rounded-3xl

            bg-gradient-to-br
            from-blue-500
            via-indigo-600
            to-purple-600

            flex
            items-center
            justify-center

            text-white

            shadow-[0_20px_50px_rgba(59,130,246,0.35)]

            border
            border-white/10

            rotate-[-3deg]

            hover:rotate-0
            hover:scale-105

            transition-all
            duration-300
          "
        >

          📚

        </div>


        <h1
          className="
            mt-7

            text-4xl
            md:text-5xl

            font-black

            text-white

            tracking-tight
          "
        >
          Library Management System
        </h1>


        <p
          className="
            mt-4

            text-lg

            text-slate-400
          "
        >
          Frontend setup successful 🚀
        </p>

      </div>

    </div>
  );
}

export default App;
