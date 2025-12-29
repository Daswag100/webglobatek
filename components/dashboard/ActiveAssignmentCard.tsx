import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Assignment } from '@/types/dashboard'
import GuardAvatarGroup from './GuardAvatarGroup'
import StatusDots from './StatusDots'

interface ActiveAssignmentCardProps {
    assignment: Assignment
}

export default function ActiveAssignmentCard({ assignment }: ActiveAssignmentCardProps) {
    const [selectedCheckpoint, setSelectedCheckpoint] = React.useState<number | null>(null)

    const handleCheckpointClick = (index: number) => {
        // Toggle the selected checkpoint - only show one filled at a time
        setSelectedCheckpoint(selectedCheckpoint === index ? null : index)
    }

    return (
        <div
            className="flex flex-col"
            style={{
                width: '813px',
                height: '220px',
                justifyContent: 'space-between',
                borderRadius: '12px',
                padding: '24px',
                backgroundColor: '#1A377B',
                color: '#FDFDFD',
            }}
        >
            {/* Title, Address, and Guards in single column */}
            <div className="flex flex-col">
                <h2
                    style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 400,
                        fontSize: '20px',
                        lineHeight: '1.3',
                        letterSpacing: '-0.005em',
                        color: '#FDFDFD',
                        marginBottom: '8px',
                    }}
                >
                    {assignment.title}
                </h2>
                <div className="flex items-center gap-2" style={{ marginBottom: '16px' }}>
                    <Image
                        src="/assets/images/location1.png"
                        alt="Location"
                        width={16}
                        height={16}
                    />
                    <span
                        style={{
                            fontFamily: 'var(--font-body)',
                            fontWeight: 700,
                            fontSize: '14px',
                            lineHeight: '1.5',
                            letterSpacing: '0.02em',
                            color: '#BBBBBB',
                        }}
                    >
                        {assignment.address}
                    </span>
                </div>

                {/* Guards below address */}
                <div className="flex items-center gap-3">
                    {assignment.guards.map((guard) => (
                        <Link
                            key={guard.id}
                            href={`/dashboard/active?guard=${guard.id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <GuardProfile guard={guard} />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Status Dots at bottom */}
            {assignment.checkpoints && (
                <StatusDots
                    total={assignment.checkpoints}
                    completed={0} // Not used anymore
                    selectedIndex={selectedCheckpoint}
                    onDotClick={handleCheckpointClick}
                />
            )}
        </div>
    )
}

interface GuardProfileProps {
    guard: {
        id: string
        name: string
        avatar?: string
        initials: string
        color: string
    }
}

function GuardProfile({ guard }: GuardProfileProps) {
    const [imageError, setImageError] = React.useState(false)

    return (
        <div
            className="flex items-center"
            style={{
                height: '54px',
                gap: '10px',
                borderRadius: '100px', // Very round like in Figma
                padding: '12px',
                paddingRight: '16px',
                backgroundColor: '#485F95',
                width: 'fit-content', // Compact width
                cursor: 'pointer',
                transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#5A6FA8'
                e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#485F95'
                e.currentTarget.style.transform = 'translateY(0)'
            }}
        >
            {/* Avatar */}
            <div
                className="flex items-center justify-center rounded-full overflow-hidden"
                style={{
                    width: '30px',
                    height: '30px',
                    flexShrink: 0,
                }}
            >
                {guard.avatar && !imageError ? (
                    <Image
                        src={guard.avatar}
                        alt={guard.name}
                        width={30}
                        height={30}
                        className="rounded-full object-cover"
                        onError={() => setImageError(true)}
                        style={{
                            width: '30px',
                            height: '30px',
                        }}
                    />
                ) : (
                    <div
                        className="flex items-center justify-center rounded-full"
                        style={{
                            width: '30px',
                            height: '30px',
                            backgroundColor: guard.color,
                        }}
                    >
                        <span
                            style={{
                                fontFamily: 'var(--font-body)',
                                fontWeight: 600,
                                fontSize: '13px',
                                color: 'white',
                            }}
                        >
                            {guard.initials}
                        </span>
                    </div>
                )}
            </div>

            {/* Name */}
            <span
                style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '1.5',
                    letterSpacing: '0.02em',
                    color: '#FDFDFD',
                    whiteSpace: 'nowrap',
                }}
            >
                {guard.name}
            </span>
        </div>
    )
}
