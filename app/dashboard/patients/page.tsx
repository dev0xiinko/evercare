"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Search, Plus, Phone, User } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import { getAccessiblePatients, getAccessibleEmergencyContacts } from "@/lib/utils"

export default function PatientsPage() {
  const user = getCurrentUser()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)

  const accessiblePatients = getAccessiblePatients(user)
  const filteredPatients = accessiblePatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedPatientData = accessiblePatients.find((p) => p.id === selectedPatient)
  const accessibleContacts = getAccessibleEmergencyContacts(user)
  const patientContacts = accessibleContacts.filter((c) => c.patientId === selectedPatient)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Patient Management</h1>
          <p className="text-muted-foreground mt-1">View and manage patient information</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Register New Patient
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search patients by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Patient List */}
        <Card>
          <CardHeader>
            <CardTitle>Patients ({filteredPatients.length})</CardTitle>
            <CardDescription>Click on a patient to view details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    selectedPatient === patient.id ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{patient.name}</h3>
                        <Badge
                          variant={
                            patient.status === "Critical"
                              ? "destructive"
                              : patient.status === "Active"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {patient.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">ID: {patient.id}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                        <span>Age: {patient.age}</span>
                        <span>Room: {patient.room}</span>
                        <span>Gender: {patient.gender}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Patient Details */}
        <div className="space-y-6">
          {selectedPatientData ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Patient Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Name</p>
                      <p className="text-base font-semibold">{selectedPatientData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Patient ID</p>
                      <p className="text-base font-semibold">{selectedPatientData.id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Age</p>
                      <p className="text-base">{selectedPatientData.age} years</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Gender</p>
                      <p className="text-base">{selectedPatientData.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Room</p>
                      <p className="text-base">{selectedPatientData.room}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Admission Date</p>
                      <p className="text-base">{selectedPatientData.admissionDate}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Conditions</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPatientData.conditions.map((condition, idx) => (
                        <Badge key={idx} variant="secondary">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Allergies</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPatientData.allergies.map((allergy, idx) => (
                        <Badge key={idx} variant="destructive">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-secondary" />
                    Emergency Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {patientContacts.map((contact) => (
                      <div key={contact.id} className="p-3 rounded-lg border">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="font-semibold">{contact.name}</h4>
                            <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                            <p className="text-sm font-medium mt-1">{contact.phone}</p>
                          </div>
                          <Badge variant="outline">{contact.caregiverType}</Badge>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full gap-2 bg-transparent">
                      <Plus className="w-4 h-4" />
                      Add Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="py-12">
                <div className="text-center text-muted-foreground">
                  <User className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Select a patient to view details</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
