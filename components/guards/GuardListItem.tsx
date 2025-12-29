'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Guard } from '@/data/mockGuardsData';
import styles from './GuardListItem.module.css';

interface GuardListItemProps {
    guard: Guard;
    onDeactivate?: (guardId: string) => void;
    onActivate?: (guardId: string) => void;
    onViewProfile?: (guardId: string) => void;
}

export default function GuardListItem({
    guard,
    onDeactivate,
    onActivate,
    onViewProfile
}: GuardListItemProps) {
    const [showMenu, setShowMenu] = useState(false);
    const [copiedField, setCopiedField] = useState<'phone' | 'email' | null>(null);

    const handleCopy = async (text: string, field: 'phone' | 'email') => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleMenuClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    const handleViewProfile = () => {
        setShowMenu(false);
        onViewProfile?.(guard.id);
    };

    const handleDeactivate = () => {
        setShowMenu(false);
        onDeactivate?.(guard.id);
    };

    const handleActivate = () => {
        setShowMenu(false);
        onActivate?.(guard.id);
    };

    // Close menu when clicking outside
    useState(() => {
        const handleClickOutside = () => setShowMenu(false);
        if (showMenu) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    });

    return (
        <div className={`${styles.guardItem} ${guard.status === 'pending' ? styles.pendingItem : ''}`}>
            {/* Profile Section */}
            <div className={styles.profileSection}>
                {guard.status === 'pending' ? (
                    <div className={styles.avatarPlaceholder}>
                        <Image
                            src="/assets/images/darkprofile.jpg"
                            alt="Pending"
                            width={50}
                            height={50}
                        />
                    </div>
                ) : (
                    <Image
                        src={guard.avatar}
                        alt={guard.name}
                        width={48}
                        height={48}
                        className={styles.avatar}
                    />
                )}
                <div className={styles.nameSection}>
                    <h3 className={styles.name}>{guard.name}</h3>
                </div>
            </div>

            {/* Guard ID */}
            <div className={styles.guardId}>{guard.guardId}</div>

            {/* Phone - Only show for active/inactive guards */}
            {guard.status !== 'pending' && (
                <div className={styles.contactField}>
                    <span className={styles.contactText}>{guard.phone}</span>
                    <button
                        className={styles.copyButton}
                        onClick={() => handleCopy(guard.phone, 'phone')}
                        title="Copy phone number"
                    >
                        <Image
                            src="/assets/images/copy1.png"
                            alt="Copy"
                            width={20}
                            height={20}
                        />
                        {copiedField === 'phone' && (
                            <span className={styles.copiedTooltip}>Copied!</span>
                        )}
                    </button>
                </div>
            )}

            {/* Email */}
            <div className={styles.contactField}>
                <span className={styles.contactText}>{guard.email}</span>
                <button
                    className={styles.copyButton}
                    onClick={() => handleCopy(guard.email, 'email')}
                    title="Copy email"
                >
                    <Image
                        src="/assets/images/copy1.png"
                        alt="Copy"
                        width={20}
                        height={20}
                    />
                    {copiedField === 'email' && (
                        <span className={styles.copiedTooltip}>Copied!</span>
                    )}
                </button>
            </div>

            {/* Three-dot Menu */}
            <div className={styles.menuContainer}>
                <button
                    className={styles.menuButton}
                    onClick={handleMenuClick}
                >
                    <span className={styles.threeDots}>⋯</span>
                </button>

                {/* Dropdown Menu */}
                {showMenu && (
                    <div className={styles.dropdown}>
                        {guard.status === 'active' && (
                            <>
                                <button
                                    className={styles.dropdownItem}
                                    onClick={handleViewProfile}
                                >
                                    <Image
                                        src="/assets/images/profile.png"
                                        alt="Profile"
                                        width={20}
                                        height={20}
                                    />
                                    <span>View Guard Profile</span>
                                </button>
                                <button
                                    className={`${styles.dropdownItem} ${styles.deactivateItem}`}
                                    onClick={handleDeactivate}
                                >
                                    <Image
                                        src="/assets/images/inactive.png"
                                        alt="Deactivate"
                                        width={20}
                                        height={20}
                                    />
                                    <span>Deactivate Guard</span>
                                </button>
                            </>
                        )}
                        {guard.status === 'inactive' && (
                            <button
                                className={styles.dropdownItem}
                                onClick={handleActivate}
                            >
                                <Image
                                    src="/assets/images/flash.png"
                                    alt="Activate"
                                    width={20}
                                    height={20}
                                />
                                <span>Activate Guard</span>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
