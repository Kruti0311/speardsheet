"use client"

import { useState } from "react"
import { Header } from "./Header"
import { Toolbar } from "./Toolbar"
import { TabsSection } from "./TabsSection"
import { SpreadsheetTable } from "./SpreadsheetTable"
import { BottomFilters } from "./BottomFilters"
import type { RowData, SortConfig, FilterConfig } from "./SpreadsheetTable"
import { NewActionModal } from "./NewActionModal"
import { ExportModal } from "./ExportModal"
import { NewTabModal } from "./NewTabModal"

// Sample data for different tabs
const initialJobRequestData: RowData[] = [
  {
    id: 1,
    task: "Launch social media campaign for pro...",
    submitted: "15-11-2024",
    status: "In-process",
    submitter: "Aisha Patel",
    url: "www.aishapatel...",
    assigned: "Sophie Choudhury",
    priority: "Medium",
    dueDate: "20-11-2024",
    estValue: "6,200,000",
  },
  {
    id: 2,
    task: "Update press kit for company redesign",
    submitted: "28-10-2024",
    status: "Need to start",
    submitter: "Irfan Khan",
    url: "www.irfankhan...",
    assigned: "Tejas Pandey",
    priority: "High",
    dueDate: "30-10-2024",
    estValue: "3,500,000",
  },
  {
    id: 3,
    task: "Finalize user testing feedback for app...",
    submitted: "05-12-2024",
    status: "In-process",
    submitter: "Mark Johnson",
    url: "www.markjohns...",
    assigned: "Rachel Lee",
    priority: "Medium",
    dueDate: "10-12-2024",
    estValue: "4,750,000",
  },
  {
    id: 4,
    task: "Design new features for the website",
    submitted: "10-01-2025",
    status: "Complete",
    submitter: "Emily Green",
    url: "www.emilygreen...",
    assigned: "Tom Wright",
    priority: "Low",
    dueDate: "15-01-2025",
    estValue: "5,900,000",
  },
  {
    id: 5,
    task: "Prepare financial report for Q4",
    submitted: "25-01-2025",
    status: "Blocked",
    submitter: "Jessica Brown",
    url: "www.jessicabro...",
    assigned: "Kevin Smith",
    priority: "Low",
    dueDate: "30-01-2025",
    estValue: "2,800,000",
  },
]

const initialFinancialData: RowData[] = [
  {
    id: 1,
    task: "Q3 Revenue Analysis",
    submitted: "01-10-2024",
    status: "Complete",
    submitter: "Finance Team",
    url: "www.finance...",
    assigned: "John Smith",
    priority: "High",
    dueDate: "15-10-2024",
    estValue: "15,000,000",
  },
  {
    id: 2,
    task: "Budget Planning Q4",
    submitted: "15-10-2024",
    status: "In-process",
    submitter: "CFO Office",
    url: "www.budget...",
    assigned: "Sarah Wilson",
    priority: "High",
    dueDate: "30-10-2024",
    estValue: "8,500,000",
  },
]

