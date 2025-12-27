import { Pencil, Trash2 } from 'lucide-react'
import './NoteCard.css'

function NoteCard({ note, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <section
      className='note-card'
      style={{ backgroundColor: note.color || '#ffffff' }}
    >
      <h3 className='note-title'>{note.title}</h3>
      <p className='note-content'>{note.content}</p>
      <div className='note-footer'>
        <span className='note-date'>{formatDate(note.createdAt)}</span>
        <div className='note-actions'>
          <button
            onClick={() => onEdit(note)}
            className='action-btn edit-btn'
            title='Edit'
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className='action-btn delete-btn'
            title='Delete'
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default NoteCard