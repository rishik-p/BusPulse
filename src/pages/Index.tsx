import { useState } from "react";
import RoleSelection from "@/components/RoleSelection";
import DriverLogin from "@/components/DriverLogin";
import DriverRegistration from "@/components/DriverRegistration";
import DriverDashboard from "@/components/DriverDashboard";
import StudentTracker from "@/components/StudentTracker";

type AppState = 'role-selection' | 'driver-login' | 'driver-registration' | 'driver-dashboard' | 'student-tracker';

interface DriverData {
  email: string;
  busNumber: string;
  driverId?: string;
}

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('role-selection');
  const [driverData, setDriverData] = useState<DriverData | null>(null);

  const handleRoleSelect = (role: 'driver' | 'student') => {
    if (role === 'driver') {
      setCurrentState('driver-login');
    } else {
      setCurrentState('student-tracker');
    }
  };

  const handleDriverLogin = (data: DriverData) => {
    setDriverData(data);
    setCurrentState('driver-dashboard');
  };

  const handleDriverRegistration = (data: { email: string; password: string; driverId: string; busNumber: string }) => {
    // After registration, automatically log in the user
    setDriverData({ email: data.email, busNumber: data.busNumber, driverId: data.driverId });
    setCurrentState('driver-dashboard');
  };

  const handleSignup = () => {
    setCurrentState('driver-registration');
  };

  const handleLogout = () => {
    setDriverData(null);
    setCurrentState('role-selection');
  };

  const handleBack = () => {
    setCurrentState('role-selection');
  };

  switch (currentState) {
    case 'driver-login':
      return <DriverLogin onLogin={handleDriverLogin} onBack={handleBack} onSignup={handleSignup} />;
    
    case 'driver-registration':
      return <DriverRegistration onRegister={handleDriverRegistration} onBack={handleBack} />;
    
    case 'driver-dashboard':
      return driverData ? (
        <DriverDashboard driverData={driverData} onLogout={handleLogout} />
      ) : null;
    
    case 'student-tracker':
      return <StudentTracker onBack={handleBack} />;
    
    default:
      return <RoleSelection onSelectRole={handleRoleSelect} />;
  }
};

export default Index;
