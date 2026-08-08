import { useEffect, useState } from "react";

import {
  Users,
  BookOpen,
  ClipboardList,
  CheckCircle,
  Clock,
  AlertTriangle,
  IndianRupee,
  RotateCcw,
  Sparkles,
  Library,
  ShieldCheck,
  BookMarked,
} from "lucide-react";

import RecentActivity from "../components/Dashboard/RecentActivity";
import PopularBooks from "../components/Dashboard/PopularBooks";

import MonthlyBorrowChart from "../components/Dashboard/charts/MonthlyBorrowChart";
import CategoryDistributionChart from "../components/Dashboard/charts/CategoryDistributionChart";

import {
  getAdminDashboard,
  getLibrarianDashboard,
  getStudentDashboard,
} from "../api/dashboardApi";


// ======================================================
// MAIN DASHBOARD
// ======================================================

function Dashboard() {

  const [dashboardData, setDashboardData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [userRole, setUserRole] = useState("");


  // ======================================================
  // FETCH DASHBOARD
  // ======================================================

  useEffect(() => {

    let isMounted = true;


    const fetchDashboard = async () => {

      try {

        setLoading(true);

        setError("");


        const storedUser = localStorage.getItem("user");


        if (!storedUser) {

          throw new Error(
            "User information not found. Please login again."
          );

        }


        const user = JSON.parse(storedUser);

        const role = user?.role;


        if (!role) {

          throw new Error(
            "User role not found. Please login again."
          );

        }


        if (isMounted) {

          setUserRole(role);

        }


        let data;


        if (role === "Admin") {

          data = await getAdminDashboard();

        }

        else if (role === "Librarian") {

          data = await getLibrarianDashboard();

        }

        else if (role === "Student") {

          data = await getStudentDashboard();

        }

        else {

          throw new Error(
            `Unsupported user role: ${role}`
          );

        }


        if (isMounted) {

          setDashboardData(data);

        }

      }

      catch (err) {

        console.error(
          "Dashboard error:",
          err
        );


        if (isMounted) {

          setError(
            err.response?.data?.message ||
            err.message ||
            "Failed to load dashboard data."
          );

        }

      }

      finally {

        if (isMounted) {

          setLoading(false);

        }

      }

    };


    fetchDashboard();


    return () => {

      isMounted = false;

    };

  }, []);


  // ======================================================
  // LOADING SCREEN
  // ======================================================

  if (loading) {

    return (

      <div className="
        min-h-[80vh]
        flex
        items-center
        justify-center
        relative
        overflow-hidden
        bg-slate-950
        rounded-3xl
      ">

        {/* Glow */}

        <div className="
          absolute
          w-96
          h-96
          bg-blue-600/20
          rounded-full
          blur-3xl
          -top-40
          -left-40
        " />

        <div className="
          absolute
          w-96
          h-96
          bg-purple-600/20
          rounded-full
          blur-3xl
          -bottom-40
          -right-40
        " />


        <div className="
          relative
          z-10
          text-center
          text-white
        ">

          <div className="
            relative
            w-20
            h-20
            mx-auto
          ">

            <div className="
              absolute
              inset-0
              rounded-2xl
              bg-blue-600/20
              blur-xl
            " />

            <div className="
              relative
              w-20
              h-20
              rounded-2xl
              bg-gradient-to-br
              from-blue-500
              to-indigo-700
              flex
              items-center
              justify-center
              shadow-2xl
              shadow-blue-500/30
              animate-pulse
            ">

              <Library size={34} />

            </div>

          </div>


          <h2 className="
            mt-6
            text-xl
            font-bold
          ">

            Preparing your dashboard

          </h2>


          <p className="
            mt-2
            text-sm
            text-slate-400
          ">

            Fetching your library information...

          </p>

        </div>

      </div>

    );

  }


  // ======================================================
  // ERROR
  // ======================================================

  if (error) {

    return (

      <div className="
        min-h-[80vh]
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-indigo-950
        rounded-3xl
        p-6
        relative
        overflow-hidden
      ">

        <div className="
          absolute
          w-96
          h-96
          bg-red-600/10
          rounded-full
          blur-3xl
          top-0
          right-0
        " />


        <div className="
          relative
          z-10
          max-w-md
          w-full
          rounded-3xl
          border
          border-white/10
          bg-white/10
          backdrop-blur-2xl
          p-8
          text-center
          shadow-2xl
        ">

          <div className="
            w-16
            h-16
            mx-auto
            rounded-2xl
            bg-red-500/15
            border
            border-red-400/20
            flex
            items-center
            justify-center
            text-red-400
          ">

            <AlertTriangle size={30} />

          </div>


          <h2 className="
            mt-6
            text-2xl
            font-bold
            text-white
          ">

            Dashboard unavailable

          </h2>


          <p className="
            mt-3
            text-sm
            text-slate-400
            leading-relaxed
          ">

            {error}

          </p>


          <button
            onClick={() => window.location.reload()}
            className="
              mt-7
              px-6
              py-3
              rounded-xl
              bg-gradient-to-r
              from-blue-500
              to-indigo-600
              text-white
              font-semibold
              shadow-xl
              shadow-blue-500/20
              hover:-translate-y-1
              hover:shadow-blue-500/40
              transition-all
            "
          >

            Try Again

          </button>

        </div>

      </div>

    );

  }


  // ======================================================
  // ROLE DASHBOARDS
  // ======================================================

  if (userRole === "Admin") {

    return (
      <AdminDashboard
        dashboardData={dashboardData}
      />
    );

  }


  if (userRole === "Librarian") {

    return (
      <LibrarianDashboard
        dashboardData={dashboardData}
      />
    );

  }


  if (userRole === "Student") {

    return (
      <StudentDashboard
        dashboardData={dashboardData}
      />
    );

  }


  return (

    <div className="
      p-10
      text-center
      bg-slate-950
      rounded-3xl
      text-white
    ">

      <h2 className="text-2xl font-bold">

        Invalid User Role

      </h2>

      <p className="mt-2 text-slate-400">

        Please logout and login again.

      </p>

    </div>

  );

}


// ======================================================
// DASHBOARD BACKGROUND
// ======================================================

function DashboardBackground({ children }) {

  return (

    <div className="
      relative
      overflow-hidden
      rounded-3xl
      bg-gradient-to-br
      from-slate-950
      via-slate-900
      to-indigo-950
      p-5
      sm:p-7
      text-white
      shadow-2xl
      shadow-slate-900/30
    ">

      {/* Large glowing orb */}

      <div className="
        pointer-events-none
        absolute
        -top-40
        -right-40
        w-[500px]
        h-[500px]
        rounded-full
        bg-blue-600/10
        blur-3xl
      " />


      {/* Purple orb */}

      <div className="
        pointer-events-none
        absolute
        -bottom-52
        -left-40
        w-[500px]
        h-[500px]
        rounded-full
        bg-purple-600/10
        blur-3xl
      " />


      {/* Grid effect */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.04]
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />


      <div className="relative z-10">

        {children}

      </div>

    </div>

  );

}


// ======================================================
// 3D STAT CARD
// ======================================================

function PremiumStatCard({
  title,
  value,
  icon: Icon,
  description,
}) {

  return (

    <div className="
      group
      relative
      rounded-2xl
      border
      border-white/10
      bg-white/[0.07]
      backdrop-blur-xl
      p-5
      shadow-xl
      shadow-black/10
      transition-all
      duration-500
      hover:-translate-y-2
      hover:scale-[1.02]
      hover:bg-white/[0.11]
      hover:shadow-2xl
      hover:shadow-blue-500/10
      overflow-hidden
    ">

      {/* Glow */}

      <div className="
        absolute
        -right-8
        -top-8
        w-24
        h-24
        rounded-full
        bg-blue-500/10
        blur-2xl
        group-hover:bg-blue-400/20
        transition
      " />


      <div className="
        relative
        flex
        items-start
        justify-between
      ">

        <div>

          <p className="
            text-sm
            text-slate-400
            font-medium
          ">

            {title}

          </p>


          <h3 className="
            mt-2
            text-3xl
            font-black
            tracking-tight
            text-white
          ">

            {value}

          </h3>


          <p className="
            mt-1
            text-xs
            text-slate-500
          ">

            {description}

          </p>

        </div>


        <div className="
          relative
          w-12
          h-12
          rounded-xl
          bg-gradient-to-br
          from-blue-500
          to-indigo-700
          flex
          items-center
          justify-center
          shadow-lg
          shadow-blue-500/20
          transition-all
          duration-500
          group-hover:rotate-6
          group-hover:scale-110
        ">

          <Icon size={22} />

        </div>

      </div>

    </div>

  );

}


// ======================================================
// ADMIN DASHBOARD
// ======================================================

function AdminDashboard({ dashboardData }) {

  const stats = [

    {
      title: "Total Users",
      value: dashboardData?.totalUsers || 0,
      icon: Users,
      description: "Registered members",
    },

    {
      title: "Total Books",
      value: dashboardData?.totalBooks || 0,
      icon: BookOpen,
      description: "Books in library",
    },

    {
      title: "Issued Books",
      value: dashboardData?.issuedBooks || 0,
      icon: ClipboardList,
      description: "Currently borrowed",
    },

    {
      title: "Returned Books",
      value: dashboardData?.returnedBooks || 0,
      icon: CheckCircle,
      description: "Successfully returned",
    },

  ];


  return (

    <DashboardBackground>

      {/* Header */}

      <div className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-6
      ">

        <div>

          <div className="
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
          ">

            <Sparkles size={14} />

            Executive Overview

          </div>


          <h1 className="
            mt-4
            text-3xl
            sm:text-4xl
            font-black
            tracking-tight
          ">

            Admin Dashboard

          </h1>


          <p className="
            mt-2
            text-slate-400
            max-w-xl
          ">

            Your complete library command center. Monitor users,
            books, borrowing activity and performance.

          </p>

        </div>


        <div className="
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-2xl
          bg-white/[0.07]
          border
          border-white/10
          backdrop-blur-xl
        ">

          <div className="
            w-10
            h-10
            rounded-xl
            bg-gradient-to-br
            from-blue-500
            to-indigo-700
            flex
            items-center
            justify-center
          ">

            <ShieldCheck size={20} />

          </div>


          <div>

            <p className="text-xs text-slate-500">
              Access Level
            </p>

            <p className="font-bold text-white">
              Administrator
            </p>

          </div>

        </div>

      </div>


      {/* Stats */}

      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-5
        mt-8
      ">

        {stats.map((item) => (

          <PremiumStatCard
            key={item.title}
            {...item}
          />

        ))}

      </div>


      {/* Existing Components */}

      <div className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-5
        mt-6
      ">

        <div className="
          rounded-2xl
          overflow-hidden
          bg-white
          shadow-2xl
          transition-all
          duration-500
          hover:-translate-y-1
        ">

          <RecentActivity />

        </div>


        <div className="
          rounded-2xl
          overflow-hidden
          bg-white
          shadow-2xl
          transition-all
          duration-500
          hover:-translate-y-1
        ">

          <PopularBooks />

        </div>

      </div>


      {/* Charts */}

      <div className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-5
        mt-6
      ">

        <div className="
          rounded-2xl
          overflow-hidden
          bg-white
          shadow-2xl
          transition-all
          duration-500
          hover:-translate-y-1
        ">

          <MonthlyBorrowChart />

        </div>


        <div className="
          rounded-2xl
          overflow-hidden
          bg-white
          shadow-2xl
          transition-all
          duration-500
          hover:-translate-y-1
        ">

          <CategoryDistributionChart />

        </div>

      </div>

    </DashboardBackground>

  );

}


// ======================================================
// LIBRARIAN DASHBOARD
// ======================================================

function LibrarianDashboard({ dashboardData }) {

  const stats = [

    {
      title: "Today's Issues",
      value: dashboardData?.todayIssues || 0,
      icon: ClipboardList,
      description: "Books issued today",
    },

    {
      title: "Today's Returns",
      value: dashboardData?.todayReturns || 0,
      icon: RotateCcw,
      description: "Books returned today",
    },

    {
      title: "Overdue Books",
      value: dashboardData?.overdueBooks || 0,
      icon: AlertTriangle,
      description: "Currently overdue",
    },

  ];


  return (

    <DashboardBackground>

      {/* Header */}

      <div>

        <div className="
          inline-flex
          items-center
          gap-2
          px-3
          py-1.5
          rounded-full
          bg-indigo-500/10
          border
          border-indigo-400/20
          text-indigo-300
          text-xs
          font-semibold
        ">

          <BookMarked size={14} />

          Library Operations

        </div>


        <div className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          gap-3
          mt-4
        ">

          <h1 className="
            text-3xl
            sm:text-4xl
            font-black
          ">

            Librarian Dashboard

          </h1>


          <span className="
            w-fit
            px-3
            py-1
            rounded-full
            bg-indigo-500/15
            border
            border-indigo-400/20
            text-indigo-300
            text-xs
            font-semibold
          ">

            Librarian

          </span>

        </div>


        <p className="
          mt-2
          text-slate-400
        ">

          Manage today's circulation and monitor books requiring attention.

        </p>

      </div>


      {/* Stats */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-5
        mt-8
      ">

        {stats.map((item) => (

          <PremiumStatCard
            key={item.title}
            {...item}
          />

        ))}

      </div>


      {/* Information Cards */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-5
        mt-6
      ">


        {/* Activity */}

        <div className="
          group
          rounded-2xl
          border
          border-white/10
          bg-white/[0.07]
          backdrop-blur-xl
          p-6
          shadow-xl
          transition-all
          duration-500
          hover:-translate-y-2
          hover:bg-white/[0.1]
        ">

          <div className="flex items-center gap-4">

            <div className="
              w-12
              h-12
              rounded-xl
              bg-gradient-to-br
              from-blue-500
              to-indigo-700
              flex
              items-center
              justify-center
              shadow-lg
              shadow-blue-500/20
            ">

              <ClipboardList size={22} />

            </div>


            <div>

              <h2 className="font-bold text-white">

                Today's Activity

              </h2>

              <p className="text-sm text-slate-500">

                Library circulation summary

              </p>

            </div>

          </div>


          <div className="mt-7 space-y-4">

            <div className="
              flex
              justify-between
              items-center
              p-4
              rounded-xl
              bg-white/[0.04]
              border
              border-white/5
            ">

              <span className="text-slate-400">
                Books issued
              </span>

              <span className="
                text-xl
                font-black
                text-white
              ">

                {dashboardData?.todayIssues || 0}

              </span>

            </div>


            <div className="
              flex
              justify-between
              items-center
              p-4
              rounded-xl
              bg-white/[0.04]
              border
              border-white/5
            ">

              <span className="text-slate-400">
                Books returned
              </span>

              <span className="
                text-xl
                font-black
                text-white
              ">

                {dashboardData?.todayReturns || 0}

              </span>

            </div>

          </div>

        </div>


        {/* Overdue */}

        <div className="
          group
          rounded-2xl
          border
          border-red-400/10
          bg-gradient-to-br
          from-red-500/10
          to-orange-500/5
          backdrop-blur-xl
          p-6
          shadow-xl
          transition-all
          duration-500
          hover:-translate-y-2
        ">

          <div className="flex items-center gap-4">

            <div className="
              w-12
              h-12
              rounded-xl
              bg-gradient-to-br
              from-red-500
              to-orange-600
              flex
              items-center
              justify-center
              shadow-lg
              shadow-red-500/20
            ">

              <AlertTriangle size={22} />

            </div>


            <div>

              <h2 className="font-bold text-white">

                Overdue Books

              </h2>

              <p className="text-sm text-slate-500">

                Books requiring attention

              </p>

            </div>

          </div>


          <div className="mt-7">

            <div className="
              text-5xl
              font-black
              text-white
            ">

              {dashboardData?.overdueBooks || 0}

            </div>


            <p className="
              mt-2
              text-sm
              text-red-300
            ">

              Currently overdue books

            </p>

          </div>

        </div>

      </div>

    </DashboardBackground>

  );

}


// ======================================================
// STUDENT DASHBOARD
// ======================================================

function StudentDashboard({ dashboardData }) {

  const borrowedBooks =
    dashboardData?.currentlyBorrowedBooks || [];

  const borrowHistory =
    dashboardData?.borrowHistory || [];

  const totalFine =
    dashboardData?.totalFine || 0;


  return (

    <DashboardBackground>

      {/* Student Header */}

      <div>

        <div className="
          inline-flex
          items-center
          gap-2
          px-3
          py-1.5
          rounded-full
          bg-emerald-500/10
          border
          border-emerald-400/20
          text-emerald-300
          text-xs
          font-semibold
        ">

          <Sparkles size={14} />

          Personal Library

        </div>


        <div className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          gap-3
          mt-4
        ">

          <h1 className="
            text-3xl
            sm:text-4xl
            font-black
          ">

            My Dashboard

          </h1>


          <span className="
            w-fit
            px-3
            py-1
            rounded-full
            bg-emerald-500/15
            border
            border-emerald-400/20
            text-emerald-300
            text-xs
            font-semibold
          ">

            Student

          </span>

        </div>


        <p className="
          mt-2
          text-slate-400
        ">

          Track your books, borrowing history and library fines.

        </p>

      </div>


      {/* Student Stats */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-5
        mt-8
      ">

        <PremiumStatCard
          title="Currently Borrowed"
          value={borrowedBooks.length}
          icon={BookOpen}
          description="Books with you"
        />


        <PremiumStatCard
          title="Borrow History"
          value={borrowHistory.length}
          icon={ClipboardList}
          description="Total transactions"
        />


        <PremiumStatCard
          title="Total Fine"
          value={`₹${totalFine}`}
          icon={IndianRupee}
          description="Outstanding fine"
        />

      </div>


      {/* Currently Borrowed */}

      <div className="
        mt-6
        rounded-2xl
        border
        border-white/10
        bg-white/[0.07]
        backdrop-blur-xl
        shadow-2xl
        overflow-hidden
      ">

        <div className="
          p-6
          border-b
          border-white/10
        ">

          <div className="flex items-center gap-4">

            <div className="
              w-11
              h-11
              rounded-xl
              bg-gradient-to-br
              from-blue-500
              to-indigo-700
              flex
              items-center
              justify-center
              shadow-lg
            ">

              <BookOpen size={21} />

            </div>


            <div>

              <h2 className="
                text-lg
                font-bold
                text-white
              ">

                Currently Borrowed Books

              </h2>


              <p className="
                text-sm
                text-slate-500
              ">

                Books you currently have

              </p>

            </div>

          </div>

        </div>


        {borrowedBooks.length === 0 ? (

          <div className="
            p-12
            text-center
          ">

            <BookOpen
              size={42}
              className="mx-auto text-slate-600"
            />


            <p className="
              mt-4
              text-slate-400
            ">

              You currently have no borrowed books.

            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-white/[0.03]">

                  <th className="
                    text-left
                    px-6
                    py-4
                    text-xs
                    font-semibold
                    text-slate-500
                    uppercase
                  ">

                    Book

                  </th>


                  <th className="
                    text-left
                    px-6
                    py-4
                    text-xs
                    font-semibold
                    text-slate-500
                    uppercase
                  ">

                    Author

                  </th>


                  <th className="
                    text-left
                    px-6
                    py-4
                    text-xs
                    font-semibold
                    text-slate-500
                    uppercase
                  ">

                    Borrowed

                  </th>


                  <th className="
                    text-left
                    px-6
                    py-4
                    text-xs
                    font-semibold
                    text-slate-500
                    uppercase
                  ">

                    Due Date

                  </th>

                </tr>

              </thead>


              <tbody>

                {borrowedBooks.map((book, index) => (

                  <tr
                    key={index}
                    className="
                      border-t
                      border-white/5
                      hover:bg-white/[0.03]
                      transition
                    "
                  >

                    <td className="
                      px-6
                      py-4
                      font-semibold
                      text-white
                    ">

                      {book.title || "Unknown Book"}

                    </td>


                    <td className="
                      px-6
                      py-4
                      text-slate-400
                    ">

                      {book.author || "Unknown Author"}

                    </td>


                    <td className="
                      px-6
                      py-4
                      text-slate-400
                    ">

                      {formatDate(book.borrowDate)}

                    </td>


                    <td className="px-6 py-4">

                      <span className="
                        inline-flex
                        items-center
                        gap-2
                        px-3
                        py-1.5
                        rounded-full
                        bg-orange-500/10
                        border
                        border-orange-400/10
                        text-orange-300
                        text-xs
                        font-semibold
                      ">

                        <Clock size={13} />

                        {formatDate(book.dueDate)}

                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* Borrow History */}

      <div className="
        mt-6
        rounded-2xl
        border
        border-white/10
        bg-white/[0.07]
        backdrop-blur-xl
        shadow-2xl
        overflow-hidden
      ">

        <div className="
          p-6
          border-b
          border-white/10
        ">

          <h2 className="
            text-lg
            font-bold
            text-white
          ">

            Borrow History

          </h2>


          <p className="
            text-sm
            text-slate-500
            mt-1
          ">

            Your previous library transactions

          </p>

        </div>


        {borrowHistory.length === 0 ? (

          <div className="
            p-12
            text-center
          ">

            <ClipboardList
              size={42}
              className="mx-auto text-slate-600"
            />


            <p className="
              mt-4
              text-slate-400
            ">

              No borrowing history found.

            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-white/[0.03]">

                  <th className="
                    text-left
                    px-6
                    py-4
                    text-xs
                    font-semibold
                    text-slate-500
                    uppercase
                  ">

                    Book

                  </th>


                  <th className="
                    text-left
                    px-6
                    py-4
                    text-xs
                    font-semibold
                    text-slate-500
                    uppercase
                  ">

                    Borrow Date

                  </th>


                  <th className="
                    text-left
                    px-6
                    py-4
                    text-xs
                    font-semibold
                    text-slate-500
                    uppercase
                  ">

                    Return Date

                  </th>


                  <th className="
                    text-left
                    px-6
                    py-4
                    text-xs
                    font-semibold
                    text-slate-500
                    uppercase
                  ">

                    Status

                  </th>


                  <th className="
                    text-left
                    px-6
                    py-4
                    text-xs
                    font-semibold
                    text-slate-500
                    uppercase
                  ">

                    Fine

                  </th>

                </tr>

              </thead>


              <tbody>

                {borrowHistory.map((item, index) => (

                  <tr
                    key={index}
                    className="
                      border-t
                      border-white/5
                      hover:bg-white/[0.03]
                      transition
                    "
                  >

                    <td className="
                      px-6
                      py-4
                      font-semibold
                      text-white
                    ">

                      {item.book || "Unknown Book"}

                    </td>


                    <td className="
                      px-6
                      py-4
                      text-slate-400
                    ">

                      {formatDate(item.borrowDate)}

                    </td>


                    <td className="
                      px-6
                      py-4
                      text-slate-400
                    ">

                      {formatDate(item.returnDate)}

                    </td>


                    <td className="px-6 py-4">

                      <span
                        className={`
                          inline-flex
                          px-3
                          py-1.5
                          rounded-full
                          text-xs
                          font-semibold
                          ${
                            item.status === "Returned"
                              ? "bg-emerald-500/10 text-emerald-300 border border-emerald-400/10"
                              : "bg-blue-500/10 text-blue-300 border border-blue-400/10"
                          }
                        `}
                      >

                        {item.status || "Unknown"}

                      </span>

                    </td>


                    <td className="
                      px-6
                      py-4
                      font-bold
                      text-white
                    ">

                      ₹{item.fine || 0}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* Fine Information */}

      <div className="
        relative
        mt-6
        overflow-hidden
        rounded-2xl
        border
        border-blue-400/20
        bg-gradient-to-br
        from-blue-600
        via-indigo-600
        to-purple-700
        p-7
        shadow-2xl
        shadow-blue-900/30
      ">

        {/* Decorative orb */}

        <div className="
          absolute
          -right-20
          -top-20
          w-64
          h-64
          rounded-full
          bg-white/10
          blur-2xl
        " />


        <div className="
          relative
          z-10
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-6
        ">

          <div>

            <div className="
              flex
              items-center
              gap-2
              text-blue-100
              text-sm
            ">

              <IndianRupee size={16} />

              Total Outstanding Fine

            </div>


            <h2 className="
              text-4xl
              font-black
              mt-2
            ">

              ₹{totalFine}

            </h2>


            <p className="
              mt-3
              text-sm
              text-blue-100
              max-w-md
            ">

              Please return overdue books on time to avoid
              additional fines.

            </p>

          </div>


          <div className="
            w-20
            h-20
            rounded-3xl
            bg-white/10
            border
            border-white/20
            backdrop-blur-xl
            flex
            items-center
            justify-center
            shadow-2xl
            rotate-3
          ">

            <IndianRupee size={36} />

          </div>

        </div>

      </div>

    </DashboardBackground>

  );

}


// ======================================================
// DATE FORMATTER
// ======================================================

function formatDate(date) {

  if (!date) {

    return "—";

  }


  const parsedDate = new Date(date);


  if (Number.isNaN(parsedDate.getTime())) {

    return "—";

  }


  return parsedDate.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

}


export default Dashboard;
