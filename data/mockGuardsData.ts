export interface Guard {
    id: string;
    name: string;
    guardId: string;
    phone: string;
    email: string;
    avatar: string;
    status: 'active' | 'inactive' | 'pending';
    createdAt: Date;
    activatedAt?: Date;
    deactivatedAt?: Date;
}

export const mockGuardsData: Guard[] = [
    {
        id: '1',
        name: 'Marcus Reid',
        guardId: 'GRDMR1',
        phone: '+1 (347) 291-4820',
        email: 'marcus.reid@globatekguards.com',
        avatar: '/assets/images/marcus.png',
        status: 'active',
        createdAt: new Date('2024-01-15'),
        activatedAt: new Date('2024-01-16'),
    },
    {
        id: '2',
        name: 'Carol Parker',
        guardId: 'GRDCP1',
        phone: '+1 (404) 672-1958',
        email: 'carol.parker@globatekguards.com',
        avatar: '/assets/images/sarah.png',
        status: 'active',
        createdAt: new Date('2024-01-10'),
        activatedAt: new Date('2024-01-12'),
    },
    {
        id: '3',
        name: 'James Wilson',
        guardId: 'GRDJW1',
        phone: '+1 (555) 123-4567',
        email: 'james.wilson@globatekguards.com',
        avatar: '/assets/images/james.png',
        status: 'active',
        createdAt: new Date('2024-02-01'),
        activatedAt: new Date('2024-02-02'),
    },
    {
        id: '8',
        name: 'David Thompson',
        guardId: 'GRDDT1',
        phone: '+1 (555) 789-0123',
        email: 'david.thompson@globatekguards.com',
        avatar: '/assets/images/issac.png',
        status: 'active',
        createdAt: new Date('2024-02-10'),
        activatedAt: new Date('2024-02-11'),
    },
    {
        id: '9',
        name: 'Lisa Anderson',
        guardId: 'GRDLA1',
        phone: '+1 (555) 234-5678',
        email: 'lisa.anderson@globatekguards.com',
        avatar: '/assets/images/sarah.png',
        status: 'active',
        createdAt: new Date('2024-02-15'),
        activatedAt: new Date('2024-02-16'),
    },
    {
        id: '10',
        name: 'Robert Martinez',
        guardId: 'GRDRM1',
        phone: '+1 (555) 876-5432',
        email: 'robert.martinez@globatekguards.com',
        avatar: '/assets/images/marcus.png',
        status: 'active',
        createdAt: new Date('2024-02-20'),
        activatedAt: new Date('2024-02-21'),
    },
    {
        id: '4',
        name: 'Sarah Mitchell',
        guardId: 'GRDSM1',
        phone: '+1 (555) 987-6543',
        email: 'sarah.mitchell@globatekguards.com',
        avatar: '/assets/images/issac.png',
        status: 'inactive',
        createdAt: new Date('2023-12-01'),
        activatedAt: new Date('2023-12-02'),
        deactivatedAt: new Date('2024-03-15'),
    },
    {
        id: '5',
        name: 'Michael Brown',
        guardId: 'GRDMB1',
        phone: '+1 (555) 456-7890',
        email: 'michael.brown@globatekguards.com',
        avatar: '/assets/images/marcus.png',
        status: 'inactive',
        createdAt: new Date('2023-11-15'),
        activatedAt: new Date('2023-11-16'),
        deactivatedAt: new Date('2024-02-28'),
    },
    {
        id: '6',
        name: 'Emily Davis',
        guardId: 'GRDED1',
        phone: '+1 (555) 234-5678',
        email: 'emily.davis@globatekguards.com',
        avatar: '/assets/images/sarah.png',
        status: 'pending',
        createdAt: new Date('2024-03-20'),
    },
    {
        id: '7',
        name: 'Robert Johnson',
        guardId: 'GRDRJ1',
        phone: '+1 (555) 345-6789',
        email: 'robert.johnson@globatekguards.com',
        avatar: '/assets/images/james.png',
        status: 'pending',
        createdAt: new Date('2024-03-22'),
    },
    {
        id: '11',
        name: 'Jennifer Williams',
        guardId: 'GRDJW2',
        phone: '+1 (555) 111-2222',
        email: 'jennifer.williams@globatekguards.com',
        avatar: '/assets/images/sarah.png',
        status: 'pending',
        createdAt: new Date('2024-03-23'),
    },
    {
        id: '12',
        name: 'Thomas Anderson',
        guardId: 'GRDTA1',
        phone: '+1 (555) 333-4444',
        email: 'thomas.anderson@globatekguards.com',
        avatar: '/assets/images/marcus.png',
        status: 'pending',
        createdAt: new Date('2024-03-24'),
    },
];

export const getGuardsByStatus = (status: 'active' | 'inactive' | 'pending'): Guard[] => {
    return mockGuardsData.filter(guard => guard.status === status);
};
