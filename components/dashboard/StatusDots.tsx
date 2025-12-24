interface StatusDotsProps {
    total: number
    completed: number
    selectedIndex?: number | null
    onDotClick?: (index: number) => void
}

export default function StatusDots({ total, completed, selectedIndex, onDotClick }: StatusDotsProps) {
    return (
        <div className="flex items-center" style={{ gap: '16px' }}>
            {Array.from({ length: total }).map((_, index) => {
                // Only show the selected dot as filled, not cumulative
                const isCompleted = selectedIndex !== undefined && selectedIndex !== null
                    ? index === selectedIndex
                    : index < completed

                return (
                    <div
                        key={index}
                        className="flex items-center justify-center rounded-full"
                        onClick={() => onDotClick?.(index)}
                        style={{
                            width: '30px',
                            height: '20px',
                            gap: '10px',
                            borderRadius: '100px', // corner-radius/xxl
                            padding: '2px', // padding/xxxs
                            border: '2px solid #7687B0', // var(--primary-300)
                            backgroundColor: 'transparent',
                            cursor: onDotClick ? 'pointer' : 'default',
                            transition: 'transform 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            if (onDotClick) {
                                e.currentTarget.style.transform = 'scale(1.1)'
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (onDotClick) {
                                e.currentTarget.style.transform = 'scale(1)'
                            }
                        }}
                    >
                        {/* Inner filled area - only for selected dot */}
                        {isCompleted && (
                            <div
                                className="rounded-full"
                                style={{
                                    width: '26px',
                                    height: '16px',
                                    borderRadius: '100px', // corner-radius/xxl
                                    backgroundColor: '#D1D7E5', // var(--primary-100)
                                }}
                            />
                        )}
                    </div>
                )
            })}
        </div>
    )
}
