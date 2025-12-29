'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Colors } from '@/constants/Colors';
import styles from './inbox.module.css';

type InboxTab = 'emergency' | 'assignments' | 'requests';
type FilterType = 'all' | 'resolved' | 'unresolved';

export default function InboxPage() {
    const [activeTab, setActiveTab] = useState<InboxTab>('emergency');
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div
            className="min-h-screen"
            style={{
                marginLeft: '100px',
                backgroundColor: Colors.screenBg,
            }}
        >
            {/* Header */}
            <div>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>Inbox</h1>

                    <div className={styles.headerRow}>
                        {/* Tabs */}
                        <div className={styles.tabs}>
                            <button
                                className={`${styles.tab} ${activeTab === 'emergency' ? styles.tabActiveEmergency : ''}`}
                                onClick={() => setActiveTab('emergency')}
                            >
                                <Image
                                    src="/assets/images/ambulance1.png"
                                    alt="Emergency"
                                    width={16}
                                    height={16}
                                />
                                <span>Emergency</span>
                            </button>

                            <button
                                className={`${styles.tab} ${activeTab === 'assignments' ? styles.tabActive : ''}`}
                                onClick={() => setActiveTab('assignments')}
                            >
                                <Image
                                    src="/assets/images/assignments.png"
                                    alt="Assignments"
                                    width={16}
                                    height={16}
                                />
                                <span>Assignments</span>
                            </button>

                            <button
                                className={`${styles.tab} ${activeTab === 'requests' ? styles.tabActive : ''}`}
                                onClick={() => setActiveTab('requests')}
                            >
                                <Image
                                    src="/assets/images/request.png"
                                    alt="Requests"
                                    width={16}
                                    height={16}
                                />
                                <span>Requests</span>
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
                {/* Filter Buttons */}
                <div className={styles.filterButtons}>
                    <button
                        className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.filterBtnActive : ''}`}
                        onClick={() => setActiveFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`${styles.filterBtn} ${activeFilter === 'resolved' ? styles.filterBtnActive : ''}`}
                        onClick={() => setActiveFilter('resolved')}
                    >
                        Resolved
                    </button>
                    <button
                        className={`${styles.filterBtn} ${activeFilter === 'unresolved' ? styles.filterBtnActive : ''}`}
                        onClick={() => setActiveFilter('unresolved')}
                    >
                        Unresolved
                    </button>
                </div>

                {/* Empty State and Pagination Wrapper */}
                <div className={styles.emptyStateWrapper}>
                    {/* Empty State with Container */}
                    <div className={styles.emptyStateContainer}>
                        <div className={styles.emptyState}>
                            <Image
                                src="/assets/images/inbox.png"
                                alt="No completed assignments"
                                width={120}
                                height={120}
                            />
                            <p className={styles.emptyTitle}>No Completed Assignments</p>
                            <p className={styles.emptySubtitle}>Your completed assignments will appear here</p>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className={styles.pagination}>
                        <button className={styles.paginationArrow}>
                            <Image
                                src="/assets/images/back.png"
                                alt="Previous"
                                width={20}
                                height={20}
                            />
                        </button>

                        <button className={styles.paginationNumberActive}>1</button>

                        <button className={styles.paginationArrow}>
                            <Image
                                src="/assets/images/bluenext.png"
                                alt="Next"
                                width={20}
                                height={20}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
