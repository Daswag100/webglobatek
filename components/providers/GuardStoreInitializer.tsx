'use client'

import { useEffect } from 'react'
import { useGuardStore } from '@/lib/stores/useGuardStore'
import { initializeGuards } from '@/lib/api/guards'
import { mockGuards } from '@/data/mockDashboardData'

/**
 * Guard Store Initializer
 * This component initializes the guard store with mock data on first load
 * In production, this would fetch from your backend API
 */
export default function GuardStoreInitializer({ children }: { children: React.ReactNode }) {
    const { guards, loadGuards, setGuards } = useGuardStore()

    useEffect(() => {
        const init = async () => {
            // Initialize localStorage with mock data if empty
            await initializeGuards(mockGuards)

            // Load guards into the store
            if (guards.length === 0) {
                await loadGuards()
            }
        }

        init()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return <>{children}</>
}
