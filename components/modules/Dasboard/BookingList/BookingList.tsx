"use client";

import { Button } from "@/components/ui/button";
import { Booking } from "@/interfaces/BookingProps";
import BookingCard from "../../BookingCard/BookingCard";

export default function BookingList({
  page,
  limit,
  setPage,
  setLimit,
  bookings,
}: {
  limit: number;
  page: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  bookings: Booking[] | undefined;
}) {
  const handleEdit = (id: string) => {
    console.log("Edit booking:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete booking:", id);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings?.map((booking) => (
          <BookingCard
            key={booking.id}
            {...booking}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Pagination & Limit Section */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center space-x-2">
          <span>Show:</span>
          <select
            value={limit}
            onChange={(e) => {
              const val = Number(e.target.value);
              setLimit(val);
            }}
            className="border rounded px-2 py-1"
          >
            <option value={12}>12</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              const prev = Math.max(1, page - 1);
              setPage(prev);
            }}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              const next = page + 1;
              setPage(next);
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
