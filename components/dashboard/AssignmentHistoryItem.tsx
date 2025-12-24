'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Assignment } from '@/types/dashboard'
import { Colors } from '@/constants/Colors'
import GuardAvatarGroup from './GuardAvatarGroup'

interface AssignmentHistoryItemProps {
    assignment: Assignment
}

export default function AssignmentHistoryItem({ assignment }: AssignmentHistoryItemProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }).format(date)
    }

    const formatTime = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        }).format(date)
    }

    return (
        <div
            className="flex flex-col"
            style={{
                gap: '8px',
                borderRadius: '8px', // inner-radius/sm
                padding: '12px', // padding/sm
                backgroundColor: '#F4F4F4', // var(--neutral-50)
                border: '1px solid #E8E8E8', // var(--neutral-100)
            }}
        >
            {/* Title */}
            <h4
                style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400, // Regular
                    fontSize: '16px', // font-size/body-one
                    lineHeight: '1.4', // line-height/xxs
                    letterSpacing: '0.02em', // kerning/lg
                    color: '#333333', // var(--main-text-heading)
                }}
            >
                {assignment.title}
            </h4>

            {/* Address */}
            <div className="flex items-center gap-2">
                <Image
                    src="/assets/images/location.png"
                    alt="Location"
                    width={14}
                    height={14}
                />
                <span
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 700, // Bold
                        fontSize: '14px', // font-size/body-two
                        lineHeight: '1.5', // line-height/xxs-2
                        letterSpacing: '0.02em', // kerning/lg
                        color: '#494949', // var(--main-text-body)
                    }}
                >
                    {assignment.address}
                </span>
            </div>

            {/* Date and Time */}
            {assignment.startTime && assignment.endTime && (
                <div
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 700, // Bold
                        fontSize: '14px', // font-size/body-two
                        lineHeight: '1.5', // line-height/xxs-2
                        letterSpacing: '0.02em', // kerning/lg
                        color: '#172E65', // var(--main-icon-color)
                    }}
                >
                    {mounted ? (
                        <>
                            {formatDate(assignment.startTime)} {formatTime(assignment.startTime)} – {formatTime(assignment.endTime)}
                        </>
                    ) : (
                        // Placeholder to prevent layout shift during hydration
                        <span style={{ opacity: 0 }}>Loading...</span>
                    )}
                </div>
            )}

            {/* Guards */}
            <div className="flex items-center gap-2">
                <GuardAvatarGroup guards={assignment.guards} maxVisible={4} size={24} />
                <span
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 500, // Medium
                        fontStyle: 'italic', // Medium Italic
                        fontSize: '12px', // font-size/caption-one
                        lineHeight: '1.2', // line-height/xxs-3
                        letterSpacing: '0.02em', // kerning/lg
                        color: '#A4A4A4',
                    }}
                >
                    {assignment.guards.length} guards assigned
                </span>
            </div>
        </div>
    )
}
