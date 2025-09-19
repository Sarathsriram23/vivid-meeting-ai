import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  ArrowLeft, 
  Video, 
  MessageSquare, 
  FileText, 
  TrendingUp, 
  Wifi,
  BarChart3,
  Check
} from "lucide-react";

interface GuidedWalkthroughProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const walkthroughSteps = [
  {
    title: "Welcome to Smart Meeting Hub",
    icon: Video,
    description: "Get familiar with our AI-powered video conferencing platform. This guide will walk you through all the key features.",
    highlights: ["AI-powered insights", "Real-time collaboration", "Adaptive quality"]
  },
  {
    title: "Video Call Interface",
    icon: Video,
    description: "The main video interface shows all participants with professional controls. Mute, camera, and call management are easily accessible.",
    highlights: ["Multi-participant view", "Professional controls", "Real-time quality adaptation"]
  },
  {
    title: "Live Transcription",
    icon: MessageSquare,
    description: "Our AI automatically transcribes everything said in the meeting. Perfect for accessibility and creating meeting records.",
    highlights: ["Real-time speech-to-text", "Speaker identification", "Downloadable transcripts"]
  },
  {
    title: "Meeting Summary & MOM",
    icon: FileText,
    description: "AI generates comprehensive meeting summaries including key points, decisions, and action items automatically.",
    highlights: ["Auto-generated summaries", "Action item tracking", "Exportable reports"]
  },
  {
    title: "Engagement Analytics",
    icon: TrendingUp,
    description: "Track participation with speaking time distribution and engagement scores to ensure balanced meetings.",
    highlights: ["Speaking time analysis", "Engagement scoring", "Participation insights"]
  },
  {
    title: "Network Adaptation",
    icon: Wifi,
    description: "Smart quality adjustment based on your network conditions ensures the best possible meeting experience.",
    highlights: ["Adaptive video quality", "Real-time network monitoring", "Seamless optimization"]
  },
  {
    title: "Call Statistics",
    icon: BarChart3,
    description: "Monitor call quality in real-time with detailed metrics on latency, jitter, and media quality.",
    highlights: ["Real-time monitoring", "Quality metrics", "Performance optimization"]
  }
];

export const GuidedWalkthrough = ({ open, onOpenChange }: GuidedWalkthroughProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < walkthroughSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onOpenChange(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    onOpenChange(false);
  };

  const currentStepData = walkthroughSteps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Feature Walkthrough</span>
            <Badge variant="secondary" className="text-xs">
              {currentStep + 1} of {walkthroughSteps.length}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Step Content */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{currentStepData.title}</h3>
                <p className="text-muted-foreground">{currentStepData.description}</p>
              </div>

              {/* Feature Highlights */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm mb-3">Key Features:</h4>
                {currentStepData.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-success flex-shrink-0" />
                    <span className="text-sm">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Demo Simulation */}
              {currentStep === 0 && (
                <div className="mt-6 bg-muted/20 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-2">Demo Mode Active</div>
                  <div className="text-xs text-muted-foreground">
                    You're currently in a simulated meeting environment with AI-powered features enabled.
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Progress Indicator */}
          <div className="flex space-x-2 justify-center">
            {walkthroughSteps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button variant="ghost" onClick={handleClose}>
              Skip Tour
            </Button>
            
            <Button onClick={handleNext}>
              {currentStep === walkthroughSteps.length - 1 ? "Finish" : "Next"}
              {currentStep < walkthroughSteps.length - 1 && (
                <ArrowRight className="w-4 h-4 ml-2" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};