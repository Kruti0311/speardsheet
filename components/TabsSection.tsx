"use client"
import { BarChart3, Plus } from "lucide-react"

interface TabsSectionProps {
  activeTab: string
  onTabChange: (tab: string) => void
  onAddTab: () => void
}

export function TabsSection({ activeTab, onTabChange, onAddTab }: TabsSectionProps) {
  const tabs = [
    { id: "financial-overview", label: "Q3 Financial Overview", icon: BarChart3, color: "bg-orange-100" },
    { id: "job-request", label: "Job Request", active: true },
    { id: "abc", label: "ABC", color: "bg-green-100" },
    { id: "answer-question", label: "Answer a question", color: "bg-purple-100" },
    { id: "extract", label: "Extract", color: "bg-orange-100" },
  ]

  return (
    <div className="flex items-center space-x-1 py-3 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === tab.id || tab.active
              ? "bg-white border border-gray-300 text-gray-900"
              : `${tab.color || "hover:bg-gray-100"} text-gray-700`
          }`}
        >
          {tab.icon && <tab.icon className="w-4 h-4" />}
          <span>{tab.label}</span>
        </button>
      ))}

      <button onClick={onAddTab} className="p-2 hover:bg-gray-100 rounded-md transition-colors" title="Add new tab">
        <Plus className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  )
}
