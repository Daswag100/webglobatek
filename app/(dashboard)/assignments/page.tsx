'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Colors } from '@/constants/Colors';
import AssignmentListItem from '@/components/assignments/AssignmentListItem';
import styles from './assignments.module.css';

type AssignmentStatus = 'upcoming' | 'completed' | 'unassigned';

interface Assignment {
    id: string;
    title: string;
    location: string;
    date: string;
    startTime: string;
    endTime: string;
    guards: Array<{
        id: string;
        name: string;
        avatar: string;
    }>;
    status: AssignmentStatus;
    borderColor?: string;
    totalGuards?: number; // Total guards assigned (for completed assignments showing attendance)
}

export default function AssignmentsPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<AssignmentStatus>('upcoming');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Mock data
    const assignments: Assignment[] = [
        {
            id: '1',
            title: 'Morning Patrol – Federal Plaza Tower',
            location: '375 Park Ave, New York, NY 10152',
            date: '25 Jan 2025',
            startTime: '8:00 AM',
            endTime: '4:00 PM',
            guards: [
                { id: '1', name: 'Issac', avatar: '/assets/images/issac.png' },
                { id: '2', name: 'James', avatar: '/assets/images/james.png' },
                { id: '3', name: 'Marcus', avatar: '/assets/images/marcus.png' },
                { id: '4', name: 'Sarah', avatar: '/assets/images/sarah.png' },
            ],
            status: 'upcoming',
            borderColor: '#F5B759'
        },
        {
            id: '2',
            title: 'Evening Security – Brookstone Retail Complex',
            location: '375 Park Ave, New York, NY 10152',
            date: '25 Jan 2025',
            startTime: '4:00 PM',
            endTime: '12:00 AM',
            guards: [
                { id: '1', name: 'Issac', avatar: '/assets/images/issac.png' },
                { id: '2', name: 'James', avatar: '/assets/images/james.png' },
                { id: '3', name: 'Marcus', avatar: '/assets/images/marcus.png' },
                { id: '4', name: 'Sarah', avatar: '/assets/images/sarah.png' },
            ],
            status: 'upcoming',
            borderColor: '#F5B759'
        },
        {
            id: '3',
            title: 'Night Watch – Downtown Office Building',
            location: '1200 Main St, New York, NY 10001',
            date: '26 Jan 2025',
            startTime: '10:00 PM',
            endTime: '6:00 AM',
            guards: [
                { id: '1', name: 'Issac', avatar: '/assets/images/issac.png' },
                { id: '2', name: 'James', avatar: '/assets/images/james.png' },
                { id: '3', name: 'Marcus', avatar: '/assets/images/marcus.png' },
                { id: '4', name: 'Sarah', avatar: '/assets/images/sarah.png' },
            ],
            status: 'upcoming',
            borderColor: '#F5B759'
        },
        {
            id: '4',
            title: 'Mall Security – Westfield Shopping Center',
            location: '500 Commerce Blvd, New York, NY 10003',
            date: '26 Jan 2025',
            startTime: '9:00 AM',
            endTime: '9:00 PM',
            guards: [
                { id: '1', name: 'Issac', avatar: '/assets/images/issac.png' },
                { id: '2', name: 'James', avatar: '/assets/images/james.png' },
                { id: '3', name: 'Marcus', avatar: '/assets/images/marcus.png' },
                { id: '4', name: 'Sarah', avatar: '/assets/images/sarah.png' },
            ],
            status: 'upcoming',
            borderColor: '#F5B759'
        },
        {
            id: '5',
            title: 'Hospital Security – Metro Medical Center',
            location: '800 Health Plaza, New York, NY 10005',
            date: '27 Jan 2025',
            startTime: '7:00 AM',
            endTime: '7:00 PM',
            guards: [
                { id: '1', name: 'Issac', avatar: '/assets/images/issac.png' },
                { id: '2', name: 'James', avatar: '/assets/images/james.png' },
                { id: '3', name: 'Marcus', avatar: '/assets/images/marcus.png' },
                { id: '4', name: 'Sarah', avatar: '/assets/images/sarah.png' },
            ],
            status: 'upcoming',
            borderColor: '#F5B759'
        },
        {
            id: '6',
            title: 'University Campus Patrol – NYU',
            location: '70 Washington Square S, New York, NY 10012',
            date: '27 Jan 2025',
            startTime: '6:00 PM',
            endTime: '2:00 AM',
            guards: [
                { id: '1', name: 'Issac', avatar: '/assets/images/issac.png' },
                { id: '2', name: 'James', avatar: '/assets/images/james.png' },
                { id: '3', name: 'Marcus', avatar: '/assets/images/marcus.png' },
                { id: '4', name: 'Sarah', avatar: '/assets/images/sarah.png' },
            ],
            status: 'upcoming',
            borderColor: '#F5B759'
        },
        {
            id: '7',
            title: 'Warehouse Security – Brooklyn Distribution',
            location: '2500 Industry Rd, Brooklyn, NY 11232',
            date: '28 Jan 2025',
            startTime: '12:00 AM',
            endTime: '8:00 AM',
            guards: [
                { id: '1', name: 'Issac', avatar: '/assets/images/issac.png' },
                { id: '2', name: 'James', avatar: '/assets/images/james.png' },
                { id: '3', name: 'Marcus', avatar: '/assets/images/marcus.png' },
                { id: '4', name: 'Sarah', avatar: '/assets/images/sarah.png' },
            ],
            status: 'upcoming',
            borderColor: '#F5B759'
        },
        {
            id: '8',
            title: 'Hotel Security – Grand Plaza Hotel',
            location: '150 Central Park W, New York, NY 10023',
            date: '28 Jan 2025',
            startTime: '3:00 PM',
            endTime: '11:00 PM',
            guards: [
                { id: '1', name: 'Issac', avatar: '/assets/images/issac.png' },
                { id: '2', name: 'James', avatar: '/assets/images/james.png' },
                { id: '3', name: 'Marcus', avatar: '/assets/images/marcus.png' },
                { id: '4', name: 'Sarah', avatar: '/assets/images/sarah.png' },
            ],
            status: 'upcoming',
            borderColor: '#F5B759'
        },
        {
            id: '9',
            title: 'Bank Security – First National Bank',
            location: '900 Financial Ave, New York, NY 10004',
            date: '29 Jan 2025',
            startTime: '6:00 AM',
            endTime: '6:00 PM',
            guards: [
                { id: '1', name: 'Issac', avatar: '/assets/images/issac.png' },
                { id: '2', name: 'James', avatar: '/assets/images/james.png' },
                { id: '3', name: 'Marcus', avatar: '/assets/images/marcus.png' },
                { id: '4', name: 'Sarah', avatar: '/assets/images/sarah.png' },
            ],
            status: 'upcoming',
            borderColor: '#F5B759'
        },
        {
            id: '10',
            title: 'Construction Site – Hudson Yards Development',
            location: '555 W 34th St, New York, NY 10001',
            date: '29 Jan 2025',
            startTime: '5:00 AM',
            endTime: '5:00 PM',
            guards: [
                { id: '1', name: 'Issac', avatar: '/assets/images/issac.png' },
                { id: '2', name: 'James', avatar: '/assets/images/james.png' },
                { id: '3', name: 'Marcus', avatar: '/assets/images/marcus.png' },
                { id: '4', name: 'Sarah', avatar: '/assets/images/sarah.png' },
            ],
            status: 'upcoming',
            borderColor: '#F5B759'
        },
        {
            id: '11',
            title: 'Airport Terminal Security – JFK Terminal 4',
            location: 'JFK Airport, Queens, NY 11430',
            date: '30 Jan 2025',
            startTime: '4:00 AM',
            endTime: '12:00 PM',
            guards: [
                { id: '1', name: 'Issac', avatar: '/assets/images/issac.png' },
                { id: '2', name: 'James', avatar: '/assets/images/james.png' },
                { id: '3', name: 'Marcus', avatar: '/assets/images/marcus.png' },
                { id: '4', name: 'Sarah', avatar: '/assets/images/sarah.png' },
            ],
            status: 'upcoming',
            borderColor: '#F5B759'
        },
        {
            id: '12',
            title: 'Event Security – Madison Square Garden',
            location: '4 Pennsylvania Plaza, New York, NY 10001',
            date: '30 Jan 2025',
            startTime: '5:00 PM',
            endTime: '11:00 PM',
            guards: [
                { id: '1', name: 'Issac', avatar: '/assets/images/issac.png' },
                { id: '2', name: 'James', avatar: '/assets/images/james.png' },
                { id: '3', name: 'Marcus', avatar: '/assets/images/marcus.png' },
                { id: '4', name: 'Sarah', avatar: '/assets/images/sarah.png' },
            ],
            status: 'upcoming',
            borderColor: '#F5B759'
        },
        // Completed assignments with different attendance scenarios
        {
            id: 'c1',
            title: 'Residential Patrol – Maplewood Estate',
            location: '12400 Cedar Rd, Cleveland, OH 44106',
            date: '29 Oct 2025',
            startTime: '8:00 AM',
            endTime: '4:00 PM',
            guards: [
                { id: '1', name: 'Issac', avatar: '/assets/images/issac.png' },
                { id: '2', name: 'James', avatar: '/assets/images/james.png' },
            ],
            totalGuards: 4, // 2 out of 4 guards showed up
            status: 'completed',
            borderColor: '#55B15E'
        },
        {
            id: 'c2',
            title: 'Day Security – Horizon Business Suites',
            location: '801 S Figueroa St, Los Angeles, CA 90017',
            date: '29 Oct 2025',
            startTime: '8:00 AM',
            endTime: '4:00 PM',
            guards: [
                { id: '1', name: 'Issac', avatar: '/assets/images/issac.png' },
                { id: '2', name: 'James', avatar: '/assets/images/james.png' },
                { id: '3', name: 'Marcus', avatar: '/assets/images/marcus.png' },
                { id: '4', name: 'Sarah', avatar: '/assets/images/sarah.png' },
            ],
            totalGuards: 4, // 4 out of 4 guards showed up
            status: 'completed',
            borderColor: '#55B15E'
        },
        {
            id: 'c9',
            title: 'Night Security – Downtown Plaza',
            location: '500 Main St, Houston, TX 77002',
            date: '28 Oct 2025',
            startTime: '10:00 PM',
            endTime: '6:00 AM',
            guards: [
                { id: '1', name: 'Issac', avatar: '/assets/images/issac.png' },
                { id: '2', name: 'James', avatar: '/assets/images/james.png' },
                { id: '3', name: 'Marcus', avatar: '/assets/images/marcus.png' },
            ],
            totalGuards: 3, // 3 out of 3 guards showed up
            status: 'completed',
            borderColor: '#55B15E'
        },
        {
            id: 'c10',
            title: 'Event Security – City Convention Center',
            location: '1200 Convention Blvd, Miami, FL 33101',
            date: '27 Oct 2025',
            startTime: '2:00 PM',
            endTime: '10:00 PM',
            guards: [
                { id: '1', name: 'Issac', avatar: '/assets/images/issac.png' },
            ],
            totalGuards: 1, // 1 out of 1 guard showed up
            status: 'completed',
            borderColor: '#55B15E'
        },
        {
            id: 'c3',
            title: 'Corporate Office Security – Tech Plaza',
            location: '1455 Market St, San Francisco, CA 94103',
            date: '24 Jan 2025',
            startTime: '9:00 AM',
            endTime: '5:00 PM',
            guards: [
                { id: '1', name: 'Issac', avatar: '/assets/images/issac.png' },
                { id: '2', name: 'James', avatar: '/assets/images/james.png' },
                { id: '3', name: 'Marcus', avatar: '/assets/images/marcus.png' },
                { id: '4', name: 'Sarah', avatar: '/assets/images/sarah.png' },
            ],
            status: 'completed',
            borderColor: '#55B15E'
        },
        {
            id: 'c4',
            title: 'Retail Security – Downtown Shopping Mall',
            location: '600 Broadway, New York, NY 10012',
            date: '24 Jan 2025',
            startTime: '10:00 AM',
            endTime: '10:00 PM',
            guards: [
                { id: '1', name: 'Issac', avatar: '/assets/images/issac.png' },
                { id: '2', name: 'James', avatar: '/assets/images/james.png' },
                { id: '3', name: 'Marcus', avatar: '/assets/images/marcus.png' },
                { id: '4', name: 'Sarah', avatar: '/assets/images/sarah.png' },
            ],
            status: 'completed',
            borderColor: '#55B15E'
        },
        {
            id: 'c5',
            title: 'Museum Night Watch – Metropolitan Art Gallery',
            location: '1000 5th Ave, New York, NY 10028',
            date: '23 Jan 2025',
            startTime: '6:00 PM',
            endTime: '6:00 AM',
            guards: [
                { id: '1', name: 'Issac', avatar: '/assets/images/issac.png' },
                { id: '2', name: 'James', avatar: '/assets/images/james.png' },
                { id: '3', name: 'Marcus', avatar: '/assets/images/marcus.png' },
                { id: '4', name: 'Sarah', avatar: '/assets/images/sarah.png' },
            ],
            status: 'completed',
            borderColor: '#55B15E'
        },
        {
            id: 'c6',
            title: 'Stadium Security – Yankee Stadium',
            location: '1 E 161st St, Bronx, NY 10451',
            date: '23 Jan 2025',
            startTime: '4:00 PM',
            endTime: '11:00 PM',
            guards: [
                { id: '1', name: 'Issac', avatar: '/assets/images/issac.png' },
                { id: '2', name: 'James', avatar: '/assets/images/james.png' },
                { id: '3', name: 'Marcus', avatar: '/assets/images/marcus.png' },
                { id: '4', name: 'Sarah', avatar: '/assets/images/sarah.png' },
            ],
            status: 'completed',
            borderColor: '#55B15E'
        },
        {
            id: 'c7',
            title: 'Factory Security – Brooklyn Manufacturing',
            location: '3000 Industry Ave, Brooklyn, NY 11220',
            date: '22 Jan 2025',
            startTime: '11:00 PM',
            endTime: '7:00 AM',
            guards: [
                { id: '1', name: 'Issac', avatar: '/assets/images/issac.png' },
                { id: '2', name: 'James', avatar: '/assets/images/james.png' },
                { id: '3', name: 'Marcus', avatar: '/assets/images/marcus.png' },
                { id: '4', name: 'Sarah', avatar: '/assets/images/sarah.png' },
            ],
            status: 'completed',
            borderColor: '#55B15E'
        },
        {
            id: 'c8',
            title: 'Government Building – City Hall',
            location: 'City Hall Park, New York, NY 10007',
            date: '22 Jan 2025',
            startTime: '6:00 AM',
            endTime: '6:00 PM',
            guards: [
                { id: '1', name: 'Issac', avatar: '/assets/images/issac.png' },
                { id: '2', name: 'James', avatar: '/assets/images/james.png' },
                { id: '3', name: 'Marcus', avatar: '/assets/images/marcus.png' },
                { id: '4', name: 'Sarah', avatar: '/assets/images/sarah.png' },
            ],
            status: 'completed',
            borderColor: '#55B15E'
        },
    ];

    const filteredAssignments = assignments.filter(assignment => assignment.status === activeTab);

    const assignmentsPerPage = 6;
    const totalPages = Math.max(1, Math.ceil(filteredAssignments.length / assignmentsPerPage));
    const startIndex = (currentPage - 1) * assignmentsPerPage;
    const endIndex = startIndex + assignmentsPerPage;
    const currentAssignments = filteredAssignments.slice(startIndex, endIndex);

    const handleTabChange = (tab: AssignmentStatus) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const getEmptyStateText = () => {
        switch (activeTab) {
            case 'upcoming':
                return {
                    title: 'No Upcoming Assignments',
                    subtitle: 'Your upcoming assignments will appear here'
                };
            case 'completed':
                return {
                    title: 'No Completed Assignments',
                    subtitle: 'Your completed assignments will appear here'
                };
            case 'unassigned':
                return {
                    title: 'No Unassigned Assignments',
                    subtitle: 'Your unassigned assignments will appear here'
                };
        }
    };

    const emptyState = getEmptyStateText();

    return (
        <div
            className="min-h-screen"
            style={{
                marginLeft: '110px',
                backgroundColor: Colors.screenBg,
            }}
        >
            {/* Header with border */}
            <div
                className="border-b"
                style={{
                    borderBottomWidth: '1px',
                    borderBottomColor: Colors.border,
                }}
            >
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>Assignments</h1>

                    <div className={styles.headerRow}>
                        {/* Status Tabs */}
                        <div className={styles.tabs}>
                            <button
                                className={`${styles.tab} ${activeTab === 'upcoming' ? styles.tabActive : ''}`}
                                onClick={() => handleTabChange('upcoming')}
                            >
                                <Image
                                    src="/assets/images/upcoming.png"
                                    alt="Upcoming"
                                    width={16}
                                    height={16}
                                />
                                <span>Upcoming</span>
                            </button>

                            <button
                                className={`${styles.tab} ${activeTab === 'completed' ? styles.tabActive : ''}`}
                                onClick={() => handleTabChange('completed')}
                            >
                                <Image
                                    src="/assets/images/history.png"
                                    alt="Completed"
                                    width={16}
                                    height={16}
                                />
                                <span>Completed</span>
                            </button>

                            <button
                                className={`${styles.tab} ${activeTab === 'unassigned' ? styles.tabActive : ''}`}
                                onClick={() => handleTabChange('unassigned')}
                            >
                                <Image
                                    src="/assets/images/assignments.png"
                                    alt="Unassigned"
                                    width={16}
                                    height={16}
                                />
                                <span>Unassigned</span>
                            </button>
                        </div>

                        {/* Search and Filter */}
                        <div className={styles.searchBar}>
                            <div className={styles.searchInput}>
                                <Image
                                    src="/assets/images/search1.png"
                                    alt="Search"
                                    width={24}
                                    height={24}
                                />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <button className={styles.filterButton}>
                                <Image
                                    src="/assets/images/filter1.png"
                                    alt="Filter"
                                    width={24}
                                    height={24}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={styles.mainContent}>
                {/* Main Row: Content area and New Assignment box side by side */}
                <div className={styles.mainRow}>
                    {/* Content Area */}
                    <div className={styles.content}>
                        {currentAssignments.length === 0 ? (
                            <div className={styles.emptyState}>
                                <Image
                                    src="/assets/images/layer.png"
                                    alt="No assignments"
                                    width={80}
                                    height={80}
                                />
                                <p className={styles.emptyTitle}>
                                    {emptyState.title}
                                </p>
                                <p className={styles.emptySubtitle}>
                                    {emptyState.subtitle}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.assignmentsList}>
                                {currentAssignments.map((assignment) => (
                                    <AssignmentListItem
                                        key={assignment.id}
                                        id={assignment.id}
                                        title={assignment.title}
                                        location={assignment.location}
                                        date={assignment.date}
                                        startTime={assignment.startTime}
                                        endTime={assignment.endTime}
                                        guards={assignment.guards}
                                        borderColor={assignment.borderColor}
                                        totalGuards={assignment.totalGuards}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* New Assignment Button Section */}
                    <div className={styles.newAssignmentSection}>
                        <button
                            className={styles.newAssignmentButton}
                            onClick={() => router.push('/assignments/new-assignment')}
                        >
                            <Image
                                src="/assets/images/add.png"
                                alt="Add"
                                width={24}
                                height={24}
                            />
                            <span>New Assignment</span>
                        </button>
                    </div>
                </div>

                {/* Pagination - Below mainRow */}
                <div className={styles.pagination}>
                    <button
                        className={styles.paginationArrow}
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        <img
                            src="/assets/images/back.png"
                            alt="Previous"
                            width={20}
                            height={20}
                        />
                    </button>

                    <button className={styles.paginationNumber}>
                        {currentPage}
                    </button>

                    <button
                        className={styles.paginationArrow}
                        onClick={handleNextPage}
                        disabled={currentPage >= totalPages}
                    >
                        <img
                            src="/assets/images/bluenext.png"
                            alt="Next"
                            width={20}
                            height={20}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
