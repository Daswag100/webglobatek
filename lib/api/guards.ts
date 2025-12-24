import { Guard } from '@/types/dashboard'

/**
 * API Service Layer for Guard Operations
 * 
 * This file contains all API functions for managing guards.
 * Currently uses localStorage for data persistence.
 * When you build your backend API, update these functions to call your endpoints.
 */

const STORAGE_KEY = 'globatek_guards'

// Helper to get guards from localStorage
const getStoredGuards = (): Guard[] => {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
}

// Helper to save guards to localStorage
const saveGuards = (guards: Guard[]): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(guards))
}

/**
 * Fetch all guards
 * Future: GET /api/guards
 */
export const fetchGuards = async (): Promise<Guard[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))
    return getStoredGuards()
}

/**
 * Fetch a specific guard by ID
 * Future: GET /api/guards/:id
 */
export const fetchGuardById = async (id: string): Promise<Guard | null> => {
    await new Promise(resolve => setTimeout(resolve, 100))
    const guards = getStoredGuards()
    return guards.find(guard => guard.id === id) || null
}

/**
 * Create a new guard
 * Future: POST /api/guards
 */
export const createGuard = async (guardData: Omit<Guard, 'id'>): Promise<Guard> => {
    await new Promise(resolve => setTimeout(resolve, 100))

    const guards = getStoredGuards()
    const newGuard: Guard = {
        ...guardData,
        id: `guard_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }

    guards.push(newGuard)
    saveGuards(guards)

    return newGuard
}

/**
 * Update an existing guard
 * Future: PUT /api/guards/:id
 */
export const updateGuard = async (id: string, guardData: Partial<Guard>): Promise<Guard | null> => {
    await new Promise(resolve => setTimeout(resolve, 100))

    const guards = getStoredGuards()
    const index = guards.findIndex(guard => guard.id === id)

    if (index === -1) return null

    guards[index] = { ...guards[index], ...guardData }
    saveGuards(guards)

    return guards[index]
}

/**
 * Delete a guard
 * Future: DELETE /api/guards/:id
 */
export const deleteGuard = async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 100))

    const guards = getStoredGuards()
    const filtered = guards.filter(guard => guard.id !== id)

    if (filtered.length === guards.length) return false

    saveGuards(filtered)
    return true
}

/**
 * Upload guard avatar
 * Future: POST /api/guards/:id/avatar (multipart/form-data)
 * 
 * For now, this converts the file to a data URL.
 * In production, this should upload to your storage service (S3, Cloudinary, etc.)
 */
export const uploadGuardAvatar = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = (e) => {
            const result = e.target?.result
            if (typeof result === 'string') {
                resolve(result)
            } else {
                reject(new Error('Failed to read file'))
            }
        }

        reader.onerror = () => reject(new Error('Failed to read file'))
        reader.readAsDataURL(file)
    })
}

/**
 * Initialize guards with default data
 * This is useful for seeding the database on first load
 */
export const initializeGuards = async (guards: Guard[]): Promise<void> => {
    const existing = getStoredGuards()
    if (existing.length === 0) {
        saveGuards(guards)
    }
}
