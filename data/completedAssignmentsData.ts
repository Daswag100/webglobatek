// Mock data for completed assignments with detailed guard information

export interface GuardCheckIn {
    type: 'clocked-in' | 'break-period' | 'clocked-out';
    time: string;
    endTime?: string; // For break periods
}

export interface GuardFeedback {
    text: string;
    images?: string[];
}

export interface EmergencyReport {
    description: string;
    time: string;
    images?: string[];
}

export interface CompletedGuardDetails {
    guardId: string;
    guardName: string;
    guardAvatar: string;
    guardEmail: string;
    guardPhone: string;
    guardIdNumber: string;
    performance: number; // Percentage
    performanceLabel: 'Excellent' | 'Fair' | 'Poor';
    checkIns: GuardCheckIn[];
    totalCheckIns: number;
    completedCheckIns: number;
    feedback?: GuardFeedback;
    emergencyReports?: EmergencyReport[];
}

export interface CompletedAssignmentDetails {
    id: string;
    title: string;
    location: string;
    date: string;
    startTime: string;
    endTime: string;
    clientName: string;
    clientContact: string;
    duties: string[];
    mapImage: string;
    guards: CompletedGuardDetails[];
}

export const completedAssignmentsData: Record<string, CompletedAssignmentDetails> = {
    // c1: Residential Patrol - 2/4 guards (Marcus Reid and Isaiah Coleman showed up)
    'c1': {
        id: 'c1',
        title: 'Residential Patrol – Maplewood Estate',
        location: '12400 Cedar Rd, Cleveland, OH 44106',
        date: '29 Oct 2025',
        startTime: '8:00 AM',
        endTime: '4:00 PM',
        clientName: 'Jones Andrew',
        clientContact: '+1 (000) 434-44223',
        duties: [
            'Check lobby access cards and visitor IDs',
            'Patrol parking level every hour',
            'Log unusual activity'
        ],
        mapImage: '/assets/images/map.png',
        guards: [
            {
                guardId: '1',
                guardName: 'Marcus Reid',
                guardAvatar: '/assets/images/marcus.png',
                guardEmail: 'marcus.reid@globatekguards.com',
                guardPhone: '+1 (347) 291-4820',
                guardIdNumber: 'GRDMR1',
                performance: 80,
                performanceLabel: 'Excellent',
                checkIns: [
                    { type: 'clocked-in', time: '11:55 AM' },
                    { type: 'break-period', time: '2:30 PM', endTime: '3:00 PM' },
                    { type: 'clocked-out', time: '6:00 PM' }
                ],
                totalCheckIns: 8,
                completedCheckIns: 7,
                feedback: {
                    text: 'Everything went smoothly. Clear instructions, good communication from the supervisor, and no issues during the shift.',
                    images: ['/assets/images/marcus.png', '/assets/images/marcus.png']
                },
                emergencyReports: [
                    {
                        description: 'Noticed an unknown individual circling the building repeatedly and attempting to look through windows. Maintained visual contact from a safe distance and notified onsite staff. Situation needs supervisor attention.',
                        time: '1:00 PM',
                        images: ['/assets/images/marcus.png']
                    },
                    {
                        description: 'Someone attempted to enter through the rear door without proper authorization. Door alarm triggered. I secured the area, verified no entry occurred, and ensured the door was locked. Requesting further instructions.',
                        time: '1:00 PM',
                        images: []
                    }
                ]
            },
            {
                guardId: '2',
                guardName: 'Isaiah Coleman',
                guardAvatar: '/assets/images/issac.png',
                guardEmail: 'isaiah.coleman@globatekguards.com',
                guardPhone: '+1 (213) 845-0927',
                guardIdNumber: 'GRDIC1',
                performance: 56,
                performanceLabel: 'Fair',
                checkIns: [
                    { type: 'clocked-in', time: '11:55 AM' },
                    { type: 'break-period', time: '2:30 PM', endTime: '3:00 PM' },
                    { type: 'clocked-out', time: '6:00 PM' }
                ],
                totalCheckIns: 8,
                completedCheckIns: 3,
                feedback: undefined, // No feedback from this guard
                emergencyReports: undefined // No reports from this guard
            }
        ]
    },

    // c2: Day Security - 4/4 guards (all showed up)
    'c2': {
        id: 'c2',
        title: 'Day Security – Horizon Business Suites',
        location: '801 S Figueroa St, Los Angeles, CA 90017',
        date: '29 Oct 2025',
        startTime: '8:00 AM',
        endTime: '4:00 PM',
        clientName: 'Sarah Mitchell',
        clientContact: '+1 (555) 123-4567',
        duties: [
            'Monitor main entrance',
            'Check visitor credentials',
            'Patrol all floors every 2 hours'
        ],
        mapImage: '/assets/images/map.png',
        guards: [
            {
                guardId: '1',
                guardName: 'Issac',
                guardAvatar: '/assets/images/issac.png',
                guardEmail: 'issac@globatekguards.com',
                guardPhone: '+1 (555) 001-0001',
                guardIdNumber: 'GRDI1',
                performance: 95,
                performanceLabel: 'Excellent',
                checkIns: [
                    { type: 'clocked-in', time: '8:00 AM' },
                    { type: 'break-period', time: '12:00 PM', endTime: '12:30 PM' },
                    { type: 'clocked-out', time: '4:00 PM' }
                ],
                totalCheckIns: 10,
                completedCheckIns: 10,
                feedback: {
                    text: 'Excellent shift. All protocols followed, no incidents.',
                    images: []
                },
                emergencyReports: undefined
            },
            {
                guardId: '2',
                guardName: 'James',
                guardAvatar: '/assets/images/james.png',
                guardEmail: 'james@globatekguards.com',
                guardPhone: '+1 (555) 002-0002',
                guardIdNumber: 'GRDJ1',
                performance: 88,
                performanceLabel: 'Excellent',
                checkIns: [
                    { type: 'clocked-in', time: '8:00 AM' },
                    { type: 'break-period', time: '12:00 PM', endTime: '12:30 PM' },
                    { type: 'clocked-out', time: '4:00 PM' }
                ],
                totalCheckIns: 10,
                completedCheckIns: 9,
                feedback: {
                    text: 'Good day, minor delay during lunch break.',
                    images: []
                },
                emergencyReports: undefined
            },
            {
                guardId: '3',
                guardName: 'Marcus',
                guardAvatar: '/assets/images/marcus.png',
                guardEmail: 'marcus@globatekguards.com',
                guardPhone: '+1 (555) 003-0003',
                guardIdNumber: 'GRDM1',
                performance: 92,
                performanceLabel: 'Excellent',
                checkIns: [
                    { type: 'clocked-in', time: '8:00 AM' },
                    { type: 'break-period', time: '12:00 PM', endTime: '12:30 PM' },
                    { type: 'clocked-out', time: '4:00 PM' }
                ],
                totalCheckIns: 10,
                completedCheckIns: 9,
                feedback: undefined,
                emergencyReports: undefined
            },
            {
                guardId: '4',
                guardName: 'Sarah',
                guardAvatar: '/assets/images/sarah.png',
                guardEmail: 'sarah@globatekguards.com',
                guardPhone: '+1 (555) 004-0004',
                guardIdNumber: 'GRDS1',
                performance: 85,
                performanceLabel: 'Excellent',
                checkIns: [
                    { type: 'clocked-in', time: '8:00 AM' },
                    { type: 'break-period', time: '12:00 PM', endTime: '12:30 PM' },
                    { type: 'clocked-out', time: '4:00 PM' }
                ],
                totalCheckIns: 10,
                completedCheckIns: 8,
                feedback: {
                    text: 'Smooth operations throughout the day.',
                    images: []
                },
                emergencyReports: undefined
            }
        ]
    },

    // c9: Night Security - 3/3 guards (all showed up)
    'c9': {
        id: 'c9',
        title: 'Night Security – Downtown Plaza',
        location: '500 Main St, Houston, TX 77002',
        date: '28 Oct 2025',
        startTime: '10:00 PM',
        endTime: '6:00 AM',
        clientName: 'Robert Johnson',
        clientContact: '+1 (555) 987-6543',
        duties: [
            'Secure all entry points',
            'Monitor CCTV systems',
            'Conduct hourly perimeter checks'
        ],
        mapImage: '/assets/images/map.png',
        guards: [
            {
                guardId: '1',
                guardName: 'Issac',
                guardAvatar: '/assets/images/issac.png',
                guardEmail: 'issac@globatekguards.com',
                guardPhone: '+1 (555) 001-0001',
                guardIdNumber: 'GRDI1',
                performance: 78,
                performanceLabel: 'Fair',
                checkIns: [
                    { type: 'clocked-in', time: '10:00 PM' },
                    { type: 'break-period', time: '2:00 AM', endTime: '2:30 AM' },
                    { type: 'clocked-out', time: '6:00 AM' }
                ],
                totalCheckIns: 8,
                completedCheckIns: 6,
                feedback: {
                    text: 'Quiet night, all systems operational.',
                    images: []
                },
                emergencyReports: undefined
            },
            {
                guardId: '2',
                guardName: 'James',
                guardAvatar: '/assets/images/james.png',
                guardEmail: 'james@globatekguards.com',
                guardPhone: '+1 (555) 002-0002',
                guardIdNumber: 'GRDJ1',
                performance: 90,
                performanceLabel: 'Excellent',
                checkIns: [
                    { type: 'clocked-in', time: '10:00 PM' },
                    { type: 'break-period', time: '2:00 AM', endTime: '2:30 AM' },
                    { type: 'clocked-out', time: '6:00 AM' }
                ],
                totalCheckIns: 8,
                completedCheckIns: 7,
                feedback: undefined,
                emergencyReports: undefined
            },
            {
                guardId: '3',
                guardName: 'Marcus',
                guardAvatar: '/assets/images/marcus.png',
                guardEmail: 'marcus@globatekguards.com',
                guardPhone: '+1 (555) 003-0003',
                guardIdNumber: 'GRDM1',
                performance: 82,
                performanceLabel: 'Excellent',
                checkIns: [
                    { type: 'clocked-in', time: '10:00 PM' },
                    { type: 'break-period', time: '2:00 AM', endTime: '2:30 AM' },
                    { type: 'clocked-out', time: '6:00 AM' }
                ],
                totalCheckIns: 8,
                completedCheckIns: 7,
                feedback: {
                    text: 'No incidents to report.',
                    images: []
                },
                emergencyReports: undefined
            }
        ]
    },

    // c10: Event Security - 1/1 guard (showed up)
    'c10': {
        id: 'c10',
        title: 'Event Security – City Convention Center',
        location: '1200 Convention Blvd, Miami, FL 33101',
        date: '27 Oct 2025',
        startTime: '2:00 PM',
        endTime: '10:00 PM',
        clientName: 'Maria Garcia',
        clientContact: '+1 (555) 456-7890',
        duties: [
            'Monitor event entrance',
            'Check tickets and IDs',
            'Assist with crowd control'
        ],
        mapImage: '/assets/images/map.png',
        guards: [
            {
                guardId: '1',
                guardName: 'Issac',
                guardAvatar: '/assets/images/issac.png',
                guardEmail: 'issac@globatekguards.com',
                guardPhone: '+1 (555) 001-0001',
                guardIdNumber: 'GRDI1',
                performance: 100,
                performanceLabel: 'Excellent',
                checkIns: [
                    { type: 'clocked-in', time: '2:00 PM' },
                    { type: 'break-period', time: '6:00 PM', endTime: '6:30 PM' },
                    { type: 'clocked-out', time: '10:00 PM' }
                ],
                totalCheckIns: 5,
                completedCheckIns: 5,
                feedback: {
                    text: 'Event went smoothly, great crowd cooperation.',
                    images: []
                },
                emergencyReports: undefined
            }
        ]
    },

    // a1: Active Assignment - Midtown Financial Center Lobby Patrol
    'a1': {
        id: 'a1',
        title: 'Midtown Financial Center Lobby Patrol',
        location: '250 Park Avenue, New York, NY 10177',
        date: '28 Dec 2025',
        startTime: '11:30 AM',
        endTime: '6:00 PM',
        clientName: 'Jones Andrew',
        clientContact: '+1 (000) 434-44223',
        duties: [
            'Check lobby access cards and visitor IDs',
            'Patrol parking level every hour',
            'Log unusual activity'
        ],
        mapImage: '/assets/images/map.png',
        guards: [
            {
                guardId: '1',
                guardName: 'Marcus Reid',
                guardAvatar: '/assets/images/marcus.png',
                guardEmail: 'marcus.reid@globatekguards.com',
                guardPhone: '+1 (347) 291-4820',
                guardIdNumber: 'GRDMR1',
                performance: 85,
                performanceLabel: 'Excellent',
                checkIns: [
                    { type: 'clocked-in', time: '11:30 AM' },
                    { type: 'break-period', time: '2:00 PM', endTime: '2:30 PM' }
                ],
                totalCheckIns: 3,
                completedCheckIns: 1,
                feedback: undefined,
                emergencyReports: undefined
            },
            {
                guardId: '2',
                guardName: 'Isaiah Coleman',
                guardAvatar: '/assets/images/issac.png',
                guardEmail: 'isaiah.coleman@globatekguards.com',
                guardPhone: '+1 (213) 845-0927',
                guardIdNumber: 'GRDIC1',
                performance: 90,
                performanceLabel: 'Excellent',
                checkIns: [
                    { type: 'clocked-in', time: '11:30 AM' },
                    { type: 'break-period', time: '2:00 PM', endTime: '2:30 PM' }
                ],
                totalCheckIns: 3,
                completedCheckIns: 1,
                feedback: undefined,
                emergencyReports: undefined
            }
        ]
    }
};
