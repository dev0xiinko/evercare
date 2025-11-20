"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, isRelative } from "@/lib/auth"

const RELATIVE_RESTRICTED_ROUTES = [
  "/dashboard/patients",
  "/dashboard/clinical",
  "/dashboard/pharmacy",
  "/dashboard/wellness",
  "/dashboard/finance",
]

export function ProtectedRoute({ children, pathname }: { children: React.ReactNode; pathname: string }) {
  const router = useRouter()
  const user = getCurrentUser()

  useEffect(() => {
    // Check if relative is trying to access restricted route
    if (user && isRelative(user)) {
      const isRestricted = RELATIVE_RESTRICTED_ROUTES.some(route => pathname.startsWith(route))
      if (isRestricted) {
        router.replace("/dashboard")
      }
    }
  }, [user, pathname, router])

  // If relative is on a restricted route, don't render content
  if (user && isRelative(user)) {
    const isRestricted = RELATIVE_RESTRICTED_ROUTES.some(route => pathname.startsWith(route))
    if (isRestricted) {
      return null
    }
  }

  return <>{children}</>
}
