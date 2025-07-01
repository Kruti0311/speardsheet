"use client"
import { X, FileText, Table } from "lucide-react"

interface ExportModalProps {
  onExportCSV: () => void
  onExportExcel: () => void
  onCancel: () => void
  rowCount: number
  visibleColumns: number
}

export function ExportModal({ onExportCSV, onExportExcel, onCancel, rowCount, visibleColumns }: ExportModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Export Spreadsheet</h3>
          <button onClick={onCancel} className="p-1 hover:bg-gray-100 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
            <p>
              <strong>Export Summary:</strong>
            </p>
            <p>• {rowCount} rows of data</p>
            <p>• {visibleColumns} visible columns</p>
            <p>• Hidden columns will be excluded</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={onExportCSV}
              className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FileText className="w-6 h-6 text-green-600" />
              <div className="text-left">
                <div className="font-medium">Export as CSV</div>
                <div className="text-sm text-gray-500">Compatible with Excel, Google Sheets</div>
              </div>
            </button>

            <button
              onClick={onExportExcel}
              className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Table className="w-6 h-6 text-blue-600" />
              <div className="text-left">
                <div className="font-medium">Export as Excel Format</div>
                <div className="text-sm text-gray-500">Advanced formatting preserved</div>
              </div>
            </button>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button onClick={onCancel} className="px-4 py-2 text-gray-600 hover:text-gray-800">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
