import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bus, MapPin, Shield, Users } from "lucide-react";

interface RoleSelectionProps {
  onSelectRole: (role: 'driver' | 'student') => void;
}

const RoleSelection = ({ onSelectRole }: RoleSelectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="max-w-6xl mx-auto text-center space-y-12 relative z-10">
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-3xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <Bus className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent mb-6">
            Bus Pulse
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Real-time school bus tracking for students and drivers. 
            <span className="block mt-2 text-lg text-blue-200">Safe, reliable, and always connected.</span>
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {/* Driver Card */}
          <Card className="cursor-pointer transition-all duration-500 hover:scale-105 group bg-white/10 backdrop-blur-lg border-white/20 hover:border-blue-400/50">
            <CardHeader className="text-center space-y-6 p-8">
              <div className="mx-auto">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-2xl w-fit transition-all duration-300 group-hover:scale-110">
                  <Shield className="h-10 w-10 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl text-white font-bold">Driver Portal</CardTitle>
              <CardDescription className="text-blue-100 text-lg">
                Share your bus location with students in real-time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-8 pt-0">
              <div className="space-y-4 text-blue-100">
                <div className="flex items-center gap-3 text-lg">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <MapPin className="h-5 w-5 text-blue-300" />
                  </div>
                  <span>Start & stop location sharing</span>
                </div>
                <div className="flex items-center gap-3 text-lg">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Bus className="h-5 w-5 text-blue-300" />
                  </div>
                  <span>Manage bus route information</span>
                </div>
                <div className="flex items-center gap-3 text-lg">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Shield className="h-5 w-5 text-blue-300" />
                  </div>
                  <span>Secure driver authentication</span>
                </div>
              </div>
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 text-lg transition-all duration-300 group-hover:scale-105"
                onClick={() => onSelectRole('driver')}
              >
                <Shield className="h-5 w-5 mr-2" />
                Driver Portal
              </Button>
            </CardContent>
          </Card>

          {/* Student Card */}
          <Card className="cursor-pointer transition-all duration-500 hover:scale-105 group bg-white/10 backdrop-blur-lg border-white/20 hover:border-yellow-400/50">
            <CardHeader className="text-center space-y-6 p-8">
              <div className="mx-auto">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-2xl w-fit transition-all duration-300 group-hover:scale-110">
                  <Users className="h-10 w-10 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl text-white font-bold">Student Portal</CardTitle>
              <CardDescription className="text-blue-100 text-lg">
                Track your school bus location in real-time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-8 pt-0">
              <div className="space-y-4 text-blue-100">
                <div className="flex items-center gap-3 text-lg">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <MapPin className="h-5 w-5 text-yellow-300" />
                  </div>
                  <span>Real-time bus location</span>
                </div>
                <div className="flex items-center gap-3 text-lg">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Bus className="h-5 w-5 text-yellow-300" />
                  </div>
                  <span>Enter your bus number</span>
                </div>
                <div className="flex items-center gap-3 text-lg">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Users className="h-5 w-5 text-yellow-300" />
                  </div>
                  <span>No login required</span>
                </div>
              </div>
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-4 text-lg transition-all duration-300 group-hover:scale-105"
                onClick={() => onSelectRole('student')}
              >
                <Users className="h-5 w-5 mr-2" />
                Track My Bus
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-blue-200 font-medium">
            Safe, reliable, and real-time bus tracking for your peace of mind
          </p>
          <div className="flex items-center justify-center gap-4 mt-6 text-blue-300">
            <div className="flex items-center gap-2">
              <span className="text-sm">Live Tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Real-time</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;