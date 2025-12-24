import { useEffect } from 'react'
import { useGuardStore } from '@/lib/stores/useGuardStore'
import { Guard } from '@/types/dashboard'

/**
 * Hook to get all guards
 * Automatically loads guards on first mount
 */
export const useGuards = () => {
    const { guards, isLoading, error, loadGuards } = useGuardStore()

    useEffect(() => {
        if (guards.length === 0 && !isLoading) {
            loadGuards()
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return { guards, isLoading, error }
}

/**
 * Hook to get specific guards by their IDs
 */
export const useGuardsByIds = (ids: string[]): Guard[] => {
    const getGuardsByIds = useGuardStore(state => state.getGuardsByIds)
    return getGuardsByIds(ids)
}

/**
 * Hook to get a single guard by ID
 */
export const useGuardById = (id: string): Guard | undefined => {
    const getGuardById = useGuardStore(state => state.getGuardById)
    return getGuardById(id)
}

/**
 * Hook to get guards currently on duty
 * This can be extended with more complex logic when you have duty status
 */
export const useGuardsOnDuty = (): Guard[] => {
    const { guards } = useGuards()

    // For now, return all guards
    // In the future, you can filter based on duty status:
    // return guards.filter(guard => guard.isOnDuty)
    return guards
}

/**
 * Hook to get guards for a specific assignment
 */
export const useGuardsByAssignment = (assignmentId: string): Guard[] => {
    const { guards } = useGuards()

    // This will need to be implemented based on your assignment-guard relationship
    // For now, returning empty array as placeholder
    // Future: filter guards based on assignment relationship
    return []
}

/**
 * Hook to get guard management actions
 */
export const useGuardActions = () => {
    const { addGuard, updateGuardData, removeGuard, loadGuards } = useGuardStore()

    return {
        addGuard,
        updateGuard: updateGuardData,
        removeGuard,
        refreshGuards: loadGuards
    }
}
