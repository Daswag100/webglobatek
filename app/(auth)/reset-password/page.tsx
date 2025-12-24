"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Colors } from "@/constants/Colors"
import { Button } from "@/components/ui/button"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState("")

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    
    if (emailError) {
      setEmailError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setEmailError("Email is required")
      return
    }
    
    if (!isValidEmail(email)) {
      setEmailError("Email is not valid")
      return
    }
    
    setIsLoading(true)
    
    setTimeout(() => {
      console.log("Reset code sent to:", email)
      setIsLoading(false)
      router.push('/resetcode')
    }, 1500)
  }

  const handleBackToLogin = () => {
    router.push('/login')
  }

  const isButtonDisabled = !email || !isValidEmail(email) || isLoading

  return (
    <div 
      className="min-h-screen w-full pt-5 pb-20"
      style={{ backgroundColor: Colors.backgroundBeige }}
    >
      <div className="flex items-start gap-1 px-5" style={{ marginTop: '20px' }}>
        <button
          onClick={handleBackToLogin}
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
            src="/assets/images/back.png" 
            alt="back" 
            width={20} 
            height={20}
          />
        </button>

        <div className="flex-1 flex justify-center">
          <div
            className="w-full max-w-[654px] rounded-lg border"
            style={{
              backgroundColor: Colors.background,
              borderColor: '#E5E7EB',
              padding: '30px 60px',
            }}
          >
            <div className="flex justify-center mb-4">
              <Image 
                src="/assets/images/logo.png" 
                alt="Globatek Security" 
                width={80} 
                height={80}
                className="object-contain"
              />
            </div>

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
                Reset Password
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
                Enter your email address and we'll send a one-time code to verify your request.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <div className="w-full max-w-[343px] space-y-4">
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
                      onChange={handleEmailChange}
                      placeholder="Enter Email Address"
                      className="w-full h-12 rounded-lg pl-12 pr-4 border-b-[1.5px] focus:outline-none focus:border-b-2 transition-colors"
                      style={{
                        backgroundColor: Colors.neutral50,
                        borderBottomColor: emailError ? Colors.error : Colors.primary100,
                        color: email ? Colors.textBody : '#999',
                        fontSize: '15px',
                        lineHeight: '1.4',
                        letterSpacing: '0.01em',
                      }}
                    />
                  </div>
                  {emailError && (
                    <p 
                      className="mt-1.5 text-sm"
                      style={{ color: Colors.error }}
                    >
                      {emailError}
                    </p>
                  )}
                </div>

                <div className="flex justify-center pt-2">
                  <Button
                    type="submit"
                    variant={isButtonDisabled ? 'disabled' : 'primary'}
                    disabled={isButtonDisabled}
                    width="160px"
                  >
                    {isLoading ? 'Sending...' : 'Send code'}
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

