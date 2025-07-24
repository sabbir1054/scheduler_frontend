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
import { useEffect, useState } from "react";

interface SingleDatePickerProps {
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
}

export default function SingleDatePicker({
  value,
  onChange,
}: SingleDatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);

  useEffect(() => {
    onChange(selectedDate);
  }, [selectedDate, onChange]);

  const clearDate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDate(undefined);
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
            {selectedDate ? (
              format(selectedDate, "MMM d, yyyy")
            ) : (
              <span>Select Date</span>
            )}
          </Button>
          {selectedDate && (
            <button
              onClick={clearDate}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-200"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="p-0 bg-white shadow-md rounded-lg border border-border m-0 "
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="p-4"
        />
      </PopoverContent>
    </Popover>
  );
}
