"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockPatients, mockMedications, mockProgressNotes } from "@/lib/mock-data"
import { getCurrentUser, isStaff } from "@/lib/auth"
import { FileText, Pill, Activity, AlertCircle, Plus } from "lucide-react"

export default function ClinicalPage() {
  const router = useRouter()
  const user = getCurrentUser()
  const userIsStaff = isStaff(user)

  useEffect(() => {
    if (!userIsStaff) {
      router.push("/dashboard")
    }
  }, [userIsStaff, router])

  if (!userIsStaff) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-destructive" />
            <h2 className="text-xl font-bold mb-2">Access Restricted</h2>
            <p className="text-muted-foreground">Clinical records are only accessible to staff members.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Clinical Records</h1>
        <p className="text-muted-foreground mt-1">Electronic Health Records and clinical documentation</p>
        <Badge variant="destructive" className="mt-2">
          Staff Only
        </Badge>
      </div>

      {/* EHR Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockPatients.map((patient) => (
          <Card key={patient.id}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                {patient.name}
                <Badge variant={patient.status === "Critical" ? "destructive" : "default"}>{patient.status}</Badge>
              </CardTitle>
              <CardDescription>
                ID: {patient.id} • Room: {patient.room}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Vital Signs (Mock)</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>BP: 120/80</div>
                  <div>HR: 72 bpm</div>
                  <div>Temp: 98.6°F</div>
                  <div>O2: 98%</div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Conditions</p>
                <div className="flex flex-wrap gap-1">
                  {patient.conditions.slice(0, 2).map((condition, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                View Full EHR
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Medication Records */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-secondary" />
            Medication Records
          </CardTitle>
          <CardDescription>Active medications across all patients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockMedications.map((med) => {
              const patient = mockPatients.find((p) => p.id === med.patientId)
              return (
                <div key={med.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{med.medication}</h4>
                      <Badge variant={med.status === "Active" ? "default" : "secondary"}>{med.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Patient: {patient?.name} • {med.dosage} • {med.frequency}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Prescribed by: {med.prescribedBy} • Start: {med.startDate}
                    </p>
                  </div>
                </div>
              )
            })}
            <Button variant="outline" className="w-full gap-2 bg-transparent">
              <Plus className="w-4 h-4" />
              Add Medication
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Progress Notes
          </CardTitle>
          <CardDescription>Clinical observations and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockProgressNotes.map((note) => {
              const patient = mockPatients.find((p) => p.id === note.patientId)
              return (
                <div key={note.id} className="p-4 rounded-lg border">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h4 className="font-semibold">{patient?.name}</h4>
                      <p className="text-sm text-muted-foreground">{note.date}</p>
                    </div>
                    <Badge variant="outline">{note.category}</Badge>
                  </div>
                  <p className="text-sm leading-relaxed mb-2">{note.note}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Activity className="w-3 h-3" />
                    <span>
                      {note.author} ({note.authorRole})
                    </span>
                  </div>
                </div>
              )
            })}
            <Button variant="outline" className="w-full gap-2 bg-transparent">
              <Plus className="w-4 h-4" />
              Add Progress Note
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
