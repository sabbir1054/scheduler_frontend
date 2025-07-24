/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getBaseUrl } from "@/config/envConfig";
import { resourceTypes } from "@/constance/resourceTypes";
import { DashboardHeaderProps } from "@/interfaces/DashboardHeaderProps";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import SingleDatePicker from "../SignleDatePicker/SingleDatePicker";

export default function DashboardHeader({
  setData,
  setPage,
  setLimit,
  limit,
  page,
}: DashboardHeaderProps) {
  const [currentDate] = useState(new Date());
  const [filter, setFilter] = useState("Upcoming");
  const [selectedType, setSelectedType] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  /** Reset all filters */
  const handleClearFilters = () => {
    setFilter("Upcoming");
    setSelectedType("");
    setStartDate(undefined);
    setPage(1);
    setLimit(12);
  };

  /** Convert current filters to query params */
  const getApiParams = () => {
    const params = new URLSearchParams();
    if (filter) params.append("status", filter?.toLowerCase());
    if (selectedType) params.append("resource", selectedType);
    if (startDate) params.append("date", startDate.toISOString());
    if (page) params.append("page", page?.toString());
    if (limit) params.append("limit", limit?.toString());
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
    fetchData();
  }, [filter, selectedType, startDate, page, limit]);

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
          {/* Single Resource Type Select */}
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select a resource type" />
            </SelectTrigger>
            <SelectContent>
              {resourceTypes.map((type: string) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Single Date Picker */}
          <div>
            <SingleDatePicker value={startDate} onChange={setStartDate} />
          </div>
        </div>
      </div>

      {/* Clear All Filters Button */}
      <div className="flex justify-end">
        <p
          className="text-red-300 hover:text-red-500 hover:cursor-pointer"
          onClick={handleClearFilters}
        >
          Clear All Filters
        </p>
      </div>
    </div>
  );
}
