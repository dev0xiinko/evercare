"use client"

import { mockUsers, type User, type UserRole } from "./mock-data"

export function login(email: string, password: string, userType: UserRole): User | null {
  const user = mockUsers.find((u) => u.email === email && u.password === password && u.role === userType)

  if (user) {
    // Store user in localStorage for prototype
    localStorage.setItem("currentUser", JSON.stringify(user))
    return user
  }

  return null
}

export function logout() {
  localStorage.removeItem("currentUser")
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  const userStr = localStorage.getItem("currentUser")
  if (!userStr) return null

  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export function isStaff(user: User | null): boolean {
  return user?.role === "staff"
}

export function isRelative(user: User | null): boolean {
  return user?.role === "relative"
}

export function canAccessPatient(user: User | null, patientId: string): boolean {
  if (!user) return false

  // Staff can access all patients
  if (user.role === "staff") return true

  // Relatives can only access their assigned patients
  if (user.role === "relative" && user.assignedPatientIds) {
    return user.assignedPatientIds.includes(patientId)
  }

  return false
}
