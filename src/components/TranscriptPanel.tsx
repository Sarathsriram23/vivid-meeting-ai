import { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Download, Search } from "lucide-react";

interface TranscriptMessage {
  id: number;
  speaker: string;
  text: string;
  timestamp: string;
}

export const TranscriptPanel = () => {
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([
    { id: 1, speaker: "Alice Johnson", text: "Good morning everyone, let's start with the project updates.", timestamp: "10:01" },
    { id: 2, speaker: "Bob Smith", text: "I've completed the user interface mockups. They're ready for review.", timestamp: "10:02" },
    { id: 3, speaker: "You", text: "Great work Bob! Can you share the designs in our shared folder?", timestamp: "10:03" },
    { id: 4, speaker: "Carol Davis", text: "I'll review them today and provide feedback by tomorrow.", timestamp: "10:04" },
  ]);
  
  const [isLiveTranscribing, setIsLiveTranscribing] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate live transcription
    if (isLiveTranscribing) {
      const interval = setInterval(() => {
        const speakers = ["Alice Johnson", "Bob Smith", "You", "Carol Davis"];
        const sampleTexts = [
          "I think we should prioritize the mobile version first.",
          "The backend API is performing well in our tests.",
          "Let's schedule a follow-up meeting for next week.",
          "I'll update the documentation with these changes.",
          "Great point! That aligns with our timeline.",
          "We need to consider the user feedback from last month.",
        ];
        
        const newMessage: TranscriptMessage = {
          id: Date.now(),
          speaker: speakers[Math.floor(Math.random() * speakers.length)],
          text: sampleTexts[Math.floor(Math.random() * sampleTexts.length)],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        
        setTranscript(prev => [...prev, newMessage]);
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [isLiveTranscribing]);

  useEffect(() => {
    // Auto-scroll to bottom
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  const handleDownloadTranscript = () => {
    const transcriptText = transcript
      .map(msg => `[${msg.timestamp}] ${msg.speaker}: ${msg.text}`)
      .join('\n');
    
    const blob = new Blob([transcriptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meeting-transcript-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="glass-card h-80">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Live Transcript</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={isLiveTranscribing ? "default" : "secondary"} className="text-xs">
              {isLiveTranscribing ? "Live" : "Paused"}
            </Badge>
            <Button variant="ghost" size="sm" onClick={handleDownloadTranscript}>
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 pb-4">
        <ScrollArea className="h-52" ref={scrollRef}>
          <div className="space-y-3 pr-4">
            {transcript.map((message) => (
              <div key={message.id} className="group">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-primary">
                      {message.speaker.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm">{message.speaker}</span>
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      {message.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isLiveTranscribing && (
              <div className="flex items-center space-x-2 animate-pulse">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm text-muted-foreground">Transcribing...</span>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};