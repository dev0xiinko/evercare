"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockActivities, mockNotifications } from "@/lib/mock-data"
import { getCurrentUser, isStaff, isRelative } from "@/lib/auth"
import { Activity, Bell, Users, AlertCircle, Heart, TrendingUp, Globe, FileText, Clock, MessageSquare, Pill, Droplet, Thermometer } from "lucide-react"
import { getAccessiblePatients, getAccessibleActivities, getAccessibleNotifications, getAccessibleMessages } from "@/lib/utils"

export default function DashboardPage() {
  const user = getCurrentUser()
  const router = useRouter()
  const userIsStaff = isStaff(user)
  const userIsRelative = isRelative(user)

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/")
    }
  }, [user, router])

  const accessiblePatients = getAccessiblePatients(user)
  const accessibleActivities = getAccessibleActivities(user)
  const accessibleNotifications = getAccessibleNotifications(user)
  const accessibleMessages = getAccessibleMessages(user)

  const activePatients = accessiblePatients.filter((p) => p.status === "Active").length
  const criticalPatients = accessiblePatients.filter((p) => p.status === "Critical").length
  const unreadNotifications = accessibleNotifications.filter((n) => !n.read).length

  if (userIsRelative) {
    return <RelativeDashboard user={user} patients={accessiblePatients} activities={accessibleActivities} notifications={accessibleNotifications} messages={accessibleMessages} />
  }

  return <StaffDashboard user={user} patients={accessiblePatients} activePatients={activePatients} criticalPatients={criticalPatients} unreadNotifications={unreadNotifications} activities={accessibleActivities} notifications={accessibleNotifications} />
}

