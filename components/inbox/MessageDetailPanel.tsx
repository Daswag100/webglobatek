import Image from 'next/image';
import { EmergencyMessage } from '@/types/dashboard';
import styles from './MessageDetailPanel.module.css';

interface MessageDetailPanelProps {
    message: EmergencyMessage | null;
    onMarkAsResolved: (id: string) => void;
    onMarkAsUnresolved: (id: string) => void;
}

export default function MessageDetailPanel({
    message,
    onMarkAsResolved,
    onMarkAsUnresolved
}: MessageDetailPanelProps) {
    if (!message) {
        return (
            <div className={styles.panel}>
                <div className={styles.emptyState}>
                    <p className={styles.emptyText}>No Message Selected</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.panel}>
            <div className={styles.header}>
                <div className={styles.senderInfo}>
                    <Image
                        src={message.sender.avatar}
                        alt={message.sender.name}
                        width={48}
                        height={48}
                        className={styles.avatar}
                    />
                    <div className={styles.senderDetails}>
                        <h3 className={styles.senderName}>{message.sender.name}</h3>
                        <div className={styles.ticketNumber}>
                            <Image
                                src="/assets/images/copy1.png"
                                alt="Ticket"
                                width={16}
                                height={16}
                            />
                            <span>{message.ticketNumber}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.content}>
                <p className={styles.messageText}>{message.messageContent}</p>
                <div className={styles.timestamp}>
                    <span className={styles.date}>{message.date}</span>
                    <span className={styles.time}>{message.time}</span>
                </div>
            </div>

            <div className={styles.actions}>
                <span className={styles.markAsLabel}>Mark As:</span>
                <button
                    className={styles.resolvedButton}
                    onClick={() => onMarkAsResolved(message.id)}
                >
                    Resolved
                </button>
                <button
                    className={styles.unresolvedButton}
                    onClick={() => onMarkAsUnresolved(message.id)}
                >
                    Unresolved
                </button>
            </div>
        </div>
    );
}
