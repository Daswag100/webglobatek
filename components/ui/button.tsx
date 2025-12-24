import React from 'react'
import Image from 'next/image'
import { Colors } from '@/constants/Colors'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'disabled'
  disabled?: boolean
  icon?: string
  iconPosition?: 'left' | 'right'
  width?: string
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  icon,
  iconPosition = 'right',
  width = '146px',
  className = '',
}) => {
  const getButtonStyles = () => {
    if (disabled || variant === 'disabled') {
      return {
        backgroundColor: '#D1D7E5',
        color: '#FDFDFD',
        cursor: 'not-allowed',
      }
    }
    
    if (variant === 'secondary') {
      return {
        backgroundColor: 'transparent',
        color: Colors.primary,
        border: `1.5px solid ${Colors.primary}`,
      }
    }
    
    return {
      backgroundColor: Colors.primary,
      color: Colors.background,
    }
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg flex items-center justify-center gap-3 font-bold transition-all ${className}`}
      style={{
        width,
        height: '48px',
        fontSize: '15px',
        lineHeight: '1.4',
        letterSpacing: '0.01em',
        padding: '10px 20px',
        ...getButtonStyles(),
      }}
    >
      {icon && iconPosition === 'left' && (
        <Image src={icon} alt="icon" width={20} height={20} />
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <Image src={icon} alt="icon" width={20} height={20} />
      )}
    </button>
  )
}
