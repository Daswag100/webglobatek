// Mock data for upcoming assignments with detailed information

export interface UpcomingGuardDetails {
    guardId: string;
    guardName: string;
    guardAvatar: string;
    guardEmail: string;
    guardPhone: string;
    guardIdNumber: string;
}

export interface UpcomingAssignmentDetails {
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
    guards: UpcomingGuardDetails[];
}

export const upcomingAssignmentsData: Record<string, UpcomingAssignmentDetails> = {
    '1': {
        id: '1',
        title: 'Morning Patrol – Federal Plaza Tower',
        location: '375 Park Ave, New York, NY 10152',
        date: '25 Jan 2025',
        startTime: '8:00 AM',
        endTime: '4:00 PM',
        clientName: 'Federal Plaza Management',
        clientContact: '+1 (212) 555-0101',
        duties: [
            'Monitor main entrance and lobby area',
            'Check visitor credentials and maintain sign-in log',
            'Conduct hourly perimeter patrols',
            'Respond to security incidents'
        ],
        mapImage: '/assets/images/map.png',
        guards: [
            {
                guardId: 'GRDI1',
                guardName: 'Issac',
                guardAvatar: '/assets/images/issac.png',
                guardEmail: 'issac@globatekguards.com',
                guardPhone: '+1 (555) 001-0001',
                guardIdNumber: 'GRDI1'
            },
            {
                guardId: 'GRDJ1',
                guardName: 'James',
                guardAvatar: '/assets/images/james.png',
                guardEmail: 'james@globatekguards.com',
                guardPhone: '+1 (555) 002-0002',
                guardIdNumber: 'GRDJ1'
            },
            {
                guardId: 'GRDM1',
                guardName: 'Marcus',
                guardAvatar: '/assets/images/marcus.png',
                guardEmail: 'marcus@globatekguards.com',
                guardPhone: '+1 (555) 003-0003',
                guardIdNumber: 'GRDM1'
            },
            {
                guardId: 'GRDS1',
                guardName: 'Sarah',
                guardAvatar: '/assets/images/sarah.png',
                guardEmail: 'sarah@globatekguards.com',
                guardPhone: '+1 (555) 004-0004',
                guardIdNumber: 'GRDS1'
            }
        ]
    },
    '2': {
        id: '2',
        title: 'Evening Security – Brookstone Retail Complex',
        location: '375 Park Ave, New York, NY 10152',
        date: '25 Jan 2025',
        startTime: '4:00 PM',
        endTime: '12:00 AM',
        clientName: 'Brookstone Retail Group',
        clientContact: '+1 (212) 555-0202',
        duties: [
            'Secure all entry and exit points',
            'Monitor CCTV systems',
            'Patrol retail floors and parking areas',
            'Assist with closing procedures'
        ],
        mapImage: '/assets/images/map.png',
        guards: [
            {
                guardId: 'GRDI1',
                guardName: 'Issac',
                guardAvatar: '/assets/images/issac.png',
                guardEmail: 'issac@globatekguards.com',
                guardPhone: '+1 (555) 001-0001',
                guardIdNumber: 'GRDI1'
            },
            {
                guardId: 'GRDJ1',
                guardName: 'James',
                guardAvatar: '/assets/images/james.png',
                guardEmail: 'james@globatekguards.com',
                guardPhone: '+1 (555) 002-0002',
                guardIdNumber: 'GRDJ1'
            },
            {
                guardId: 'GRDM1',
                guardName: 'Marcus',
                guardAvatar: '/assets/images/marcus.png',
                guardEmail: 'marcus@globatekguards.com',
                guardPhone: '+1 (555) 003-0003',
                guardIdNumber: 'GRDM1'
            },
            {
                guardId: 'GRDS1',
                guardName: 'Sarah',
                guardAvatar: '/assets/images/sarah.png',
                guardEmail: 'sarah@globatekguards.com',
                guardPhone: '+1 (555) 004-0004',
                guardIdNumber: 'GRDS1'
            }
        ]
    },
    '3': {
        id: '3',
        title: 'Night Watch – Downtown Office Building',
        location: '1200 Main St, New York, NY 10001',
        date: '26 Jan 2025',
        startTime: '10:00 PM',
        endTime: '6:00 AM',
        clientName: 'Downtown Properties LLC',
        clientContact: '+1 (212) 555-0303',
        duties: [
            'Secure building perimeter overnight',
            'Monitor alarm systems',
            'Conduct regular floor patrols',
            'Log all incidents and activities'
        ],
        mapImage: '/assets/images/map.png',
        guards: [
            {
                guardId: 'GRDI1',
                guardName: 'Issac',
                guardAvatar: '/assets/images/issac.png',
                guardEmail: 'issac@globatekguards.com',
                guardPhone: '+1 (555) 001-0001',
                guardIdNumber: 'GRDI1'
            },
            {
                guardId: 'GRDJ1',
                guardName: 'James',
                guardAvatar: '/assets/images/james.png',
                guardEmail: 'james@globatekguards.com',
                guardPhone: '+1 (555) 002-0002',
                guardIdNumber: 'GRDJ1'
            },
            {
                guardId: 'GRDM1',
                guardName: 'Marcus',
                guardAvatar: '/assets/images/marcus.png',
                guardEmail: 'marcus@globatekguards.com',
                guardPhone: '+1 (555) 003-0003',
                guardIdNumber: 'GRDM1'
            },
            {
                guardId: 'GRDS1',
                guardName: 'Sarah',
                guardAvatar: '/assets/images/sarah.png',
                guardEmail: 'sarah@globatekguards.com',
                guardPhone: '+1 (555) 004-0004',
                guardIdNumber: 'GRDS1'
            }
        ]
    },
    '4': {
        id: '4',
        title: 'Mall Security – Westfield Shopping Center',
        location: '500 Commerce Blvd, New York, NY 10003',
        date: '26 Jan 2025',
        startTime: '9:00 AM',
        endTime: '9:00 PM',
        clientName: 'Westfield Management',
        clientContact: '+1 (212) 555-0404',
        duties: [
            'Monitor shopping center entrances',
            'Patrol common areas and parking structures',
            'Respond to customer assistance requests',
            'Coordinate with mall management'
        ],
        mapImage: '/assets/images/map.png',
        guards: [
            {
                guardId: 'GRDI1',
                guardName: 'Issac',
                guardAvatar: '/assets/images/issac.png',
                guardEmail: 'issac@globatekguards.com',
                guardPhone: '+1 (555) 001-0001',
                guardIdNumber: 'GRDI1'
            },
            {
                guardId: 'GRDJ1',
                guardName: 'James',
                guardAvatar: '/assets/images/james.png',
                guardEmail: 'james@globatekguards.com',
                guardPhone: '+1 (555) 002-0002',
                guardIdNumber: 'GRDJ1'
            },
            {
                guardId: 'GRDM1',
                guardName: 'Marcus',
                guardAvatar: '/assets/images/marcus.png',
                guardEmail: 'marcus@globatekguards.com',
                guardPhone: '+1 (555) 003-0003',
                guardIdNumber: 'GRDM1'
            },
            {
                guardId: 'GRDS1',
                guardName: 'Sarah',
                guardAvatar: '/assets/images/sarah.png',
                guardEmail: 'sarah@globatekguards.com',
                guardPhone: '+1 (555) 004-0004',
                guardIdNumber: 'GRDS1'
            }
        ]
    }
};
