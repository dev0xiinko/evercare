"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { getCurrentUser, isRelative } from "@/lib/auth"

const RELATIVE_RESTRICTED_ROUTES = [
  "/dashboard/patients",
  "/dashboard/clinical",
  "/dashboard/pharmacy",
  "/dashboard/wellness",
  "/dashboard/finance",
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const user = getCurrentUser()
    if (!user) {
      router.push("/")
      return
    }

    // Redirect relatives away from staff-only pages
    if (isRelative(user)) {
      const isRestricted = RELATIVE_RESTRICTED_ROUTES.some(route => pathname.startsWith(route))
      if (isRestricted) {
        router.replace("/dashboard")
      }
    }
  }, [router, pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardNav />
        <main className="flex-1 p-4 lg:p-8 pb-20 lg:pb-8 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
