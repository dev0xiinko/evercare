"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockPatients } from "@/lib/mock-data"
import { Pill, RefreshCw, Plus } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import { getAccessibleMedications } from "@/lib/utils"

export default function PharmacyPage() {
  const user = getCurrentUser()
  const accessibleMedications = getAccessibleMedications(user)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Pharmacy</h1>
          <p className="text-muted-foreground mt-1">Prescription management and refill requests</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Prescription
        </Button>
      </div>

      <div className="grid gap-4">
        {accessibleMedications.map((med) => {
          const patient = mockPatients.find((p) => p.id === med.patientId)
          return (
            <Card key={med.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <Pill className="w-5 h-5 text-secondary" />
                      {med.medication}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Patient: {patient?.name} (ID: {med.patientId})
                    </CardDescription>
                  </div>
                  <Badge variant={med.status === "Active" ? "default" : "secondary"}>{med.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Dosage</p>
                    <p className="text-base font-semibold">{med.dosage}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Frequency</p>
                    <p className="text-base">{med.frequency}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Start Date</p>
                    <p className="text-base">{med.startDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Prescribed By</p>
                    <p className="text-base">{med.prescribedBy}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <RefreshCw className="w-4 h-4" />
                    Request Refill
                  </Button>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="border-dashed border-2">
        <CardContent className="pt-6">
          <p className="text-sm text-center text-muted-foreground">
            <strong>Prototype Feature:</strong> Refill requests are simulated for demonstration purposes.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
