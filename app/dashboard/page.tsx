"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockActivities, mockNotifications, mockPatients } from "@/lib/mock-data"
import { getCurrentUser, isStaff } from "@/lib/auth"
import { Activity, Bell, Users, AlertCircle, Heart, TrendingUp, Globe } from "lucide-react"

export default function DashboardPage() {
  const user = getCurrentUser()
  const userIsStaff = isStaff(user)

  const activePatients = mockPatients.filter((p) => p.status === "Active").length
  const criticalPatients = mockPatients.filter((p) => p.status === "Critical").length
  const unreadNotifications = mockNotifications.filter((n) => !n.read).length

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
            <div className="text-3xl font-bold text-foreground">{mockPatients.length}</div>
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

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-secondary to-secondary/80 text-white overflow-hidden relative">
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
              {mockActivities.map((activity, index) => (
                <div key={activity.id} className="flex items-start gap-4 relative">
                  {index !== mockActivities.length - 1 && (
                    <div className="absolute left-[11px] top-8 bottom-[-24px] w-0.5 bg-muted"></div>
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
              {mockNotifications.map((notification) => (
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

        <Card className="bg-[#008C9E] text-white border-none shadow-lg relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-16 -mb-16 blur-3xl"></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 opacity-80" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/90 leading-relaxed font-medium">
              We are committed to delivering exceptional care that honors the dignity, independence, and well-being of
              each resident through innovative healthcare solutions and family partnerships.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
