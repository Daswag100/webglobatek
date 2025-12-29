// Mock data for active assignment detail page
import { CheckInItem } from '@/types/dashboard';

export interface ActiveAssignmentDetail {
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
    guards: Array<{
        id: string;
        name: string;
        avatar: string;
        email: string;
        phone: string;
        guardId: string;
        checkIns: CheckInItem[];
        completedCheckIns: number;
        totalCheckIns: number;
        emergencyReports?: Array<{
            description: string;
            time: string;
            images?: string[];
        }>;
    }>;
}

export const activeAssignmentData: ActiveAssignmentDetail = {
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
            id: '1',
            name: 'Marcus Reid',
            avatar: '/assets/images/marcus.png',
            email: 'marcus.reid@globatekguards.com',
            phone: '+1 (347) 291-4820',
            guardId: 'GRDMR1',
            checkIns: [
                {
                    id: '1',
                    type: 'clock-in',
                    label: 'Clocked in',
                    time: '11:55 AM',
                    status: 'completed'
                },
                {
                    id: '2',
                    type: 'break',
                    label: 'Break Period',
                    timeRange: '2:30 PM - 3:00 PM',
                    status: 'active'
                },
                {
                    id: '3',
                    type: 'clock-out',
                    label: 'Clock out',
                    time: '6:00 PM',
                    status: 'pending'
                }
            ],
            completedCheckIns: 3,
            totalCheckIns: 8,
            emergencyReports: undefined
        },
        {
            id: '2',
            name: 'Isaiah Coleman',
            avatar: '/assets/images/issac.png',
            email: 'isaiah.coleman@globatekguards.com',
            phone: '+1 (213) 845-0927',
            guardId: 'GRDIC1',
            checkIns: [
                {
                    id: '1',
                    type: 'clock-in',
                    label: 'Clocked in',
                    time: '11:55 AM',
                    status: 'completed'
                },
                {
                    id: '2',
                    type: 'break',
                    label: 'Break Period',
                    timeRange: '2:30 PM - 3:00 PM',
                    status: 'active'
                },
                {
                    id: '3',
                    type: 'clock-out',
                    label: 'Clock out',
                    time: '6:00 PM',
                    status: 'pending'
                }
            ],
            completedCheckIns: 3,
            totalCheckIns: 8,
            emergencyReports: undefined
        }
    ]
};
