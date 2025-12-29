'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Colors } from '@/constants/Colors';
import styles from './assignment-created.module.css';

export default function AssignmentCreatedPage() {
    const router = useRouter();

    const handleGoToAssignments = () => {
        router.push('/assignments');
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
            <div className={styles.content}>
                <h1 className={styles.title}>Assignment Created</h1>
                <p className={styles.message}>
                    Your assignment has been successfully added. Guards will be notified immediately.
                </p>
                <button onClick={handleGoToAssignments} className={styles.button}>
                    <Image
                        src="/assets/images/next.png"
                        alt="Go"
                        width={20}
                        height={20}
                    />
                    <span>Go to Assignments</span>
                </button>
            </div>
        </div>
    );
}
