export const NoteCard = ({ note }) => {
    return (
        <div className="border p-4 shadow bg-white rounded">
            <h2 className="font-bold text-lg">{note.title}</h2>
            <div className="text-sm mt-2" dangerouslySetInnerHTML={{ __html: note.content }} />
        </div>
    );
}