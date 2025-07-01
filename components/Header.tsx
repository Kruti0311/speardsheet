"use client"
import { Search, Bell, ChevronRight } from "lucide-react"

interface HeaderProps {
  onSearch: (query: string) => void
  searchQuery: string
}

export function Header({ onSearch, searchQuery }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Breadcrumbs */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="hover:text-gray-900 cursor-pointer">Workspace</span>
          <ChevronRight className="w-4 h-4" />
          <span className="hover:text-gray-900 cursor-pointer">Folder 2</span>
          <ChevronRight className="w-4 h-4" />
          <span className="font-medium text-gray-900">Spreadsheet 3</span>
        </div>

        {/* Right side - Search and Profile */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search within sheet"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
            {searchQuery && (
              <button
                onClick={() => onSearch("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>

          <div className="relative">
            <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900" />
            <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              1
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              JD
            </div>
            <div className="text-sm">
              <div className="font-medium text-gray-900">John Doe</div>
              <div className="text-gray-500 text-xs">john.doe@...</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
