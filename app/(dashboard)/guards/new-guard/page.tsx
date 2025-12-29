'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './new-guard.module.css';

export default function NewGuardPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Create new guard object
        const newGuard = {
            id: Date.now().toString(),
            name: `${formData.firstName} ${formData.lastName}`,
            guardId: `GRD${formData.firstName.substring(0, 2).toUpperCase()}${formData.lastName.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 10)}`,
            phone: formData.phoneNumber,
            email: formData.email,
            avatar: '/assets/images/profile.png',
            status: 'pending' as const,
            createdAt: new Date(),
        };

        // Get existing new guards or create empty array
        const existingGuards = localStorage.getItem('newGuards');
        const guardsArray = existingGuards ? JSON.parse(existingGuards) : [];

        // Add new guard to array
        guardsArray.push(newGuard);

        // Store updated array
        localStorage.setItem('newGuards', JSON.stringify(guardsArray));

        // Navigate back to guards page with pending tab
        router.push('/guards?tab=pending&new=true');
    };

    const handleBack = () => {
        router.push('/guards');
    };

    return (
        <div className={styles.container}>
            {/* Header with Back Button */}
            <div className={styles.header}>
                <button className={styles.backButton} onClick={handleBack}>
                    <Image
                        src="/assets/images/back.png"
                        alt="Back"
                        width={20}
                        height={20}
                    />
                </button>
                <h1 className={styles.title}>Add New Guard</h1>
            </div>

            {/* Form */}
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                    {/* First Name */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            First Name
                            <Image
                                src="/assets/images/required.png"
                                alt="Required"
                                width={8}
                                height={8}
                                className={styles.required}
                            />
                        </label>
                        <div className={styles.inputWrapper}>
                            <Image
                                src="/assets/images/profile.png"
                                alt="Profile"
                                width={24}
                                height={24}
                                className={styles.inputIcon}
                            />
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="Enter first name"
                                className={styles.input}
                                required
                            />
                        </div>
                    </div>

                    {/* Last Name */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            Last Name
                            <Image
                                src="/assets/images/required.png"
                                alt="Required"
                                width={8}
                                height={8}
                                className={styles.required}
                            />
                        </label>
                        <div className={styles.inputWrapper}>
                            <Image
                                src="/assets/images/profile.png"
                                alt="Profile"
                                width={24}
                                height={24}
                                className={styles.inputIcon}
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Enter last name"
                                className={styles.input}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.formRow}>
                    {/* Email */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            Email
                            <Image
                                src="/assets/images/required.png"
                                alt="Required"
                                width={8}
                                height={8}
                                className={styles.required}
                            />
                        </label>
                        <div className={styles.inputWrapper}>
                            <Image
                                src="/assets/images/mailicon.png"
                                alt="Email"
                                width={21}
                                height={21}
                                className={styles.inputIcon}
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter email address"
                                className={styles.input}
                                required
                            />
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            Phone Number
                            <Image
                                src="/assets/images/required.png"
                                alt="Required"
                                width={8}
                                height={8}
                                className={styles.required}
                            />
                        </label>
                        <div className={styles.inputWrapper}>
                            <Image
                                src="/assets/images/call.png"
                                alt="Phone"
                                width={21}
                                height={21}
                                className={styles.inputIcon}
                            />
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                placeholder="Enter phone number"
                                className={styles.input}
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Confirm Button */}
                <button type="submit" className={styles.confirmButton}>
                    <Image
                        src="/assets/images/tick.png"
                        alt="Confirm"
                        width={24}
                        height={24}
                    />
                    <span>Confirm</span>
                </button>
            </form>
        </div>
    );
}
