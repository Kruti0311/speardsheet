"use client"

import { useState, useMemo } from "react"
import { SpreadsheetRow } from "./SpreadsheetRow"
import { TableHeader } from "./TableHeader"

export interface RowData {
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

export interface SortConfig {
  column: string
  direction: "asc" | "desc"
}

export interface FilterConfig {
  column: string
  value: string
}

interface SpreadsheetTableProps {
  data: RowData[]
  hiddenColumns: string[]
  sortConfig: SortConfig | null
  filterConfig: FilterConfig | null
  activeFilter: string
  searchQuery: string
}

export function SpreadsheetTable({
  data,
  hiddenColumns,
  sortConfig,
  filterConfig,
  activeFilter,
  searchQuery,
}: SpreadsheetTableProps) {
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: string } | null>(null)

  const handleCellClick = (rowId: number, column: string) => {
    setSelectedCell({ row: rowId, col: column })
  }

  // Apply sorting, filtering, and searching
  const processedData = useMemo(() => {
    let result = [...data]

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter((row) => {
        return (
          row.task.toLowerCase().includes(query) ||
          row.submitter.toLowerCase().includes(query) ||
          row.assigned.toLowerCase().includes(query) ||
          row.status.toLowerCase().includes(query) ||
          row.priority.toLowerCase().includes(query) ||
          row.url.toLowerCase().includes(query) ||
          row.submitted.toLowerCase().includes(query) ||
          row.dueDate.toLowerCase().includes(query) ||
          row.estValue.toLowerCase().includes(query)
        )
      })
    }

    // Apply filter based on bottom filter tabs
    if (activeFilter !== "all-orders") {
      switch (activeFilter) {
        case "pending":
          result = result.filter((row) => row.status === "Need to start")
          break
        case "reviewed":
          result = result.filter((row) => row.status === "In-process")
          break
        case "arrived":
          result = result.filter((row) => row.status === "Complete")
          break
      }
    }

    // Apply column filter
    if (filterConfig && filterConfig.value) {
      result = result.filter((row) => {
        const value = row[filterConfig.column as keyof RowData]
        return value?.toString().toLowerCase().includes(filterConfig.value.toLowerCase())
      })
    }

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.column as keyof RowData]
        const bValue = b[sortConfig.column as keyof RowData]

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1
        }
        return 0
      })
    }

    return result
  }, [data, sortConfig, filterConfig, activeFilter, searchQuery])

  // Generate empty rows up to row 24
  const emptyRows = Array.from(
    { length: Math.max(0, 24 - processedData.length) },
    (_, i) => i + processedData.length + 1,
  )

  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
      {searchQuery && (
        <div className="px-4 py-2 bg-blue-50 border-b border-blue-200">
          <p className="text-sm text-blue-700">
            Found {processedData.length} result{processedData.length !== 1 ? "s" : ""} for "{searchQuery}"
            {processedData.length === 0 && <span className="ml-2 text-blue-600">Try a different search term</span>}
          </p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <TableHeader hiddenColumns={hiddenColumns} sortConfig={sortConfig} />
          <tbody>
            {processedData.map((row) => (
              <SpreadsheetRow
                key={row.id}
                data={row}
                selectedCell={selectedCell}
                onCellClick={handleCellClick}
                hiddenColumns={hiddenColumns}
                searchQuery={searchQuery}
              />
            ))}
            {emptyRows.map((rowNum) => (
              <tr key={rowNum} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="w-12 px-3 py-2 text-center text-sm text-gray-500 bg-gray-50 border-r border-gray-200">
                  {rowNum}
                </td>
                {Array.from({ length: 9 }).map((_, colIndex) => {
                  const columnIds = [
                    "task",
                    "submitted",
                    "status",
                    "submitter",
                    "url",
                    "assigned",
                    "priority",
                    "dueDate",
                    "estValue",
                  ]
                  const columnId = columnIds[colIndex]

                  if (hiddenColumns.includes(columnId)) return null

                  return (
                    <td
                      key={colIndex}
                      className="px-3 py-2 border-r border-gray-200 cursor-cell hover:bg-blue-50"
                      onClick={() => handleCellClick(rowNum, `col-${colIndex}`)}
                    >
                      <div className="h-5"></div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