export function SpreadsheetApp() {
  const [activeTab, setActiveTab] = useState("job-request")
  const [activeFilter, setActiveFilter] = useState("all-orders")
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([])
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)
  const [filterConfig, setFilterConfig] = useState<FilterConfig | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showShareModal, setShowShareModal] = useState(false)
  const [showNewActionModal, setShowNewActionModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [showNewTabModal, setShowNewTabModal] = useState(false)

  // Separate data states for each tab
  const [jobRequestData, setJobRequestData] = useState<RowData[]>(initialJobRequestData)
  const [financialData, setFinancialData] = useState<RowData[]>(initialFinancialData)
  const [customTabs, setCustomTabs] = useState<Array<{ id: string; name: string; data: RowData[] }>>([])

  // Get current data based on active tab
  const getCurrentData = () => {
    switch (activeTab) {
      case "financial-overview":
        return financialData
      case "job-request":
        return jobRequestData
      default:
        const customTab = customTabs.find((tab) => tab.id === activeTab)
        return customTab ? customTab.data : jobRequestData
    }
  }

  // Update data for current tab
  const updateCurrentData = (newData: RowData[]) => {
    switch (activeTab) {
      case "financial-overview":
        setFinancialData(newData)
        break
      case "job-request":
        setJobRequestData(newData)
        break
      default:
        setCustomTabs((prev) => prev.map((tab) => (tab.id === activeTab ? { ...tab, data: newData } : tab)))
    }
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setSearchQuery("") // Clear search when switching tabs
  }

  const handleAddTab = () => {
    setShowNewTabModal(true)
  }

  const handleCreateTab = (tabName: string, tabType: string) => {
    const newTabId = `custom-${Date.now()}`
    const newTab = {
      id: newTabId,
      name: tabName,
      data: [] as RowData[],
    }

    setCustomTabs((prev) => [...prev, newTab])
    setActiveTab(newTabId)
    setShowNewTabModal(false)

    // Show success message
    alert(`New tab "${tabName}" created successfully!`)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleSort = (column: string) => {
    const direction = sortConfig?.column === column && sortConfig.direction === "asc" ? "desc" : "asc"
    setSortConfig({ column, direction })
  }

  const handleHideField = (column: string) => {
    setHiddenColumns((prev) => (prev.includes(column) ? prev.filter((col) => col !== column) : [...prev, column]))
  }

  const handleFilter = (column: string, value: string) => {
    setFilterConfig({ column, value })
  }

  const handleNewAction = (newRowData?: Partial<RowData>) => {
    const currentData = getCurrentData()
    const maxId = currentData.length > 0 ? Math.max(...currentData.map((row) => row.id)) : 0

    const newRow: RowData = {
      id: maxId + 1,
      task: newRowData?.task || "New task",
      submitted: new Date().toLocaleDateString("en-GB"),
      status: newRowData?.status || "Need to start",
      submitter: newRowData?.submitter || "Current User",
      url: newRowData?.url || "www.example.com",
      assigned: newRowData?.assigned || "Unassigned",
      priority: newRowData?.priority || "Medium",
      dueDate: newRowData?.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-GB"),
      estValue: newRowData?.estValue || "0",
    }

    const updatedData = [...currentData, newRow]
    updateCurrentData(updatedData)
    setShowNewActionModal(false)
  }

  const handleImport = () => {
    // Simulate import
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".csv,.xlsx"
    input.onchange = () => {
      alert("Import functionality would process the selected file")
    }
    input.click()
  }

  const handleExport = () => {
    const currentData = getCurrentData()

    // Define all columns
    const allColumns = [
      { id: "task", label: "Task" },
      { id: "submitted", label: "Submitted" },
      { id: "status", label: "Status" },
      { id: "submitter", label: "Submitter" },
      { id: "url", label: "URL" },
      { id: "assigned", label: "Assigned" },
      { id: "priority", label: "Priority" },
      { id: "dueDate", label: "Due Date" },
      { id: "estValue", label: "Est. Value" },
    ]

    // Filter out hidden columns
    const visibleColumns = allColumns.filter((col) => !hiddenColumns.includes(col.id))

    // Helper function to escape CSV values
    const escapeCSV = (value: string | number) => {
      const stringValue = String(value || "")
      // If value contains comma, quote, or newline, wrap in quotes and escape quotes
      if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
        return `"${stringValue.replace(/"/g, '""')}"`
      }
      return stringValue
    }

    // Create CSV content
    const headers = visibleColumns.map((col) => escapeCSV(col.label))
    const rows = currentData.map((row) =>
      visibleColumns.map((col) => {
        const value = row[col.id as keyof RowData]
        return escapeCSV(value)
      }),
    )

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n")

    // Add BOM for proper Excel compatibility
    const BOM = "\uFEFF"
    const blob = new Blob([BOM + csvContent], {
      type: "text/csv;charset=utf-8",
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${activeTab}-data-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    // Show success message
    alert(`Exported ${currentData.length} rows to CSV file successfully!`)
  }

  const handleExportExcel = () => {
    const currentData = getCurrentData()

    // Define all columns
    const allColumns = [
      { id: "task", label: "Task" },
      { id: "submitted", label: "Submitted" },
      { id: "status", label: "Status" },
      { id: "submitter", label: "Submitter" },
      { id: "url", label: "URL" },
      { id: "assigned", label: "Assigned" },
      { id: "priority", label: "Priority" },
      { id: "dueDate", label: "Due Date" },
      { id: "estValue", label: "Est. Value" },
    ]

    // Filter out hidden columns
    const visibleColumns = allColumns.filter((col) => !hiddenColumns.includes(col.id))

    // Create HTML table for Excel
    const headers = visibleColumns
      .map(
        (col) =>
          `<th style="background-color: #f3f4f6; font-weight: bold; border: 1px solid #d1d5db; padding: 8px;">${col.label}</th>`,
      )
      .join("")

    const rows = currentData
      .map((row) => {
        const cells = visibleColumns
          .map((col) => {
            const value = row[col.id as keyof RowData] || ""
            let cellStyle = "border: 1px solid #d1d5db; padding: 8px;"

            // Add specific styling based on column type
            if (col.id === "status") {
              const statusColors = {
                "In-process": "background-color: #fef3c7; color: #92400e;",
                "Need to start": "background-color: #dbeafe; color: #1e40af;",
                Complete: "background-color: #d1fae5; color: #065f46;",
                Blocked: "background-color: #fee2e2; color: #991b1b;",
              }
              cellStyle += statusColors[value as keyof typeof statusColors] || ""
            } else if (col.id === "priority") {
              const priorityColors = {
                High: "color: #dc2626; font-weight: bold;",
                Medium: "color: #d97706; font-weight: bold;",
                Low: "color: #059669; font-weight: bold;",
              }
              cellStyle += priorityColors[value as keyof typeof priorityColors] || ""
            } else if (col.id === "estValue") {
              cellStyle += "text-align: right; font-family: monospace;"
            }

            return `<td style="${cellStyle}">${value}</td>`
          })
          .join("")
        return `<tr>${cells}</tr>`
      })
      .join("")

    const htmlContent = `
    <html>
      <head>
        <meta charset="utf-8">
        <title>Spreadsheet Export</title>
      </head>
      <body>
        <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
          <thead>
            <tr>${headers}</tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </body>
    </html>
  `

    const blob = new Blob([htmlContent], { type: "application/vnd.ms-excel" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${activeTab}-data-${new Date().toISOString().split("T")[0]}.xls`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setShowExportModal(false)
    alert(`Exported ${currentData.length} rows to Excel file successfully!`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} searchQuery={searchQuery} />
      <div className="px-4 py-2">
        <Toolbar
          onSort={handleSort}
          onHideField={handleHideField}
          onFilter={handleFilter}
          onImport={handleImport}
          onExport={() => setShowExportModal(true)}
          onShare={() => setShowShareModal(true)}
          onNewAction={() => setShowNewActionModal(true)}
          hiddenColumns={hiddenColumns}
        />
        <TabsSection activeTab={activeTab} onTabChange={handleTabChange} onAddTab={handleAddTab} />
        <SpreadsheetTable
          data={getCurrentData()}
          hiddenColumns={hiddenColumns}
          sortConfig={sortConfig}
          filterConfig={filterConfig}
          activeFilter={activeFilter}
          searchQuery={searchQuery}
        />
        <BottomFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Share Spreadsheet</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Share Link</label>
                <div className="flex">
                  <input
                    type="text"
                    value="https://spreadsheet.example.com/sheet/123"
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md text-sm"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("https://spreadsheet.example.com/sheet/123")
                      alert("Link copied to clipboard!")
                    }}
                    className="px-3 py-2 bg-blue-600 text-white rounded-r-md text-sm hover:bg-blue-700"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Access Level</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option>Can view</option>
                  <option>Can edit</option>
                  <option>Can manage</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button onClick={() => setShowShareModal(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                Cancel
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Action Modal */}
      {showNewActionModal && <NewActionModal onSave={handleNewAction} onCancel={() => setShowNewActionModal(false)} />}

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          onExportCSV={() => {
            handleExport()
            setShowExportModal(false)
          }}
          onExportExcel={handleExportExcel}
          onCancel={() => setShowExportModal(false)}
          rowCount={getCurrentData().length}
          visibleColumns={9 - hiddenColumns.length}
        />
      )}

      {/* New Tab Modal */}
      {showNewTabModal && <NewTabModal onSave={handleCreateTab} onCancel={() => setShowNewTabModal(false)} />}
    </div>
  )
}
