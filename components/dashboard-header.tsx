"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LogOut, Bell, Search, Settings } from "lucide-react"
import { logout, getCurrentUser } from "@/lib/auth"
import { Input } from "@/components/ui/input"

export function DashboardHeader() {
  const router = useRouter()
  const user = getCurrentUser()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="bg-white border-b border-muted sticky top-0 z-30 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-4">
          {/* Mobile Logo (visible only on small screens) */}
          <div className="lg:hidden flex items-center gap-2">
            <Image src="/logo.png" alt="Evercare Logo" width={32} height={32} className="rounded-lg" />
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center relative flex-1 max-w-lg mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search patients, records, or staff..."
              className="pl-9 bg-muted/30 border-muted focus:bg-white transition-colors rounded-full h-10 w-full"
            />
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <div className="text-right hidden sm:block mr-2">
              <p className="text-sm font-bold text-foreground">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize bg-muted px-2 py-0.5 rounded-full inline-block">
                {user?.role}
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full hover:bg-muted text-muted-foreground hover:text-primary"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-white"></span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-muted text-muted-foreground hover:text-primary"
            >
              <Settings className="w-5 h-5" />
            </Button>

            <div className="h-8 w-px bg-muted mx-1"></div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full px-4"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
