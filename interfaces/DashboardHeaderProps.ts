import { Dispatch, SetStateAction } from "react";
import { BookingResponse } from "./BookingProps";

export interface DashboardHeaderProps {
  setData: Dispatch<SetStateAction<BookingResponse | undefined>>;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  limit: number;
  page: number;
}
