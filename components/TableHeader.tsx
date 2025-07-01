"use client"
import { ArrowUp, ArrowDown } from "lucide-react"
import type { SortConfig } from "./SpreadsheetTable"

interface TableHeaderProps {
  hiddenColumns: string[]
  sortConfig: SortConfig | null
}

export function TableHeader({ hiddenColumns, sortConfig }: TableHeaderProps) {
  const columns = [
    { id: "task", label: "Job Request" },
    { id: "submitted", label: "Submitted" },
    { id: "status", label: "Status" },
    { id: "submitter", label: "Submitter" },
    { id: "url", label: "URL" },
    { id: "assigned", label: "Assigned" },
    { id: "priority", label: "Priority" },
    { id: "dueDate", label: "Due Date" },
    { id: "estValue", label: "Est. Value" },
  ]

  const getSortIcon = (columnId: string) => {
    if (sortConfig?.column === columnId) {
      return sortConfig.direction === "asc" ? (
        <ArrowUp className="w-3 h-3 ml-1" />
      ) : (
        <ArrowDown className="w-3 h-3 ml-1" />
      )
    }
    return null
  }

  return (
    <thead className="bg-gray-50">
      <tr>
        <th className="w-12 px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
          #
        </th>
        {columns.map((column) => {
          if (hiddenColumns.includes(column.id)) return null

          return (
            <th
              key={column.id}
              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200"
            >
              <div className="flex items-center space-x-1">
                <span>{column.label}</span>
                {getSortIcon(column.id)}
              </div>
            </th>
          )
        })}
      </tr>
    </thead>
  )
}
