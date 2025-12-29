import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './AssignmentListItem.module.css';

interface Guard {
    id: string;
    name: string;
    avatar: string;
}

interface AssignmentListItemProps {
    id: string;
    title: string;
    location: string;
    date: string;
    startTime: string;
    endTime: string;
    guards: Guard[];
    borderColor?: string;
    totalGuards?: number; // Total guards assigned (for completed assignments)
}

export default function AssignmentListItem({
    id,
    title,
    location,
    date,
    startTime,
    endTime,
    guards,
    borderColor = '#F5B759',
    totalGuards
}: AssignmentListItemProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/assignments/${id}`);
    };

    // Determine the guards count text
    const guardsCountText = totalGuards
        ? `${guards.length}/${totalGuards} guards assigned`
        : `${guards.length} guard${guards.length !== 1 ? 's' : ''} assigned`;

    return (
        <div
            className={styles.assignmentItem}
            style={{ borderLeftColor: borderColor }}
            onClick={handleClick}
        >
            {/* Left Section - Title and Location */}
            <div className={styles.leftSection}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.locationRow}>
                    <Image
                        src="/assets/images/location.png"
                        alt="Location"
                        width={16}
                        height={16}
                    />
                    <span className={styles.location}>{location}</span>
                </div>
            </div>

            {/* Middle Section - Date and Time */}
            <div className={styles.middleSection}>
                <div className={styles.dateRow}>
                    <Image
                        src="/assets/images/calendar.png"
                        alt="Date"
                        width={16}
                        height={16}
                    />
                    <span className={styles.date}>{date}</span>
                </div>
                <div className={styles.timeRow}>
                    <Image
                        src="/assets/images/history.png"
                        alt="Time"
                        width={16}
                        height={16}
                    />
                    <span className={styles.time}>{startTime} – {endTime}</span>
                </div>
            </div>

            {/* Right Section - Guards */}
            <div className={styles.rightSection}>
                <div className={styles.guardsAvatars}>
                    {guards.slice(0, 4).map((guard, index) => (
                        <div
                            key={guard.id}
                            className={styles.avatarWrapper}
                            style={{ zIndex: 4 - index }}
                        >
                            <Image
                                src={guard.avatar}
                                alt={guard.name}
                                width={30}
                                height={30}
                                className={styles.avatar}
                            />
                        </div>
                    ))}
                </div>
                <span className={styles.guardsCount}>
                    {guardsCountText}
                </span>
            </div>
        </div>
    );
}
