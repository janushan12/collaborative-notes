import { useEffect, useState } from "react";
import API from "../services/api";
import { NoteEditor } from "../components/NoteEditor";
import { NoteCard } from "../components/NoteCard";

export const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const fetchNotes = async () => {
        const res = await API.get("/notes");
        setNotes(res.data);
    };
    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl mb-4">My Notes</h1>
            <NoteEditor refresh={fetchNotes} />
            <div className="grid grid-cols-3 gap-4 mt-6">
                {notes.map(note => (
                    <NoteCard key={note._id} note={note} />
                ))}
            </div>
        </div>
    )
}