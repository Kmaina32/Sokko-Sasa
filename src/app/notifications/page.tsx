import { Bell, Package, MessageSquare, Tag } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const notifications: any[] = [];

export default function NotificationsPage() {
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="font-headline text-4xl font-bold">Notifications</h1>
        <Button variant="link" className="text-primary" disabled={unreadCount === 0}>Mark all as read</Button>
      </div>

      <Card>
        <CardContent className="p-0">
            {notifications.length > 0 ? (
                <div className="divide-y divide-border">
                {notifications.map((notification) => (
                    <div key={notification.id} className={`p-4 flex items-start gap-4 ${!notification.read ? 'bg-muted/50' : ''}`}>
                        <div className="flex-shrink-0 mt-1">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${!notification.read ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                <notification.icon className="w-5 h-5"/>
                            </div>
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold">{notification.title}</p>
                            <p className="text-sm text-muted-foreground">{notification.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                        {!notification.read && <div className="w-2.5 h-2.5 rounded-full bg-primary mt-2"></div>}
                    </div>
                ))}
                </div>
            ) : (
                 <div className="flex flex-col items-center justify-center p-16 text-center">
                    <Bell className="w-16 h-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold">No notifications yet</h3>
                    <p className="text-muted-foreground">We'll let you know when something important happens.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
