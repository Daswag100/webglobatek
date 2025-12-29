'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { Colors } from '@/constants/Colors';
import SaveChangesModal from '@/components/assignments/SaveChangesModal';
import styles from './edit-assignment.module.css';

// Mock data
const mockAssignment = {
    id: '1',
    title: 'Morning Patrol – Federal Plaza Tower',
    location: '375 Park Ave, New York, NY 10152',
    startTime: '8:00AM',
    endTime: '10:00AM',
    date: '25/12/2025',
    numberOfGuards: 4,
    clientName: 'Atlas Property Management',
    clientPhone: '+1 (212) 682-9746',
    isPublic: false,
    guards: [
        { id: '1', name: 'Marcus Reid', avatar: '/assets/images/marcus.png' },
        { id: '2', name: 'Carol Parker', avatar: '/assets/images/sarah.png' },
        { id: '3', name: 'Isaiah Coleman', avatar: '/assets/images/issac.png' },
    ],
    duties: 'Check lobby access cards and visitor IDs'
};

export default function EditAssignmentPage() {
    const router = useRouter();
    const params = useParams();

    const [formData, setFormData] = useState(mockAssignment);
    const [showSaveModal, setShowSaveModal] = useState(false);

    const handleBack = () => {
        router.push(`/assignments/${params.id}`);
    };

    const handleSave = () => {
        setShowSaveModal(true);
    };

    const handleConfirmSave = () => {
        // Save logic here
        console.log('Saving assignment:', formData);
        setShowSaveModal(false);
        router.push(`/assignments/${params.id}`);
    };

    const handleRemoveGuard = (guardId: string) => {
        setFormData({
            ...formData,
            guards: formData.guards.filter(g => g.id !== guardId)
        });
    };

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
                    <h1 className={styles.headerTitle}>Edit Assignment</h1>
                </div>
                <button onClick={handleSave} className={styles.saveButton}>
                    <Image
                        src="/assets/images/tick.png"
                        alt="Save"
                        width={16}
                        height={16}
                    />
                    <span>Save Changes</span>
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
                                    type="number"
                                    value={formData.numberOfGuards}
                                    onChange={(e) => setFormData({ ...formData, numberOfGuards: parseInt(e.target.value) })}
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

                        {/* Guards Selection */}
                        <div className={styles.guardsSection}>
                            <div className={styles.guardsList}>
                                {formData.guards.map((guard) => (
                                    <div key={guard.id} className={styles.guardChip}>
                                        <Image
                                            src={guard.avatar}
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
                                <button className={styles.addGuardButton}>
                                    <Image
                                        src="/assets/images/add.png"
                                        alt="Add Guard"
                                        width={20}
                                        height={20}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Guard Duties */}
                        <div className={styles.formField}>
                            <label className={styles.label}>
                                Guard Duties <span className={styles.required}>*</span>
                            </label>
                            <textarea
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

            <SaveChangesModal
                isOpen={showSaveModal}
                onCancel={() => setShowSaveModal(false)}
                onConfirm={handleConfirmSave}
            />
        </div>
    );
}
