"use client";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useState } from "react";

import { resourceTypes } from "@/constance/resourceTypes";
import { X } from "lucide-react";
import DateRangePicker from "../DateRangePicker/DateRangePicker";
import { MultiSelect } from "../MultiSelect/MultiSelect";

export default function DashboardHeader() {
  const [currentDate] = useState(new Date());
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const removeType = (type: string) => {
    setSelectedTypes((prev) => prev.filter((t) => t !== type));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex space-x-2">
          {["Upcoming", "Ongoing", "Past", "All Time"].map((filter, index) => (
            <Button
              key={index}
              variant={filter === "Upcoming" ? "default" : "outline"}
              className="justify-start"
            >
              {filter}
            </Button>
          ))}
        
        </div>
      </div>

      {/* Date Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-red-500 text-white rounded px-2 py-1 text-center">
            <div className="text-xs uppercase">
              {format(currentDate, "MMM")}
            </div>
            <div className="text-xl font-bold">{format(currentDate, "d")}</div>
          </div>
          <div>
            <div className="text-lg font-semibold">
              {format(currentDate, "MMMM d, yyyy")}
            </div>
            <div className="text-sm text-muted-foreground">
              {format(currentDate, "EEEE")}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-2">
          {/* Resource Type Select */}
          <div className="space-y-2">
            <MultiSelect
              options={resourceTypes}
              selected={selectedTypes}
              onChange={setSelectedTypes}
            />
            {/* Show Selected Types */}
            <div className="flex flex-wrap gap-2">
              {selectedTypes.map((type) => (
                <span
                  key={type}
                  className="flex items-center bg-gray-200 rounded px-2 py-1 text-sm"
                >
                  {type}
                  <button
                    className="ml-1 text-gray-600 hover:text-black"
                    onClick={() => removeType(type)}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <DateRangePicker />
          </div>
        </div>
      </div>
    </div>
  );
}
