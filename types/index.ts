import type React from "react"
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface SpreadsheetData {
  id: number
  task: string
  submitted: string
  status: "In-process" | "Need to start" | "Complete" | "Blocked"
  submitter: string
  url: string
  assigned: string
  priority: "High" | "Medium" | "Low"
  dueDate: string
  estValue: string
}

export interface Tab {
  id: string
  label: string
  icon?: React.ComponentType<any>
  color?: string
  active?: boolean
}

export interface Filter {
  id: string
  label: string
}
