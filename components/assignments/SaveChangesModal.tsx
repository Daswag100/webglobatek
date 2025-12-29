'use client';

import Image from 'next/image';
import styles from './SaveChangesModal.module.css';

interface SaveChangesModalProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function SaveChangesModal({ isOpen, onCancel, onConfirm }: SaveChangesModalProps) {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onCancel}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.iconContainer}>
                    <Image
                        src="/assets/images/save.png"
                        alt="Save"
                        width={48}
                        height={48}
                    />
                </div>

                <h2 className={styles.title}>Save Changes</h2>

                <p className={styles.message}>
                    Please confirm that all details are correct.<br />
                    This assignment will be updated and visible to<br />
                    guards right away.
                </p>

                <div className={styles.buttons}>
                    <button onClick={onCancel} className={styles.cancelButton}>
                        Cancel
                    </button>
                    <button onClick={onConfirm} className={styles.saveButton}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
