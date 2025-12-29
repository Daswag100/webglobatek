import React from 'react'
import { CheckInItem } from '@/types/dashboard'

interface CheckInsTimelineProps {
    checkIns: CheckInItem[]
    completedCheckIns: number
    totalCheckIns: number
}

export default function CheckInsTimeline({
    checkIns,
    completedCheckIns,
    totalCheckIns
}: CheckInsTimelineProps) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
            }}
        >
            {/* Header with Check-Ins counter - Separate and smaller */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <span
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: '1.2',
                        letterSpacing: '0.01em',
                        color: 'var(--main-text-body, #494949)',
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
                        textAlign: 'center',
                        color: 'var(--main-white, #FDFDFD)',
                        background: 'var(--main-icon-color, #172E65)',
                        padding: '8px 18px',
                        borderRadius: '8px',
                    }}
                >
                    {completedCheckIns}/{totalCheckIns}
                </span>
            </div>

            {/* Timeline items container - Separate white box with shadow */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0px',
                    padding: '24px',
                    background: '#FFFFFF',
                    border: '1px solid var(--neutral-50, #F4F4F4)',
                    borderRadius: '12px',
                    boxShadow: '0px 1px 8px 0px rgba(0, 0, 0, 0.08)',
                    width: '100%',
                }}
            >
                {checkIns.map((item, index) => (
                    <TimelineItem
                        key={item.id}
                        item={item}
                        isLast={index === checkIns.length - 1}
                    />
                ))}
            </div>
        </div>
    )
}

interface TimelineItemProps {
    item: CheckInItem
    isLast: boolean
}

function TimelineItem({ item, isLast }: TimelineItemProps) {
    const isActive = item.status === 'active' || item.status === 'completed'
    const isCompleted = item.status === 'completed'

    return (
        <div
            style={{
                display: 'flex',
                gap: '16px',
                position: 'relative',
                alignItems: 'flex-start',
                paddingBottom: isLast ? '0' : '16px',
            }}
        >
            {/* Circle indicator with vertical line */}
            <div
                style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexShrink: 0,
                }}
            >
                {/* Outer circle with border */}
                <div
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: '1px solid var(--primary-500, #1A377B)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'transparent',
                        flexShrink: 0,
                        padding: '4px',
                    }}
                >
                    {/* Inner filled circle for completed items */}
                    {isCompleted && (
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                background: 'var(--primary-200, #A3AFCA)',
                            }}
                        />
                    )}
                </div>

                {/* Vertical line connecting to next item - longer and more visible */}
                {!isLast && (
                    <div
                        style={{
                            width: '4px',
                            height: '48px',
                            borderRadius: '2px',
                            background: isCompleted
                                ? 'var(--main-icon-color, #172E65)'
                                : 'var(--neutral-200, #D1D1D1)',
                            marginTop: '4px',
                        }}
                    />
                )}
            </div>

            {/* Content */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    flex: 1,
                    paddingTop: '4px',
                    ...(isCompleted && {
                        background: 'var(--neutral-50, #F4F4F4)',
                        borderRadius: '12px',
                        padding: '12px 16px',
                    }),
                }}
            >
                <span
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 600,
                        fontSize: '15px',
                        lineHeight: '1.3',
                        letterSpacing: '0.01em',
                        color: isActive ? 'var(--main-icon-color, #172E65)' : '#9CA3AF',
                    }}
                >
                    {item.label}
                </span>
                <span
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '1.4',
                        letterSpacing: '0.01em',
                        color: isActive ? 'var(--main-text-body, #494949)' : '#9CA3AF',
                    }}
                >
                    {item.time || item.timeRange}
                </span>
            </div>
        </div>
    )
}
