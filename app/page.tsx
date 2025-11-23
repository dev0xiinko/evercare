"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/lib/auth"
import { type UserRole } from "@/lib/mock-data"
import { AlertCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState<UserRole>("staff")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const user = login(email, password, userType)

      if (user) {
        router.push("/dashboard")
      } else {
        setError("Invalid credentials. Please check your email, password, and user type.")
      }
    } catch {
      setError("An error occurred during login. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#D8A7B1]/20">
      {/* Left Side - Branding & Visuals */}
      <div className="lg:w-1/2 relative bg-linear-to-br from-[#D8A7B1] to-[#C891A0] overflow-hidden flex flex-col justify-center items-center p-12 text-white">
        {/* Geometric Accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#8B2635] transform rotate-45 translate-x-40 -translate-y-40 z-10 opacity-60"></div>
        <div className="absolute bottom-10 left-5 w-64 h-64 bg-[#008C9E] transform -rotate-45 -translate-x-20 translate-y-20 z-10 opacity-40"></div>

        {/* Texture overlay */}
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        <div className="relative z-20 max-w-xl text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl">
              <Image src="/logo.png" alt="Evercare Logo" width={120} height={120} className="drop-shadow-lg" />
            </div>
          </div>

          {/* Branding */}
          <div className="space-y-4">
            <h1 className="text-7xl font-bold tracking-tight drop-shadow-lg">
              Ever<span className="text-white">Care</span>
            </h1>
            <p className="text-2xl font-light opacity-95 drop-shadow">
              Your safe haven for every season of life
            </p>
          </div>

          {/* Disclaimer & Project Info */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 space-y-3">
            <p className="text-lg font-semibold drop-shadow">This website prototype is for educational purposes only.</p>
            <p className="text-sm opacity-90 drop-shadow">Health Information Systems Final Project – BSMT - 1I Table 1 (S.Y 2024-2025)</p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-[#008C9E] via-[#D8A7B1] to-[#8B2635]"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-primary">Welcome Back</h2>
            <p className="text-muted-foreground mt-2">Sign in to access the healthcare portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-white border-muted-foreground/20 focus:border-primary focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 bg-white border-muted-foreground/20 focus:border-primary focus:ring-primary/20"
              />
            </div>

            <div className="space-y-3">
              <Label>I am a...</Label>
              <div className="grid grid-cols-2 gap-4">
                <label
                  className={`
                  flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all
                  ${
                    userType === "staff"
                      ? "border-primary bg-primary/5 text-primary font-semibold"
                      : "border-muted hover:border-primary/50 text-muted-foreground"
                  }
                `}
                >
                  <input
                    type="radio"
                    name="userType"
                    value="staff"
                    checked={userType === "staff"}
                    onChange={(e) => setUserType(e.target.value as UserRole)}
                    className="hidden"
                  />
                  Staff
                </label>
                <label
                  className={`
                  flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all
                  ${
                    userType === "relative"
                      ? "border-secondary bg-secondary/5 text-secondary font-semibold"
                      : "border-muted hover:border-secondary/50 text-muted-foreground"
                  }
                `}
                >
                  <input
                    type="radio"
                    name="userType"
                    value="relative"
                    checked={userType === "relative"}
                    onChange={(e) => setUserType(e.target.value as UserRole)}
                    className="hidden"
                  />
                  Relative
                </label>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-xl text-sm font-medium">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In to Account"}
            </Button>

            <div className="pt-6 border-t border-dashed">
              <div className="bg-muted/50 p-4 rounded-xl text-xs text-muted-foreground">
                <p className="font-semibold text-primary mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  Prototype Credentials
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-foreground">Staff Access</p>
                    <p>staff@velez.com</p>
                    <p>staff123</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Relative Access</p>
                    <p>relative@gmail.com</p>
                    <p>relative123</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
