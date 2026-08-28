
import React, { useState } from 'react';
import { Button } from './components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/Card';
import { Car, CheckCircle2, Wrench } from 'lucide-react';

const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Car className="size-10 text-blue-400" />
            <h1 className="text-4xl font-bold">AutoCare Pro</h1>
          </div>
          <p className="text-lg text-slate-300">Professional car maintenance and repair services</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-green-400" />
                <CardTitle>Expert Mechanics</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-slate-300">
              Certified professionals with years of experience in car maintenance and repairs.
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Wrench className="size-5 text-blue-400" />
                <CardTitle>Full Service Range</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-slate-300">
              From diagnostics to repairs, we handle all types of automotive services.
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Car className="size-5 text-orange-400" />
                <CardTitle>Fast Turnaround</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-slate-300">
              Quick service appointments to get you back on the road as fast as possible.
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Get Started Today</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 rounded-md bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                Subscribe
              </Button>
            </form>
            {submitted && (
              <p className="text-green-400 mt-3">Thanks for subscribing! Check your email for updates.</p>
            )}
          </CardContent>
        </Card>

        <div className="text-center text-slate-400 text-sm">
          <p>&copy; 2024 AutoCare Pro. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default App;
