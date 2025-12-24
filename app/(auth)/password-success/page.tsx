"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Colors } from "@/constants/Colors"
import { Button } from "@/components/ui/button"

export default function PasswordSuccessPage() {
  const router = useRouter()

  const handleGoToSignIn = () => {
    router.push('/login')
  }

  const handleBackToSetPassword = () => {
    router.push('/set-password')
  }

  return (
    <div 
      className="min-h-screen w-full flex items-start justify-center pt-10"
      style={{ backgroundColor: Colors.backgroundBeige }}
    >
      <div className="flex items-start gap-4 px-5 w-full max-w-7xl">
        <button
          onClick={handleBackToSetPassword}
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
              padding: '35px 70px 50px 70px',
            }}
          >
            <div className="flex justify-center mb-6">
              <Image 
                src="/assets/images/verify.gif" 
                alt="verified" 
                width={100} 
                height={100}
                className="object-contain"
              />
            </div>

            <div className="mb-8">
              <h1 
                className="text-center mb-4 font-medium"
                style={{ 
                  color: Colors.textHeading,
                  fontSize: '32px',
                  lineHeight: '1.25',
                  letterSpacing: '-0.015em',
                  fontWeight: 500,
                }}
              >
                Your password has been reset successfully
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
                You can now sign in with your new password.
              </p>
            </div>

            <div className="flex justify-center">
              <Button
                type="button"
                onClick={handleGoToSignIn}
                variant="primary"
                width="200px"
                icon="/assets/images/next.png"
                iconPosition="right"
              >
                Go to Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
