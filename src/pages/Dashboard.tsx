
import Navbar from "@/components/layout/Navbar";
import ServerDashboard from "@/components/dashboard/ServerDashboard";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <ServerDashboard />
      </main>
    </div>
  );
};

export default Dashboard;
