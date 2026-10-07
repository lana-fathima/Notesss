
import { useState } from "react";

function Notesapp() {
  const [search, setsearch] = useState("");
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [color, setcolor] = useState("");
  const [note, setnote] = useState([]);
  const [editid, seteditid] = useState(null);

  function handlesubmit() {
    if (content === "") {
      alert("content is required");
      return;
    }

    if (editid !== null) {
      setnote(
        note.map((first) =>
          first.id === editid
            ? {
                ...first,
                title: title,
                content: content,
                color: color,
              }
            : first
        )
      );

      seteditid(null);
    } else {
      const newnote = {
        id: Date.now(),
        title: title,
        content: content,
        color: color,
        createdat: new Date().toLocaleString(),
        archive: false,
      };

      setnote([...note, newnote]);
    }

    settitle("");
    setcontent("");
    setcolor("");
  }

  function handleedit(first) {
    settitle(first.title);
    setcontent(first.content);
    setcolor(first.color);
    seteditid(first.id);
  }

  function handledelete(id) {
    setnote(
      note.filter((first) => first.id !== id)
    );
  }

  function handlearchive(id) {
    setnote(
      note.map((first) =>
        first.id === id
          ? {
              ...first,
              archive: !first.archive,
            }
          : first
      )
    );
  }

  const searchnotes = note.filter(
    (first) =>
      first.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      first.content
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5">

      <h1 className="text-3xl text-center">
        My Notes
      </h1>

      <input
        type="text"
        placeholder="search notes"
        value={search}
        onChange={(e) => setsearch(e.target.value)}
      />

      <input
        type="text"
        placeholder="title..."
        value={title}
        onChange={(e) => settitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="write your note"
        value={content}
        onChange={(e) => setcontent(e.target.value)}
      />

      <select
        value={color}
        onChange={(e) => setcolor(e.target.value)}
      >
        <option value="">select color</option>
        <option value="red">red</option>
        <option value="blue">blue</option>
        <option value="violet">violet</option>
      </select>

      <button
        className="bg-violet-100"
        onClick={handlesubmit}
      >
        {editid !== null ? "Update Note" : "Add Note"}
      </button>

      {searchnotes.map((first) => (
        <div
          key={first.id}
          style={{
            backgroundColor: first.color,
            padding: "15px",
          }}
        >

          <h1 style={{ fontSize: "30px" }}>
            {first.title}
          </h1>

          <p>{first.content}</p>

          <p>{first.createdat}</p>

          <button
            style={{ backgroundColor: "grey" }}
            onClick={() => handlearchive(first.id)}
          >
            {first.archive
              ? "unarchive"
              : "archive"}
          </button>

          <button
            style={{ backgroundColor: "lightblue" }}
            onClick={() => handleedit(first)}
          >
            edit
          </button>

          <button
            style={{ backgroundColor: "orange" }}
            onClick={() => handledelete(first.id)}
          >
            delete
          </button>

        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <div>
      <Notesapp />
    </div>
  );
}

export default App;