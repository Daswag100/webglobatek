'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Colors } from '@/constants/Colors';
import styles from './supervisors.module.css';
import { Supervisor, mockSupervisorsData } from '@/data/mockSupervisorsData';

type SupervisorStatus = 'active' | 'inactive' | 'pending';

export default function SupervisorsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState<SupervisorStatus>('active');
    const [searchQuery, setSearchQuery] = useState('');
    const [supervisors, setSupervisors] = useState<Supervisor[]>(mockSupervisorsData);
    const [currentPage, setCurrentPage] = useState(1);
    const supervisorsPerPage = 6;

    // Check for new supervisor from localStorage
    useEffect(() => {
        const tab = searchParams.get('tab');
        const isNew = searchParams.get('new');

        if (isNew === 'true') {
            const newSupervisorsData = localStorage.getItem('newSupervisors');
            if (newSupervisorsData) {
                const newSupervisors = JSON.parse(newSupervisorsData);
                // Add all new supervisors to the list
                setSupervisors(prev => [...prev, ...newSupervisors]);
                // Clear localStorage after adding
                localStorage.removeItem('newSupervisors');
            }
        }

        if (tab === 'pending') {
            setActiveTab('pending');
        }
    }, [searchParams]);

    // Filter supervisors by active tab
    const filteredSupervisors = supervisors.filter(supervisor => supervisor.status === activeTab);

    // Calculate pagination
    const totalPages = Math.max(1, Math.ceil(filteredSupervisors.length / supervisorsPerPage));
    const startIndex = (currentPage - 1) * supervisorsPerPage;
    const endIndex = startIndex + supervisorsPerPage;
    const currentSupervisors = filteredSupervisors.slice(startIndex, endIndex);

    // Reset to page 1 when changing tabs
    const handleTabChange = (tab: SupervisorStatus) => {
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
                    <h1 className={styles.title}>Supervisors</h1>

                    <div className={styles.headerRow}>
                        {/* Status Tabs */}
                        <div className={styles.tabs}>
                            <button
                                className={`${styles.tab} ${activeTab === 'active' ? styles.tabActive : ''}`}
                                onClick={() => handleTabChange('active')}
                            >
                                <Image
                                    src="/assets/images/flash.png"
                                    alt="Active"
                                    width={16}
                                    height={16}
                                />
                                <span>Active</span>
                            </button>

                            <button
                                className={`${styles.tab} ${activeTab === 'inactive' ? styles.tabActive : ''}`}
                                onClick={() => handleTabChange('inactive')}
                            >
                                <Image
                                    src="/assets/images/inactive.png"
                                    alt="Inactive"
                                    width={16}
                                    height={16}
                                />
                                <span>Inactive</span>
                            </button>

                            <button
                                className={`${styles.tab} ${activeTab === 'pending' ? styles.tabActive : ''}`}
                                onClick={() => handleTabChange('pending')}
                            >
                                <Image
                                    src="/assets/images/pending.png"
                                    alt="Pending"
                                    width={16}
                                    height={16}
                                />
                                <span>Pending</span>
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
                {/* Main Row: Content area and New Supervisor box side by side */}
                <div className={styles.mainRow}>
                    {/* Content Area */}
                    <div className={styles.content}>
                        {currentSupervisors.length === 0 ? (
                            <div className={styles.emptyState}>
                                <Image
                                    src="/assets/images/headset.png"
                                    alt="No Supervisors"
                                    width={80}
                                    height={80}
                                />
                                <p className={styles.emptyTitle}>
                                    No {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Supervisors
                                </p>
                                <p className={styles.emptySubtitle}>
                                    Your active supervisors will appear here
                                </p>
                            </div>
                        ) : (
                            <div className={styles.supervisorsList}>
                                {/* Supervisor list items will go here */}
                                <p style={{ textAlign: 'center', padding: '20px', color: '#A4A4A4' }}>
                                    Supervisor list items coming soon...
                                </p>
                            </div>
                        )}
                    </div>

                    {/* New Supervisor Button Section */}
                    <div className={styles.newSupervisorSection}>
                        <button
                            className={styles.newSupervisorButton}
                            onClick={() => router.push('/supervisors/new-supervisor')}
                        >
                            <Image
                                src="/assets/images/add.png"
                                alt="Add"
                                width={24}
                                height={24}
                            />
                            <span>New Supervisor</span>
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
        </div >
    );
}
