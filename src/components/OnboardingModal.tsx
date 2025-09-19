import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { User, ArrowRight, Sparkles } from "lucide-react";

interface OnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (name: string) => void;
}

export const OnboardingModal = ({ open, onOpenChange, onComplete }: OnboardingModalProps) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");

  const handleNext = () => {
    if (step === 1 && !name.trim()) {
      return;
    }
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(name);
    }
  };

  const handleSkip = () => {
    onComplete("Guest User");
  };

  const resetAndClose = () => {
    setStep(1);
    setName("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span>Welcome to Smart Meeting Hub</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Let's get started</h3>
                <p className="text-muted-foreground text-sm">
                  Enter your name to personalize your meeting experience
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">Demo Features</h3>
                <p className="text-muted-foreground text-sm">
                  Experience these AI-powered features in the demo
                </p>
              </div>
              
              <div className="space-y-3">
                <Card>
                  <CardContent className="p-3">
                    <h4 className="font-medium">Real-time Transcription</h4>
                    <p className="text-sm text-muted-foreground">Live speech-to-text conversion</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3">
                    <h4 className="font-medium">Engagement Analytics</h4>
                    <p className="text-sm text-muted-foreground">Track speaking time and attention</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3">
                    <h4 className="font-medium">Meeting Summary</h4>
                    <p className="text-sm text-muted-foreground">AI-generated meeting notes</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Ready to go!</h3>
                <p className="text-muted-foreground text-sm">
                  You'll join a demo meeting with simulated participants and AI features
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <Button variant="ghost" onClick={handleSkip}>
              Skip Demo
            </Button>
            
            <div className="flex space-x-2">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              )}
              <Button onClick={handleNext}>
                {step === 3 ? "Start Demo" : "Next"}
                {step < 3 && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="flex space-x-2 justify-center">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i <= step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};