function StaffDashboard({ user, patients, activePatients, criticalPatients, unreadNotifications, activities, notifications }: any) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Welcome back, <span className="text-primary">{user?.name}</span>
          </h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your patients today</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white px-4 py-2 rounded-full border shadow-sm">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          System Operational
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-white overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Patients</CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Users className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-foreground">{patients.length}</div>
            <p className="text-xs text-muted-foreground mt-1 font-medium flex items-center gap-1">
              <span className="text-green-600 bg-green-100 px-1.5 py-0.5 rounded text-[10px] font-bold">
                +{activePatients}
              </span>
              active cases
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-white overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-destructive/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-muted-foreground">Critical Cases</CardTitle>
            <div className="p-2 bg-destructive/10 rounded-lg text-destructive">
              <AlertCircle className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-destructive">{criticalPatients}</div>
            <p className="text-xs text-muted-foreground mt-1 font-medium">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-white overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-muted-foreground">Notifications</CardTitle>
            <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
              <Bell className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-foreground">{unreadNotifications}</div>
            <p className="text-xs text-muted-foreground mt-1 font-medium">Unread messages</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-linear-to-br from-secondary to-secondary/80 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-8 -mt-8"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-white/80">Wellness Score</CardTitle>
            <div className="p-2 bg-white/20 rounded-lg text-white">
              <Heart className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold">92%</div>
            <p className="text-xs text-white/80 mt-1 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

            <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Activity className="w-5 h-5 text-secondary" />
              </div>
              Recent Activities
            </CardTitle>
            <CardDescription>Latest updates from the facility</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {activities.map((activity: any, index: number) => (
                <div key={activity.id} className="flex items-start gap-4 relative">
                  {index !== activities.length - 1 && (
                    <div className="absolute left-[11px] top-8 -bottom-6 w-0.5 bg-muted"></div>
                  )}
                  <div className="w-6 h-6 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center shrink-0 z-10">
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  </div>
                  <div className="flex-1 min-w-0 bg-muted/30 p-3 rounded-xl -mt-1">
                    <p className="text-sm font-medium text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              Notifications
              {unreadNotifications > 0 && (
                <Badge variant="default" className="ml-auto bg-primary hover:bg-primary/90">
                  {unreadNotifications} New
                </Badge>
              )}
            </CardTitle>
            <CardDescription>Important alerts and reminders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map((notification: any) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 rounded-xl transition-all ${
                    !notification.read
                      ? "bg-white border border-l-4 border-l-primary shadow-sm"
                      : "bg-muted/30 border border-transparent"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                      notification.type === "urgent"
                        ? "bg-destructive"
                        : notification.type === "reminder"
                          ? "bg-primary"
                          : "bg-muted-foreground"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm ${!notification.read ? "font-semibold text-foreground" : "font-medium text-muted-foreground"}`}
                    >
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                  {!notification.read && <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2"></div>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vision & Mission */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-[#8B2635] text-white border-none shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 opacity-80" />
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/90 leading-relaxed font-medium">
              To be the leading provider of compassionate, comprehensive healthcare services for seniors, creating a
              safe haven where every individual thrives through every season of life.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-secondary text-white border-none shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 opacity-80" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/90 leading-relaxed font-medium">
              To deliver integrated, person-centered care that respects dignity and independence, enabling individuals
              to live fulfilling lives with the support they need.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function RelativeDashboard({ user, patients, activities, notifications, messages }: any) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Welcome, <span className="text-primary">{user?.name}</span>
          </h1>
          <p className="text-muted-foreground mt-1">View updates and information about your loved one</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white px-4 py-2 rounded-full border shadow-sm">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          System Operational
        </div>
      </div>

      {/* Patient Overview Card with Health Tracking */}
      {patients.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Patient Card */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  {patients[0].name}
                </CardTitle>
                <CardDescription>Patient Overview & Status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Current Status</p>
                    <Badge variant={patients[0].status === "Critical" ? "destructive" : patients[0].status === "Active" ? "default" : "secondary"}>
                      {patients[0].status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Age</p>
                    <p className="text-lg font-semibold">{patients[0].age} years</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Room Location</p>
                    <p className="text-lg font-semibold">{patients[0].room}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Admitted</p>
                    <p className="text-lg font-semibold">{patients[0].admissionDate}</p>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <p className="text-sm text-muted-foreground">Active Conditions</p>
                    <div className="flex flex-wrap gap-2">
                      {patients[0].conditions.map((condition: string) => (
                        <Badge key={condition} variant="secondary" className="text-xs">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <p className="text-sm text-muted-foreground">Known Allergies</p>
                    <div className="flex flex-wrap gap-2">
                      {patients[0].allergies.map((allergy: string) => (
                        <Badge key={allergy} variant="outline" className="text-xs bg-destructive/10 text-destructive border-destructive/20">
                          ⚠️ {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Health Metrics Card */}
          <Card className="border-none shadow-md bg-linear-to-br from-secondary/10 to-secondary/5">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Heart className="w-4 h-4 text-secondary" />
                Health Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">Vitals Status</p>
                  <Badge className="bg-green-100 text-green-800">Stable</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">Last Checkup</p>
                  <p className="text-xs font-semibold">Today</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">Activity Level</p>
                  <p className="text-xs font-semibold">Good</p>
                </div>
              </div>
              <div className="pt-2 border-t">
                <p className="text-xs text-center text-secondary font-medium">Recovery progressing well</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Messages Section */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            Messages from Care Team
          </CardTitle>
          <CardDescription>Communication about your loved one's care</CardDescription>
        </CardHeader>
        <CardContent>
          {messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((message: any) => (
                <div
                  key={message.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    message.senderRole === "staff"
                      ? "border-l-secondary bg-secondary/5"
                      : "border-l-primary bg-primary/5"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-sm text-foreground">{message.senderName}</p>
                      <p className="text-xs text-muted-foreground">{message.senderRole === "staff" ? "Care Staff" : "Family"}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{message.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">No messages yet. Check back soon for updates from the care team!</p>
          )}
        </CardContent>
      </Card>

      {/* Recent Activities & Notifications */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Clock className="w-5 h-5 text-secondary" />
              </div>
              Recent Updates
            </CardTitle>
            <CardDescription>Latest information about care</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {activities.length > 0 ? (
                activities.map((activity: any, index: number) => (
                  <div key={activity.id} className="flex items-start gap-4 relative">
                    {index !== activities.length - 1 && (
                      <div className="absolute left-[11px] top-8 -bottom-6 w-0.5 bg-muted"></div>
                    )}
                    <div className="w-6 h-6 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center shrink-0 z-10">
                      <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    </div>
                    <div className="flex-1 min-w-0 bg-muted/30 p-3 rounded-xl -mt-1">
                      <p className="text-sm font-medium text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">No recent updates</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              Alerts & Notifications
            </CardTitle>
            <CardDescription>Important information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.length > 0 ? (
                notifications.map((notification: any) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 p-4 rounded-xl transition-all ${
                      !notification.read
                        ? "bg-white border border-l-4 border-l-primary shadow-sm"
                        : "bg-muted/30 border border-transparent"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                        notification.type === "urgent"
                          ? "bg-destructive"
                          : notification.type === "reminder"
                            ? "bg-primary"
                            : "bg-muted-foreground"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm ${!notification.read ? "font-semibold text-foreground" : "font-medium text-muted-foreground"}`}
                      >
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                    {!notification.read && <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2"></div>}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">All caught up!</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Help & Support */}
      <Card className="bg-linear-to-br from-primary to-primary/80 text-white border-none shadow-lg">
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription className="text-white/80">
            Contact our support team if you have any questions about your loved one's care
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium mb-1">Phone Support</p>
              <p className="text-white/90">(555) 123-4567</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Email</p>
              <p className="text-white/90">support@evercare.com</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
