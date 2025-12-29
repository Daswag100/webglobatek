'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Colors } from '@/constants/Colors';
import { activeAssignmentData } from '@/data/activeAssignmentData';
import CheckInsTimeline from '@/components/dashboard/CheckInsTimeline';
import styles from './active-assignment.module.css';

export default function DashboardActiveAssignmentPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const guardParam = searchParams.get('guard');

    const [selectedGuardIndex, setSelectedGuardIndex] = useState(0);
    const [showToast, setShowToast] = useState(false);

    const activeAssignment = activeAssignmentData;

    // Set initial guard based on URL parameter
    useEffect(() => {
        if (guardParam && activeAssignment) {
            const guardIndex = activeAssignment.guards.findIndex(g => g.id === guardParam);
            if (guardIndex !== -1) {
                setSelectedGuardIndex(guardIndex);
            }
        }
    }, [guardParam, activeAssignment]);

    const handleBack = () => {
        router.push('/dashboard');
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    const selectedGuard = activeAssignment.guards[selectedGuardIndex];

    return (
        <div
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
                            width={24}
                            height={24}
                        />
                    </button>
                    <h1 className={styles.headerTitle}>{activeAssignment.title}</h1>
                </div>
            </div>

            {/* Main Content */}
            <div className={styles.activeContainer}>
                {/* Guard Tabs */}
                <div className={styles.guardTabs}>
                    {activeAssignment.guards.map((guard, index) => (
                        <button
                            key={guard.id}
                            className={`${styles.guardTab} ${index === selectedGuardIndex ? styles.guardTabActive : ''}`}
                            onClick={() => setSelectedGuardIndex(index)}
                        >
                            <Image
                                src={guard.avatar}
                                alt={guard.name}
                                width={24}
                                height={24}
                                className={styles.guardTabAvatar}
                            />
                            <span>{guard.name}</span>
                        </button>
                    ))}
                </div>

                {/* Two Column Layout */}
                <div className={styles.activeContent}>
                    {/* Left Column */}
                    <div className={styles.activeLeft}>
                        {/* Check-Ins Timeline */}
                        <div className={styles.checkInsCard}>
                            <CheckInsTimeline
                                checkIns={selectedGuard.checkIns}
                                completedCheckIns={selectedGuard.completedCheckIns}
                                totalCheckIns={selectedGuard.totalCheckIns}
                            />
                        </div>

                        {/* Map */}
                        <div className={styles.mapContainer}>
                            <Image
                                src={activeAssignment.mapImage}
                                alt="Map"
                                width={300}
                                height={300}
                                className={styles.mapImage}
                            />
                            <a href="#" className={styles.viewOnMaps}>
                                <Image
                                    src="/assets/images/location.png"
                                    alt="Location"
                                    width={16}
                                    height={16}
                                />
                                <span>View on Maps</span>
                            </a>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className={styles.activeRight}>
                        {/* Assignment Time & Guard Details - Combined */}
                        <div className={styles.infoCard}>
                            <span className={styles.infoLabel}>Assignment Time</span>
                            <span className={styles.infoValue}>
                                {activeAssignment.startTime} - {activeAssignment.endTime}
                            </span>

                            <span className={styles.infoLabel} style={{ marginTop: '8px' }}>Guard Details</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                <span className={styles.detailValue} style={{ flex: 'none' }}>{selectedGuard.email}</span>
                                <button onClick={() => handleCopy(selectedGuard.email)} className={styles.copyButton}>
                                    <Image src="/assets/images/copy.png" alt="Copy" width={16} height={16} />
                                </button>
                                <span className={styles.detailValue} style={{ flex: 'none' }}>{selectedGuard.phone}</span>
                                <button onClick={() => handleCopy(selectedGuard.phone)} className={styles.copyButton}>
                                    <Image src="/assets/images/copy.png" alt="Copy" width={16} height={16} />
                                </button>
                                <span className={styles.detailValue} style={{ flex: 'none' }}>{selectedGuard.guardId}</span>
                                <button onClick={() => handleCopy(selectedGuard.guardId)} className={styles.copyButton}>
                                    <Image src="/assets/images/copy.png" alt="Copy" width={16} height={16} />
                                </button>
                            </div>
                        </div>

                        {/* Emergency Reports */}
                        <div className={styles.emergencyCard}>
                            <div className={styles.emergencyHeader}>
                                <Image src="/assets/images/ambulance1.png" alt="Emergency" width={20} height={20} />
                                <span className={styles.emergencyTitle}>Emergency Reports</span>
                            </div>
                            {selectedGuard.emergencyReports && selectedGuard.emergencyReports.length > 0 ? (
                                <div className={styles.emergencyReports}>
                                    {selectedGuard.emergencyReports.map((report, index) => (
                                        <div key={index} className={styles.emergencyReport}>
                                            <p className={styles.emergencyText}>{report.description}</p>
                                            {report.images && report.images.length > 0 && (
                                                <div className={styles.emergencyImages}>
                                                    {report.images.map((img, imgIndex) => (
                                                        <Image
                                                            key={imgIndex}
                                                            src={img}
                                                            alt="Emergency"
                                                            width={60}
                                                            height={60}
                                                            className={styles.emergencyImage}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                            <span className={styles.emergencyTime}>{report.time}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className={styles.noReports}>No reports from this guard</p>
                            )}
                        </div>

                        {/* Client Information */}
                        <div className={styles.infoCard}>
                            <span className={styles.infoLabel}>Client Name</span>
                            <span className={styles.infoValue}>{activeAssignment.clientName}</span>

                            <span className={styles.infoLabel} style={{ marginTop: '8px' }}>Contact</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'space-between' }}>
                                <span className={styles.detailValue} style={{ flex: 'none' }}>{activeAssignment.clientContact}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <button onClick={() => handleCopy(activeAssignment.clientContact)} className={styles.copyButton}>
                                        <Image src="/assets/images/call.png" alt="Call" width={16} height={16} />
                                    </button>
                                    <button onClick={() => handleCopy(activeAssignment.clientContact)} className={styles.copyButton}>
                                        <Image src="/assets/images/copy.png" alt="Copy" width={16} height={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Assigned Duties */}
                        <div className={styles.dutiesCard}>
                            <span className={styles.infoLabel}>Assigned Duties</span>
                            <ul className={styles.dutiesList}>
                                {activeAssignment.duties.map((duty, index) => (
                                    <li key={index} className={styles.dutyItem}>{duty}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
