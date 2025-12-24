import { create } from 'zustand'
import { Guard } from '@/types/dashboard'
import { fetchGuards, createGuard, updateGuard, deleteGuard } from '@/lib/api/guards'

interface GuardStore {
    // State
    guards: Guard[]
    isLoading: boolean
    error: string | null

    // Actions
    loadGuards: () => Promise<void>
    addGuard: (guardData: Omit<Guard, 'id'>) => Promise<Guard>
    updateGuardData: (id: string, guardData: Partial<Guard>) => Promise<void>
    removeGuard: (id: string) => Promise<void>
    setGuards: (guards: Guard[]) => void

    // Computed/Helper methods
    getGuardById: (id: string) => Guard | undefined
    getGuardsByIds: (ids: string[]) => Guard[]
}

export const useGuardStore = create<GuardStore>((set, get) => ({
    // Initial state
    guards: [],
    isLoading: false,
    error: null,

    // Load all guards from API
    loadGuards: async () => {
        set({ isLoading: true, error: null })
        try {
            const guards = await fetchGuards()
            set({ guards, isLoading: false })
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to load guards',
                isLoading: false
            })
        }
    },

    // Add a new guard
    addGuard: async (guardData) => {
        set({ isLoading: true, error: null })
        try {
            const newGuard = await createGuard(guardData)
            set(state => ({
                guards: [...state.guards, newGuard],
                isLoading: false
            }))
            return newGuard
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to add guard',
                isLoading: false
            })
            throw error
        }
    },

    // Update an existing guard
    updateGuardData: async (id, guardData) => {
        set({ isLoading: true, error: null })
        try {
            const updatedGuard = await updateGuard(id, guardData)
            if (updatedGuard) {
                set(state => ({
                    guards: state.guards.map(guard =>
                        guard.id === id ? updatedGuard : guard
                    ),
                    isLoading: false
                }))
            }
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to update guard',
                isLoading: false
            })
        }
    },

    // Remove a guard
    removeGuard: async (id) => {
        set({ isLoading: true, error: null })
        try {
            await deleteGuard(id)
            set(state => ({
                guards: state.guards.filter(guard => guard.id !== id),
                isLoading: false
            }))
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to remove guard',
                isLoading: false
            })
        }
    },

    // Set guards directly (useful for initialization)
    setGuards: (guards) => {
        set({ guards })
    },

    // Get a single guard by ID
    getGuardById: (id) => {
        return get().guards.find(guard => guard.id === id)
    },

    // Get multiple guards by their IDs
    getGuardsByIds: (ids) => {
        const { guards } = get()
        return guards.filter(guard => ids.includes(guard.id))
    }
}))
