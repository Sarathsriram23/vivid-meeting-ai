import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Video, VideoOff, Phone, PhoneOff, Settings, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface VideoCallInterfaceProps {
  roomId: string;
  isActive: boolean;
  onLeave: () => void;
}

export const VideoCallInterface = ({ roomId, isActive, onLeave }: VideoCallInterfaceProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [participants] = useState([
    { id: 1, name: "You", isHost: true },
    { id: 2, name: "Alice Johnson", isHost: false },
    { id: 3, name: "Bob Smith", isHost: false },
    { id: 4, name: "Carol Davis", isHost: false }
  ]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Simulate getting user media
    if (videoRef.current && isVideoOn) {
      // In a real app, this would be actual video stream
      videoRef.current.style.background = "linear-gradient(45deg, #1a1a2e, #16213e)";
    }
  }, [isVideoOn]);

  const handleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Microphone Unmuted" : "Microphone Muted",
      description: isMuted ? "You can now speak" : "Others cannot hear you",
    });
  };

  const handleVideo = () => {
    setIsVideoOn(!isVideoOn);
    toast({
      title: isVideoOn ? "Camera Turned Off" : "Camera Turned On",
      description: isVideoOn ? "Others cannot see you" : "Your video is now visible",
    });
  };

  if (!isActive) {
    return (
      <Card className="glass-card">
        <CardContent className="p-6 text-center">
          <PhoneOff className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Meeting Ended</h3>
          <p className="text-muted-foreground">You have left the meeting room.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card overflow-hidden">
      <CardContent className="p-0">
        {/* Video Grid */}
        <div className="grid grid-cols-2 gap-2 p-4 bg-muted/20">
          {participants.map((participant, index) => (
            <div key={participant.id} className="relative aspect-video">
              <div className={`w-full h-full rounded-lg overflow-hidden ${
                index === 0 ? 'bg-gradient-to-br from-primary/20 to-primary-glow/20' : 'bg-muted/40'
              }`}>
                {index === 0 ? (
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    muted
                    autoPlay
                    style={{ 
                      display: isVideoOn ? 'block' : 'none',
                      background: 'linear-gradient(45deg, #1a1a2e, #16213e)'
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/60">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary">
                        {participant.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Video overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-end">
                  <div className="p-3 flex justify-between items-center w-full">
                    <Badge variant="secondary" className="text-xs">
                      {participant.name}
                      {participant.isHost && " (Host)"}
                    </Badge>
                    {index === 0 && !isVideoOn && (
                      <VideoOff className="w-4 h-4 text-white/70" />
                    )}
                    {index === 0 && isMuted && (
                      <MicOff className="w-4 h-4 text-red-400" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="p-6 bg-card/80 backdrop-blur-sm border-t border-border/50">
          <div className="flex justify-center space-x-4">
            <Button
              variant={isMuted ? "destructive" : "secondary"}
              size="lg"
              onClick={handleMute}
              className="w-14 h-14 rounded-full"
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </Button>
            
            <Button
              variant={isVideoOn ? "secondary" : "destructive"}
              size="lg"
              onClick={handleVideo}
              className="w-14 h-14 rounded-full"
            >
              {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="w-14 h-14 rounded-full"
            >
              <Settings className="w-6 h-6" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="w-14 h-14 rounded-full"
            >
              <Users className="w-5 h-5" />
              <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 flex items-center justify-center">
                4
              </Badge>
            </Button>
            
            <Button
              variant="destructive"
              size="lg"
              onClick={onLeave}
              className="w-14 h-14 rounded-full ml-8"
            >
              <PhoneOff className="w-6 h-6" />
            </Button>
          </div>
          
          <div className="flex justify-center mt-4">
            <p className="text-sm text-muted-foreground">
              Room: {roomId} • {participants.length} participants
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};