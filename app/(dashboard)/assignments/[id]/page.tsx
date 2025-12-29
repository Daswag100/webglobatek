'use client';

import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Colors } from '@/constants/Colors';
import { completedAssignmentsData } from '@/data/completedAssignmentsData';
import { activeAssignmentData } from '@/data/activeAssignmentData';
import { upcomingAssignmentsData } from '@/data/upcomingAssignmentsData';
import CheckInsTimeline from '@/components/dashboard/CheckInsTimeline';
import styles from './view-assignment.module.css';

export default function ViewAssignmentPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const assignmentId = params.id as string;
    const guardParam = searchParams.get('guard');

    const [selectedGuardIndex, setSelectedGuardIndex] = useState(0);
    const [showToast, setShowToast] = useState(false);

    // Check if this is a completed assignment
    const completedAssignment = completedAssignmentsData[assignmentId];
    const isCompleted = !!completedAssignment;

    // Check if this is an active assignment
    const isActive = assignmentId === 'a1';
    const activeAssignment = isActive ? activeAssignmentData : null;

    // Check if this is an upcoming assignment
    const upcomingAssignment = upcomingAssignmentsData[assignmentId];
    const isUpcoming = !!upcomingAssignment;

    // Set initial guard based on URL parameter
    useEffect(() => {
        if (guardParam && (completedAssignment || activeAssignment)) {
            const guards = completedAssignment?.guards || activeAssignment?.guards || [];
            const guardIndex = guards.findIndex(g => {
                // Active guards have 'id', completed guards have 'guardId'
                const guardIdentifier = 'id' in g ? g.id : g.guardId;
                return guardIdentifier === guardParam || g.guardId === guardParam;
            });
            if (guardIndex !== -1) {
                setSelectedGuardIndex(guardIndex);
            }
        }
    }, [guardParam, completedAssignment, activeAssignment]);

    const handleBack = () => {
        router.push(isActive ? '/dashboard' : '/assignments');
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    const getPerformanceColor = (label: string) => {
        switch (label) {
            case 'Excellent':
                return { bg: '#D1FAE5', text: '#059669', badge: 'Excellent' };
            case 'Fair':
                return { bg: '#FEF3C7', text: '#D97706', badge: 'Fair' };
            case 'Poor':
                return { bg: '#FEE2E2', text: '#DC2626', badge: 'Poor' };
            default:
                return { bg: '#F3F4F6', text: '#6B7280', badge: 'N/A' };
        }
    };

    // Render active assignment view
    if (isActive && activeAssignment) {
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
                            {/* Assignment Time */}
                            <div className={styles.infoCard}>
                                <span className={styles.infoLabel}>Assignment Time</span>
                                <span className={styles.infoValue}>
                                    {activeAssignment.startTime} - {activeAssignment.endTime}
                                </span>
                            </div>

                            {/* Guard Details */}
                            <div className={styles.infoCard}>
                                <span className={styles.infoLabel}>Guard Details</span>
                                <div className={styles.detailRow}>
                                    <span className={styles.detailValue}>{selectedGuard.email}</span>
                                    <button onClick={() => handleCopy(selectedGuard.email)} className={styles.copyButton}>
                                        <Image src="/assets/images/copy.png" alt="Copy" width={16} height={16} />
                                    </button>
                                </div>
                                <div className={styles.detailRow}>
                                    <span className={styles.detailValue}>{selectedGuard.phone}</span>
                                    <button onClick={() => handleCopy(selectedGuard.phone)} className={styles.copyButton}>
                                        <Image src="/assets/images/copy.png" alt="Copy" width={16} height={16} />
                                    </button>
                                </div>
                                <div className={styles.detailRow}>
                                    <span className={styles.detailValue}>{selectedGuard.guardId}</span>
                                    <button onClick={() => handleCopy(selectedGuard.guardId)} className={styles.copyButton}>
                                        <Image src="/assets/images/copy.png" alt="Copy" width={16} height={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Emergency Reports */}
                            <div className={styles.emergencyCard}>
                                <div className={styles.emergencyHeader}>
                                    <Image src="/assets/images/emergency.png" alt="Emergency" width={20} height={20} />
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
                            </div>

                            <div className={styles.infoCard}>
                                <span className={styles.infoLabel}>Contact</span>
                                <div className={styles.detailRow}>
                                    <span className={styles.detailValue}>{activeAssignment.clientContact}</span>
                                    <button onClick={() => handleCopy(activeAssignment.clientContact)} className={styles.copyButton}>
                                        <Image src="/assets/images/copy.png" alt="Copy" width={16} height={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Assigned Duties */}
                            <div className={styles.infoCard}>
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

    // Render completed assignment view
    if (isCompleted) {
        const selectedGuard = completedAssignment.guards[selectedGuardIndex];
        const performanceStyle = getPerformanceColor(selectedGuard.performanceLabel);

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
                        <h1 className={styles.headerTitle}>{completedAssignment.title}</h1>
                    </div>
                </div>

                {/* Main Content */}
                <div className={styles.completedContainer}>
                    {/* Guard Tabs */}
                    <div className={styles.guardTabs}>
                        {completedAssignment.guards.map((guard, index) => (
                            <button
                                key={guard.guardId}
                                className={`${styles.guardTab} ${index === selectedGuardIndex ? styles.guardTabActive : ''}`}
                                onClick={() => setSelectedGuardIndex(index)}
                            >
                                <Image
                                    src={guard.guardAvatar}
                                    alt={guard.guardName}
                                    width={24}
                                    height={24}
                                    className={styles.guardTabAvatar}
                                />
                                <span>{guard.guardName}</span>
                            </button>
                        ))}
                    </div>

                    {/* Two Column Layout */}
                    <div className={styles.completedContent}>
                        {/* Left Column */}
                        <div className={styles.completedLeft}>
                            {/* Performance Card */}
                            <div className={styles.performanceCard} style={{ backgroundColor: performanceStyle.bg }}>
                                <div className={styles.performanceHeader}>
                                    <span className={styles.performanceLabel}>Performance</span>
                                    <span className={styles.performanceBadge} style={{ color: performanceStyle.text }}>
                                        {performanceStyle.badge}
                                    </span>
                                </div>
                                <div className={styles.performanceValue} style={{ color: performanceStyle.text }}>
                                    {selectedGuard.performance}%
                                </div>
                            </div>

                            {/* Check-Ins Card */}
                            <div className={styles.checkInsCard}>
                                <div className={styles.checkInsHeader}>
                                    <span className={styles.checkInsLabel}>Check-Ins</span>
                                    <span className={styles.checkInsCount}>
                                        {selectedGuard.completedCheckIns}/{selectedGuard.totalCheckIns}
                                    </span>
                                </div>
                                <div className={styles.timeline}>
                                    {selectedGuard.checkIns.map((checkIn, index) => (
                                        <div key={index} className={styles.timelineItem}>
                                            <div className={styles.timelineDot}></div>
                                            {index < selectedGuard.checkIns.length - 1 && (
                                                <div className={styles.timelineLine}></div>
                                            )}
                                            <div className={styles.timelineContent}>
                                                <span className={styles.timelineLabel}>
                                                    {checkIn.type === 'clocked-in' && 'Clocked in'}
                                                    {checkIn.type === 'break-period' && 'Break Period'}
                                                    {checkIn.type === 'clocked-out' && 'Clocked out'}
                                                </span>
                                                <span className={styles.timelineTime}>
                                                    {checkIn.time}
                                                    {checkIn.endTime && ` - ${checkIn.endTime}`}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Map */}
                            <div className={styles.mapContainer}>
                                <Image
                                    src={completedAssignment.mapImage}
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
                        <div className={styles.completedRight}>
                            {/* Assignment Time */}
                            <div className={styles.infoCard}>
                                <span className={styles.infoLabel}>Assignment Time</span>
                                <span className={styles.infoValue}>
                                    {completedAssignment.startTime} - {completedAssignment.endTime}
                                </span>
                            </div>

                            {/* Guard Details */}
                            <div className={styles.infoCard}>
                                <span className={styles.infoLabel}>Guard Details</span>
                                <div className={styles.detailRow}>
                                    <span className={styles.detailValue}>{selectedGuard.guardEmail}</span>
                                    <button onClick={() => handleCopy(selectedGuard.guardEmail)} className={styles.copyButton}>
                                        <Image src="/assets/images/copy.png" alt="Copy" width={16} height={16} />
                                    </button>
                                </div>
                                <div className={styles.detailRow}>
                                    <span className={styles.detailValue}>{selectedGuard.guardPhone}</span>
                                    <button onClick={() => handleCopy(selectedGuard.guardPhone)} className={styles.copyButton}>
                                        <Image src="/assets/images/copy.png" alt="Copy" width={16} height={16} />
                                    </button>
                                </div>
                                <div className={styles.detailRow}>
                                    <span className={styles.detailValue}>{selectedGuard.guardIdNumber}</span>
                                    <button onClick={() => handleCopy(selectedGuard.guardIdNumber)} className={styles.copyButton}>
                                        <Image src="/assets/images/copy.png" alt="Copy" width={16} height={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Guard Feedback */}
                            <div className={styles.feedbackCard}>
                                <div className={styles.feedbackHeader}>
                                    <Image src="/assets/images/feedback.png" alt="Feedback" width={20} height={20} />
                                    <span className={styles.feedbackTitle}>Guard Feedback</span>
                                </div>
                                {selectedGuard.feedback ? (
                                    <>
                                        <p className={styles.feedbackText}>{selectedGuard.feedback.text}</p>
                                        {selectedGuard.feedback.images && selectedGuard.feedback.images.length > 0 && (
                                            <div className={styles.feedbackImages}>
                                                {selectedGuard.feedback.images.map((img, index) => (
                                                    <Image
                                                        key={index}
                                                        src={img}
                                                        alt="Feedback"
                                                        width={60}
                                                        height={60}
                                                        className={styles.feedbackImage}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <p className={styles.noFeedback}>No feedback from this guard</p>
                                )}
                            </div>

                            {/* Emergency Reports */}
                            <div className={styles.emergencyCard}>
                                <div className={styles.emergencyHeader}>
                                    <Image src="/assets/images/emergency.png" alt="Emergency" width={20} height={20} />
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
                                <span className={styles.infoValue}>{completedAssignment.clientName}</span>
                            </div>

                            <div className={styles.infoCard}>
                                <span className={styles.infoLabel}>Contact</span>
                                <div className={styles.detailRow}>
                                    <span className={styles.detailValue}>{completedAssignment.clientContact}</span>
                                    <button onClick={() => handleCopy(completedAssignment.clientContact)} className={styles.copyButton}>
                                        <Image src="/assets/images/copy.png" alt="Copy" width={16} height={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Assigned Duties */}
                            <div className={styles.infoCard}>
                                <span className={styles.infoLabel}>Assigned Duties</span>
                                <ul className={styles.dutiesList}>
                                    {completedAssignment.duties.map((duty, index) => (
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

    // Render upcoming assignment view
    if (isUpcoming) {
        const selectedGuard = upcomingAssignment.guards[selectedGuardIndex];

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
                        <h1 className={styles.headerTitle}>{upcomingAssignment.title}</h1>
                    </div>
                </div>

                {/* Main Content */}
                <div className={styles.upcomingContainer}>
                    {/* Guard Tabs */}
                    <div className={styles.guardTabs}>
                        {upcomingAssignment.guards.map((guard, index) => (
                            <button
                                key={guard.guardId}
                                className={`${styles.guardTab} ${index === selectedGuardIndex ? styles.guardTabActive : ''}`}
                                onClick={() => setSelectedGuardIndex(index)}
                            >
                                <Image
                                    src={guard.guardAvatar}
                                    alt={guard.guardName}
                                    width={24}
                                    height={24}
                                    className={styles.guardTabAvatar}
                                />
                                <span>{guard.guardName}</span>
                            </button>
                        ))}
                    </div>

                    {/* Two Column Layout */}
                    <div className={styles.upcomingContent}>
                        {/* Left Column - Map */}
                        <div className={styles.upcomingLeft}>
                            <div className={styles.mapContainer}>
                                <Image
                                    src={upcomingAssignment.mapImage}
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
                        <div className={styles.upcomingRight}>
                            {/* Assignment Time */}
                            <div className={styles.infoCard}>
                                <span className={styles.infoLabel}>Assignment Time</span>
                                <span className={styles.infoValue}>
                                    {upcomingAssignment.startTime} - {upcomingAssignment.endTime}
                                </span>
                            </div>

                            {/* Guard Details */}
                            <div className={styles.infoCard}>
                                <span className={styles.infoLabel}>Guard Details</span>
                                <div className={styles.detailRow}>
                                    <span className={styles.detailValue}>{selectedGuard.guardEmail}</span>
                                    <button onClick={() => handleCopy(selectedGuard.guardEmail)} className={styles.copyButton}>
                                        <Image src="/assets/images/copy.png" alt="Copy" width={16} height={16} />
                                    </button>
                                </div>
                                <div className={styles.detailRow}>
                                    <span className={styles.detailValue}>{selectedGuard.guardPhone}</span>
                                    <button onClick={() => handleCopy(selectedGuard.guardPhone)} className={styles.copyButton}>
                                        <Image src="/assets/images/copy.png" alt="Copy" width={16} height={16} />
                                    </button>
                                </div>
                                <div className={styles.detailRow}>
                                    <span className={styles.detailValue}>{selectedGuard.guardIdNumber}</span>
                                    <button onClick={() => handleCopy(selectedGuard.guardIdNumber)} className={styles.copyButton}>
                                        <Image src="/assets/images/copy.png" alt="Copy" width={16} height={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Client Information */}
                            <div className={styles.infoCard}>
                                <span className={styles.infoLabel}>Client Name</span>
                                <span className={styles.infoValue}>{upcomingAssignment.clientName}</span>
                            </div>

                            <div className={styles.infoCard}>
                                <span className={styles.infoLabel}>Contact</span>
                                <div className={styles.detailRow}>
                                    <span className={styles.detailValue}>{upcomingAssignment.clientContact}</span>
                                    <button onClick={() => handleCopy(upcomingAssignment.clientContact)} className={styles.copyButton}>
                                        <Image src="/assets/images/copy.png" alt="Copy" width={16} height={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Assigned Duties */}
                            <div className={styles.infoCard}>
                                <span className={styles.infoLabel}>Assigned Duties</span>
                                <ul className={styles.dutiesList}>
                                    {upcomingAssignment.duties.map((duty, index) => (
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

    // Fallback for unknown assignments
    return (
        <div style={{ marginLeft: '110px', padding: '32px' }}>
            <p>Assignment not found</p>
        </div>
    );
}
