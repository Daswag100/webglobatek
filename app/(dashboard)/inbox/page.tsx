'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Colors } from '@/constants/Colors';
import { emergencyMessagesData, getMessagesByStatus } from '@/data/emergencyMessagesData';
import { EmergencyMessage } from '@/types/dashboard';
import EmergencyMessageItem from '@/components/inbox/EmergencyMessageItem';
import MessageDetailPanel from '@/components/inbox/MessageDetailPanel';
import styles from './inbox.module.css';

type InboxTab = 'emergency' | 'assignments' | 'requests';
type FilterType = 'all' | 'resolved' | 'unresolved';

export default function InboxPage() {
    const [activeTab, setActiveTab] = useState<InboxTab>('emergency');
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
    const [activeMessageId, setActiveMessageId] = useState<string | null>(null);
    const [messages, setMessages] = useState<EmergencyMessage[]>(emergencyMessagesData);

    // Filter messages based on active filter
    const filteredMessages = getMessagesByStatus(activeFilter);

    // Get active message
    const activeMessage = activeMessageId
        ? messages.find(m => m.id === activeMessageId) || null
        : null;

    const handleSelectMessage = (id: string) => {
        setSelectedMessages(prev =>
            prev.includes(id)
                ? prev.filter(msgId => msgId !== id)
                : [...prev, id]
        );
    };

    const handleMessageClick = (id: string) => {
        setActiveMessageId(id);
    };

    const handleMarkAsResolved = (id: string) => {
        setMessages(prev => prev.map(msg =>
            msg.id === id ? { ...msg, status: 'resolved' as const } : msg
        ));
    };

    const handleMarkAsUnresolved = (id: string) => {
        setMessages(prev => prev.map(msg =>
            msg.id === id ? { ...msg, status: 'unresolved' as const } : msg
        ));
    };

    const handleBulkMarkAsResolved = () => {
        setMessages(prev => prev.map(msg =>
            selectedMessages.includes(msg.id) ? { ...msg, status: 'resolved' as const } : msg
        ));
        setSelectedMessages([]);
    };

    const handleBulkMarkAsUnresolved = () => {
        setMessages(prev => prev.map(msg =>
            selectedMessages.includes(msg.id) ? { ...msg, status: 'unresolved' as const } : msg
        ));
        setSelectedMessages([]);
    };

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

                {/* Bulk Actions Bar */}
                {selectedMessages.length > 0 && (
                    <div className={styles.bulkActionsBar}>
                        <span className={styles.markAsLabel}>Mark As:</span>
                        <button
                            className={styles.bulkResolvedButton}
                            onClick={handleBulkMarkAsResolved}
                        >
                            Resolved
                        </button>
                        <button
                            className={styles.bulkUnresolvedButton}
                            onClick={handleBulkMarkAsUnresolved}
                        >
                            Unresolved
                        </button>
                        <button
                            className={styles.clearSelectionButton}
                            onClick={() => setSelectedMessages([])}
                        >
                            <Image
                                src="/assets/images/close.png"
                                alt="Clear"
                                width={16}
                                height={16}
                            />
                        </button>
                    </div>
                )}

                {/* Two Column Layout */}
                <div className={styles.contentLayout}>
                    {/* Message List */}
                    <div className={styles.messageListContainer}>
                        <div className={styles.messageList}>
                            {filteredMessages.map(message => (
                                <EmergencyMessageItem
                                    key={message.id}
                                    message={message}
                                    isSelected={selectedMessages.includes(message.id)}
                                    isActive={activeMessageId === message.id}
                                    onSelect={handleSelectMessage}
                                    onClick={handleMessageClick}
                                />
                            ))}
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

                    {/* Message Detail Panel */}
                    <div className={styles.detailPanelContainer}>
                        <MessageDetailPanel
                            message={activeMessage}
                            onMarkAsResolved={handleMarkAsResolved}
                            onMarkAsUnresolved={handleMarkAsUnresolved}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
