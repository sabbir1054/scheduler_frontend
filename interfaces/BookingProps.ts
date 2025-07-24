export interface Booking {
  id: string;
  resource: string;
  start: string;
  end: string;
  requestedBy: string;
  durationMinutes: number;
  createdAt: string;
  updatedAt: string;
  status: "Upcoming" | "Ongoing" | "Past" | string;
}

export interface BookingResponse {
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  data: Booking[];
}
