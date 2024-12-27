import React, { useContext, useState } from 'react'
import MainContext from '../MainContext'
import Moveable, { Draggable } from 'react-moveable'

function Note(note) {

    const [visible, setVisible] = useState(false)
    const [clickable, setClickable] = useState(true)
    const { setMode, notes, setNotes } = useContext(MainContext)

    const showNote = () => {
        if (clickable) {
            setVisible(!visible)
        }
    }

    const setNotePosition = (e, data) => {
        const newNotes = notes.map(n => {
            if (n.number === note.number) {
                n.position = {
                    x: data.x,
                    y: data.y
                }
            }
            return n
        })
        setNotes(newNotes)
    }

    return (
        <Moveable onDrag={() => setClickable(false)} onStart={() => setClickable(true)} onStop={setNotePosition}
            defaultPosition={{ x: note.position.x, y: note.position.y }} position={{ x: note.position.x, y: note.position.y }}>
            <div onMouseEnter={() => setMode(false)} onMouseLeave={() => setMode(true)} className="note-container"
                style={{ '--color': note.color }}>
                <span onClick={showNote} className="note-box-number">{note.number}</span>
                <div className="note" style={{ display: visible ? 'flex' : 'none' }}>
                    {note.note}
                </div>
            </div>
        </Moveable>
    )
}

export default Note
