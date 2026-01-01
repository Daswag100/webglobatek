export interface Guard {
    id: string
    name: string
    avatar?: string
    initials: string
    color: string
    email?: string
    phone?: string
    guardId?: string
}

export interface Assignment {
    id: string
    title: string
    location: string
    address: string
    guards: Guard[]
    startTime?: Date
    endTime?: Date
    status?: 'active' | 'upcoming' | 'completed'
    checkpoints?: number
    completedCheckpoints?: number
}

export interface DashboardStats {
    activeAssignments: number
    upcomingAssignments: number
    completedAssignments: number
    guardsOnDuty: number
    unresolvedRequests: number
}

export type CheckInStatus = 'completed' | 'active' | 'pending'

export interface CheckInItem {
    id: string
    type: 'clock-in' | 'break' | 'clock-out'
    label: string
    time?: string
    timeRange?: string
    status: CheckInStatus
}

export interface ClientInfo {
    name: string
    contact: string
}

export interface AssignmentDetail extends Assignment {
    assignmentTime: string
    checkIns: CheckInItem[]
    totalCheckIns: number
    completedCheckIns: number
    client: ClientInfo
    duties: string[]
    mapUrl?: string
    emergencyReports: any[]
}

export type MessageStatus = 'resolved' | 'unresolved'

export interface EmergencyMessage {
    id: string
    ticketNumber: string
    sender: {
        name: string
        avatar: string
    }
    messagePreview: string
    messageContent: string
    date: string
    time: string
    status: MessageStatus
    timestamp: Date
}

export interface AssignmentMessage {
    id: string
    ticketNumber: string
    sender: {
        name: string
        avatar: string
    }
    messagePreview: string
    messageContent: string
    date: string
    time: string
    status: MessageStatus
    timestamp: Date
}

export interface RequestMessage {
    id: string
    ticketNumber: string
    sender: {
        name: string
        avatar: string
    }
    subject: string
    messagePreview: string
    messageContent: string
    date: string
    time: string
    status: MessageStatus
    timestamp: Date
}
