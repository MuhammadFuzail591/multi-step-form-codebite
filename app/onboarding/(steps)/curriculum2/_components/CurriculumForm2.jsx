'use client'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '@/components/ui/button'
import React, { useState, useCallback } from 'react'
import { Plus, X } from 'lucide-react'

export default function CurriculumForm() {
  const [sections, setSections] = useState([])
  const [newSection, setNewSection] = useState({ title: '', objective: '' })


  console.log(sections)
  // Add new section
  const createSection = () => {
    if (!newSection.title) return
    setSections(prev => [
      ...prev,
      {
        id: uuidv4(),
        ...newSection,
        items: [],
        isCreated:true
      }
    ])
    setNewSection({ title: '', objective: '' })
  }

  // Add curriculum item to section
  const addCurriculumItem = (sectionId, type) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId ? {
        ...section,
        items: [...section.items, createItem(type)]
      } : section
    ))
  }

  // Create item template based on type
  const createItem = (type) => ({
    id: uuidv4(),
    type,
    data: getDefaultData(type)
  })

  // Get default data for each item type
  const getDefaultData = (type) => {
    const defaults = {
      lecture: { title: '', videoUrl: '', description: '' },
      quiz: { question: '', answers: [], correctAnswer: '' },
      coding: { problem: '', solution: '', language: 'javascript' },
      practice: { questions: [] },
      assignment: { title: '', instructions: '', dueDate: '' }
    }
    return defaults[type]
  }

  
  return (
    <div className="max-w-3xl p-6 mx-auto space-y-8">
      {/* Add Section Section */}
      <div className="p-6 border rounded-lg bg-card">
        <h2 className="mb-4 text-xl font-bold">Course Curriculum</h2>
        
        {<div className="space-y-4">
          <input
            type="text"
            placeholder="Section Title"
            value={newSection.title}
            onChange={e => setNewSection(prev => ({ ...prev, title: e.target.value }))}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Learning Objective"
            value={newSection.objective}
            onChange={e => setNewSection(prev => ({ ...prev, objective: e.target.value }))}
            className="w-full h-24 p-2 border rounded"
          />
          <Button onClick={createSection} className="gap-1">
            <Plus className="w-4 h-4" /> Create Section
          </Button>
        </div>}
      </div>

      {/* Existing Sections */}
      {sections.map(section => (
        <Section
          key={section.id}
          section={section}
          addCurriculumItem={addCurriculumItem}
          setSections={setSections}
        />
      ))}
    </div>
  )
}

function Section({ section, addCurriculumItem, setSections }) {

  
  return (
    <div className="p-6 border rounded-lg bg-card">
      {/* Section Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">{section.title}</h3>
        <p className="text-sm text-muted-foreground">{section.objective}</p>
      </div>

      {/* Curriculum Items */}
      <div className="space-y-4">
        {section.items.map(item => (
          <CurriculumItem
            key={item.id}
            item={item}
            setSections={setSections}
            sectionId={section.id}
          />
        ))}
        {/* Add Curriculum Item Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            onClick={() => addCurriculumItem(section.id, 'lecture')}
          >
            + Lecture
          </Button>
          <Button 
            variant="outline" 
            onClick={() => addCurriculumItem(section.id, 'quiz')}
          >
            + Quiz
          </Button>
          <Button 
            variant="outline" 
            onClick={() => addCurriculumItem(section.id, 'coding')}
          >
            + Coding Exercise
          </Button>
          <Button 
            variant="outline" 
            onClick={() => addCurriculumItem(section.id, 'practice')}
          >
            + Practice Problem
          </Button>
          <Button 
            variant="outline" 
            onClick={() => addCurriculumItem(section.id, 'assignment')}
          >
            + Assignment
          </Button>
        </div>
      </div>
    </div>
  )
}

function CurriculumItem({ item, sectionId, setSections }) {
  const updateItem = (newData) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId ? {
        ...section,
        items: section.items.map(i => 
          i.id === item.id ? { ...i, data: { ...i.data, ...newData } } : i
        )
      } : section
    ))
  }

  return (
    <div className="p-4 border rounded bg-background">
      {/* Common Controls */}
      <div className="flex justify-between mb-4">
        <span className="text-sm font-medium capitalize">{item.type}</span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setSections(prev => prev.map(section => 
            section.id === sectionId ? {
              ...section,
              items: section.items.filter(i => i.id !== item.id)
            } : section
          ))}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Type-Specific Fields */}
      {item.type === 'lecture' && (
        <LectureFields data={item.data} onChange={updateItem} />
      )}
      
      {item.type === 'quiz' && (
        <QuizFields data={item.data} onChange={updateItem} />
      )}

      {item.type === 'coding' && (
        <CodingFields data={item.data} onChange={updateItem} />
      )}

      {item.type === 'practice' && (
        <PracticeFields data={item.data} onChange={updateItem} />
      )}

      {item.type === 'assignment' && (
        <AssignmentFields data={item.data} onChange={updateItem} />
      )}
    </div>
  )
}

// Type-specific field components
function LectureFields({ data, onChange }) {
  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="Lecture Title"
        value={data.title}
        onChange={e => onChange({ title: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="url"
        placeholder="Video URL"
        value={data.videoUrl}
        onChange={e => onChange({ videoUrl: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Description"
        value={data.description}
        onChange={e => onChange({ description: e.target.value })}
        className="w-full h-24 p-2 border rounded"
      />
    </div>
  )
}



// Add similar components for QuizFields, CodingFields, PracticeFields, AssignmentFields
// (Implement according to your specific requirements)