"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Colors } from "@/constants/Colors"
import { Button } from "@/components/ui/button"

export default function SetPasswordPage() {
  const router = useRouter()
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [newPasswordError, setNewPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters"
    }
    return ""
  }

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setNewPassword(value)
    
    if (newPasswordError) {
      setNewPasswordError("")
    }
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setConfirmPassword(value)
    
    if (confirmPasswordError) {
      setConfirmPasswordError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    let hasError = false

    if (!newPassword) {
      setNewPasswordError("New password is required")
      hasError = true
    } else {
      const passwordValidation = validatePassword(newPassword)
      if (passwordValidation) {
        setNewPasswordError(passwordValidation)
        hasError = true
      }
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required")
      hasError = true
    }

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match")
      hasError = true
    }

    if (hasError) return

    setIsLoading(true)
    
    setTimeout(() => {
      console.log("Password reset successfully")
      setIsLoading(false)
      router.push('/password-success')
    }, 1500)
  }

  const handleBackToReset = () => {
    router.push('/resetcode')
  }

  const isButtonDisabled = !newPassword || !confirmPassword || isLoading

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center py-2"
      style={{ backgroundColor: Colors.backgroundBeige }}
    >
      <div className="flex items-start gap-1 px-5 w-full max-w-7xl">
        <button
          onClick={handleBackToReset}
          className="flex items-center justify-center gap-3 transition-all hover:opacity-80 flex-shrink-0"
          style={{
            width: '88px',
            height: '48px',
            borderRadius: '8px',
            border: `1.5px solid ${Colors.primary}`,
            backgroundColor: 'transparent',
          }}
        >
          <Image 
            src="/assets/images/bluenext.png" 
            alt="back" 
            width={20} 
            height={20}
            style={{ transform: 'rotate(180deg)' }}
          />
        </button>

        <div className="flex-1 flex justify-center">
          <div
            className="w-full max-w-[700px] rounded-[20px] border"
            style={{
              backgroundColor: Colors.background,
              borderColor: '#E5E7EB',
              padding: '50px 70px',
            }}
          >
            <div className="flex justify-center mb-6">
              <Image 
                src="/assets/images/logo.png" 
                alt="Globatek Security" 
                width={80} 
                height={80}
                className="object-contain"
              />
            </div>

            <div className="mb-8">
              <h1 
                className="text-center mb-3 font-medium"
                style={{ 
                  color: Colors.textHeading,
                  fontSize: '32px',
                  lineHeight: '1.25',
                  letterSpacing: '-0.015em',
                  fontWeight: 500,
                }}
              >
                Create a new password
              </h1>
              <p 
                className="text-center"
                style={{ 
                  color: Colors.textBody,
                  fontSize: '15px',
                  lineHeight: '1.3',
                  letterSpacing: '0.01em',
                  fontWeight: 400,
                }}
              >
                Choose a strong password to secure your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <div className="w-full max-w-[480px] space-y-5">
                <div>
                  <label 
                    htmlFor="newPassword"
                    className="flex items-start gap-1 mb-2 font-medium"
                    style={{
                      color: Colors.textBody,
                      fontSize: '14px',
                      lineHeight: '1.1',
                      letterSpacing: '0.01em',
                      fontWeight: 500,
                    }}
                  >
                    New Password
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
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      placeholder="Enter New Password"
                      className="w-full h-12 rounded-lg pl-12 pr-12 border-b-[1.5px] focus:outline-none focus:border-b-2 transition-colors"
                      style={{
                        backgroundColor: Colors.neutral50,
                        borderBottomColor: newPasswordError ? Colors.error : Colors.primary100,
                        color: newPassword ? Colors.textBody : '#999',
                        fontSize: '15px',
                        lineHeight: '1.4',
                        letterSpacing: '0.01em',
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      <Image 
                        src={showNewPassword ? "/assets/images/eyes.png" : "/assets/images/eyesopen.png"}
                        alt="toggle password" 
                        width={24} 
                        height={24}
                      />
                    </button>
                  </div>
                  {newPasswordError && (
                    <p 
                      className="mt-1.5 text-sm"
                      style={{ color: Colors.error }}
                    >
                      {newPasswordError}
                    </p>
                  )}
                </div>

                <div>
                  <label 
                    htmlFor="confirmPassword"
                    className="flex items-start gap-1 mb-2 font-medium"
                    style={{
                      color: Colors.textBody,
                      fontSize: '14px',
                      lineHeight: '1.1',
                      letterSpacing: '0.01em',
                      fontWeight: 500,
                    }}
                  >
                    Confirm Password
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
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      placeholder="Confirm New Password"
                      className="w-full h-12 rounded-lg pl-12 pr-12 border-b-[1.5px] focus:outline-none focus:border-b-2 transition-colors"
                      style={{
                        backgroundColor: Colors.neutral50,
                        borderBottomColor: confirmPasswordError ? Colors.error : Colors.primary100,
                        color: confirmPassword ? Colors.textBody : '#999',
                        fontSize: '15px',
                        lineHeight: '1.4',
                        letterSpacing: '0.01em',
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      <Image 
                        src={showConfirmPassword ? "/assets/images/eyes.png" : "/assets/images/eyesopen.png"}
                        alt="toggle password" 
                        width={24} 
                        height={24}
                      />
                    </button>
                  </div>
                  {confirmPasswordError && (
                    <p 
                      className="mt-1.5 text-sm"
                      style={{ color: Colors.error }}
                    >
                      {confirmPasswordError}
                    </p>
                  )}
                </div>

                <div className="flex justify-center pt-6">
                  <Button
                    type="submit"
                    variant={isButtonDisabled ? 'disabled' : 'primary'}
                    disabled={isButtonDisabled}
                    width="240px"
                  >
                    {isLoading ? 'Resetting...' : 'Reset Password'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

