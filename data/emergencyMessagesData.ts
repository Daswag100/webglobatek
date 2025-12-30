import { EmergencyMessage } from '@/types/dashboard';

export const emergencyMessagesData: EmergencyMessage[] = [
    {
        id: '1',
        ticketNumber: 'TTY6658H',
        sender: {
            name: 'Marcus Reid',
            avatar: '/assets/images/marcus.png'
        },
        messagePreview: 'There is an individual attempting to gain access through a restricted entrance at the rear of the building. They do not have proper authorization and have refuse...',
        messageContent: '"There is an individual attempting to gain access through a restricted entrance at the rear of the building. They do not have proper authorization and have refused to leave after being approached. I\'ve secured my position and am monitoring the situation closely. Immediate supervisor attention is required."',
        date: '8 December, 2025',
        time: '12:00 PM',
        status: 'unresolved',
        timestamp: new Date('2025-12-08T12:00:00')
    },
    {
        id: '2',
        ticketNumber: 'TTY6658H',
        sender: {
            name: 'Carol Parker',
            avatar: '/assets/images/sarah.png'
        },
        messagePreview: 'There is an individual attempting to gain access through a restricted entrance at the rear of the building. They do not have proper authorization and have refuse...',
        messageContent: '"There is an individual attempting to gain access through a restricted entrance at the rear of the building. They do not have proper authorization and have refused to leave after being approached. I\'ve secured my position and am monitoring the situation closely. Immediate supervisor attention is required."',
        date: '8 December, 2025',
        time: '12:00 PM',
        status: 'unresolved',
        timestamp: new Date('2025-12-08T12:00:00')
    },
    {
        id: '3',
        ticketNumber: 'TTY6658H',
        sender: {
            name: 'Isaiah Coleman',
            avatar: '/assets/images/issac.png'
        },
        messagePreview: 'There is an individual attempting to gain access through a restricted entrance at the rear of the building. They do not have proper authorization and have refuse...',
        messageContent: '"There is an individual attempting to gain access through a restricted entrance at the rear of the building. They do not have proper authorization and have refused to leave after being approached. I\'ve secured my position and am monitoring the situation closely. Immediate supervisor attention is required."',
        date: '8 December, 2025',
        time: '12:00 PM',
        status: 'unresolved',
        timestamp: new Date('2025-12-08T12:00:00')
    },
    {
        id: '4',
        ticketNumber: 'TTY6658H',
        sender: {
            name: 'Marcus Reid',
            avatar: '/assets/images/marcus.png'
        },
        messagePreview: 'There is an individual attempting to gain access through a restricted entrance at the rear of the building. They do not have proper authorization and have refuse...',
        messageContent: '"There is an individual attempting to gain access through a restricted entrance at the rear of the building. They do not have proper authorization and have refused to leave after being approached. I\'ve secured my position and am monitoring the situation closely. Immediate supervisor attention is required."',
        date: '8 December, 2025',
        time: '12:00 PM',
        status: 'resolved',
        timestamp: new Date('2025-12-08T12:00:00')
    },
    {
        id: '5',
        ticketNumber: 'TTY6659H',
        sender: {
            name: 'James Wilson',
            avatar: '/assets/images/james.png'
        },
        messagePreview: 'Suspicious activity detected in the parking lot. Vehicle circling the premises multiple times. License plate noted and reported...',
        messageContent: '"Suspicious activity detected in the parking lot. Vehicle circling the premises multiple times. License plate noted and reported to local authorities. Continuing to monitor the situation."',
        date: '7 December, 2025',
        time: '3:45 PM',
        status: 'resolved',
        timestamp: new Date('2025-12-07T15:45:00')
    },
    {
        id: '6',
        ticketNumber: 'TTY6660H',
        sender: {
            name: 'Carol Parker',
            avatar: '/assets/images/sarah.png'
        },
        messagePreview: 'Medical emergency on the third floor. Individual experiencing chest pain. Emergency services have been contacted...',
        messageContent: '"Medical emergency on the third floor. Individual experiencing chest pain. Emergency services have been contacted and are en route. First aid being administered. Area secured."',
        date: '6 December, 2025',
        time: '10:30 AM',
        status: 'resolved',
        timestamp: new Date('2025-12-06T10:30:00')
    },
    {
        id: '7',
        ticketNumber: 'TTY6661H',
        sender: {
            name: 'Isaiah Coleman',
            avatar: '/assets/images/issac.png'
        },
        messagePreview: 'Fire alarm activated on the second floor. Conducting evacuation procedures. No visible smoke or fire detected yet...',
        messageContent: '"Fire alarm activated on the second floor. Conducting evacuation procedures. No visible smoke or fire detected yet. Fire department has been notified. All personnel being directed to assembly points."',
        date: '5 December, 2025',
        time: '2:15 PM',
        status: 'unresolved',
        timestamp: new Date('2025-12-05T14:15:00')
    },
    {
        id: '8',
        ticketNumber: 'TTY6662H',
        sender: {
            name: 'Marcus Reid',
            avatar: '/assets/images/marcus.png'
        },
        messagePreview: 'Altercation between two individuals in the lobby area. Situation escalating. Backup requested immediately...',
        messageContent: '"Altercation between two individuals in the lobby area. Situation escalating. Backup requested immediately. Attempting to de-escalate verbally. May require police intervention."',
        date: '4 December, 2025',
        time: '4:20 PM',
        status: 'unresolved',
        timestamp: new Date('2025-12-04T16:20:00')
    }
];

export const getMessagesByStatus = (status: 'resolved' | 'unresolved' | 'all'): EmergencyMessage[] => {
    if (status === 'all') {
        return emergencyMessagesData;
    }
    return emergencyMessagesData.filter(message => message.status === status);
};
