import React, { useState } from 'react';

const serviceTypes = [
    'Graphic Design',
    'Web Development',
    'Digital Marketing',
    'Photography',
    'Copywriting',
    'Social Media Management',
    'Video Production',
    'SEO Consulting',
    'Business Coaching',
    'Life Coaching',
    'Fitness Training',
    'Massage Therapy',
    'Personal Chef',
    'Interior Design',
    'Music Lessons',
    'Language Tutoring',
    'Virtual Assistant',
    'Resume Writing',
    'Tax Preparation',
    'Travel Planning',
    'Handmade Crafts'
];

const ServiceTypeList = ({ onSelect }) => {
    const [selected, setSelected] = useState('');

    const handleChange = (e) => {
        setSelected(e.target.value);
        if (onSelect) onSelect(e.target.value);
    };

    return (
        <select
            value={selected}
            onChange={handleChange}
            style={{ border: '1px solid #ccc', maxWidth: 300, padding: 8 }}
            aria-label="Service Types"
        >
            <option value="" disabled>Choisissez un type de service</option>
            {serviceTypes.map((type) => (
                <option key={type} value={type}>
                    {type}
                </option>
            ))}
        </select>
    );
};

export default ServiceTypeList;