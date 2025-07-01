"use client"
import { useState } from "react"
import type React from "react"

import { X } from "lucide-react"

interface NewTabModalProps {
  onSave: (tabName: string, tabType: string) => void
  onCancel: () => void
}

export function NewTabModal({ onSave, onCancel }: NewTabModalProps) {
  const [tabName, setTabName] = useState("")
  const [tabType, setTabType] = useState("job-request")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!tabName.trim()) {
      alert("Tab name is required")
      return
    }
    onSave(tabName.trim(), tabType)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Create New Tab</h3>
          <button onClick={onCancel} className="p-1 hover:bg-gray-100 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tab Name *</label>
            <input
              type="text"
              value={tabName}
              onChange={(e) => setTabName(e.target.value)}
              placeholder="Enter tab name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tab Type</label>
            <select
              value={tabType}
              onChange={(e) => setTabType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="job-request">Job Request</option>
              <option value="financial-overview">Financial Overview</option>
              <option value="general">General</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
              Create Tab
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
