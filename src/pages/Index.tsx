import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Video, Plus, Users, Sparkles, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { OnboardingModal } from "@/components/OnboardingModal";
import heroImage from "@/assets/hero-meeting-interface.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleJoinMeeting = () => {
    if (!roomId.trim()) {
      toast({
        title: "Room ID Required",
        description: "Please enter a meeting room ID to join.",
        variant: "destructive",
      });
      return;
    }
    navigate(`/meeting/${roomId}`);
  };

  const handleCreateMeeting = () => {
    const newRoomId = Math.random().toString(36).substring(2, 12);
    navigate(`/meeting/${newRoomId}`);
  };

  const handleDemo = () => {
    setShowOnboarding(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center">
              <Video className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Smart Meeting Hub</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Video Conferencing</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={handleDemo}
            className="hidden sm:flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Try Demo</span>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pb-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Meet Smarter, <br />
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Connect Better
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Experience next-generation video conferencing with AI-powered insights, 
              real-time transcription, and adaptive network optimization.
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
            {/* Join Meeting Card */}
            <Card className="glass-card border-2 hover:border-primary/50 transition-all duration-300 animate-slide-up">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Join a Meeting</h3>
                <p className="text-muted-foreground mb-6">
                  Enter a room ID to join an existing meeting
                </p>
                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Enter Room ID"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="text-center text-lg"
                    onKeyPress={(e) => e.key === 'Enter' && handleJoinMeeting()}
                  />
                  <Button 
                    onClick={handleJoinMeeting}
                    className="w-full btn-hero"
                    size="lg"
                  >
                    <Video className="w-5 h-5 mr-2" />
                    Join Meeting
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Create Meeting Card */}
            <Card className="glass-card border-2 hover:border-primary/50 transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <Plus className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Create a Meeting</h3>
                <p className="text-muted-foreground mb-6">
                  Start a new meeting room instantly
                </p>
                <Button 
                  onClick={handleCreateMeeting}
                  className="w-full btn-hero"
                  size="lg"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Meeting
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Demo Button for Mobile */}
          <div className="sm:hidden mb-16">
            <Button 
              variant="outline" 
              onClick={handleDemo}
              className="w-full"
              size="lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Try Interactive Demo
            </Button>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={heroImage} 
              alt="Smart Meeting Hub Interface - AI-powered video conferencing with real-time analytics" 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose Smart Meeting Hub?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-4">AI-Powered Insights</h4>
              <p className="text-muted-foreground">
                Get real-time transcription, meeting summaries, and engagement analytics
              </p>
            </div>
            
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-success/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Zap className="w-8 h-8 text-success" />
              </div>
              <h4 className="text-xl font-semibold mb-4">Adaptive Network</h4>
              <p className="text-muted-foreground">
                Smart quality adjustment based on your network conditions
              </p>
            </div>
            
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-warning/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Shield className="w-8 h-8 text-warning" />
              </div>
              <h4 className="text-xl font-semibold mb-4">Enterprise Security</h4>
              <p className="text-muted-foreground">
                End-to-end encryption and enterprise-grade security features
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Onboarding Modal */}
      <OnboardingModal 
        open={showOnboarding} 
        onOpenChange={setShowOnboarding}
        onComplete={() => {
          setShowOnboarding(false);
          handleCreateMeeting();
        }}
      />
    </div>
  );
};

export default Index;