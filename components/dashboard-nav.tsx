"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, FileText, Pill, Heart, DollarSign, Menu, X } from "lucide-react"
import { useState } from "react"
import { getCurrentUser, isStaff, isRelative } from "@/lib/auth"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, staffOnly: false, relativeOnly: false },
  { href: "/dashboard/patients", label: "Patients", icon: Users, staffOnly: true, relativeOnly: false },
  { href: "/dashboard/clinical", label: "Clinical Records", icon: FileText, staffOnly: true, relativeOnly: false },
  { href: "/dashboard/pharmacy", label: "Pharmacy", icon: Pill, staffOnly: true, relativeOnly: false },
  { href: "/dashboard/wellness", label: "Wellness", icon: Heart, staffOnly: true, relativeOnly: false },
  { href: "/dashboard/finance", label: "Finance", icon: DollarSign, staffOnly: true, relativeOnly: false },
]

export function DashboardNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const user = getCurrentUser()
  const userIsStaff = isStaff(user)
  const userIsRelative = isRelative(user)

  const filteredNavItems = navItems.filter((item) => {
    // Relatives only see dashboard
    if (userIsRelative) {
      return !item.staffOnly && item.relativeOnly === false && item.href === "/dashboard"
    }
    // Staff see everything except relativeOnly items
    return !item.staffOnly || userIsStaff
  })

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <Button
          size="icon"
          className="w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-muted w-64 flex flex-col z-40 transition-transform duration-300 shadow-sm",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="p-6 border-b border-muted">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Evercare Logo" width={32} height={32} className="rounded-lg" />
            <h2 className="font-bold text-xl text-primary tracking-tight">
              Ever<span className="text-foreground">Care</span>
            </h2>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {filteredNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "hover:bg-muted text-muted-foreground hover:text-primary",
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 transition-transform group-hover:scale-110",
                    isActive ? "text-white" : "text-muted-foreground group-hover:text-primary",
                  )}
                />
                <span className="font-medium">{item.label}</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/50" />}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Bottom navigation for mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-muted z-30 pb-safe">
        <div className="flex justify-around p-2">
          {filteredNavItems.slice(0, 4).map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors min-w-0",
                  isActive ? "text-primary bg-primary/5" : "text-muted-foreground",
                )}
              >
                <Icon className={cn("w-5 h-5", isActive && "fill-current")} />
                <span className="text-[10px] font-medium truncate max-w-full">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
