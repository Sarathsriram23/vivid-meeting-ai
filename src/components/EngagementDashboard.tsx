import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Eye, BarChart3 } from "lucide-react";

export const EngagementDashboard = () => {
  const participants = [
    { name: "You", speakingTime: 45, engagementScore: 85, color: "bg-primary" },
    { name: "Alice Johnson", speakingTime: 30, engagementScore: 92, color: "bg-success" },
    { name: "Bob Smith", speakingTime: 25, engagementScore: 78, color: "bg-warning" },
    { name: "Carol Davis", speakingTime: 20, engagementScore: 88, color: "bg-accent" }
  ];

  const totalTime = participants.reduce((sum, p) => sum + p.speakingTime, 0);

  const getEngagementColor = (score: number) => {
    if (score >= 80) return "text-success bg-success/10";
    if (score >= 60) return "text-warning bg-warning/10";
    return "text-destructive bg-destructive/10";
  };

  const getEngagementLabel = (score: number) => {
    if (score >= 80) return "High";
    if (score >= 60) return "Medium";
    return "Low";
  };

  return (
    <Card className="glass-card h-80">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Engagement Analytics</CardTitle>
          </div>
          <Badge variant="secondary" className="text-xs">
            Real-time
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 pb-4 space-y-4">
        {/* Overall Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/20 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Meeting Duration</span>
            </div>
            <p className="text-lg font-bold">42 min</p>
          </div>
          
          <div className="bg-muted/20 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Eye className="w-4 h-4 text-success" />
              <span className="text-sm font-medium">Avg Attention</span>
            </div>
            <p className="text-lg font-bold">86%</p>
          </div>
        </div>

        {/* Speaking Time Distribution */}
        <div>
          <h4 className="font-semibold text-sm mb-3 flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Speaking Time Distribution</span>
          </h4>
          
          <div className="space-y-3">
            {participants.map((participant) => {
              const percentage = (participant.speakingTime / totalTime) * 100;
              
              return (
                <div key={participant.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${participant.color}`}></div>
                      <span className="font-medium">{participant.name}</span>
                    </div>
                    <span className="text-muted-foreground">{participant.speakingTime}%</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Engagement Scores */}
        <div>
          <h4 className="font-semibold text-sm mb-3">Engagement Scores</h4>
          <div className="grid grid-cols-2 gap-2">
            {participants.map((participant) => (
              <div key={participant.name} className="bg-muted/20 rounded-lg p-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium truncate">{participant.name}</span>
                  <Badge className={`text-xs ${getEngagementColor(participant.engagementScore)}`}>
                    {getEngagementLabel(participant.engagementScore)}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress 
                    value={participant.engagementScore} 
                    className="h-1.5 flex-1" 
                  />
                  <span className="text-xs font-medium">{participant.engagementScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};