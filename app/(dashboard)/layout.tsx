import Navbar from "@/components/custom/Navbar";
import Sidebar from "@/components/custom/Sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimit = await getApiLimitCount();

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:fixed md:flex-col md:inset-y-0 md:w-72 bg-gray-900">
        <Sidebar apiLimitCount={apiLimit} />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
