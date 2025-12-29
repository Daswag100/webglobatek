'use client';

import Image from 'next/image';
import styles from './ConfirmAssignmentModal.module.css';

interface ConfirmAssignmentModalProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function ConfirmAssignmentModal({ isOpen, onCancel, onConfirm }: ConfirmAssignmentModalProps) {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onCancel}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.iconContainer}>
                    <Image
                        src="/assets/images/save.png"
                        alt="Confirm"
                        width={48}
                        height={48}
                    />
                </div>

                <h2 className={styles.title}>Confirm Assignment</h2>

                <p className={styles.message}>
                    Please confirm that all details are correct.<br />
                    This assignment will be created and visible to<br />
                    guards right away.
                </p>

                <div className={styles.buttons}>
                    <button onClick={onCancel} className={styles.cancelButton}>
                        Cancel
                    </button>
                    <button onClick={onConfirm} className={styles.confirmButton}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}
