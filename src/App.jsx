import { useState } from 'react'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'
import './App.css'
import { useEffect } from 'react'
const API_URL = `${import.meta.env.VITE_API_URL}/notes`


function App() {
  const [notes, setNotes] = useState([])
  const [editingNote, setEditingNote] = useState(null)
  const[loading,setLoading]=useState(true)
  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
      try {
        const response = await fetch(API_URL)
        const data = await response.json()
        setNotes(data)
      } catch (error) {
        console.error("Error fetching notes:", error)
      }
      finally{
        setLoading(false)
      }
  }

  const addNote = async (note) =>{
    try{
      const response=await fetch(API_URL,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(note)
      })
      const data=await response.json();
      setNotes([data,...notes])
    }
    catch(error){
      console.error("Error adding note:",error);
    }
  }

  const updateNote = async(id, updatedNote) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedNote)
    })
    const data = await response.json()    
    setNotes(notes.map(note =>
      note.id === id ? { ...note, ...updatedNote } : note
    ))
    setEditingNote(null)
  }

  const deleteNote = async(id) => {
    try{
      await fetch(`${API_URL}/${id}`,{method:"DELETE" })   
      setNotes(notes.filter(note => note.id !== id))
    } catch(error){
      console.error("Error deleting note:",error);
    } 
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