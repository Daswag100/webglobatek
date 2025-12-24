"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Colors } from "@/constants/Colors"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login
    setTimeout(() => {
      console.log("Login attempt:", { email, password, rememberMe })
      setIsLoading(false)
      // Navigate to dashboard
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center pt-5 pb-20"
      style={{ backgroundColor: Colors.backgroundBeige }}
    >
      {/* Login Card */}
      <div
        className="w-full max-w-[654px] rounded-lg border"
        style={{
          backgroundColor: Colors.background,
          borderColor: '#E5E7EB',
          padding: '32px 64px',
          marginTop: '10px',
        }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src="/assets/images/logo.png"
            alt="Globatek Security"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1
            className="text-center mb-2 font-medium"
            style={{
              color: Colors.textHeading,
              fontSize: '24px',
              lineHeight: '1.3',
              letterSpacing: '-0.01em',
            }}
          >
            Sign In To Your Supervisor Account
          </h1>
          <p
            className="text-center"
            style={{
              color: Colors.textBody,
              fontSize: '14px',
              lineHeight: '1.4',
              letterSpacing: '0.01em',
            }}
          >
            Access assignments, manage guards, and monitor performance.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="w-full max-w-[343px] space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="flex items-start gap-1 mb-1.5 font-medium"
                style={{
                  color: Colors.textBody,
                  fontSize: '13px',
                  lineHeight: '1.2',
                  letterSpacing: '0.01em',
                }}
              >
                Email Address
                <Image
                  src="/assets/images/required.png"
                  alt="required"
                  width={6}
                  height={6}
                  className="mt-0.5"
                />
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Image
                    src="/assets/images/mailicon.png"
                    alt="mail icon"
                    width={20}
                    height={20}
                  />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  required
                  className="w-full h-12 rounded-lg pl-12 pr-4 border-b-[1.5px] focus:outline-none focus:border-b-2 transition-colors"
                  style={{
                    backgroundColor: Colors.neutral50,
                    borderBottomColor: Colors.primary100,
                    color: email ? Colors.textBody : '#999',
                    fontSize: '15px',
                    lineHeight: '1.4',
                    letterSpacing: '0.01em',
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="flex items-start gap-1 mb-1.5 font-medium"
                style={{
                  color: Colors.textBody,
                  fontSize: '13px',
                  lineHeight: '1.2',
                  letterSpacing: '0.01em',
                }}
              >
                Password
                <Image
                  src="/assets/images/required.png"
                  alt="required"
                  width={6}
                  height={6}
                  className="mt-0.5"
                />
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Image
                    src="/assets/images/padlock.png"
                    alt="password"
                    width={20}
                    height={20}
                  />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full h-12 rounded-lg pl-12 pr-12 border-b-[1.5px] focus:outline-none focus:border-b-2 transition-colors"
                  style={{
                    backgroundColor: Colors.neutral50,
                    borderBottomColor: Colors.primary100,
                    color: password ? Colors.textBody : '#999',
                    fontSize: '15px',
                    lineHeight: '1.4',
                    letterSpacing: '0.01em',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <Image
                    src={password ? "/assets/images/eyeopen.png" : "/assets/images/eyeclose.png"}
                    alt="toggle password"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 -mt-1">
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className="w-6 h-6 flex items-center justify-center transition-colors"
                style={{
                  borderRadius: '4px',
                  border: '1.5px solid',
                  borderColor: rememberMe ? Colors.primary : Colors.neutral200,
                  backgroundColor: rememberMe ? Colors.primary : 'transparent',
                }}
              >
                {rememberMe && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M13.3334 4L6.00002 11.3333L2.66669 8"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
              <label
                className="cursor-pointer"
                onClick={() => setRememberMe(!rememberMe)}
                style={{
                  color: Colors.textBody,
                  fontSize: '14px',
                  lineHeight: '1.4',
                  letterSpacing: '0.01em',
                }}
              >
                Remember Me
              </label>
            </div>

            {/* Sign In Button */}
            <div className="flex justify-center pt-1">
              <button
                type="submit"
                disabled={isLoading || !email || !password}
                className="rounded-lg flex items-center justify-center gap-3 font-bold transition-all"
                style={{
                  width: '146px',
                  height: '48px',
                  backgroundColor: (!email || !password) ? '#D1D7E5' : Colors.primary,
                  color: (!email || !password) ? '#9CA3AF' : Colors.background,
                  fontSize: '15px',
                  lineHeight: '1.4',
                  letterSpacing: '0.01em',
                  padding: '10px 20px',
                  cursor: (!email || !password) ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.7 : 1,
                }}
              >
                {isLoading ? (
                  <span>Signing in...</span>
                ) : (
                  <>
                    Sign In
                    <Image
                      src="/assets/images/next.png"
                      alt="arrow"
                      width={20}
                      height={20}
                    />
                  </>
                )}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <span
                className="font-bold"
                style={{
                  color: '#000000',
                  fontSize: '15px',
                  lineHeight: '1.4',
                  letterSpacing: '0.01em',
                }}
              >
                Forgot Password?
              </span>
              <button
                type="button"
                onClick={() => router.push('/reset-password')}
                className="font-bold hover:underline"
                style={{
                  color: Colors.primary,
                  fontSize: '15px',
                  lineHeight: '1.4',
                  letterSpacing: '0.01em',
                }}
              >
                Reset it Here
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
