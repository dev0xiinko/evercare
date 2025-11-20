import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { User } from "./mock-data"
import { mockPatients, mockMedications, mockProgressNotes, mockInvoices, mockEmergencyContacts, mockActivities, mockNotifications, mockMessages } from "./mock-data"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Data filtering functions for role-based access control
export function getAccessiblePatients(user: User | null) {
  if (!user) return []
  
  // Staff sees all patients
  if (user.role === "staff") {
    return mockPatients
  }
  
  // Relatives see only their assigned patients
  if (user.role === "relative" && user.assignedPatientIds) {
    return mockPatients.filter(p => user.assignedPatientIds?.includes(p.id))
  }
  
  return []
}

export function getAccessibleMedications(user: User | null) {
  if (!user) return []
  
  if (user.role === "staff") {
    return mockMedications
  }
  
  if (user.role === "relative" && user.assignedPatientIds) {
    return mockMedications.filter(m => user.assignedPatientIds?.includes(m.patientId))
  }
  
  return []
}

export function getAccessibleProgressNotes(user: User | null) {
  if (!user) return []
  
  if (user.role === "staff") {
    return mockProgressNotes
  }
  
  if (user.role === "relative" && user.assignedPatientIds) {
    return mockProgressNotes.filter(n => user.assignedPatientIds?.includes(n.patientId))
  }
  
  return []
}

export function getAccessibleInvoices(user: User | null) {
  if (!user) return []
  
  if (user.role === "staff") {
    return mockInvoices
  }
  
  if (user.role === "relative" && user.assignedPatientIds) {
    return mockInvoices.filter(i => user.assignedPatientIds?.includes(i.patientId))
  }
  
  return []
}

export function getAccessibleEmergencyContacts(user: User | null) {
  if (!user) return []
  
  if (user.role === "staff") {
    return mockEmergencyContacts
  }
  
  if (user.role === "relative" && user.assignedPatientIds) {
    return mockEmergencyContacts.filter(c => user.assignedPatientIds?.includes(c.patientId))
  }
  
  return []
}

export function getAccessibleActivities(user: User | null) {
  if (!user) return []
  
  if (user.role === "staff") {
    return mockActivities
  }
  
  if (user.role === "relative" && user.assignedPatientIds) {
    return mockActivities.filter(a => !a.patientId || user.assignedPatientIds?.includes(a.patientId))
  }
  
  return []
}

export function getAccessibleNotifications(user: User | null) {
  if (!user) return []
  
  if (user.role === "staff") {
    return mockNotifications
  }
  
  if (user.role === "relative" && user.assignedPatientIds) {
    return mockNotifications.filter(n => !n.patientId || user.assignedPatientIds?.includes(n.patientId))
  }
  
  return []
}

export function getAccessibleMessages(user: User | null) {
  if (!user) return []
  
  if (user.role === "staff") {
    return mockMessages
  }
  
  if (user.role === "relative" && user.assignedPatientIds) {
    return mockMessages.filter(m => user.assignedPatientIds?.includes(m.patientId))
  }
  
  return []
}
