export interface Supervisor {
    id: string;
    firstName: string;
    lastName: string;
    name: string; // Full name for display
    supervisorId: string;
    phone: string;
    email: string;
    avatar: string;
    status: 'active' | 'inactive' | 'pending';
    role: 'senior_supervisor' | 'supervisor';
    createdAt: Date;
    activatedAt?: Date;
    deactivatedAt?: Date;
    isOnDuty?: boolean;
}

export const mockSupervisorsData: Supervisor[] = [
    {
        id: '1',
        firstName: 'Sarah',
        lastName: 'Mitchell',
        name: 'Sarah Mitchell',
        supervisorId: 'GRDVIR1',
        phone: '+1 (347) 291-4820',
        email: 'sarah.mitchell@globateksecurity.com',
        avatar: '/assets/images/sarah.png',
        status: 'pending',
        role: 'senior_supervisor',
        createdAt: new Date('2024-01-10'),
        isOnDuty: false,
    },
    {
        id: '2',
        firstName: 'Marcus',
        lastName: 'Reid',
        name: 'Marcus Reid',
        supervisorId: 'GRDCP1',
        phone: '+1 (404) 672-1958',
        email: 'marcus.reid@globateksecurity.com',
        avatar: '/assets/images/marcus.png',
        status: 'pending',
        role: 'supervisor',
        createdAt: new Date('2024-01-15'),
        isOnDuty: false,
    },
];

export const getSupervisorsByStatus = (status: 'active' | 'inactive' | 'pending'): Supervisor[] => {
    return mockSupervisorsData.filter(supervisor => supervisor.status === status);
};
