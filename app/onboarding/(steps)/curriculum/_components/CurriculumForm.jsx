'use client'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { Plus } from 'lucide-react'

function CurriculumForm () {
  const [sections, setSections] = useState([])

  function addSection () {
    setSections(prev => [
      ...prev,
      {
        id: uuidv4(),
        title: '',
        items: [],
        isEditing: true,
        isAddingItem: false
      }
    ])
  }

  function removeSection (id) {
    setSections(sections.filter(section => section.id !== id))
  }

  function setSectionTitle (sectionId) {
    setSections(
      sections.map(section =>
        section.id === sectionId ? { ...section, isEditing: false } : section
      )
    )
  }

  function handleTitleChange (id, newTitle) {
    setSections(
      sections.map(section =>
        section.id === id ? { ...section, title: newTitle } : section
      )
    )
  }

  function handleCurriculumTitleChange (sectionId, itemId, newTitle) {
    setSections(
      sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map(item =>
                item.itemId === itemId
                  ? {
                      ...item,
                      itemTitle: newTitle
                    }
                  : item
              )
            }
          : section
      )
    )
  }

  function setCurriculumTitle (sectionId, itemId) {
    setSections(
      sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map(item =>
                item.itemId === itemId
                  ? {
                      ...item,
                      isEditingItem: false
                    }
                  : item
              )
            }
          : section
      )
    )
  }

  // function handleCurriculumTypeChange(sectionId, itemId, newType) {
  //     setSections(
  //         sections.map(section => (
  //             section.id === sectionId ?
  //                 {
  //                     ...section,
  //                     items: section.items.map(item => (
  //                         item.itemId === itemId ?
  //                             {
  //                                 ...item,
  //                                 itemType: newType
  //                             } : item
  //                     ))
  //                 } : section
  //         ))
  //     )
  // }

  function addCurriculumItem (sectionId, itemType) {
    setSections(
      sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: [
                ...section.items,
                {
                  itemId: uuidv4(),
                  itemType: itemType,
                  itemTitle: '',
                  isEditingItem: true
                }
              ]
            }
          : section
      )
    )
  }

  function removeCurriculumItem (sectionId, itemId) {
    setSections(
      sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.filter(item => item.itemId !== itemId)
            }
          : section
      )
    )
  }

  function toggleIsAdding (sectionId, value) {
    setSections(
      sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              isAddingItem: value
            }
          : section
      )
    )
  }

  return (
    <div>
      {sections.map(section => (
        <div key={section.id}>
          {section.isEditing ? (
            <div>
              <input
                type='text'
                placeholder='Section title'
                value={section.title}
                onChange={e => handleTitleChange(section.id, e.target.value)}
              />
              <Button onClick={() => setSectionTitle(section.id)}>
                Save title
              </Button>
              <Button onClick={() => removeSection(section.id)}>
                Remove section
              </Button>
            </div>
          ) : (
            <div>
              <h3>{section.title}</h3>
              {section.isAddingItem ? (
                <div>
                  <Button
                    variant='outline'
                    className='font-bold text-blue-900'
                    onClick={() => {addCurriculumItem(section.id, 'lecture'); toggleIsAdding(section.id, false)} }
                  >
                    <Plus /> Lecture
                  </Button>
                  <Button
                    variant='outline'
                    className='font-bold text-blue-900'
                    onClick={() => {addCurriculumItem(section.id, 'quiz'); toggleIsAdding(section.id, false)}}
                  >
                    <Plus /> Quiz
                  </Button>
                  <Button
                    variant='outline'
                    className='font-bold text-blue-900'
                    onClick={() => {addCurriculumItem(section.id, 'assignment'); toggleIsAdding(section.id, false)}}
                  >
                    <Plus /> Assignment
                  </Button>
                  <Button onClick={() => removeSection(section.id)}>
                    Remove section
                  </Button>
                </div>
              ) : (
                <div>
                {console.log(section)}
                  <Button onClick={() => toggleIsAdding(section.id, true)}>
                    <Plus />
                    Curriculum Item
                  </Button>
                </div>
              )}
            </div>
          )}

          {section.items.map(item => (
            <div key={item.itemId}>
              <div>{console.log(item)}</div>

              {item.isEditingItem ? (
                <div className='flex flex-col gap-4 p-2 border border-black '>
                  <div className='flex flex-col gap-1 lg:items-center lg:flex-row lg:gap-3'>
                    <label
                      htmlFor='itemTitle'
                      className=''
                    >{`New ${item.itemType}: `}</label>
                    <input
                      type='text'
                      placeholder='Enter a Title'
                      name='itemTitle'
                      className='w-full px-2 py-1 border rounded-lg lg:w-10/12'
                    />
                  </div>
                  <div className='flex justify-end gap-2'>
                    <Button
                      onClick={() =>
                        removeCurriculumItem(section.id, item.itemId)
                      }
                      variant='outline'
                    >
                      Cancel
                    </Button>
                    <Button
                      className='bg-blue-700'
                      onClick={() =>
                        setCurriculumTitle(section.id, item.itemId)
                      }
                    >{`Add ${item.itemType} `}</Button>
                  </div>
                </div>
              ) : (
                <div>
                  <h1>Success</h1>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
      <Button
        variant='outline'
        className='px-3 mt-4 font-bold text-blue-700 border-2 border-blue-700'
        onClick={addSection}
      >
        <Plus /> section
      </Button>
    </div>
  )
}

export default CurriculumForm
