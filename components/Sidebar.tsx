"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Colors } from "@/constants/Colors"

interface NavItem {
    id: string
    label: string
    icon: string
    path: string
}

const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: "/assets/images/dashboard.png", path: "/dashboard" },
    { id: "guards", label: "Guards", icon: "/assets/images/guard.png", path: "/guards" },
    { id: "supervisors", label: "Supervisors", icon: "/assets/images/headset.png", path: "/supervisors" },
    { id: "assignments", label: "Assignments", icon: "/assets/images/assignments.png", path: "/assignments" },
    { id: "inbox", label: "Inbox", icon: "/assets/images/mailicon.png", path: "/inbox" },
    { id: "logout", label: "Logout", icon: "/assets/images/login.png", path: "/login" },
]

export default function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div
            className="fixed left-0 top-0 h-screen flex flex-col border-r"
            style={{
                width: '110px',
                paddingTop: '24px',
                paddingBottom: '10px',
                gap: '32px',
                borderRightWidth: '1px',
                borderRightColor: Colors.border,
                backgroundColor: Colors.background,
            }}
        >
            {/* Logo */}
            <div className="flex justify-center px-4">
                <Image
                    src="/assets/images/logobg.png"
                    alt="Globatek"
                    width={48}
                    height={48}
                    className="object-contain"
                />
            </div>

            {/* Navigation Items */}
            <nav className="flex flex-col items-center gap-4 px-4">
                {navItems.map((item) => {
                    // Check if current path matches or starts with the item path
                    // Special handling for logout to only match exact path
                    const isActive = mounted && (
                        item.id === 'logout'
                            ? pathname === item.path
                            : pathname.startsWith(item.path)
                    )

                    return (
                        <button
                            key={item.id}
                            onClick={() => router.push(item.path)}
                            className="flex flex-col items-center gap-2 transition-all"
                            style={{
                                width: '48px',
                            }}
                        >
                            <div
                                className="flex items-center justify-center rounded transition-colors"
                                style={{
                                    width: '48px',
                                    height: '40px',
                                    padding: '8px 12px',
                                    backgroundColor: isActive ? Colors.primary500 : 'transparent',
                                }}
                            >
                                <Image
                                    src={item.icon}
                                    alt={item.label}
                                    width={24}
                                    height={24}
                                    style={{
                                        filter: isActive && item.id !== 'assignments' && item.id !== 'inbox' && item.id !== 'supervisors' ? 'brightness(0) invert(1)' : 'none',
                                    }}
                                />
                            </div>
                            <span
                                className="text-center"
                                style={{
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 400,
                                    fontSize: '11px',
                                    lineHeight: '1.2',
                                    letterSpacing: '0.02em',
                                    color: isActive ? Colors.primary500 : Colors.textDisabled,
                                }}
                            >
                                {item.label}
                            </span>
                        </button>
                    )
                })}
            </nav>
        </div>
    )
}
