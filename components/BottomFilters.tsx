"use client"
import { Plus } from "lucide-react"

interface BottomFiltersProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export function BottomFilters({ activeFilter, onFilterChange }: BottomFiltersProps) {
  const filters = [
    { id: "all-orders", label: "All Orders" },
    { id: "pending", label: "Pending" },
    { id: "reviewed", label: "Reviewed" },
    { id: "arrived", label: "Arrived" },
  ]

  const handleAddFilter = () => {
    const filterName = prompt("Enter new filter name:")
    if (filterName) {
      console.log(`Would add new filter: ${filterName}`)
      // In a real app, you'd add this to your filters state
    }
  }

  return (
    <div className="flex items-center space-x-1 py-4 border-t border-gray-200 mt-4">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeFilter === filter.id
              ? "bg-blue-100 text-blue-700 border border-blue-300"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {filter.label}
        </button>
      ))}

      <button onClick={handleAddFilter} className="p-2 hover:bg-gray-100 rounded-md">
        <Plus className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  )
}
