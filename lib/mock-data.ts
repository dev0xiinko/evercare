export type UserRole = "staff" | "relative"

export interface User {
  id: string
  email: string
  password: string
  role: UserRole
  name: string
}

export interface Patient {
  id: string
  name: string
  age: number
  gender: string
  admissionDate: string
  room: string
  status: "Active" | "Discharged" | "Critical"
  conditions: string[]
  allergies: string[]
}

export interface EmergencyContact {
  id: string
  patientId: string
  name: string
  relationship: string
  phone: string
  caregiverType: "Primary" | "Authorized Relative" | "Guardian"
}

export interface MedicationRecord {
  id: string
  patientId: string
  medication: string
  dosage: string
  frequency: string
  startDate: string
  endDate?: string
  status: "Active" | "Completed" | "Discontinued"
  prescribedBy: string
}

export interface ProgressNote {
  id: string
  patientId: string
  date: string
  author: string
  authorRole: "Nurse" | "Doctor" | "Therapist"
  note: string
  category: string
}

export interface Invoice {
  id: string
  patientId: string
  patientName: string
  date: string
  dueDate: string
  amount: number
  status: "Paid" | "Pending" | "Overdue"
  items: {
    description: string
    amount: number
  }[]
}

// Mock users
export const mockUsers: User[] = [
  {
    id: "1",
    email: "staff@velez.com",
    password: "staff123",
    role: "staff",
    name: "Dr. Dhane Almonicar",
  },
  {
    id: "2",
    email: "relative@gmail.com",
    password: "relative123",
    role: "relative",
    name: "Adrian Alquizar",
  },
]

// Mock patients
export const mockPatients: Patient[] = [
  {
    id: "P001",
    name: "Maria Rodriguez",
    age: 78,
    gender: "Female",
    admissionDate: "2024-01-15",
    room: "A-102",
    status: "Active",
    conditions: ["Diabetes Type 2", "Hypertension", "Arthritis"],
    allergies: ["Penicillin", "Sulfa drugs"],
  },
  {
    id: "P002",
    name: "Robert Chen",
    age: 82,
    gender: "Male",
    admissionDate: "2024-02-01",
    room: "B-205",
    status: "Active",
    conditions: ["Alzheimer's Disease", "Heart Disease"],
    allergies: ["None"],
  },
  {
    id: "P003",
    name: "Elizabeth Thompson",
    age: 75,
    gender: "Female",
    admissionDate: "2024-01-20",
    room: "A-108",
    status: "Critical",
    conditions: ["Stroke Recovery", "Hypertension"],
    allergies: ["Aspirin"],
  },
]

// Mock emergency contacts
export const mockEmergencyContacts: EmergencyContact[] = [
  {
    id: "EC001",
    patientId: "P001",
    name: "Carlos Rodriguez",
    relationship: "Son",
    phone: "(555) 123-4567",
    caregiverType: "Primary",
  },
  {
    id: "EC002",
    patientId: "P001",
    name: "Ana Rodriguez",
    relationship: "Daughter",
    phone: "(555) 234-5678",
    caregiverType: "Authorized Relative",
  },
  {
    id: "EC003",
    patientId: "P002",
    name: "Linda Chen",
    relationship: "Daughter",
    phone: "(555) 345-6789",
    caregiverType: "Guardian",
  },
]

// Mock medication records
export const mockMedications: MedicationRecord[] = [
  {
    id: "MED001",
    patientId: "P001",
    medication: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    startDate: "2024-01-15",
    status: "Active",
    prescribedBy: "Dr. Sarah Johnson",
  },
  {
    id: "MED002",
    patientId: "P001",
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    startDate: "2024-01-15",
    status: "Active",
    prescribedBy: "Dr. Sarah Johnson",
  },
  {
    id: "MED003",
    patientId: "P002",
    medication: "Donepezil",
    dosage: "10mg",
    frequency: "Once daily",
    startDate: "2024-02-01",
    status: "Active",
    prescribedBy: "Dr. Michael Lee",
  },
]

// Mock progress notes
export const mockProgressNotes: ProgressNote[] = [
  {
    id: "PN001",
    patientId: "P001",
    date: "2024-03-15",
    author: "Nurse Jennifer Smith",
    authorRole: "Nurse",
    note: "Patient is responding well to current medication regimen. Blood sugar levels stable. Participated in morning physical therapy session.",
    category: "Daily Assessment",
  },
  {
    id: "PN002",
    patientId: "P001",
    date: "2024-03-14",
    author: "Dr. Sarah Johnson",
    authorRole: "Doctor",
    note: "Weekly checkup completed. Vital signs within normal range. Continue current treatment plan. Schedule follow-up in one week.",
    category: "Medical Review",
  },
  {
    id: "PN003",
    patientId: "P002",
    date: "2024-03-15",
    author: "Therapist Mark Williams",
    authorRole: "Therapist",
    note: "Cognitive therapy session completed. Patient showed improved memory recall. Family engagement recommended.",
    category: "Therapy Session",
  },
]

// Mock invoices
export const mockInvoices: Invoice[] = [
  {
    id: "INV001",
    patientId: "P001",
    patientName: "Maria Rodriguez",
    date: "2024-03-01",
    dueDate: "2024-03-31",
    amount: 4500.0,
    status: "Paid",
    items: [
      { description: "Room & Board (Monthly)", amount: 3000.0 },
      { description: "Medical Services", amount: 800.0 },
      { description: "Medications", amount: 450.0 },
      { description: "Physical Therapy", amount: 250.0 },
    ],
  },
  {
    id: "INV002",
    patientId: "P002",
    patientName: "Robert Chen",
    date: "2024-03-01",
    dueDate: "2024-03-31",
    amount: 5200.0,
    status: "Pending",
    items: [
      { description: "Room & Board (Monthly)", amount: 3500.0 },
      { description: "Medical Services", amount: 900.0 },
      { description: "Medications", amount: 600.0 },
      { description: "Cognitive Therapy", amount: 200.0 },
    ],
  },
]

// Mock activities for dashboard
export const mockActivities = [
  {
    id: "1",
    type: "admission",
    message: "New patient admitted: Elizabeth Thompson",
    time: "2 hours ago",
  },
  {
    id: "2",
    type: "medication",
    message: "Medication administered to Maria Rodriguez",
    time: "4 hours ago",
  },
  {
    id: "3",
    type: "appointment",
    message: "Physical therapy session completed for Robert Chen",
    time: "6 hours ago",
  },
  {
    id: "4",
    type: "billing",
    message: "Invoice INV001 marked as paid",
    time: "1 day ago",
  },
]

// Mock notifications
export const mockNotifications = [
  {
    id: "1",
    type: "urgent",
    message: "Critical patient alert: Elizabeth Thompson requires immediate attention",
    time: "30 minutes ago",
    read: false,
  },
  {
    id: "2",
    type: "reminder",
    message: "Medication due for Maria Rodriguez at 2:00 PM",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "info",
    message: "Monthly billing cycle starts tomorrow",
    time: "3 hours ago",
    read: true,
  },
]
