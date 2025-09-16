import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Briefcase,
  Calendar,
  CreditCard,
  DollarSign,
  Settings,
  Users,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const upcomingAppointments = [
  { id: 1, client: "Jane Doe", service: "Plumbing Leak Fix", time: "10:00 AM", status: "Confirmed" },
  { id: 2, client: "John Smith", service: "AC Maintenance", time: "2:00 PM", status: "Confirmed" },
];

const recentJobs = [
    {id: 1, title: 'Bathroom Renovation', earnings: 25000, status: 'Completed'},
    {id: 2, title: 'Kitchen Cabinet Install', earnings: 15000, status: 'Completed'},
]

export default function ServiceHubPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">My Service Hub</h1>
        <p className="text-muted-foreground">
          Manage your business, appointments, and earnings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh 45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12</div>
            <p className="text-xs text-muted-foreground">
              Appointments this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+23</div>
            <p className="text-xs text-muted-foreground">
              Potential clients this month
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Unread messages & alerts
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                 <CardHeader>
                    <CardTitle>Recent Jobs</CardTitle>
                    <CardDescription>An overview of your completed work.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Job Title</TableHead>
                                <TableHead>Earnings (KSh)</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentJobs.map(job => (
                                <TableRow key={job.id}>
                                    <TableCell className="font-medium">{job.title}</TableCell>
                                    <TableCell>{job.earnings.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Badge className="bg-green-500/20 text-green-700 border-green-500/30">{job.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm">View</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {upcomingAppointments.map(appt => (
                        <div key={appt.id} className="flex items-center gap-4 p-2 rounded-md bg-muted/50">
                            <div className="p-3 rounded-full bg-background">
                                <Calendar className="w-5 h-5 text-primary"/>
                            </div>
                            <div>
                                <p className="font-semibold">{appt.service}</p>
                                <p className="text-sm text-muted-foreground">{appt.client} at {appt.time}</p>
                            </div>
                        </div>
                    ))}
                     <Button className="w-full">View Full Calendar</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-2">
                    <Button variant="outline"><Briefcase className="w-4 h-4 mr-2"/> My Services</Button>
                    <Button variant="outline"><CreditCard className="w-4 h-4 mr-2"/> Payouts</Button>
                    <Button variant="outline"><Users className="w-4 h-4 mr-2"/> My Profile</Button>
                    <Button variant="outline"><Settings className="w-4 h-4 mr-2"/> Settings</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
