import Image from 'next/image'
import { Guard } from '@/types/dashboard'
import { useState } from 'react'

interface GuardAvatarGroupProps {
    guards: Guard[]
    maxVisible?: number
    size?: number
}

export default function GuardAvatarGroup({
    guards,
    maxVisible = 5,
    size = 32
}: GuardAvatarGroupProps) {
    const visibleGuards = guards.slice(0, maxVisible)
    const remainingCount = guards.length - maxVisible

    return (
        <div className="flex items-center" style={{ marginLeft: '-8px' }}>
            {visibleGuards.map((guard, index) => (
                <GuardAvatar
                    key={guard.id}
                    guard={guard}
                    size={size}
                    style={{
                        marginLeft: index === 0 ? '0' : '-8px',
                        zIndex: visibleGuards.length - index,
                    }}
                />
            ))}
            {remainingCount > 0 && (
                <div
                    className="flex items-center justify-center rounded-full border-2 border-white"
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        backgroundColor: '#6B7280',
                        marginLeft: '-8px',
                        zIndex: 0,
                    }}
                >
                    <span
                        style={{
                            fontFamily: 'var(--font-body)',
                            fontWeight: 600,
                            fontSize: `${size * 0.4}px`,
                            color: 'white',
                        }}
                    >
                        +{remainingCount}
                    </span>
                </div>
            )}
        </div>
    )
}

interface GuardAvatarProps {
    guard: Guard
    size: number
    style?: React.CSSProperties
}

function GuardAvatar({ guard, size, style }: GuardAvatarProps) {
    const [imageError, setImageError] = useState(false)

    // If guard has avatar and no error, show image
    if (guard.avatar && !imageError) {
        return (
            <div
                className="flex items-center justify-center rounded-full overflow-hidden"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    border: '2px solid #7687B0',
                    ...style,
                }}
                title={guard.name}
            >
                <Image
                    src={guard.avatar}
                    alt={guard.name}
                    width={size}
                    height={size}
                    unoptimized
                    className="rounded-full object-cover"
                    onError={() => setImageError(true)}
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                    }}
                />
            </div>
        )
    }

    // Fallback to colored circle with initials
    return (
        <div
            className="flex items-center justify-center rounded-full border-2 border-white"
            style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: guard.color,
                ...style,
            }}
            title={guard.name}
        >
            <span
                style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: `${size * 0.4}px`,
                    color: 'white',
                }}
            >
                {guard.initials}
            </span>
        </div>
    )
}
