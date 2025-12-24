'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Colors } from '@/constants/Colors';
import styles from './guards.module.css';

type GuardStatus = 'active' | 'inactive' | 'pending';

export default function GuardsPage() {
    const [activeTab, setActiveTab] = useState<GuardStatus>('active');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock data - empty for now to show empty state
    const guards = {
        active: [],
        inactive: [],
        pending: []
    };

    const currentGuards = guards[activeTab];

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
                    <h1 className={styles.title}>Guards</h1>

                    <div className={styles.headerRow}>
                        {/* Status Tabs */}
                        <div className={styles.tabs}>
                            <button
                                className={`${styles.tab} ${activeTab === 'active' ? styles.tabActive : ''}`}
                                onClick={() => setActiveTab('active')}
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
                                onClick={() => setActiveTab('inactive')}
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
                                onClick={() => setActiveTab('pending')}
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
                {/* Main Row: Content area and New Guard box side by side */}
                <div className={styles.mainRow}>
                    {/* Content Area */}
                    <div className={styles.content}>
                        {currentGuards.length === 0 ? (
                            <div className={styles.emptyState}>
                                <p className={styles.emptyTitle}>
                                    No {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Guards
                                </p>
                                <p className={styles.emptySubtitle}>
                                    Your {activeTab} guards will appear here
                                </p>
                            </div>
                        ) : (
                            <div className={styles.guardsList}>
                                {/* Guards list will go here when we have data */}
                            </div>
                        )}
                    </div>

                    {/* New Guard Button Section */}
                    <div className={styles.newGuardSection}>
                        <button className={styles.newGuardButton}>
                            <Image
                                src="/assets/images/add.png"
                                alt="Add"
                                width={24}
                                height={24}
                            />
                            <span>New Guard</span>
                        </button>
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

                    <button className={styles.paginationNumber}>
                        1
                    </button>

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
    );
}
