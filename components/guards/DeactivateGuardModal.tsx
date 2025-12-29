'use client';

import Image from 'next/image';
import styles from './DeactivateGuardModal.module.css';

interface DeactivateGuardModalProps {
    guardName: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function DeactivateGuardModal({
    guardName,
    onConfirm,
    onCancel,
}: DeactivateGuardModalProps) {
    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.modal}>
                {/* Icon */}
                <div className={styles.iconContainer}>
                    <div className={styles.icon}>
                        <span className={styles.minusSign}>−</span>
                    </div>
                </div>

                {/* Content */}
                <div className={styles.content}>
                    <h2 className={styles.title}>
                        Are you sure you want to deactivate this guard?
                    </h2>
                    <p className={styles.subtitle}>You can still revert this</p>
                </div>

                {/* Actions */}
                <div className={styles.actions}>
                    <button className={styles.cancelButton} onClick={onCancel}>
                        Cancel
                    </button>
                    <button className={styles.deactivateButton} onClick={onConfirm}>
                        Deactivate
                    </button>
                </div>
            </div>
        </div>
    );
}
