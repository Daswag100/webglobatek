import Image from 'next/image';
import { RequestMessage } from '@/types/dashboard';
import styles from './RequestMessageItem.module.css';

interface RequestMessageItemProps {
    message: RequestMessage;
    isSelected: boolean;
    isActive: boolean;
    onSelect: (id: string) => void;
    onClick: (id: string) => void;
}

export default function RequestMessageItem({
    message,
    isSelected,
    isActive,
    onSelect,
    onClick
}: RequestMessageItemProps) {
    return (
        <div
            className={`${styles.messageItem} ${message.status === 'unresolved' ? styles.messageItemUnresolved : ''} ${isActive ? styles.messageItemActive : ''}`}
            onClick={() => onClick(message.id)}
        >
            <div className={styles.checkbox}>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                        e.stopPropagation();
                        onSelect(message.id);
                    }}
                    onClick={(e) => e.stopPropagation()}
                />
            </div>

            <div className={styles.avatar}>
                <Image
                    src={message.sender.avatar}
                    alt={message.sender.name}
                    width={40}
                    height={40}
                    className={styles.avatarImage}
                />
            </div>

            <div className={styles.content}>
                <div className={styles.header}>
                    <span className={styles.senderName}>{message.sender.name}</span>
                </div>
                <h4 className={styles.subject}>{message.subject}</h4>
                <p className={styles.preview}>{message.messagePreview}</p>
                <div className={styles.footer}>
                    <span className={styles.date}>{message.date}</span>
                    <span className={styles.time}>{message.time}</span>
                </div>
            </div>
        </div>
    );
}
