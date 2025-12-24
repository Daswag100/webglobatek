"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Colors } from "@/constants/Colors"
import { Button } from "@/components/ui/button"

export default function ResetCodePage() {
  const router = useRouter()
  const [otp, setOtp] = useState(["", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [timer, setTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return
    
    if (value && !/^\d$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    } else {
      setCanResend(true)
    }
  }, [timer])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const otpCode = otp.join('')
    if (otpCode.length !== 4) return
    
    setIsLoading(true)
    
    setTimeout(() => {
      console.log("Verifying OTP:", otpCode)
      setIsLoading(false)
      router.push('/set-password')
    }, 1500)
  }

  const handleResend = () => {
    if (!canResend) return
    
    setTimer(60)
    setCanResend(false)
    setOtp(["", "", "", ""])
    
    const firstInput = document.getElementById('otp-0')
    firstInput?.focus()
    
    console.log("Resending code...")
  }

  const handleBackToReset = () => {
    router.push('/reset-password')
  }

  const isOtpComplete = otp.every(digit => digit !== "")
  const isButtonDisabled = !isOtpComplete || isLoading

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center py-5"
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
            className="w-full max-w-[654px] rounded-lg border"
            style={{
              backgroundColor: Colors.background,
              borderColor: '#E5E7EB',
              padding: '25px 60px',
            }}
          >
            <div className="flex justify-center mb-3">
              <Image 
                src="/assets/images/logo.png" 
                alt="Globatek Security" 
                width={70} 
                height={70}
                className="object-contain"
              />
            </div>

            <div className="mb-4">
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
                We've sent a one-time code to your email. Enter the code below to continue.
              </p>
            </div>

            <form onSubmit={handleVerify} className="flex flex-col items-center">
              <div className="w-full max-w-[343px] space-y-3">
                <div>
                  <label 
                    className="flex items-start gap-1 mb-1.5 font-medium"
                    style={{
                      color: Colors.textBody,
                      fontSize: '13px',
                      lineHeight: '1.2',
                      letterSpacing: '0.01em',
                    }}
                  >
                    Enter OTP
                    <Image 
                      src="/assets/images/required.png" 
                      alt="required" 
                      width={6} 
                      height={6}
                      className="mt-0.5"
                    />
                  </label>
                  
                  <div 
                    className="flex gap-2"
                    style={{
                      width: '343px',
                      height: '74px',
                    }}
                  >
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="text-center font-bold transition-all focus:outline-none"
                        style={{
                          width: '67.75px',
                          height: '48px',
                          borderRadius: '8px',
                          border: `1px solid ${digit ? Colors.primary100 : Colors.neutral200}`,
                          backgroundColor: Colors.background,
                          color: Colors.textBody,
                          fontSize: '24px',
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-center pt-1">
                  <Button
                    type="submit"
                    variant={isButtonDisabled ? 'disabled' : 'primary'}
                    disabled={isButtonDisabled}
                    width="160px"
                    icon="/assets/images/tick.png"
                    iconPosition="left"
                  >
                    {isLoading ? 'Verifying...' : 'Verify'}
                  </Button>
                </div>

                <div className="flex justify-center pt-2">
                  <div
                    className="flex flex-col items-center rounded-lg border"
                    style={{
                      width: '217px',
                      height: '156px',
                      borderRadius: '12px',
                      border: '1px solid #E5E7EB',
                      padding: '24px',
                      gap: '24px',
                      backgroundColor: '#FBF2E6',
                    }}
                  >
                    <p
                      className="text-center"
                      style={{
                        color: Colors.primary,
                        fontSize: '14px',
                        fontWeight: 800,
                        lineHeight: '1.2',
                        letterSpacing: '0.01em',
                      }}
                    >
                      Didn't get it?
                    </p>

                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={!canResend}
                      className="flex items-center justify-center gap-3 transition-all"
                      style={{
                        width: '185px',
                        height: '48px',
                        borderRadius: '8px',
                        border: `2px solid ${canResend ? Colors.primary : Colors.neutral200}`,
                        backgroundColor: 'transparent',
                        color: canResend ? Colors.primary : '#999',
                        fontSize: '14px',
                        fontWeight: 700,
                        lineHeight: '1.2',
                        letterSpacing: '0.01em',
                        padding: '10px 20px',
                        cursor: canResend ? 'pointer' : 'not-allowed',
                        opacity: canResend ? 1 : 0.6,
                      }}
                    >
                      <Image 
                        src="/assets/images/send.png" 
                        alt="send" 
                        width={20} 
                        height={20}
                        style={{
                          opacity: canResend ? 1 : 0.5,
                        }}
                      />
                      Resend Link
                    </button>

                    <p
                      className="text-center"
                      style={{
                        color: Colors.textBody,
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '1.2',
                        letterSpacing: '0.01em',
                      }}
                    >
                      {formatTime(timer)}
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
