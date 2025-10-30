import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { useToast } from '../../hooks/use-toast';
import { Service, Mechanic } from '../../types';

interface ServiceBookingFormProps {
  services: Service[];
  mechanics: Mechanic[];
  onBookingSuccess: () => void;
}

const ServiceBookingForm: React.FC<ServiceBookingFormProps> = ({ services, mechanics, onBookingSuccess }) => {
  const { toast } = useToast();
  const [serviceId, setServiceId] = useState('');
  const [mechanicId, setMechanicId] = useState('');
  const [preferredDate, setPreferredDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceId || !mechanicId || !preferredDate) {
      toast({
        title: "Incomplete Form",
        description: "Please fill out all fields to book a service.",
        variant: "destructive",
      });
      return;
    }

    console.log({
      serviceId,
      mechanicId,
      preferredDate,
    });

    toast({
      title: "Service Booked!",
      description: `Your appointment has been scheduled for ${preferredDate}.`,
    });
    onBookingSuccess();
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Book a Service</CardTitle>
        <CardDescription>Fill in the details below to schedule your appointment.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="service-type">Service Type</Label>
            <Select onValueChange={setServiceId} value={serviceId}>
              <SelectTrigger id="service-type">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name} - ${service.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mechanic">Preferred Mechanic</Label>
            <Select onValueChange={setMechanicId} value={mechanicId}>
              <SelectTrigger id="mechanic">
                <SelectValue placeholder="Select a mechanic" />
              </SelectTrigger>
              <SelectContent>
                {mechanics.filter(m => m.isAvailable).map((mechanic) => (
                  <SelectItem key={mechanic.id} value={mechanic.id}>
                    {mechanic.name} - ({mechanic.specialization})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Preferred Date</Label>
            <Input 
              id="date" 
              type="date" 
              value={preferredDate} 
              onChange={(e) => setPreferredDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">Book Now</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ServiceBookingForm;
