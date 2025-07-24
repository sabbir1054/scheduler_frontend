"use client";

import { Button } from "@/components/ui/button";
import { BookingCardProps } from "@/interfaces/BookingCardPorps";
import { format } from "date-fns";
import { CalendarIcon, Clock, Edit, Trash } from "lucide-react";

export default function BookingCard({
  id,
  resource,
  start,
  end,
  requestedBy,
  onEdit,
  onDelete,
}: BookingCardProps) {
  const startDate = new Date(start);
  const endDate = new Date(end);
    
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white flex flex-col space-y-3">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">Booking - {resource}</h3>
          <p className="text-sm text-gray-500">Requested by {requestedBy}</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(id)}
            className="hover:bg-gray-100"
          >
            <Edit className="w-4 h-4 text-gray-600" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(id)}
            className="hover:bg-gray-100"
          >
            <Trash className="w-4 h-4 text-red-600" />
          </Button>
        </div>
      </div>

      {/* Booking Date & Time */}
      <div className="flex items-center text-sm text-gray-600 space-x-4">
        <div className="flex items-center space-x-1">
          <CalendarIcon className="w-4 h-4" />
          <span>{format(startDate, "d MMM yyyy")}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>
            {format(startDate, "hh:mm a")} - {format(endDate, "hh:mm a")}
          </span>
        </div>
      </div>
    </div>
  );
}
