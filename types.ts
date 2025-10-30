
export interface Service {
  id: string;
  name: string;
  category: 'Diagnostics' | 'Repairs' | 'Maintenance' | 'Electric & Hybrid';
  price: number;
  description: string;
}

export interface Appointment {
  id: string;
  vehicleId: string;
  serviceId: string;
  mechanicId: string;
  date: Date;
  status: 'Scheduled' | 'Completed' | 'Canceled';
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  lastService: Date;
  nextService: Date;
}

export interface Mechanic {
  id: string;
  name: string;
  rating: number;
  specialization: string;
  imageUrl: string;
  isAvailable: boolean;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  read: boolean;
  timestamp: Date;
}
   