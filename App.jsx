import React, { useState , useEffect } from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import { addDoc, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore"
import { db, notesCollection } from "./firebase"

export default function App() {
    const [notes, setNotes] = useState([])
    const [currentNoteId, setCurrentNoteId] = useState("")
    const [tempNoteText, setTempNoteText] = useState("")

    const currentNote = 
        notes.find(note => note.id === currentNoteId) 
        || notes[0]

    const sortedNotes = notes.sort((a, b) =>  
        b.updatedAt - a.updatedAt
    )

    /**
     * Challenge:
     * 1. Set up a new state variable called `tempNoteText`. Initialize 
     *    it as an empty string
     * 2. Change the Editor so that it uses `tempNoteText` and 
     *    `setTempNoteText` for displaying and changing the text instead
     *    of dealing directly with the `currentNote` data.
     * 3. Create a useEffect that, if there's a `currentNote`, sets
     *    the `tempNoteText` to `currentNote.body`. (This copies the
     *    current note's text into the `tempNoteText` field so whenever 
     *    the user changes the currentNote, the editor can display the 
     *    correct text.
     * 4. TBA
     */

    useEffect(() => {
        const unSubscribe = onSnapshot(notesCollection, (snapshot) => {
            const notesArr = snapshot.docs.map( doc => ({
                ...doc.data(),
                id : doc.id 
            }))
            setNotes(notesArr)
        })
        return unSubscribe
    }, [])


    useEffect (() => {
        if(!currentNoteId){
            setCurrentNoteId(notes[0]?.id)
        }
    }, [notes])

    useEffect(() => {
        if(currentNote){
            setTempNoteText(currentNote.body)
        }
    },[currentNote])

    useEffect(()=> {
        const timeOutId = setTimeout(() => {
            if(tempNoteText !== currentNote.body){
                updateNote(tempNoteText)
            }
        }, 500);
        return () => clearTimeout(timeOutId)
    },[tempNoteText])

    async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        const newNoteRef = await addDoc(notesCollection, newNote)
        setCurrentNoteId(newNoteRef.id)
    }

    async function updateNote(text) { 
        const docRef = doc(db,"Notes", currentNoteId)
        await setDoc(docRef, {body : text, updatedAt: Date.now()}, {merge : true})
    }

    async function deleteNote(noteId) {
        const docRef = doc(db,"Notes", noteId)
        await deleteDoc(docRef)
    }

    return (
        <main>
            {
                notes.length > 0
                    ?
                    <Split
                        sizes={[30, 70]}
                        direction="horizontal"
                        className="split"
                    >
                        <Sidebar
                            notes={sortedNotes}
                            currentNote={currentNote}
                            setCurrentNoteId={setCurrentNoteId}
                            newNote={createNewNote}
                            deleteNote={deleteNote}
                        />
                    
                        <Editor
                            tempNoteText={tempNoteText}
                            setTempNoteText={setTempNoteText}
                        />
                        
                    </Split>
                    :
                    <div className="no-notes">
                        <h1>You have no notes</h1>
                        <button
                            className="first-note"
                            onClick={createNewNote}
                        >
                            Create one now
                </button>
                    </div>

            }
        </main>
    )
}
