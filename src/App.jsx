import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import PopUp from "./Pop-Up/popUp";

function App() {
  // localStorage.setItem("myKey", myValue);
  const locatStorageNotes = localStorage.getItem("sneh_notes");
  console.log("kkkkkkkkkk");

  const [notes, setNotes] = useState(
    locatStorageNotes ? JSON.parse(locatStorageNotes) : []
  );
  const [noteText, setNoteText] = useState("");
  const [updateNoteText, setUpdateNoteText] = useState("");
  const [update, setUpdate] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [TimeTrigger, setTimeTrigger] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTimeTrigger(true);
    }, 5000);
  }, []);

  const addnotes = () => {
    if (!noteText) {
      alert("Please  enter a note");
      return;
    }
    const note = {
      id: uuid(),
      noteText: noteText,
    };

    setNotes((prevNotes) => {
      const newNotes = [...prevNotes, note];
      localStorage.setItem("sneh_notes", JSON.stringify(newNotes));
      return newNotes;
    });
    setNoteText("");
  };

  const deleteNotes = (id) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.filter((item) => item.id !== id);
      localStorage.setItem("sneh_notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };

  const updateNotes = (id) => {
    let newNotes = [];

    notes.map((note) => {
      if (note.id === update) {
        newNotes.push({ id: note.id, noteText: updateNoteText });
      } else {
        newNotes.push(note);
      }
    });

    setNotes(newNotes);
    setUpdate("");
    setUpdateNoteText("");
    localStorage.setItem("sneh_notes", JSON.stringify(newNotes));
  };

  return (
    <div className="container">
      <textarea
        className="text"
        rows="7"
        placeholder="Enter the text"
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      ></textarea>

      <button onClick={addnotes} className="add-btn">
        Submit
      </button>

      <PopUp trigger={TimeTrigger} setTrigger={setTimeTrigger}>
        <div className="Time_input_div">
          <h1>Thank you for coming to Notes.</h1>
          <h2> My name is Sneh Koshiya.</h2>
          <div className="timePopUp_social">
            <a
              href="https://www.linkedin.com/in/sneh-koshiya-800519249/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/sneh_koshiya/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </PopUp>

      <div className="notesContainer">
        {notes.map((note) => (
          <div key={note.id} className="note">
            <p className="newText">{note.noteText}</p>
            <button
              onClick={() => deleteNotes(note.id)}
              className="note-inner-btn"
            >
              Delete
            </button>
            <button
              onClick={() => {
                setUpdateNoteText(note.noteText);
                setUpdate(note.id);
              }}
              className="note-inner-btn"
            >
              Update
            </button>

            {note.id === update && (
              <div>
                <input
                  type="text"
                  placeholder="Enter the text"
                  value={updateNoteText}
                  onChange={(e) => setUpdateNoteText(e.target.value)}
                  className="update-text"
                />
                <button
                  onClick={() => updateNotes(note.id)}
                  className="note-inner-btn"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
