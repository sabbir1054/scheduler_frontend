import DashboardHeader from "@/components/modules/Dasboard/DashboardHeader/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex w-full">
      {/* Main Content */}
      <div className="flex-1 p-4 mx-4">
        <DashboardHeader />
        <div className="mt-6">
          <Button className="bg-black text-white">
            <Plus className="w-4 h-4 mr-2" /> Make Booking Request
          </Button>
        </div>
        <p className="text-muted-foreground">Dashboard content goes here...</p>
      </div>
    </div>
  );
}
