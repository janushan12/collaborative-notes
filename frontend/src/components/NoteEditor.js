import { useState } from "react"
import API from "../services/api";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export const NoteEditor = ({ refresh }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const saveNote = async () => {
        try {
        await API.post("/notes", { title, content });
        setTitle("");
        setContent("");
        refresh();
        } catch (err) {
            console.error("Error saving note:", err);
        }
    };
    return (
        <div className="bg-white p-4 shadow">
            <input className="border p-2 w-full mb-3" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <ReactQuill theme="snow" value={content} onChange={setContent} />
            <button className="bg-blue-500 text-white px-4 py-2 mt-3" onClick={saveNote}>
                Save
            </button>
        </div>
    );
}