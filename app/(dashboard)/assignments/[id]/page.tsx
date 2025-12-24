'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { mockAssignmentDetail } from '@/data/mockDashboardData'
import { Colors } from '@/constants/Colors'

export default function AssignmentDetailPage() {
    const params = useParams()
    const searchParams = useSearchParams()
    const guardIdFromUrl = searchParams.get('guard')

    // Get assignment data (in real app, fetch based on params.id)
    const assignment = mockAssignmentDetail

    // Initialize with first guard to avoid hydration mismatch
    const [selectedGuard, setSelectedGuard] = useState(assignment.guards[0])
    const [mounted, setMounted] = useState(false)

    // Toast notification state
    const [showToast, setShowToast] = useState(false)

    // Handle client-side guard selection from URL
    useEffect(() => {
        setMounted(true)
        if (guardIdFromUrl) {
            const guard = assignment.guards.find(g => g.id === guardIdFromUrl)
            if (guard) {
                setSelectedGuard(guard)
            }
        }
    }, [guardIdFromUrl, assignment.guards])

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
        setShowToast(true)
        setTimeout(() => setShowToast(false), 2000) // Auto-dismiss after 2 seconds
    }

    const handleCall = (phone: string) => {
        window.location.href = `tel:${phone}`
    }

    return (
        <div
            style={{
                marginLeft: '110px',
                padding: '32px',
                backgroundColor: '#F9FAFB',
                minHeight: '100vh',
            }}
        >
            {/* Header with back button and title */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '24px',
                }}
            >
                {/* Back Button - Figma Specs */}
                <button
                    onClick={() => window.history.back()}
                    style={{
                        width: '52px',
                        height: '36px',
                        borderRadius: '8px',
                        border: `1.5px solid ${Colors.primary500}`,
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        padding: '10px 12px',
                    }}
                >
                    <Image
                        src="/assets/images/back.png"
                        alt="Back"
                        width={16}
                        height={16}
                    />
                </button>

                {/* Title - Figma Specs */}
                <h1
                    style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 400,
                        fontSize: '20px',
                        lineHeight: '1.3',
                        letterSpacing: '-0.005em',
                        color: Colors.textBody,
                    }}
                >
                    {assignment.title}
                </h1>
            </div>

            {/* Guard Switcher Tabs - Figma Specs */}
            <div
                style={{
                    display: 'flex',
                    gap: '12px',
                    paddingBottom: '16px',
                }}
            >
                {assignment.guards.map((guard) => (
                    <button
                        key={guard.id}
                        onClick={() => setSelectedGuard(guard)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 16px',
                            borderRadius: '100px',
                            backgroundColor: selectedGuard.id === guard.id ? Colors.primary50 : 'white',
                            border: `1.5px solid ${selectedGuard.id === guard.id ? Colors.mainIconColor : '#E5E7EB'}`,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                    >
                        {/* Avatar */}
                        <div
                            style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                backgroundColor: guard.color,
                            }}
                        >
                            {guard.avatar ? (
                                <Image
                                    src={guard.avatar}
                                    alt={guard.name}
                                    width={24}
                                    height={24}
                                    style={{ objectFit: 'cover' }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '10px',
                                        color: 'white',
                                        fontWeight: 600,
                                    }}
                                >
                                    {guard.initials}
                                </div>
                            )}
                        </div>
                        <span
                            style={{
                                fontFamily: 'var(--font-body)',
                                fontWeight: 600,
                                fontSize: '14px',
                                color: selectedGuard.id === guard.id ? Colors.mainIconColor : '#111827',
                            }}
                        >
                            {guard.name}
                        </span>
                    </button>
                ))}
            </div>

            {/* Full-width border line */}
            <div
                style={{
                    width: 'calc(100% + 64px)',
                    marginLeft: '-32px',
                    marginBottom: '24px',
                    borderBottom: '1px solid #E5E7EB',
                }}
            />

            {/* Main Content - Two Column Layout */}
            <div
                style={{
                    display: 'flex',
                    gap: '24px',
                    alignItems: 'flex-start',
                }}
            >
                {/* Left Column - Check-Ins and Map */}
                <div style={{ width: '450px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* Check-Ins Card - Figma Specs */}
                    <div
                        style={{
                            width: '450px',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '12px',
                            border: `1px solid ${Colors.neutral50}`,
                            padding: '16px',
                            boxShadow: '0px 1px 8px 0px rgba(0, 0, 0, 0.08)',
                        }}
                    >
                        {/* Check-Ins Header - Figma Specs */}
                        <div
                            style={{
                                width: '100%',
                                height: '48px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: Colors.neutral50,
                                border: `1px solid ${Colors.neutral100}`,
                                borderRadius: '12px',
                                padding: '16px',
                                marginBottom: '16px',
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 400,
                                    fontSize: '13px',
                                    lineHeight: '1.2',
                                    letterSpacing: '0.02em',
                                    color: Colors.textBody,
                                }}
                            >
                                Check-Ins
                            </span>
                            <span
                                style={{
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    lineHeight: '1.2',
                                    letterSpacing: '0.02em',
                                    color: Colors.mainIconColor,
                                }}
                            >
                                {assignment.completedCheckIns}/{assignment.totalCheckIns}
                            </span>
                        </div>

                        {/* Timeline Items */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '73px' }}>
                            {assignment.checkIns.map((item, index) => (
                                <TimelineItem
                                    key={item.id}
                                    item={item}
                                    isLast={index === assignment.checkIns.length - 1}
                                    completedCheckIns={assignment.completedCheckIns}
                                    totalCheckIns={assignment.totalCheckIns}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Map - Rounded corners, ready for Google Maps API integration */}
                    <div>
                        <div
                            style={{
                                width: '100%',
                                height: '300px',
                                borderRadius: '12px',
                                marginBottom: '12px',
                                overflow: 'hidden',
                            }}
                        >
                            <Image
                                src="/assets/images/map.png"
                                alt="Map"
                                width={450}
                                height={300}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <button
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontFamily: 'var(--font-body)',
                                fontSize: '14px',
                                color: '#3B82F6',
                                fontWeight: 600,
                                cursor: 'pointer',
                                border: 'none',
                                backgroundColor: 'transparent',
                            }}
                        >
                            <Image
                                src="/assets/images/navigation.png"
                                alt="Navigate"
                                width={16}
                                height={16}
                            />
                            View on Maps
                        </button>
                    </div>
                </div>

                {/* Right Column - Assignment Details */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Combined Assignment Time + Guard Details Box - Figma Specs */}
                    <div
                        style={{
                            backgroundColor: Colors.neutral50,
                            borderRadius: '8px',
                            border: `1px solid ${Colors.neutral100}`,
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                        }}
                    >
                        {/* Assignment Time */}
                        <div>
                            <span
                                style={{
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 400,
                                    fontSize: '13px',
                                    lineHeight: '1.2',
                                    letterSpacing: '0.02em',
                                    color: Colors.textBody,
                                    display: 'block',
                                    marginBottom: '8px',
                                }}
                            >
                                Assignment Time
                            </span>
                            <span
                                style={{
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 500,
                                    fontSize: '14px',
                                    lineHeight: '1.2',
                                    letterSpacing: '0.02em',
                                    color: Colors.mainIconColor,
                                }}
                            >
                                {assignment.assignmentTime}
                            </span>
                        </div>

                        {/* Guard Details */}
                        <div>
                            <span
                                style={{
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 400,
                                    fontSize: '13px',
                                    lineHeight: '1.2',
                                    letterSpacing: '0.02em',
                                    color: Colors.textBody,
                                    display: 'block',
                                    marginBottom: '12px',
                                }}
                            >
                                Guard details
                            </span>

                            {/* Email, Phone, Guard ID in one row */}
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                                {/* Email */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span
                                        style={{
                                            fontFamily: 'var(--font-body)',
                                            fontWeight: 700,
                                            fontSize: '14px',
                                            lineHeight: '1.2',
                                            letterSpacing: '0.02em',
                                            color: Colors.mainIconColor,
                                        }}
                                    >
                                        {selectedGuard.email}
                                    </span>
                                    <button
                                        onClick={() => handleCopy(selectedGuard.email || '')}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '4px',
                                        }}
                                    >
                                        <Image
                                            src="/assets/images/copy.png"
                                            alt="Copy"
                                            width={16}
                                            height={16}
                                        />
                                    </button>
                                </div>

                                {/* Phone */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span
                                        style={{
                                            fontFamily: 'var(--font-body)',
                                            fontWeight: 700,
                                            fontSize: '14px',
                                            lineHeight: '1.2',
                                            letterSpacing: '0.02em',
                                            color: Colors.mainIconColor,
                                        }}
                                    >
                                        {selectedGuard.phone}
                                    </span>
                                    <button
                                        onClick={() => handleCopy(selectedGuard.phone || '')}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '4px',
                                        }}
                                    >
                                        <Image
                                            src="/assets/images/copy.png"
                                            alt="Copy"
                                            width={16}
                                            height={16}
                                        />
                                    </button>
                                </div>

                                {/* Guard ID */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span
                                        style={{
                                            fontFamily: 'var(--font-body)',
                                            fontWeight: 700,
                                            fontSize: '14px',
                                            lineHeight: '1.2',
                                            letterSpacing: '0.02em',
                                            color: Colors.mainIconColor,
                                        }}
                                    >
                                        {selectedGuard.guardId}
                                    </span>
                                    <button
                                        onClick={() => handleCopy(selectedGuard.guardId || '')}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '4px',
                                        }}
                                    >
                                        <Image
                                            src="/assets/images/copy.png"
                                            alt="Copy"
                                            width={16}
                                            height={16}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Emergency Reports Card - Figma Specs */}
                    <div
                        style={{
                            backgroundColor: Colors.neutral50,
                            borderRadius: '12px',
                            border: `1px solid ${Colors.neutral100}`,
                            padding: '16px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '16px',
                            }}
                        >
                            <Image
                                src="/assets/images/ambulance1.png"
                                alt="Emergency"
                                width={20}
                                height={20}
                            />
                            <h3
                                style={{
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 700,
                                    fontSize: '15px',
                                    lineHeight: '1.2',
                                    letterSpacing: '0.02em',
                                    color: Colors.error500,
                                }}
                            >
                                Emergency Reports
                            </h3>
                        </div>
                        <p
                            style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '14px',
                                color: Colors.textDisabled,
                                textAlign: 'center',
                                marginTop: '16px',
                            }}
                        >
                            No reports from this guard
                        </p>
                    </div>

                    {/* Client Information Card */}
                    <div
                        style={{
                            backgroundColor: Colors.neutral50,
                            borderRadius: '12px',
                            border: `1px solid ${Colors.neutral100}`,
                            padding: '16px',
                        }}
                    >
                        <h3
                            style={{
                                fontFamily: 'var(--font-body)',
                                fontWeight: 400,
                                fontSize: '13px',
                                lineHeight: '1.2',
                                letterSpacing: '0.02em',
                                color: Colors.textBody,
                                marginBottom: '12px',
                            }}
                        >
                            Client Name
                        </h3>
                        <div
                            style={{
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 500,
                                fontSize: '18px',
                                color: Colors.mainIconColor,
                                marginBottom: '16px',
                            }}
                        >
                            {assignment.client.name}
                        </div>
                        <div
                            style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '13px',
                                color: Colors.textBody,
                                marginBottom: '8px',
                            }}
                        >
                            Contact
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span
                                style={{
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 500,
                                    fontSize: '14px',
                                    color: Colors.mainIconColor,
                                }}
                            >
                                {assignment.client.contact}
                            </span>
                            <button
                                onClick={() => handleCopy(assignment.client.contact)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '4px',
                                }}
                            >
                                <Image
                                    src="/assets/images/copy.png"
                                    alt="Copy"
                                    width={16}
                                    height={16}
                                />
                            </button>
                            <button
                                onClick={() => handleCall(assignment.client.contact)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '4px',
                                }}
                            >
                                <Image
                                    src="/assets/images/call.png"
                                    alt="Call"
                                    width={16}
                                    height={16}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Assigned Duties Card - Figma Specs */}
                    <div
                        style={{
                            backgroundColor: Colors.warning50,
                            borderRadius: '8px',
                            padding: '10px',
                        }}
                    >
                        <h3
                            style={{
                                fontFamily: 'var(--font-body)',
                                fontWeight: 400,
                                fontSize: '13px',
                                lineHeight: '1.2',
                                letterSpacing: '0.02em',
                                color: Colors.textBody,
                                marginBottom: '8px',
                            }}
                        >
                            Assigned Duties
                        </h3>
                        <ul
                            style={{
                                listStyleType: 'disc',
                                paddingLeft: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                                margin: 0,
                            }}
                        >
                            {assignment.duties.map((duty, index) => (
                                <li
                                    key={index}
                                    style={{
                                        fontFamily: 'var(--font-body)',
                                        fontWeight: 500,
                                        fontSize: '15px',
                                        lineHeight: '1.2',
                                        letterSpacing: '0.02em',
                                        color: Colors.mainIconColor,
                                    }}
                                >
                                    {duty}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            {showToast && (
                <div
                    style={{
                        position: 'fixed',
                        top: '24px',
                        right: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '16px 24px',
                        backgroundColor: '#D1FAE5',
                        border: '1px solid #10B981',
                        borderRadius: '12px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                        zIndex: 1000,
                        animation: 'slideIn 0.3s ease-out',
                    }}
                >
                    {/* Checkmark Icon */}
                    <div
                        style={{
                            width: '32px',
                            height: '32px',
                            backgroundColor: '#10B981',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16.6667 5L7.50004 14.1667L3.33337 10"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    {/* Text */}
                    <span
                        style={{
                            fontFamily: 'var(--font-body)',
                            fontWeight: 600,
                            fontSize: '16px',
                            color: '#065F46',
                        }}
                    >
                        Copied!
                    </span>

                    {/* Close Button */}
                    <button
                        onClick={() => setShowToast(false)}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            marginLeft: '12px',
                        }}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15 5L5 15M5 5L15 15"
                                stroke="#065F46"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            )}

            <style jsx>{`
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    )
}

interface TimelineItemProps {
    item: any
    isLast: boolean
    completedCheckIns: number
    totalCheckIns: number
}

function TimelineItem({ item, isLast, completedCheckIns, totalCheckIns }: TimelineItemProps) {
    const isCompleted = item.status === 'completed'
    const progressPercentage = (completedCheckIns / totalCheckIns) * 100

    return (
        <div style={{ display: 'flex', gap: '12px', position: 'relative' }}>
            {/* Circle Indicator - Figma Specs */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
                {/* Outer Circle with Border */}
                <div
                    style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        border: `1px solid ${Colors.primary500}`,
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                    }}
                >
                    {/* Inner Circle */}
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            backgroundColor: isCompleted ? Colors.primary200 : '#E5E7EB',
                        }}
                    />
                </div>

                {/* Vertical Line - Figma Specs: width 6px, height 63px, centered between circles */}
                {!isLast && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '61px', // 56px circle + 5px gap (centered: 5px + 63px + 5px = 73px)
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '6px',
                            height: '63px',
                            backgroundColor: isCompleted ? Colors.mainIconColor : '#E5E7EB',
                            borderRadius: '4px', // outer-radius/xs
                        }}
                    />
                )}
            </div>

            {/* Content Box - Figma Specs */}
            <div
                style={{
                    flex: 1,
                    backgroundColor: Colors.neutral50,
                    borderRadius: '6px',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                }}
            >
                <span
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 500,
                        fontSize: '15px',
                        lineHeight: '1.2',
                        letterSpacing: '0.02em',
                        color: Colors.mainIconColor,
                    }}
                >
                    {item.label}
                </span>
                <span
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '1.2',
                        letterSpacing: '0.02em',
                        color: Colors.textDisabled,
                    }}
                >
                    {item.time || item.timeRange}
                </span>
            </div>
        </div>
    )
}
