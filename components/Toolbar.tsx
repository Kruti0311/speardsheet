"use client"
import { useState } from "react"
import { ChevronRight, EyeOff, ArrowUpDown, Filter, Grid3X3, Download, Upload, Share, Plus, Eye } from "lucide-react"

interface ToolbarProps {
  onSort: (column: string) => void
  onHideField: (column: string) => void
  onFilter: (column: string, value: string) => void
  onImport: () => void
  onExport: () => void
  onShare: () => void
  onNewAction: () => void
  hiddenColumns: string[]
}

export function Toolbar({
  onSort,
  onHideField,
  onFilter,
  onImport,
  onExport,
  onShare,
  onNewAction,
  hiddenColumns,
}: ToolbarProps) {
  const [showHideMenu, setShowHideMenu] = useState(false)
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [cellView, setCellView] = useState<"normal" | "compact" | "comfortable">("normal")

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

  const handleCellView = () => {
    const views: Array<"normal" | "compact" | "comfortable"> = ["normal", "compact", "comfortable"]
    const currentIndex = views.indexOf(cellView)
    const nextView = views[(currentIndex + 1) % views.length]
    setCellView(nextView)

    // Apply cell view styles to document
    document.documentElement.setAttribute("data-cell-view", nextView)
  }

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-200">
      {/* Left side - Tool bar */}
      <div className="flex items-center space-x-1">
        <span className="text-sm text-gray-600 mr-2">Tool bar</span>
        <ChevronRight className="w-4 h-4 text-gray-400" />

        <div className="flex items-center space-x-2 ml-4">
          {/* Hide Fields */}
          <div className="relative">
            <button
              onClick={() => setShowHideMenu(!showHideMenu)}
              className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <EyeOff className="w-4 h-4" />
              <span>Hide fields</span>
            </button>

            {showHideMenu && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <div className="p-2">
                  {columns.map((column) => (
                    <label key={column.id} className="flex items-center space-x-2 p-1 hover:bg-gray-50 rounded">
                      <input
                        type="checkbox"
                        checked={!hiddenColumns.includes(column.id)}
                        onChange={() => onHideField(column.id)}
                        className="rounded"
                      />
                      <span className="text-sm">{column.label}</span>
                      {hiddenColumns.includes(column.id) && <Eye className="w-3 h-3 text-gray-400" />}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <ArrowUpDown className="w-4 h-4" />
              <span>Sort</span>
            </button>

            {showSortMenu && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <div className="p-2">
                  {columns.map((column) => (
                    <button
                      key={column.id}
                      onClick={() => {
                        onSort(column.id)
                        setShowSortMenu(false)
                      }}
                      className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-50 rounded"
                    >
                      Sort by {column.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Filter */}
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>

            {showFilterMenu && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <div className="p-3">
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Filter by Status</label>
                      <select
                        onChange={(e) => onFilter("status", e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="">All Status</option>
                        <option value="In-process">In-process</option>
                        <option value="Need to start">Need to start</option>
                        <option value="Complete">Complete</option>
                        <option value="Blocked">Blocked</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Filter by Priority</label>
                      <select
                        onChange={(e) => onFilter("priority", e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="">All Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onFilter("", "")
                      setShowFilterMenu(false)
                    }}
                    className="mt-2 text-xs text-blue-600 hover:text-blue-800"
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cell View */}
          <button
            onClick={handleCellView}
            className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <Grid3X3 className="w-4 h-4" />
            <span>Cell view ({cellView})</span>
          </button>
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onImport}
          className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <Upload className="w-4 h-4" />
          <span>Import</span>
        </button>

        <button
          onClick={onExport}
          className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>

        <button
          onClick={onShare}
          className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <Share className="w-4 h-4" />
          <span>Share</span>
        </button>

        <button
          onClick={onNewAction}
          className="flex items-center space-x-1 px-3 py-1.5 text-sm text-white bg-green-600 hover:bg-green-700 rounded-md"
        >
          <Plus className="w-4 h-4" />
          <span>New Action</span>
        </button>
      </div>
    </div>
  )
}
