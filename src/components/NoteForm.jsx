import { useState } from 'react'
import './NoteForm.css'

const COLORS = [
  '#ffffff',
  '#fff9c4',
  '#c8e6c9',
  '#bbdefb',
  '#d1c4e9',
  '#ffccbc',
]

function NoteForm({ onSubmit, editingNote, onCancel }) {
  const [formData, setFormData] = useState({
    title: editingNote?.title || '',
    content: editingNote?.content || '',
    color: editingNote?.color || '#ffffff',
  })

  const { title, content, color } = formData

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    onSubmit({ title, content, color })

    if (!editingNote) {
      setFormData({ title: '', content: '', color: '#ffffff' })
    }
  }

  return (
    <form
      className='note-form'
      onSubmit={handleSubmit}
      style={{ backgroundColor: color }}
    >
      <input
        type='text'
        placeholder='Title'
        value={title}
        onChange={(e) => updateField('title', e.target.value)}
        className='note-input'
      />
      <textarea
        placeholder='Write your note...'
        value={content}
        onChange={(e) => updateField('content', e.target.value)}
        className='note-textarea'
        rows='4'
      />
      <div className='color-picker'>
        {COLORS.map((colorOption) => (
          <button
            key={colorOption}
            type='button'
            className={`color-btn ${color === colorOption ? 'selected' : ''}`}
            style={{ backgroundColor: colorOption }}
            onClick={() => updateField('color', colorOption)}
          />
        ))}
      </div>
      <div className='form-actions'>
        {editingNote && (
          <button type='button' onClick={onCancel} className='btn btn-cancel'>
            Cancel
          </button>
        )}
        <button type='submit' className='btn btn-submit'>
          {editingNote ? 'Update' : 'Add Note'}
        </button>
      </div>
    </form>
  )
}

export default NoteForm