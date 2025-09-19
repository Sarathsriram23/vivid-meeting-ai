import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { VideoCallInterface } from "@/components/VideoCallInterface";
import { TranscriptPanel } from "@/components/TranscriptPanel";
import { MeetingSummaryPanel } from "@/components/MeetingSummaryPanel";
import { EngagementDashboard } from "@/components/EngagementDashboard";
import { NetworkStatusWidget } from "@/components/NetworkStatusWidget";
import { CallStatsPanel } from "@/components/CallStatsPanel";
import { GuidedWalkthrough } from "@/components/GuidedWalkthrough";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Copy, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const MeetingRoom = () => {
  const { roomId } = useParams();
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isCallActive, setIsCallActive] = useState(true);

  useEffect(() => {
    // Simulate joining a meeting
    toast({
      title: "Joined Meeting",
      description: `Successfully joined room: ${roomId}`,
    });
  }, [roomId]);

  const handleCopyRoomId = async () => {
    if (roomId) {
      await navigator.clipboard.writeText(roomId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Room ID Copied",
        description: "Share this ID with others to invite them to the meeting.",
      });
    }
  };

  const handleLeaveCall = () => {
    setIsCallActive(false);
    toast({
      title: "Call Ended",
      description: "You have left the meeting.",
    });
    // In a real app, this would redirect back to home
    setTimeout(() => {
      window.history.back();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 border-b border-border/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-xl font-semibold">Meeting Room</h1>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  Room: {roomId}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyRoomId}
                  className="h-6 px-2"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <NetworkStatusWidget />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowWalkthrough(true)}
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Guide
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6 p-6 h-[calc(100vh-80px)]">
        {/* Left Column - Video & Controls */}
        <div className="lg:col-span-2 space-y-6">
          <VideoCallInterface 
            roomId={roomId || ""}
            isActive={isCallActive}
            onLeave={handleLeaveCall}
          />
          <CallStatsPanel />
        </div>

        {/* Right Column - Panels */}
        <div className="space-y-6 overflow-hidden">
          <TranscriptPanel />
          <MeetingSummaryPanel />
          <EngagementDashboard />
        </div>
      </div>

      {/* Guided Walkthrough */}
      <GuidedWalkthrough 
        open={showWalkthrough} 
        onOpenChange={setShowWalkthrough}
      />
    </div>
  );
};

export default MeetingRoom;