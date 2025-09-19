import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Download, RefreshCw, CheckCircle } from "lucide-react";

interface ActionItem {
  id: number;
  task: string;
  assignee: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
}

export const MeetingSummaryPanel = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
  
  const [summary] = useState({
    title: "Q4 Product Planning Meeting",
    duration: "45 minutes",
    participants: ["Alice Johnson", "Bob Smith", "Carol Davis", "You"],
    keyPoints: [
      "Reviewed mobile app mockups and user feedback",
      "Discussed backend performance optimizations",
      "Planned Q4 feature rollout timeline",
      "Addressed security concerns for new API endpoints"
    ],
    decisions: [
      "Prioritize mobile-first design approach",
      "Implement caching for API responses",
      "Schedule weekly check-ins for Q4 projects"
    ]
  });

  const [actionItems, setActionItems] = useState<ActionItem[]>([
    { id: 1, task: "Review and approve mobile mockups", assignee: "Carol Davis", dueDate: "Tomorrow", priority: "high" },
    { id: 2, task: "Update API documentation", assignee: "Bob Smith", dueDate: "End of week", priority: "medium" },
    { id: 3, task: "Set up performance monitoring", assignee: "Alice Johnson", dueDate: "Next week", priority: "medium" },
    { id: 4, task: "Schedule Q4 planning workshop", assignee: "You", dueDate: "This Friday", priority: "high" }
  ]);

  const handleRegenerateSummary = async () => {
    setIsGenerating(true);
    // Simulate AI generation delay
    setTimeout(() => {
      setIsGenerating(false);
      setLastUpdated(new Date().toLocaleTimeString());
    }, 2000);
  };

  const handleDownloadSummary = () => {
    const summaryContent = `
MEETING SUMMARY
===============

Title: ${summary.title}
Duration: ${summary.duration}
Participants: ${summary.participants.join(", ")}
Generated: ${new Date().toLocaleString()}

KEY DISCUSSION POINTS:
${summary.keyPoints.map(point => `• ${point}`).join('\n')}

DECISIONS MADE:
${summary.decisions.map(decision => `• ${decision}`).join('\n')}

ACTION ITEMS:
${actionItems.map(item => `• ${item.task} - ${item.assignee} (${item.dueDate}) [${item.priority.toUpperCase()}]`).join('\n')}
    `.trim();

    const blob = new Blob([summaryContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meeting-summary-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-400 bg-red-400/10";
      case "medium": return "text-yellow-400 bg-yellow-400/10";
      case "low": return "text-green-400 bg-green-400/10";
      default: return "text-muted-foreground bg-muted";
    }
  };

  return (
    <Card className="glass-card h-80">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Meeting Summary</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Updated: {lastUpdated}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleRegenerateSummary}
              disabled={isGenerating}
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDownloadSummary}>
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 pb-4">
        <ScrollArea className="h-52">
          <div className="space-y-4 pr-4">
            {/* Meeting Info */}
            <div>
              <h4 className="font-semibold text-sm mb-2">{summary.title}</h4>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>{summary.duration}</span>
                <span>{summary.participants.length} participants</span>
              </div>
            </div>

            <Separator />

            {/* Key Points */}
            <div>
              <h4 className="font-semibold text-sm mb-2">Key Discussion Points</h4>
              <ul className="space-y-1">
                {summary.keyPoints.map((point, index) => (
                  <li key={index} className="text-sm text-foreground/90 flex items-start space-x-2">
                    <span className="text-primary mt-1.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Decisions */}
            <div>
              <h4 className="font-semibold text-sm mb-2">Decisions Made</h4>
              <ul className="space-y-1">
                {summary.decisions.map((decision, index) => (
                  <li key={index} className="text-sm text-foreground/90 flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>{decision}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Action Items */}
            <div>
              <h4 className="font-semibold text-sm mb-2">Action Items</h4>
              <div className="space-y-2">
                {actionItems.map((item) => (
                  <div key={item.id} className="bg-muted/30 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-sm font-medium">{item.task}</span>
                      <Badge className={`text-xs ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Assigned: {item.assignee}</span>
                      <span>Due: {item.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};