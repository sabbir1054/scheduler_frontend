"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function DateRangePicker() {
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const clearDate = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent popover from opening when clearing
    setDate(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative w-full">
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal pr-8"
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "MMM d, yyyy")} -{" "}
                  {format(date.to, "MMM d, yyyy")}
                </>
              ) : (
                format(date.from, "MMM d, yyyy")
              )
            ) : (
              <span>Select Date Range</span>
            )}
          </Button>
          {date?.from && (
            <button
              onClick={clearDate}
              className="absolute border bg-black  top-1/2 -translate-y-1/2 p-1 rounded hover:cursor-pointer"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="p-0 bg-white shadow-md rounded-lg border border-border w-[600px]"
      >
        <Calendar
          mode="range"
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          className="p-4"
        />
      </PopoverContent>
    </Popover>
  );
}
