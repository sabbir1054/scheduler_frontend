export interface BookingCardProps {
  id: string;
  resource: string;
  start: string;
  end: string;
  requestedBy: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}
