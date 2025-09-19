import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { Wifi, WifiOff, AlertTriangle, Settings } from "lucide-react";

type NetworkStatus = "good" | "poor" | "critical";

interface NetworkMetrics {
  latency: number;
  jitter: number;
  packetLoss: number;
  bandwidth: number;
}

export const NetworkStatusWidget = () => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>("good");
  const [metrics, setMetrics] = useState<NetworkMetrics>({
    latency: 45,
    jitter: 2,
    packetLoss: 0.1,
    bandwidth: 25.4
  });
  const [adaptationActive, setAdaptationActive] = useState(false);

  useEffect(() => {
    // Simulate network condition changes
    const interval = setInterval(() => {
      const scenarios = [
        { status: "good" as NetworkStatus, latency: 35, jitter: 1, packetLoss: 0.1, bandwidth: 28.2 },
        { status: "poor" as NetworkStatus, latency: 120, jitter: 8, packetLoss: 1.2, bandwidth: 15.8 },
        { status: "critical" as NetworkStatus, latency: 250, jitter: 15, packetLoss: 3.5, bandwidth: 8.1 }
      ];
      
      const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
      setNetworkStatus(scenario.status);
      setMetrics({
        latency: scenario.latency,
        jitter: scenario.jitter,
        packetLoss: scenario.packetLoss,
        bandwidth: scenario.bandwidth
      });
      
      // Trigger adaptation for poor/critical conditions
      if (scenario.status !== "good") {
        setAdaptationActive(true);
        setTimeout(() => setAdaptationActive(false), 3000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = () => {
    switch (networkStatus) {
      case "good":
        return <Wifi className="w-4 h-4 text-success" />;
      case "poor":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "critical":
        return <WifiOff className="w-4 h-4 text-destructive" />;
    }
  };

  const getStatusColor = () => {
    switch (networkStatus) {
      case "good":
        return "bg-success/20 text-success border-success/30";
      case "poor":
        return "bg-warning/20 text-warning border-warning/30";
      case "critical":
        return "bg-destructive/20 text-destructive border-destructive/30";
    }
  };

  const getQualityScore = () => {
    const latencyScore = Math.max(0, 100 - (metrics.latency / 2));
    const jitterScore = Math.max(0, 100 - (metrics.jitter * 5));
    const packetLossScore = Math.max(0, 100 - (metrics.packetLoss * 20));
    return Math.round((latencyScore + jitterScore + packetLossScore) / 3);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <Badge variant="secondary" className={`text-xs capitalize ${getStatusColor()}`}>
              {networkStatus}
            </Badge>
          </div>
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Network Status</h4>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {/* Overall Quality */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Connection Quality</span>
              <span className="text-sm font-bold">{getQualityScore()}%</span>
            </div>
            <Progress value={getQualityScore()} className="h-2" />
          </div>

          {/* Detailed Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Latency</span>
              <p className="text-sm font-bold">{metrics.latency}ms</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Jitter</span>
              <p className="text-sm font-bold">{metrics.jitter}ms</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Packet Loss</span>
              <p className="text-sm font-bold">{metrics.packetLoss}%</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Bandwidth</span>
              <p className="text-sm font-bold">{metrics.bandwidth} Mbps</p>
            </div>
          </div>

          {/* Adaptation Status */}
          {adaptationActive && (
            <div className="bg-warning/10 border border-warning/30 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-warning" />
                <span className="text-sm font-medium text-warning">Adapting Quality</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Video quality reduced to maintain stable connection
              </p>
            </div>
          )}

          {/* Before/After Comparison for adaptation */}
          {networkStatus !== "good" && (
            <Card className="bg-muted/20">
              <CardContent className="p-3">
                <h5 className="text-xs font-medium mb-2">Quality Adaptation</h5>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-muted-foreground">Before</p>
                    <p>1080p • 30fps</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">After</p>
                    <p className={networkStatus === "critical" ? "720p • Audio Only" : "720p • 15fps"}>
                      {networkStatus === "critical" ? "Audio Only" : "720p • 15fps"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};