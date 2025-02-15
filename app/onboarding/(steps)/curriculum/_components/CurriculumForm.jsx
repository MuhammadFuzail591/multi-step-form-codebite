'use client'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

function CurriculumForm() {
    const [sections, setSections] = useState([])

    function addSection() {
        setSections([
            ...sections,
            {
                id: uuidv4(),
                title: '',
                items: []
            }
        ])
    }

    function removeSection(id) {
        setSections(sections.filter(section => section.id !== id))
    }

    function handleTitleChange(id, newTitle) {
        setSections(sections.map(section =>
            section.id === id ? { ...section, title: newTitle } : section
        ))
    }

    function handleCurriculumTitleChange(sectionId, itemId, newTitle) {
        setSections(
            sections.map(section => (
                section.id === sectionId ?
                    {
                        ...section,
                        items: section.items.map(item => (
                            item.itemId === itemId ?
                                {
                                    ...item,
                                    itemTitle: newTitle
                                } : item
                        ))
                    } : section
            ))
        )
    }

    function handleCurriculumTypeChange(sectionId, itemId, newType) {
        setSections(
            sections.map(section => (
                section.id === sectionId ?
                    {
                        ...section,
                        items: section.items.map(item => (
                            item.itemId === itemId ?
                                {
                                    ...item,
                                    itemType: newType
                                } : item
                        ))
                    } : section
            ))
        )
    }

    function addCurriculumItem(sectionId) {
        setSections(sections.map((section) =>
            section.id === sectionId ? {
                ...section,
                items: [
                    ...section.items,
                    {
                        itemId: uuidv4(),
                        itemType: 'lecture',
                        itemTitle: ''
                    }
                ]
            }
            : section
        ))
    }

    function removeCurriculumItem(sectionId, itemId) {
        setSections(
            sections.map((section) => (
                section.id === sectionId ?
                    {
                        ...section,
                        items: section.items.filter((item) => item.itemId !== itemId)
                    }
                    : section
            ))
        )
    }

    return (
        <div>
            <Button onClick={addSection}>Add section</Button>
            {sections.map((section) => (
                <div key={section.id}>
                    <input
                        type='text'
                        placeholder='Section title'
                        value={section.title}
                        onChange={e => handleTitleChange(section.id, e.target.value)}
                    />
                    <Button onClick={() => addCurriculumItem(section.id)}>Add Curriculum item</Button>
                    {
                        section.items.map((item) => (
                            <div key={item.itemId}>
                                <select value={item.itemType} onChange={(e) => handleCurriculumTypeChange(section.id, item.itemId, e.target.value)}>
                                    <option value={"lecture"}>Lecture</option>
                                    <option value={"quiz"}>Quiz</option>
                                    <option value={"assignment"}>Assignment</option>
                                </select>

                                <input type='text' placeholder='Item Title' value={item.itemTitle} onChange={(e) => handleCurriculumTitleChange(section.id, item.itemId, e.target.value)} />

                                <Button onClick={() => removeCurriculumItem(section.id, item.itemId)}>Remove Item</Button>
                            </div>
                        ))
                    }
                    <Button onClick={() => removeSection(section.id)}>Remove section</Button>
                </div>
            ))}
        </div>
    )
}

export default CurriculumForm
