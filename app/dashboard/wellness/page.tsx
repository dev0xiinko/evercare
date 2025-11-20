"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockPatients } from "@/lib/mock-data"
import { Heart, Activity, TrendingUp, Calendar } from "lucide-react"

export default function WellnessPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Wellness & Rehabilitation</h1>
        <p className="text-muted-foreground mt-1">Track progress and manage therapy sessions</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockPatients.map((patient) => (
          <Card key={patient.id}>
            <CardHeader>
              <CardTitle className="text-lg">{patient.name}</CardTitle>
              <CardDescription>Room: {patient.room}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <Badge variant="secondary">{Math.floor(Math.random() * 30) + 70}%</Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-secondary h-2 rounded-full transition-all"
                    style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Activity className="w-4 h-4 text-secondary" />
                  <span>Physical Therapy: 3x/week</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Heart className="w-4 h-4 text-primary" />
                  <span>Wellness Score: {Math.floor(Math.random() * 20) + 80}/100</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Next Session: Tomorrow 10:00 AM</span>
                </div>
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs font-medium text-muted-foreground mb-2">Recent Milestones</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span className="text-xs">Completed 10 therapy sessions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span className="text-xs">Improved mobility by 15%</span>
                  </div>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full bg-transparent">
                View Full Report
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-secondary/5 to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-secondary" />
            Facility-Wide Wellness Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Average Wellness Score</p>
              <p className="text-2xl font-bold text-secondary">87%</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Programs</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Weekly Sessions</p>
              <p className="text-2xl font-bold">45</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Participation Rate</p>
              <p className="text-2xl font-bold text-primary">92%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
