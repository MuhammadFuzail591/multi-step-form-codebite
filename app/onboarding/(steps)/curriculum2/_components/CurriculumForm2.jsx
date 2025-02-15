'use client'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Plus, X } from 'lucide-react'
import React, { useState, useCallback } from 'react'

function CurriculumForm() {
  const [sections, setSections] = useState([])
  const [newSectionTitle, setNewSectionTitle] = useState('')

  // 1. Create new section via dialog
  const handleAddSection = () => {
    if (!newSectionTitle) return
    setSections(prev => [
      { id: uuidv4(), title: newSectionTitle, items: [] },
      ...prev // Add to top
    ])
    setNewSectionTitle('')
  }

  return (
    <div className="space-y-6">
      {/* Sections List */}
      {sections.map((section) => (
        <Section
          key={section.id}
          section={section}
          onRemove={() => setSections(prev => prev.filter(s => s.id !== section.id))}
        />
      ))}

      {/* Add Section Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full gap-2">
            <Plus className="w-4 h-4" /> Add Section
          </Button>
        </DialogTrigger>
        
        <DialogContent>
          <div className="space-y-4">
            <Input
              placeholder="Section Title"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
            />
            <Button onClick={handleAddSection}>Create Section</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ========== SECTION COMPONENT ==========
const Section = ({ section, onRemove }) => {
  const [items, setItems] = useState([])

  // 2. Add curriculum item (will be enhanced in Phase 2)
  const addCurriculumItem = useCallback(() => {
    setItems(prev => [
      ...prev,
      { id: uuidv4(), type: 'lecture', title: '' }
    ])
  }, [])

  return (
    <div className="p-4 border rounded-lg bg-card">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">{section.title}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="text-destructive hover:bg-destructive/10"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Curriculum Items */}
      <div className="space-y-3">
        {items.map((item) => (
          <CurriculumItem key={item.id} item={item} />
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={addCurriculumItem}
          className="w-full gap-1"
        >
          <Plus className="w-4 h-4" /> Add Curriculum Item
        </Button>
      </div>
    </div>
  )
}

// ========== BASIC ITEM COMPONENT (PHASE 2 WILL EXPAND THIS) ==========
const CurriculumItem = ({ item }) => {
  return (
    <div className="p-3 border rounded-md bg-background">
      <div className="flex gap-2 mb-2">
        <select className="px-2 py-1 text-sm border rounded-md">
          <option>Lecture</option>
          <option>Quiz</option>
          <option>Assignment</option>
        </select>
        <Button variant="ghost" size="sm" className="ml-auto text-destructive">
          <X className="w-4 h-4" />
        </Button>
      </div>
      <Input placeholder="Item Title" />
    </div>
  )
}

export default CurriculumForm