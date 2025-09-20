import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { LogOut, MapPin, Play, Square, Bus, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { setBusLocation, subscribeBusLocation } from "@/lib/busLocation";

//   function TestBus() {
 

//   return <div>Open console and watch for updates…</div>;
// }


interface DriverDashboardProps {
  driverData: { email: string; busNumber: string; driverId?: string };
  onLogout: () => void;
}

const DriverDashboard = ({ driverData, onLogout }: DriverDashboardProps) => {
  const [busNumber, setBusNumber] = useState(driverData.busNumber);
  const [isActive, setIsActive] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [tripDuration, setTripDuration] = useState(0);
  const { toast } = useToast();

  const watchIdRef = useRef<number | null>(null);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;

    
    if (isActive) {
      // Simulate getting location
      setLocation({ lat: 40.7128, lng: -74.0060 });
      
      
      // Track trip duration
      const startTime = Date.now();
      interval = setInterval(() => {
        setTripDuration(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } else {
      setTripDuration(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const startTrip = () => {
    if (!navigator.geolocation) {
      toast({ title: "Error", description: "Geolocation not supported", variant: "destructive" });
      return;
    }
    setIsActive(true);
    toast({ title: "Trip Started", description: `Sharing location for Bus ${busNumber}` });
    const id = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });

        // Push location to Firebase using current busNumber state
        setBusLocation(busNumber, { lat: latitude, lng: longitude });
      },
      (error) => {
        console.error(error);
        toast({ title: "Location Error", description: error.message, variant: "destructive" });
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );

    watchIdRef.current = id;

  };

  const endTrip = () => {
    setIsActive(false);
    setLocation(null);

    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    toast({
      title: "Trip Ended",
      description: "Location sharing has been stopped",
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-xl">
              <Bus className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Driver Dashboard</h1>
              <p className="text-blue-200">{driverData.email}</p>
              {driverData.driverId && (
                <p className="text-blue-300 text-sm">Driver ID: {driverData.driverId}</p>
              )}
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={onLogout}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Bus className="h-8 w-8 text-blue-300" />
                </div>
                <div>
                  <p className="text-sm text-blue-200 font-medium">Bus Number</p>
                  <p className="text-2xl font-bold text-white">{busNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <div className={`h-6 w-6 rounded-full ${isActive ? 'bg-green-400' : 'bg-red-400'}`} />
                </div>
                <div>
                  <p className="text-sm text-blue-200 font-medium">Status</p>
                  <p className="text-2xl font-bold text-white">{isActive ? 'Active' : 'Offline'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-500/20 rounded-xl">
                  <Clock className="h-8 w-8 text-yellow-300" />
                </div>
                <div>
                  <p className="text-sm text-blue-200 font-medium">Trip Duration</p>
                  <p className="text-2xl font-bold text-white">{formatTime(tripDuration)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Main Control Panel */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Bus Configuration */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="p-6">
              <CardTitle className="flex items-center gap-3 text-white text-xl">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Bus className="h-6 w-6 text-blue-300" />
                </div>
                Bus Configuration
              </CardTitle>
              <CardDescription className="text-blue-200">
                Update your bus number for tracking
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-6">
              <div className="space-y-3">
                <Label htmlFor="busNumber" className="text-blue-100 font-medium">Bus Number</Label>
                <Input
                  id="busNumber"
                  value={busNumber}
                  onChange={(e) => setBusNumber(e.target.value)}
                  placeholder="Enter bus number"
                  disabled={isActive}
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:ring-blue-400 focus:border-blue-400 h-12 text-lg"
                />
              </div>
              {isActive && (
                <Badge variant="secondary" className="text-sm bg-yellow-500/20 text-yellow-200 border-yellow-400/30">
                  Cannot change bus number during active trip
                </Badge>
              )}
            </CardContent>
          </Card>

          {/* Trip Controls */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="p-6">
              <CardTitle className="flex items-center gap-3 text-white text-xl">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <MapPin className="h-6 w-6 text-green-300" />
                </div>
                Trip Controls
              </CardTitle>
              <CardDescription className="text-blue-200">
                Start or stop location sharing
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-6">
              {!isActive ? (
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 text-lg transition-all duration-300"
                  onClick={startTrip}
                >
                  <Play className="h-6 w-6 mr-3" />
                  Start Trip
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold py-4 text-lg transition-all duration-300"
                  onClick={endTrip}
                >
                  <Square className="h-6 w-6 mr-3" />
                  End Trip
                </Button>
              )}
              
              {location && (
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-400/20">
                  <p className="text-blue-200 font-medium mb-2">Current Location:</p>
                  <p className="font-mono text-sm text-blue-100">
                    Lat: {location.lat.toFixed(6)}<br />
                    Lng: {location.lng.toFixed(6)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Live Tracking Status */}
        {isActive && (
          <Card className="bg-green-500/10 backdrop-blur-lg border-green-400/30">
            <CardHeader className="p-6">
              <CardTitle className="flex items-center gap-3 text-green-300 text-xl">
                <div className="h-4 w-4 bg-green-400 rounded-full" />
                Live Tracking Active
              </CardTitle>
              <CardDescription className="text-green-200">
                Your location is being shared with students in real-time
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="flex items-center justify-between">
                <span className="text-green-100 font-medium">Bus {busNumber} is visible to students</span>
                <Badge className="bg-green-500/20 text-green-200 border-green-400/30">
                  Live Tracking
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;