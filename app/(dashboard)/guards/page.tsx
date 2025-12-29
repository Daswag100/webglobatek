'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Colors } from '@/constants/Colors';
import styles from './guards.module.css';
import { Guard, mockGuardsData } from '@/data/mockGuardsData';
import GuardListItem from '@/components/guards/GuardListItem';
import DeactivateGuardModal from '@/components/guards/DeactivateGuardModal';

type GuardStatus = 'active' | 'inactive' | 'pending';

export default function GuardsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState<GuardStatus>('active');
    const [searchQuery, setSearchQuery] = useState('');
    const [guards, setGuards] = useState<Guard[]>(mockGuardsData);
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);
    const [selectedGuard, setSelectedGuard] = useState<Guard | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const guardsPerPage = 6;

    // Check for new guard from localStorage
    useEffect(() => {
        const tab = searchParams.get('tab');
        const isNew = searchParams.get('new');

        if (isNew === 'true') {
            const newGuardsData = localStorage.getItem('newGuards');
            if (newGuardsData) {
                const newGuards = JSON.parse(newGuardsData);
                // Add all new guards to the list
                setGuards(prev => [...prev, ...newGuards]);
                // Clear localStorage after adding
                localStorage.removeItem('newGuards');
            }
        }

        if (tab === 'pending') {
            setActiveTab('pending');
        }
    }, [searchParams]);

    // Filter guards by active tab
    const filteredGuards = guards.filter(guard => guard.status === activeTab);

    // Calculate pagination
    const totalPages = Math.max(1, Math.ceil(filteredGuards.length / guardsPerPage));
    const startIndex = (currentPage - 1) * guardsPerPage;
    const endIndex = startIndex + guardsPerPage;
    const currentGuards = filteredGuards.slice(startIndex, endIndex);

    // Reset to page 1 when changing tabs
    const handleTabChange = (tab: GuardStatus) => {
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

    const handleDeactivate = (guardId: string) => {
        const guard = guards.find(g => g.id === guardId);
        if (guard) {
            setSelectedGuard(guard);
            setShowDeactivateModal(true);
        }
    };

    const handleConfirmDeactivate = () => {
        if (selectedGuard) {
            setGuards(guards.map(g =>
                g.id === selectedGuard.id
                    ? { ...g, status: 'inactive' as const, deactivatedAt: new Date() }
                    : g
            ));
        }
        setShowDeactivateModal(false);
        setSelectedGuard(null);
    };

    const handleActivate = (guardId: string) => {
        setGuards(guards.map(g =>
            g.id === guardId
                ? { ...g, status: 'active' as const, activatedAt: new Date(), deactivatedAt: undefined }
                : g
        ));
    };

    const handleViewProfile = (guardId: string) => {
        console.log('View profile for guard:', guardId);
        // TODO: Navigate to guard profile page
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
                    <h1 className={styles.title}>Guards</h1>

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
                                {currentGuards.map((guard) => (
                                    <GuardListItem
                                        key={guard.id}
                                        guard={guard}
                                        onDeactivate={handleDeactivate}
                                        onActivate={handleActivate}
                                        onViewProfile={handleViewProfile}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* New Guard Button Section */}
                    <div className={styles.newGuardSection}>
                        <button
                            className={styles.newGuardButton}
                            onClick={() => router.push('/guards/new-guard')}
                        >
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

            {/* Deactivate Guard Modal */}
            {
                showDeactivateModal && selectedGuard && (
                    <DeactivateGuardModal
                        guardName={selectedGuard.name}
                        onConfirm={handleConfirmDeactivate}
                        onCancel={() => {
                            setShowDeactivateModal(false);
                            setSelectedGuard(null);
                        }}
                    />
                )
            }
        </div >
    );
}
