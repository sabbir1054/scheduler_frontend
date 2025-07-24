/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import { getBaseUrl } from "@/config/envConfig";
import { resourceTypes } from "@/constance/resourceTypes";
import { format } from "date-fns";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { MultiSelect } from "../MultiSelect/MultiSelect";
import SingleDatePicker from "../SignleDatePicker/SingleDatePicker";

export default function DashboardHeader({ setData, limit, page }: any) {
  const [currentDate] = useState(new Date());
  const [filter, setFilter] = useState("Upcoming");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  const removeType = (type: string) => {
    setSelectedTypes((prev) => prev.filter((t) => t !== type));
  };

  /** Convert current filters to query params */
  const getApiParams = () => {
    const params = new URLSearchParams();
    if (filter) params.append("status", filter?.toLocaleLowerCase());
    if (selectedTypes.length > 0)
      params.append("types", selectedTypes.join(","));
    if (startDate) params.append("date", startDate.toISOString());
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
    return params.toString();
  };

  /** Fetch data whenever filters change */
  const fetchData = async () => {
    const query = getApiParams();
    const response = await fetch(`${getBaseUrl()}/booking?${query}`);
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    // Uncomment when backend is ready
    fetchData();
  }, [filter, selectedTypes, startDate]);

  return (
    <div className="flex flex-col gap-4">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex space-x-2">
          {["Upcoming", "Ongoing", "Past", "All Time"].map((filterOption) => (
            <Button
              key={filterOption}
              variant={filter === filterOption ? "default" : "outline"}
              className="justify-start"
              onClick={() => setFilter(filterOption)}
            >
              {filterOption}
            </Button>
          ))}
        </div>
      </div>

      {/* Date Controls & Filters */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Today's Date */}
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

        {/* Filters on the Right */}
        <div className="flex space-x-4">
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
                    className="ml-1 text-gray-600 hover:text-black hover:cursor-pointer"
                    onClick={() => removeType(type)}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Single Date Picker */}
          <div>
            <SingleDatePicker value={startDate} onChange={setStartDate} />
          </div>
        </div>
      </div>
    </div>
  );
}
