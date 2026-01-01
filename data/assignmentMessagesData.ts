import { AssignmentMessage } from '@/types/dashboard';

export const assignmentMessagesData: AssignmentMessage[] = [
    {
        id: '1',
        ticketNumber: 'TTY6658H',
        sender: {
            name: 'Marcus Reid',
            avatar: '/assets/images/marcus.png'
        },
        messagePreview: 'I was assigned to the upcoming job scheduled for later today, but I\'m not seeing complete information about the duties I\'m expected to carry out. The location a...',
        messageContent: '"I was assigned to the upcoming job scheduled for later today, but I\'m not seeing complete information about the duties I\'m expected to carry out. The location and time are visible, but the task description seems brief and I want to be sure I\'m fully prepared before reporting. Kindly confirm if there are additional instructions or expectations for this assignment."',
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
        messagePreview: 'I was assigned to the upcoming job scheduled for later today, but I\'m not seeing complete information about the duties I\'m expected to carry out. The location a...',
        messageContent: '"I was assigned to the upcoming job scheduled for later today, but I\'m not seeing complete information about the duties I\'m expected to carry out. The location and time are visible, but the task description seems brief and I want to be sure I\'m fully prepared before reporting. Kindly confirm if there are additional instructions or expectations for this assignment."',
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
        messagePreview: 'I was assigned to the upcoming job scheduled for later today, but I\'m not seeing complete information about the duties I\'m expected to carry out. The location a...',
        messageContent: '"I was assigned to the upcoming job scheduled for later today, but I\'m not seeing complete information about the duties I\'m expected to carry out. The location and time are visible, but the task description seems brief and I want to be sure I\'m fully prepared before reporting. Kindly confirm if there are additional instructions or expectations for this assignment."',
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
        messagePreview: 'I was assigned to the upcoming job scheduled for later today, but I\'m not seeing complete information about the duties I\'m expected to carry out. The location a...',
        messageContent: '"I was assigned to the upcoming job scheduled for later today, but I\'m not seeing complete information about the duties I\'m expected to carry out. The location and time are visible, but the task description seems brief and I want to be sure I\'m fully prepared before reporting. Kindly confirm if there are additional instructions or expectations for this assignment."',
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
        messagePreview: 'I was assigned to the upcoming job scheduled for later today, but I\'m not seeing complete information about the duties I\'m expected to carry out. The location a...',
        messageContent: '"I was assigned to the upcoming job scheduled for later today, but I\'m not seeing complete information about the duties I\'m expected to carry out. The location and time are visible, but the task description seems brief and I want to be sure I\'m fully prepared before reporting. Kindly confirm if there are additional instructions or expectations for this assignment."',
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
        messagePreview: 'I was assigned to the upcoming job scheduled for later today, but I\'m not seeing complete information about the duties I\'m expected to carry out. The location a...',
        messageContent: '"I was assigned to the upcoming job scheduled for later today, but I\'m not seeing complete information about the duties I\'m expected to carry out. The location and time are visible, but the task description seems brief and I want to be sure I\'m fully prepared before reporting. Kindly confirm if there are additional instructions or expectations for this assignment."',
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
        messagePreview: 'I was assigned to the upcoming job scheduled for later today, but I\'m not seeing complete information about the duties I\'m expected to carry out. The location a...',
        messageContent: '"I was assigned to the upcoming job scheduled for later today, but I\'m not seeing complete information about the duties I\'m expected to carry out. The location and time are visible, but the task description seems brief and I want to be sure I\'m fully prepared before reporting. Kindly confirm if there are additional instructions or expectations for this assignment."',
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
        messagePreview: 'I was assigned to the upcoming job scheduled for later today, but I\'m not seeing complete information about the duties I\'m expected to carry out. The location a...',
        messageContent: '"I was assigned to the upcoming job scheduled for later today, but I\'m not seeing complete information about the duties I\'m expected to carry out. The location and time are visible, but the task description seems brief and I want to be sure I\'m fully prepared before reporting. Kindly confirm if there are additional instructions or expectations for this assignment."',
        date: '4 December, 2025',
        time: '4:20 PM',
        status: 'unresolved',
        timestamp: new Date('2025-12-04T16:20:00')
    }
];

export const getAssignmentMessagesByStatus = (status: 'resolved' | 'unresolved' | 'all'): AssignmentMessage[] => {
    if (status === 'all') {
        return assignmentMessagesData;
    }
    return assignmentMessagesData.filter(message => message.status === status);
};
