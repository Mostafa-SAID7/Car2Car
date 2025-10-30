import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import ServiceBookingForm from '../forms/ServiceBookingForm';
import { SERVICES, MECHANICS } from '../../data/mockData';
import { Car, Wrench, Zap } from 'lucide-react';

const categoryIcons = {
  'Diagnostics': <Car size={24} className="text-blue-400" />,
  'Repairs': <Wrench size={24} className="text-red-400" />,
  'Maintenance': <Zap size={24} className="text-green-400" />,
  'Electric & Hybrid': <Zap size={24} className="text-purple-400" />,
}

const Services: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Our Services</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>Book a Service</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <ServiceBookingForm 
              services={SERVICES} 
              mechanics={MECHANICS} 
              onBookingSuccess={() => setIsModalOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <Card key={service.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">{service.name}</CardTitle>
              {categoryIcons[service.category]}
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <p className="text-xl font-bold">${service.price}</p>
              <Button variant="outline" onClick={() => setIsModalOpen(true)}>Book Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Services;
