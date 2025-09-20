import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Users } from "lucide-react";
import StudentMap from "@/components/StudentMap";

interface StudentTrackerProps {
  onBack: () => void;
}

const StudentTracker = ({ onBack }: StudentTrackerProps) => {
  const [busNumber, setBusNumber] = useState("");
  const [tracking, setTracking] = useState(false);
  const [eta, setEta] = useState<string | null>(null);

  const handleTrack = () => {
    if (busNumber.trim() !== "") {
      setTracking(true);
    }
  };

  const handleStop = () => {
    setTracking(false);
    setBusNumber("");
    setEta(null);
  };

  const handleEtaUpdate = (newEta: string | null) => {
    setEta(newEta);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Map fills the screen */}
      {tracking && (
        <div className="absolute inset-0 z-0">
          <StudentMap busNumber={busNumber} onEtaUpdate={handleEtaUpdate} />
        </div>
      )}

      {/* Floating Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-r from-slate-800/95 to-slate-900/95 backdrop-blur-md border-b border-white/30 z-30 shadow-2xl">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="text-white hover:bg-white/20 bg-white/10 border border-white/20 rounded-xl px-4 py-2 transition-all duration-300"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center gap-3">
          {/* <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z"/>
            </svg>
          </div> */}
          <h1 className="font-bold text-xl text-white">Bus Pulse</h1>
        </div>
        {tracking && (
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={handleStop}
            className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white border border-red-400/30 rounded-xl px-4 py-2 font-semibold transition-all duration-300 shadow-lg"
          >
            Stop Tracking
          </Button>
        )}
      </div>

      {/* Bus Number Input (only when not tracking) */}
      {!tracking && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 w-full max-w-lg space-y-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  {/* <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z"/> */}
                   <Users className="h-10 w-10 text-white" />
                </svg>
                
              </div>
               {/* <div className="mx-auto">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-2xl w-fit transition-all duration-300 group-hover:scale-110">
                  <Users className="h-10 w-10 text-white" />
                </div>
              </div> */}
              <h2 className="text-2xl font-bold text-white">Track Your Bus</h2>
              <p className="text-blue-200">Enter your bus number to start real-time tracking</p>
            </div>
            
            <div className="space-y-4">
              <Input
                placeholder="e.g. 101, A-205, Bus-42"
                value={busNumber}
                onChange={(e) => setBusNumber(e.target.value)}
                className="text-center bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:ring-yellow-400 focus:border-yellow-400 h-12 text-lg"
              />
              <Button 
                onClick={handleTrack} 
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-4 text-lg transition-all duration-300"
                disabled={!busNumber.trim()}
              >
                Start Tracking
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ETA Card (floating bottom) */}
      {tracking && (
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <div className="bg-gradient-to-r from-slate-800/95 to-slate-900/95 backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                <span className="text-white font-semibold text-lg">Bus {busNumber}</span>
              </div>
              <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full border border-green-400/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300 text-sm font-medium">Live Tracking</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-100 font-medium text-base">Estimated Arrival</span>
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 px-4 py-2 rounded-xl font-bold text-xl shadow-lg">
                {eta || "Calculating..."}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTracker;





// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import StudentMap from "@/components/StudentMap";

// interface StudentTrackerProps {
//   onBack: () => void;
// }

// const StudentTracker = ({ onBack }: StudentTrackerProps) => {
//   const [busNumber, setBusNumber] = useState("");
//   const [tracking, setTracking] = useState(false);

//   const handleTrack = () => {
//     if (busNumber.trim() !== "") {
//       setTracking(true);
//     }
//   };

//   const handleStop = () => {
//     setTracking(false);
//     setBusNumber("");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-blue-50 p-4">
//       <div className="max-w-3xl mx-auto space-y-6">
//         <div className="flex items-center justify-between">
//           <h1 className="text-2xl font-bold">Student Tracker</h1>
//           <Button variant="outline" onClick={onBack}>
//             Back
//           </Button>
//         </div>

//         {!tracking ? (
//           <div className="space-y-4">
//             <Input
//               placeholder="Enter Bus Number"
//               value={busNumber}
//               onChange={(e) => setBusNumber(e.target.value)}
//             />
//             <Button onClick={handleTrack} className="w-full">
//               Track Bus
//             </Button>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             <div className="h-[700px]">
//               <StudentMap busNumber={busNumber} />
//             </div>
//             <div className="flex justify-between">
//               <Button variant="outline" onClick={handleStop}>
//                 Stop Tracking
//               </Button>
//               <Button variant="outline" onClick={onBack}>
//                 Back
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentTracker;
