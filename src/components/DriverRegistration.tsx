import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Shield, Eye, EyeOff, UserPlus, Bus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DriverRegistrationProps {
  onRegister: (driverData: { email: string; password: string; driverId: string; busNumber: string }) => void;
  onBack: () => void;
}

const DriverRegistration = ({ onRegister, onBack }: DriverRegistrationProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    driverId: "",
    busNumber: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.driverId || !formData.busNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return false;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.driverId.match(/^[A-Z0-9]{6,10}$/)) {
      toast({
        title: "Invalid Driver ID",
        description: "Driver ID must be 6-10 characters, letters and numbers only.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate registration process
    setTimeout(() => {
      onRegister({
        email: formData.email,
        password: formData.password,
        driverId: formData.driverId,
        busNumber: formData.busNumber
      });
      
      toast({
        title: "Registration Successful",
        description: `Welcome! You've been registered as driver ${formData.driverId} for Bus ${formData.busNumber}.`,
      });
      
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="w-full max-w-lg relative z-10">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8 text-blue-200 hover:text-white hover:bg-white/10 transition-all duration-300"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Role Selection
        </Button>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader className="text-center space-y-6 p-8">
            <div className="mx-auto">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-2xl w-fit">
                <UserPlus className="h-12 w-12 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl text-white font-bold">Driver Registration</CardTitle>
            <CardDescription className="text-blue-100 text-lg">
              Create your driver account to start sharing bus location
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-blue-100 font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="driver@school.edu"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:ring-blue-400 focus:border-blue-400 h-12 text-lg"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="driverId" className="text-blue-100 font-medium">Driver ID</Label>
                <Input
                  id="driverId"
                  type="text"
                  placeholder="e.g. DRV001, ABC123"
                  value={formData.driverId}
                  onChange={(e) => handleInputChange('driverId', e.target.value.toUpperCase())}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:ring-blue-400 focus:border-blue-400 h-12 text-lg"
                />
                <p className="text-xs text-blue-300">6-10 characters, letters and numbers only</p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="busNumber" className="text-blue-100 font-medium">Bus Number</Label>
                <Input
                  id="busNumber"
                  type="text"
                  placeholder="e.g. 101, A-205, Bus-42"
                  value={formData.busNumber}
                  onChange={(e) => handleInputChange('busNumber', e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:ring-blue-400 focus:border-blue-400 h-12 text-lg"
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="password" className="text-blue-100 font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a secure password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:ring-blue-400 focus:border-blue-400 pr-12 h-12 text-lg"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-white/10 text-blue-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="confirmPassword" className="text-blue-100 font-medium">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:ring-blue-400 focus:border-blue-400 pr-12 h-12 text-lg"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-white/10 text-blue-200"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 text-lg transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating Account...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Create Driver Account
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-8 p-4 bg-green-500/10 rounded-lg border border-green-400/20">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-green-300" />
                <p className="text-green-200 font-medium">Registration Benefits:</p>
              </div>
              <ul className="text-sm text-green-100 space-y-1">
                <li>• Secure driver authentication</li>
                <li>• Real-time location sharing</li>
                <li>• Student tracking capabilities</li>
                <li>• Professional driver dashboard</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DriverRegistration;
