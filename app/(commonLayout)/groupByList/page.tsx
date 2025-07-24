"use client";
import BookingCard from "@/components/modules/BookingCard/BookingCard";
import { getBaseUrl } from "@/config/envConfig";
import { Booking } from "@/interfaces/BookingProps";
import { useEffect, useState } from "react";

interface GroupedBookingsResponse {
  [resource: string]: Booking[];
}

export default function ShowGroupedBookings() {
  const [bookings, setBookings] = useState<GroupedBookingsResponse>({});
  const [loading, setLoading] = useState(true);

  // Fetch API response
  const fetchBookings = async () => {
    try {
      const res = await fetch(`${getBaseUrl()}/booking/groupBy`);
      const json = await res.json();
      setBookings(json.data || {});
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <p className="p-6 text-gray-500">Loading bookings...</p>;

  return (
    <div className="p-6 space-y-10">
      {Object.entries(bookings).map(([resource, resourceBookings]) => (
        <div key={resource}>
          {/* Resource Title */}
          <h2 className="text-2xl font-bold mb-4">{resource}</h2>
          {/* Booking Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {resourceBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                {...booking}
                onEdit={(id: string) => console.log("Edit", id)}
                onDelete={(id: string) => console.log("Delete", id)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Show message if no bookings */}
      {Object.keys(bookings).length === 0 && (
        <p className="text-center text-gray-600">No bookings available.</p>
      )}
    </div>
  );
}
