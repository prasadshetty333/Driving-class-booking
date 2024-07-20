export interface Booking {
    id: number;
    userId: number;
    packageId: number;
    lessonId: number;
    instructorId: string;
    bookingDate: Date;
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'cancelled';
  }
  