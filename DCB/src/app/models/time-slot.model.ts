export interface TimeSlot {
  id: number;
  startTime: string; // Time format: 'HH:mm' (e.g., '09:00', '13:30')
  endTime: string; // Time format: 'HH:mm' (e.g., '10:30', '15:00')
  available: boolean;
}
