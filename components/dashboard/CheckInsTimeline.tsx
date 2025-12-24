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
    const progressPercentage = (completedCheckIns / totalCheckIns) * 100

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
            }}
        >
            {/* Header with Check-Ins counter */}
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
                        fontSize: '14px',
                        color: '#6B7280',
                    }}
                >
                    Check-Ins
                </span>
                <span
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 600,
                        fontSize: '14px',
                        color: '#111827',
                    }}
                >
                    {completedCheckIns}/{totalCheckIns}
                </span>
            </div>

            {/* Timeline items */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    position: 'relative',
                }}
            >
                {checkIns.map((item, index) => (
                    <TimelineItem
                        key={item.id}
                        item={item}
                        isLast={index === checkIns.length - 1}
                        progressPercentage={progressPercentage}
                    />
                ))}
            </div>
        </div>
    )
}

interface TimelineItemProps {
    item: CheckInItem
    isLast: boolean
    progressPercentage: number
}

function TimelineItem({ item, isLast, progressPercentage }: TimelineItemProps) {
    const isActive = item.status === 'active' || item.status === 'completed'
    const isCompleted = item.status === 'completed'

    return (
        <div
            style={{
                display: 'flex',
                gap: '12px',
                position: 'relative',
            }}
        >
            {/* Circle indicator */}
            <div
                style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                }}
            >
                {/* Animated pulsing circle for active status */}
                {item.status === 'completed' && item.type === 'clock-in' && (
                    <>
                        <div
                            className="pulse-ring"
                            style={{
                                position: 'absolute',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: '#3B82F6',
                                opacity: 0.3,
                                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                            }}
                        />
                        <div
                            style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: '#3B82F6',
                                border: '3px solid #DBEAFE',
                                zIndex: 1,
                            }}
                        />
                    </>
                )}

                {/* Regular circle for other states */}
                {!(item.status === 'completed' && item.type === 'clock-in') && (
                    <div
                        style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: isCompleted ? '#3B82F6' : '#E5E7EB',
                            border: `3px solid ${isCompleted ? '#DBEAFE' : '#F3F4F6'}`,
                        }}
                    />
                )}

                {/* Vertical line connecting to next item */}
                {!isLast && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '30px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '3px',
                            height: '48px',
                            backgroundColor: '#E5E7EB',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Progress fill */}
                        <div
                            style={{
                                width: '100%',
                                height: `${progressPercentage}%`,
                                backgroundColor: '#3B82F6',
                                transition: 'height 0.3s ease',
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Content */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    paddingTop: '2px',
                }}
            >
                <span
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 600,
                        fontSize: '14px',
                        color: isActive ? '#111827' : '#9CA3AF',
                    }}
                >
                    {item.label}
                </span>
                <span
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 400,
                        fontSize: '13px',
                        color: '#6B7280',
                    }}
                >
                    {item.time || item.timeRange}
                </span>
            </div>

            <style jsx>{`
                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.3;
                    }
                    50% {
                        transform: scale(1.2);
                        opacity: 0.1;
                    }
                }
            `}</style>
        </div>
    )
}
