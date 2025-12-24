import { Guard, Assignment, DashboardStats, AssignmentDetail, CheckInItem } from '@/types/dashboard'

export const mockGuards: Guard[] = [
    {
        id: '1',
        name: 'Marcus Reid',
        initials: 'MR',
        color: '#3B82F6',
        avatar: '/assets/images/marcus.png',
        email: 'marcus.reid@globatekguards.com',
        phone: '+1 (213) 845-0927',
        guardId: 'GRDIC1'
    },
    {
        id: '2',
        name: 'Isaiah Coleman',
        initials: 'IC',
        color: '#8B5CF6',
        avatar: '/assets/images/issac.png',
        email: 'isaiah.coleman@globatekguards.com',
        phone: '+1 (213) 845-0927',
        guardId: 'GRDIC1'
    },
    { id: '3', name: 'Sarah Johnson', initials: 'SJ', color: '#EC4899', avatar: '/assets/images/sarah.png' },
    { id: '4', name: 'Michael Chen', initials: 'MC', color: '#10B981', avatar: '/assets/images/james.png' },
    { id: '5', name: 'Emily Davis', initials: 'ED', color: '#F59E0B', avatar: '/assets/images/mary.jpg' },
    { id: '6', name: 'David Wilson', initials: 'DW', color: '#6366F1' },
    { id: '7', name: 'Jessica Brown', initials: 'JB', color: '#EF4444' },
    { id: '8', name: 'Robert Taylor', initials: 'RT', color: '#14B8A6' },
    { id: '9', name: 'Amanda Martinez', initials: 'AM', color: '#F97316' },
]

export const mockActiveAssignment: Assignment = {
    id: 'a1',
    title: 'Midtown Financial Center Lobby Patrol',
    location: 'Midtown Financial Center',
    address: '250 Park Avenue, New York, NY 10177',
    guards: [mockGuards[0], mockGuards[1]],
    status: 'active',
    checkpoints: 3,
    completedCheckpoints: 1,
}

export const mockHistoryAssignments: Assignment[] = [
    {
        id: 'h1',
        title: 'Residential Patrol - Maplewood Estate',
        location: 'Maplewood Estate',
        address: '12400 Cedar Rd, Cleveland, OH 44106',
        guards: [mockGuards[0], mockGuards[1], mockGuards[2], mockGuards[3]], // All have images
        startTime: new Date('2025-10-23T19:00:00'),
        endTime: new Date('2025-10-24T03:00:00'),
        status: 'completed',
    },
    {
        id: 'h2',
        title: 'Residential Patrol - Maplewood Estate',
        location: 'Maplewood Estate',
        address: '12400 Cedar Rd, Cleveland, OH 44106',
        guards: [mockGuards[1], mockGuards[2], mockGuards[3], mockGuards[4]], // All have images
        startTime: new Date('2025-10-23T19:00:00'),
        endTime: new Date('2025-10-24T03:00:00'),
        status: 'completed',
    },
    {
        id: 'h3',
        title: 'Residential Patrol - Maplewood Estate',
        location: 'Maplewood Estate',
        address: '12400 Cedar Rd, Cleveland, OH 44106',
        guards: [mockGuards[1], mockGuards[2], mockGuards[3], mockGuards[4]],
        startTime: new Date('2025-10-23T19:00:00'),
        endTime: new Date('2025-10-24T03:00:00'),
        status: 'completed',
    },
]

export const mockStats: DashboardStats = {
    activeAssignments: 3,
    upcomingAssignments: 23,
    completedAssignments: 245,
    guardsOnDuty: 9,
    unresolvedRequests: 7,
}

export const mockGuardsOnDuty: Guard[] = mockGuards.slice(0, 5)

// Mock check-in timeline data
const mockCheckIns: CheckInItem[] = [
    {
        id: 'ci1',
        type: 'clock-in',
        label: 'Clocked in',
        time: '10:25 AM',
        status: 'completed'
    },
    {
        id: 'ci2',
        type: 'break',
        label: 'Break Period',
        timeRange: '3:30PM - 3:50PM',
        status: 'pending'
    },
    {
        id: 'ci3',
        type: 'clock-out',
        label: 'Clock out',
        time: '6:00 PM',
        status: 'pending'
    }
]

// Mock assignment detail data
export const mockAssignmentDetail: AssignmentDetail = {
    ...mockActiveAssignment,
    assignmentTime: '11:30AM - 6:00PM',
    checkIns: mockCheckIns,
    totalCheckIns: 8,
    completedCheckIns: 3,
    client: {
        name: 'Jones Andrew',
        contact: '+1 (000) 434-44223'
    },
    duties: [
        'Check lobby access cards and visitor IDs',
        'Patrol parking level every hour',
        'Log unusual activity'
    ],
    emergencyReports: []
}
