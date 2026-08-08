import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <Navbar />


      <div className="flex">

        {/* Sidebar */}
        <Sidebar />


        {/* Page Content */}
        <main className="flex-1 p-6">

          <Outlet />

        </main>


      </div>

    </div>
  );
}

export default MainLayout;