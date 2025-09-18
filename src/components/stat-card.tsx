
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  description: string;
  color?: "orange" | "blue" | "green" | "red";
}

export function StatCard({ title, value, icon: Icon, description, color = "orange" }: StatCardProps) {

  const colorClasses = {
      orange: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      green: "bg-green-500/10 text-green-500 border-green-500/20",
      red: "bg-red-500/10 text-red-500 border-red-500/20",
  }

  return (
    <Card className={cn("border-l-4", colorClasses[color])}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
