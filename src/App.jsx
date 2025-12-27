import { useState } from 'react'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])
  const [editingNote, setEditingNote] = useState(null)

  const addNote = (note) => {
    const newNote = {
      id: Date.now(),
      ...note,
      createdAt: new Date().toISOString()
    }
    setNotes([newNote, ...notes])
  }

  const updateNote = (id, updatedNote) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, ...updatedNote } : note
    ))
    setEditingNote(null)
  }

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Notes App</h1>
      </header>
      <main className="main">
        <NoteForm
          key={editingNote?.id || 'new'}
          onSubmit={editingNote ? (note) => updateNote(editingNote.id, note) : addNote}
          editingNote={editingNote}
          onCancel={() => setEditingNote(null)}
        />
        <NoteList
          notes={notes}
          onEdit={setEditingNote}
          onDelete={deleteNote}
        />
      </main>
      <footer className="footer">
        <p>Notes App - No Backend Required</p>
      </footer>
    </div>
  )
}

export default App