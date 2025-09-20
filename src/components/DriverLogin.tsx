import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Shield, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DriverLoginProps {
  onLogin: (driverData: { email: string; busNumber: string }) => void;
  onBack: () => void;
  onSignup: () => void;
}

const DriverLogin = ({ onLogin, onBack, onSignup }: DriverLoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    if (email && password) {
      setTimeout(() => {
        // For demo purposes, extract bus number from email or use a default
        const busNumber = email.includes('bus') 
          ? email.match(/\d+/)?.[0] || "101"
          : "101";
        
        onLogin({ email, busNumber });
        toast({
          title: "Login Successful",
          description: `Welcome back! You're now logged in as driver for Bus ${busNumber}.`,
        });
        setIsLoading(false);
      }, 1500);
    } else {
      setIsLoading(false);
      toast({
        title: "Invalid Credentials",
        description: "Please check your email and password.",
        variant: "destructive",
      });
    }
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
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-2xl w-fit">
                <Shield className="h-12 w-12 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl text-white font-bold">Driver Login</CardTitle>
            <CardDescription className="text-blue-100 text-lg">
              Sign in to start sharing your bus location
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-blue-100 font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="driver@school.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 text-lg transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-blue-200 mb-4">Don't have an account?</p>
              <Button
                variant="outline"
                onClick={onSignup}
                className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300"
              >
                Create Driver Account
              </Button>
            </div>

            <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-400/20">
              <p className="text-blue-200 font-medium text-center">Demo credentials:</p>
              <div className="mt-2 text-center">
                <p className="font-mono text-sm text-blue-100">
                  Email: driver@school.edu<br />
                  Password: password
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DriverLogin;