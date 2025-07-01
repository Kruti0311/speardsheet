"use client"
import type { RowData } from "./SpreadsheetTable"

interface SpreadsheetRowProps {
  data: RowData
  selectedCell: { row: number; col: string } | null
  onCellClick: (rowId: number, column: string) => void
  hiddenColumns: string[]
  searchQuery?: string
}

export function SpreadsheetRow({
  data,
  selectedCell,
  onCellClick,
  hiddenColumns,
  searchQuery = "",
}: SpreadsheetRowProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In-process":
        return "bg-yellow-100 text-yellow-800"
      case "Need to start":
        return "bg-blue-100 text-blue-800"
      case "Complete":
        return "bg-green-100 text-green-800"
      case "Blocked":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600"
      case "Medium":
        return "text-yellow-600"
      case "Low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text

    const regex = new RegExp(`(${query})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  const isCellSelected = (column: string) => {
    return selectedCell?.row === data.id && selectedCell?.col === column
  }

  const getCellClassName = (column: string, baseClasses = "") => {
    const selected = isCellSelected(column)
    return `${baseClasses} px-3 py-2 border-r border-gray-200 cursor-cell hover:bg-blue-50 ${
      selected ? "bg-blue-100 ring-2 ring-blue-500" : ""
    }`
  }

  const columns = [
    {
      id: "task",
      content: <div className="truncate">{highlightText(data.task, searchQuery)}</div>,
      className: "text-sm text-gray-900 max-w-xs",
    },
    {
      id: "submitted",
      content: highlightText(data.submitted, searchQuery),
      className: "text-sm text-gray-600",
    },
    {
      id: "status",
      content: (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(data.status)}`}>
          {highlightText(data.status, searchQuery)}
        </span>
      ),
    },
    {
      id: "submitter",
      content: highlightText(data.submitter, searchQuery),
      className: "text-sm text-gray-900",
    },
    {
      id: "url",
      content: <div className="truncate">{highlightText(data.url, searchQuery)}</div>,
      className: "text-sm text-blue-600",
    },
    {
      id: "assigned",
      content: highlightText(data.assigned, searchQuery),
      className: "text-sm text-gray-900",
    },
    {
      id: "priority",
      content: (
        <span className={`text-sm font-medium ${getPriorityColor(data.priority)}`}>
          {highlightText(data.priority, searchQuery)}
        </span>
      ),
    },
    {
      id: "dueDate",
      content: highlightText(data.dueDate, searchQuery),
      className: "text-sm text-gray-600",
    },
    {
      id: "estValue",
      content: highlightText(data.estValue, searchQuery),
      className: "text-sm text-gray-900",
    },
  ]

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="w-12 px-3 py-2 text-center text-sm text-gray-500 bg-gray-50 border-r border-gray-200">
        {data.id}
      </td>

      {columns.map((column) => {
        if (hiddenColumns.includes(column.id)) return null

        return (
          <td
            key={column.id}
            className={getCellClassName(column.id, column.className)}
            onClick={() => onCellClick(data.id, column.id)}
          >
            {column.content}
          </td>
        )
      })}
    </tr>
  )
}
