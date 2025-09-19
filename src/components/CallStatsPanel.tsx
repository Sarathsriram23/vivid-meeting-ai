import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Activity, Signal, Zap, MonitorSpeaker } from "lucide-react";

interface CallStats {
  latency: number;
  jitter: number;
  packetLoss: number;
  audioQuality: number;
  videoQuality: number;
  cpuUsage: number;
}

export const CallStatsPanel = () => {
  const [stats, setStats] = useState<CallStats>({
    latency: 45,
    jitter: 2.1,
    packetLoss: 0.1,
    audioQuality: 95,
    videoQuality: 88,
    cpuUsage: 25
  });

  useEffect(() => {
    // Simulate real-time stats updates
    const interval = setInterval(() => {
      setStats(prev => ({
        latency: Math.max(20, prev.latency + (Math.random() - 0.5) * 20),
        jitter: Math.max(0.5, prev.jitter + (Math.random() - 0.5) * 2),
        packetLoss: Math.max(0, prev.packetLoss + (Math.random() - 0.5) * 0.5),
        audioQuality: Math.max(70, Math.min(100, prev.audioQuality + (Math.random() - 0.5) * 10)),
        videoQuality: Math.max(60, Math.min(100, prev.videoQuality + (Math.random() - 0.5) * 15)),
        cpuUsage: Math.max(15, Math.min(80, prev.cpuUsage + (Math.random() - 0.5) * 10))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getQualityColor = (quality: number) => {
    if (quality >= 85) return "text-success";
    if (quality >= 70) return "text-warning";
    return "text-destructive";
  };

  const getLatencyColor = (latency: number) => {
    if (latency < 50) return "text-success";
    if (latency < 100) return "text-warning";
    return "text-destructive";
  };

  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Call Statistics</CardTitle>
          </div>
          <Badge variant="secondary" className="text-xs animate-pulse">
            Live
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 pb-4">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Network Metrics */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm flex items-center space-x-2">
              <Signal className="w-4 h-4" />
              <span>Network Performance</span>
            </h4>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-muted-foreground">Latency</span>
                  <span className={`text-sm font-bold ${getLatencyColor(stats.latency)}`}>
                    {stats.latency.toFixed(0)}ms
                  </span>
                </div>
                <Progress 
                  value={Math.min(100, (200 - stats.latency) / 2)} 
                  className="h-2" 
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-muted-foreground">Jitter</span>
                  <span className="text-sm font-bold">{stats.jitter.toFixed(1)}ms</span>
                </div>
                <Progress 
                  value={Math.min(100, (20 - stats.jitter) * 5)} 
                  className="h-2" 
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-muted-foreground">Packet Loss</span>
                  <span className="text-sm font-bold">{stats.packetLoss.toFixed(1)}%</span>
                </div>
                <Progress 
                  value={Math.min(100, (5 - stats.packetLoss) * 20)} 
                  className="h-2" 
                />
              </div>
            </div>
          </div>

          {/* Media Quality */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm flex items-center space-x-2">
              <MonitorSpeaker className="w-4 h-4" />
              <span>Media Quality</span>
            </h4>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-muted-foreground">Audio Quality</span>
                  <span className={`text-sm font-bold ${getQualityColor(stats.audioQuality)}`}>
                    {stats.audioQuality.toFixed(0)}%
                  </span>
                </div>
                <Progress value={stats.audioQuality} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-muted-foreground">Video Quality</span>
                  <span className={`text-sm font-bold ${getQualityColor(stats.videoQuality)}`}>
                    {stats.videoQuality.toFixed(0)}%
                  </span>
                </div>
                <Progress value={stats.videoQuality} className="h-2" />
              </div>

              <div className="bg-muted/20 rounded-lg p-3 mt-3">
                <div className="text-xs text-muted-foreground mb-1">Current Resolution</div>
                <div className="text-sm font-medium">1080p • 30fps</div>
              </div>
            </div>
          </div>

          {/* System Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>System Resources</span>
            </h4>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-muted-foreground">CPU Usage</span>
                  <span className="text-sm font-bold">{stats.cpuUsage.toFixed(0)}%</span>
                </div>
                <Progress value={stats.cpuUsage} className="h-2" />
              </div>

              <div className="space-y-2 mt-4">
                <div className="bg-muted/20 rounded-lg p-3">
                  <div className="text-xs text-muted-foreground mb-1">Bandwidth Used</div>
                  <div className="text-sm font-medium">2.4 Mbps ↑ / 8.1 Mbps ↓</div>
                </div>
                
                <div className="bg-muted/20 rounded-lg p-3">
                  <div className="text-xs text-muted-foreground mb-1">Connection Type</div>
                  <div className="text-sm font-medium">WiFi • 5GHz</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};