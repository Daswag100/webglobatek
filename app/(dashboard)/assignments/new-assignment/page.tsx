'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Colors } from '@/constants/Colors';
import { mockGuards } from '@/data/mockDashboardData';
import ConfirmAssignmentModal from '@/components/assignments/ConfirmAssignmentModal';
import styles from './new-assignment.module.css';

interface Guard {
    id: string;
    name: string;
    avatar?: string;
}

export default function NewAssignmentPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: '',
        location: '',
        startTime: '',
        endTime: '',
        date: '',
        numberOfGuards: '',
        clientName: '',
        clientPhone: '',
        isPublic: false,
        guards: [] as Guard[],
        duties: ''
    });

    const [showGuardDropdown, setShowGuardDropdown] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleBack = () => {
        router.push('/assignments');
    };

    const handleConfirm = () => {
        setShowConfirmModal(true);
    };

    const handleConfirmCreate = () => {
        // Save logic here - for now just log and redirect
        console.log('Creating new assignment:', formData);
        setShowConfirmModal(false);
        router.push('/assignments/assignment-created');
    };

    const handleAddGuard = (guard: Guard) => {
        if (!formData.guards.find(g => g.id === guard.id)) {
            setFormData({
                ...formData,
                guards: [...formData.guards, guard]
            });
        }
        setShowGuardDropdown(false);
        setSearchQuery('');
    };

    const handleRemoveGuard = (guardId: string) => {
        setFormData({
            ...formData,
            guards: formData.guards.filter(g => g.id !== guardId)
        });
    };

    const filteredGuards = mockGuards.filter(guard =>
        guard.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div
            className={styles.container}
            style={{
                marginLeft: '110px',
                backgroundColor: Colors.screenBg,
                minHeight: '100vh',
            }}
        >
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <button onClick={handleBack} className={styles.backButton}>
                        <Image
                            src="/assets/images/back.png"
                            alt="Back"
                            width={20}
                            height={20}
                        />
                    </button>
                    <h1 className={styles.headerTitle}>Add New Assignment</h1>
                </div>
                <button onClick={handleConfirm} className={styles.confirmButton}>
                    <Image
                        src="/assets/images/tick.png"
                        alt="Confirm"
                        width={16}
                        height={16}
                    />
                    <span>Confirm</span>
                </button>
            </div>

            {/* Main Content */}
            <div className={styles.mainContent}>
                {/* Left Section - Form */}
                <div className={styles.leftSection}>
                    <div className={styles.formCard}>
                        {/* Title and Location Row */}
                        <div className={styles.formRow}>
                            <div className={styles.formField}>
                                <label className={styles.label}>
                                    Title <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder='E.g "Morning Patrol at central Park"'
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.formField}>
                                <label className={styles.label}>
                                    Location <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Location"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        {/* Start Time and End Time Row */}
                        <div className={styles.formRow}>
                            <div className={styles.formField}>
                                <label className={styles.label}>
                                    Start Time <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder='E.g "10:00AM"'
                                    value={formData.startTime}
                                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.formField}>
                                <label className={styles.label}>
                                    End Time <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder='E.g "10:00AM"'
                                    value={formData.endTime}
                                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        {/* Date and Number of Guards Row */}
                        <div className={styles.formRow}>
                            <div className={styles.formField}>
                                <label className={styles.label}>
                                    Date <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="DD/MM/YYYY"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.formField}>
                                <label className={styles.label}>
                                    Number of Guards <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter allocated number of guards"
                                    value={formData.numberOfGuards}
                                    onChange={(e) => setFormData({ ...formData, numberOfGuards: e.target.value })}
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        {/* Client Name and Phone Row */}
                        <div className={styles.formRow}>
                            <div className={styles.formField}>
                                <label className={styles.label}>
                                    Client Name <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder='E.g "Clint Deven"'
                                    value={formData.clientName}
                                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.formField}>
                                <label className={styles.label}>
                                    Client Phone Number <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="tel"
                                    placeholder="+1 3434 3343434"
                                    value={formData.clientPhone}
                                    onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        {/* Make Public Checkbox */}
                        <div className={styles.checkboxRow}>
                            <input
                                type="checkbox"
                                id="makePublic"
                                checked={formData.isPublic}
                                onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                                className={styles.checkbox}
                            />
                            <label htmlFor="makePublic" className={styles.checkboxLabel}>
                                Make this Assignment Public
                            </label>
                        </div>

                        {/* Guards Section */}
                        <div className={styles.guardsSection}>
                            <div className={styles.guardsList}>
                                {formData.guards.map((guard) => (
                                    <div key={guard.id} className={styles.guardChip}>
                                        <Image
                                            src={guard.avatar || '/assets/images/default-avatar.png'}
                                            alt={guard.name}
                                            width={32}
                                            height={32}
                                            className={styles.guardAvatar}
                                        />
                                        <span className={styles.guardName}>{guard.name}</span>
                                        <button
                                            onClick={() => handleRemoveGuard(guard.id)}
                                            className={styles.removeButton}
                                        >
                                            <Image
                                                src="/assets/images/close.png"
                                                alt="Remove"
                                                width={12}
                                                height={12}
                                            />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    className={formData.guards.length > 0 ? styles.addGuardButtonSmall : styles.assignGuardsButton}
                                    onClick={() => setShowGuardDropdown(true)}
                                >
                                    <Image
                                        src="/assets/images/add.png"
                                        alt="Assign"
                                        width={20}
                                        height={20}
                                    />
                                    {formData.guards.length === 0 && <span>Assign Guards</span>}
                                </button>
                            </div>
                        </div>

                        {/* Guard Duties */}
                        <div className={styles.formField}>
                            <label className={styles.label}>
                                Guard Duties <span className={styles.required}>*</span>
                            </label>
                            <textarea
                                placeholder="Enter the duties to be performed by the guards on this assignment"
                                value={formData.duties}
                                onChange={(e) => setFormData({ ...formData, duties: e.target.value })}
                                className={styles.textarea}
                                rows={6}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Section - Map */}
                <div className={styles.rightSection}>
                    <div className={styles.mapContainer}>
                        <Image
                            src="/assets/images/map.png"
                            alt="Map"
                            width={300}
                            height={300}
                            className={styles.mapImage}
                        />
                        <a href="#" className={styles.viewOnMaps}>
                            <Image
                                src="/assets/images/navigation.png"
                                alt="Navigation"
                                width={16}
                                height={16}
                            />
                            <span>View on Maps</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Guard Selection Dropdown Modal */}
            {showGuardDropdown && (
                <div className={styles.modalOverlay} onClick={() => setShowGuardDropdown(false)}>
                    <div className={styles.dropdownModal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.searchContainer}>
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
                                className={styles.searchInput}
                                autoFocus
                            />
                        </div>
                        <div className={styles.guardList}>
                            {filteredGuards.map((guard) => (
                                <div
                                    key={guard.id}
                                    className={styles.guardItem}
                                    onClick={() => handleAddGuard(guard)}
                                >
                                    <Image
                                        src={guard.avatar || '/assets/images/default-avatar.png'}
                                        alt={guard.name}
                                        width={40}
                                        height={40}
                                        className={styles.guardItemAvatar}
                                    />
                                    <span className={styles.guardItemName}>{guard.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            <ConfirmAssignmentModal
                isOpen={showConfirmModal}
                onCancel={() => setShowConfirmModal(false)}
                onConfirm={handleConfirmCreate}
            />
        </div>
    );
}
