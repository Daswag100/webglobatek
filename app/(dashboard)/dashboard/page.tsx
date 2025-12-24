"use client"

'use client'

import Image from "next/image"
import { Colors } from "@/constants/Colors"
import ActiveAssignmentCard from "@/components/dashboard/ActiveAssignmentCard"
import AssignmentHistoryItem from "@/components/dashboard/AssignmentHistoryItem"
import GuardAvatarGroup from "@/components/dashboard/GuardAvatarGroup"
import { useGuardsOnDuty } from "@/lib/hooks/useGuards"
import {
    mockActiveAssignment,
    mockHistoryAssignments,
    mockStats,
} from "@/data/mockDashboardData"

export default function DashboardPage() {
    // Use the hook to get guards on duty from the store
    const guardsOnDuty = useGuardsOnDuty()

    return (
        <div
            className="min-h-screen"
            style={{
                marginLeft: '110px',
                backgroundColor: Colors.screenBg,
            }}
        >
            {/* Header */}
            <div
                className="flex items-center border-b"
                style={{
                    height: '64px',
                    paddingLeft: '32px',
                    paddingRight: '32px',
                    gap: '24px',
                    borderBottomWidth: '1px',
                    borderBottomColor: Colors.border,
                }}
            >
                <h1
                    style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 400,
                        fontSize: '20px',
                        lineHeight: '1.3',
                        letterSpacing: '-0.005em',
                        color: Colors.textHeading,
                    }}
                >
                    Welcome, Sarah Mitchell
                </h1>
            </div>

            {/* Main Content */}
            <div
                className="flex gap-6"
                style={{
                    padding: '32px',
                }}
            >
                {/* Left Section */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Active Assignment */}
                    <ActiveAssignmentCard assignment={mockActiveAssignment} />

                    {/* Statistics Cards Row 1 */}
                    <div className="flex gap-6">
                        {/* Active Assignments */}
                        <div
                            className="flex flex-col"
                            style={{
                                flex: 1,
                                height: '150px',
                                gap: '16px',
                                borderRadius: '12px',
                                padding: '16px',
                                backgroundColor: Colors.neutral50,
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <Image
                                    src="/assets/images/flash.png"
                                    alt="Active"
                                    width={20}
                                    height={20}
                                />
                                <span
                                    style={{
                                        fontFamily: 'var(--font-body)',
                                        fontWeight: 700,
                                        fontSize: '14px',
                                        lineHeight: '1.5',
                                        letterSpacing: '0.02em',
                                        color: '#A4A4A4', // var(--main-text-disabled)
                                    }}
                                >
                                    Active Assignments
                                </span>
                            </div>
                            <div
                                style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 700,
                                    fontSize: '36px',
                                    lineHeight: '1.2',
                                    letterSpacing: '-0.01em',
                                    color: Colors.warning500,
                                }}
                            >
                                {mockStats.activeAssignments}
                            </div>
                        </div>

                        {/* Upcoming Assignments */}
                        <div
                            className="flex flex-col"
                            style={{
                                flex: 1,
                                height: '150px',
                                gap: '16px',
                                borderRadius: '12px',
                                padding: '16px',
                                backgroundColor: Colors.neutral50,
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <Image
                                    src="/assets/images/calendar.png"
                                    alt="Calendar"
                                    width={20}
                                    height={20}
                                />
                                <span
                                    style={{
                                        fontFamily: 'var(--font-body)',
                                        fontWeight: 700,
                                        fontSize: '14px',
                                        lineHeight: '1.5',
                                        letterSpacing: '0.02em',
                                        color: '#A4A4A4', // var(--main-text-disabled)
                                    }}
                                >
                                    Upcoming Assignments
                                </span>
                            </div>
                            <div
                                style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 700,
                                    fontSize: '36px',
                                    lineHeight: '1.2',
                                    letterSpacing: '-0.01em',
                                    color: Colors.text,
                                }}
                            >
                                {mockStats.upcomingAssignments}
                            </div>
                            <span
                                style={{
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 400,
                                    fontSize: '12px',
                                    lineHeight: '1.3',
                                    letterSpacing: '0.02em',
                                    color: Colors.textDisabled,
                                }}
                            >
                                (next 14 days)
                            </span>
                        </div>

                        {/* Completed Assignments */}
                        <div
                            className="flex flex-col"
                            style={{
                                flex: 1,
                                height: '150px',
                                gap: '16px',
                                borderRadius: '12px',
                                padding: '16px',
                                backgroundColor: Colors.neutral50,
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <Image
                                    src="/assets/images/history.png"
                                    alt="Completed"
                                    width={20}
                                    height={20}
                                />
                                <span
                                    style={{
                                        fontFamily: 'var(--font-body)',
                                        fontWeight: 700,
                                        fontSize: '14px',
                                        lineHeight: '1.5',
                                        letterSpacing: '0.02em',
                                        color: '#A4A4A4', // var(--main-text-disabled)
                                    }}
                                >
                                    Completed Assignments
                                </span>
                            </div>
                            <div
                                style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 700,
                                    fontSize: '36px',
                                    lineHeight: '1.2',
                                    letterSpacing: '-0.01em',
                                    color: Colors.textBody,
                                }}
                            >
                                {mockStats.completedAssignments}
                            </div>
                            <span
                                style={{
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 400,
                                    fontSize: '12px',
                                    lineHeight: '1.3',
                                    letterSpacing: '0.02em',
                                    color: Colors.textDisabled,
                                }}
                            >
                                (past 30 days)
                            </span>
                        </div>
                    </div>

                    {/* Statistics Cards Row 2 */}
                    <div className="flex gap-6">
                        {/* Guards on Duty */}
                        <div
                            className="flex flex-col"
                            style={{
                                flex: 1,
                                height: '150px',
                                gap: '16px',
                                borderRadius: '12px',
                                padding: '16px',
                                backgroundColor: Colors.neutral50,
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <Image
                                    src="/assets/images/dutyguard.png"
                                    alt="Guards"
                                    width={20}
                                    height={20}
                                />
                                <span
                                    style={{
                                        fontFamily: 'var(--font-body)',
                                        fontWeight: 700,
                                        fontSize: '14px',
                                        lineHeight: '1.5',
                                        letterSpacing: '0.02em',
                                        color: '#A4A4A4', // var(--main-text-disabled)
                                    }}
                                >
                                    Guards on Duty
                                </span>
                            </div>
                            <div
                                style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 700,
                                    fontSize: '36px',
                                    lineHeight: '1.2',
                                    letterSpacing: '-0.01em',
                                    color: Colors.textBody,
                                }}
                            >
                                {mockStats.guardsOnDuty}
                            </div>
                            <GuardAvatarGroup guards={guardsOnDuty} maxVisible={5} size={28} />
                        </div>

                        {/* Unresolved Requests */}
                        <div
                            className="flex flex-col"
                            style={{
                                flex: 1,
                                height: '150px',
                                gap: '16px',
                                borderRadius: '12px',
                                padding: '16px',
                                backgroundColor: Colors.neutral50,
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <Image
                                    src="/assets/images/redinbox.png"
                                    alt="Requests"
                                    width={20}
                                    height={20}
                                />
                                <span
                                    style={{
                                        fontFamily: 'var(--font-body)',
                                        fontWeight: 700,
                                        fontSize: '14px',
                                        lineHeight: '1.5',
                                        letterSpacing: '0.02em',
                                        color: '#A4A4A4', // var(--main-text-disabled)
                                    }}
                                >
                                    Unresolved Requests
                                </span>
                            </div>
                            <div
                                style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 700,
                                    fontSize: '36px',
                                    lineHeight: '1.2',
                                    letterSpacing: '-0.01em',
                                    color: '#DC2626',
                                }}
                            >
                                {mockStats.unresolvedRequests}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section - History */}
                <div
                    className="flex flex-col"
                    style={{
                        width: '270px',
                        gap: '20px',
                        borderRadius: '12px',
                        padding: '16px',
                        borderWidth: '1px',
                        borderColor: Colors.neutral50,
                        backgroundColor: Colors.screenBg,
                    }}
                >
                    {/* Header */}
                    <div className="flex items-center gap-2">
                        <Image
                            src="/assets/images/history.png"
                            alt="History"
                            width={20}
                            height={20}
                        />
                        <span
                            style={{
                                fontFamily: 'var(--font-body)',
                                fontWeight: 700,
                                fontSize: '14px',
                                lineHeight: '1.5',
                                letterSpacing: '0.02em',
                                color: Colors.textDisabled,
                            }}
                        >
                            History
                        </span>
                    </div>

                    {/* History Items */}
                    <div className="flex flex-col gap-4">
                        {mockHistoryAssignments.map((assignment) => (
                            <AssignmentHistoryItem
                                key={assignment.id}
                                assignment={assignment}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
