"use client";
import DashboardHeader from "@/components/modules/Dasboard/DashboardHeader/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(16);
  const [page, setPage] = useState(1);

  return (
    <div className="flex w-full">
      {/* Main Content */}
      <div className="flex-1 p-4 mx-4">
        <DashboardHeader setData={setData} page={page} limit={limit} />

        <hr className="mt-2"></hr>
        <div className="mt-6">
          <Button className="bg-black text-white">
            <Plus className="w-4 h-4 mr-2" /> Make Booking Request
          </Button>
        </div>
        <div className="mt-2">
          <p className="text-muted-foreground">
            Dashboard content goes here...
          </p>
        </div>
      </div>
    </div>
  );
}
