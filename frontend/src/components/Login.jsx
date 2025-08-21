"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import { useLoginMutation } from "@/redux/api/userApi"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate()
  const [login, { data, error, isLoading, isSuccess }] = useLoginMutation()

  useEffect(() => {
    if (isSuccess && data) {
      if (data.user && data.token) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        if (data.user.role === "admin") {
          navigate("/admin-dashboard")
        } else {
          navigate("/user-dashboard")
        }
      } else {
        console.error("Invalid login response. Missing user or token.")
      }
    }
  }, [isSuccess, data, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(formData)
  }

  const handleSignUpClick = () => {
    navigate("/register")
  }

  const errorMessage = error?.data?.message || error?.error || "Login failed."

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold text-blue-700">Welcome Back</CardTitle>
          <p className="text-center text-sm text-gray-600 mt-2">Sign in to your account</p>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="text-red-600 text-sm mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* ✅ NEW: Sign Up Section */}
          <div className="mt-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-100 px-2 text-gray-500">Don't have an account?</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full mt-4 border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
              onClick={handleSignUpClick}
            >
              Create New Account
            </Button>
          </div>

          {/* ✅ Optional: Forgot Password Link */}
          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot your password?
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
