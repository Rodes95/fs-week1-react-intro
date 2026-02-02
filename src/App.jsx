import { useEffect, useRef, useState } from "react";
import { fetchItems, createItem } from "./api/itemsApi";
import ItemsList from "./components/ItemsList";


export default function App() {
  // List State
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [listError, setListError] = useState("");
  const [createError, setCreateError] = useState("");

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const didFetchRef = useRef(false);

  async function handleLoadItems() {
    setStatus("loading");
    setListError("");

    try {
        const data = await fetchItems(); // Calls backend
        setItems(data);
        setStatus("success");
    } catch (err) {
      setStatus("error");
      setListError(err?.message ?? "Unknown error");
    }
  }

  async function handleCreateItem(e) {
    e.preventDefault(); // Handles a custom submit with js (Better)
    setCreateError("");

    const cleanTitle = title.trim();
    const cleanDesc = description.trim();

    if(!cleanTitle) {
      setCreateError("Title is mandatory.");
      return;
    }

    setIsCreating(true);
    try {
      await createItem({ title: cleanTitle, description: cleanDesc });

      // Clean Inputs
      setTitle("");
      setDescription("");

      // Refresh list after POST
      await handleLoadItems();
    } catch (err) {
      setListError(err?.message ?? "Error trying to create the item.");
    } finally {
      setIsCreating(false);
    }
  }

    // auto-load the first time the page is loaded.  
    useEffect(() => {
    if (didFetchRef.current) return; // Skips double execution on StrictMode
    didFetchRef.current = true;
    handleLoadItems();
  }, []);

  const isLoading = status === "loading";

  // Prevents multiple submits, etc
  // Any is true, value = true. if both false, its then false.
  const disableActions = isLoading || isCreating;

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", fontFamily: "system-ui" }}>
      <h1>FastAPI Items</h1>

      {/* CREATE */}
      <form onSubmit={handleCreateItem} style={{ display: "grid", gap: 10, marginBottom: 16 }}>
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (createError) setCreateError(""); // Removes error when typing
          }}
          placeholder="Title"
          disabled={disableActions}
          style={{
            border: createError ? "1px solid crimson" : "1px solid #555",
            outline: "none",
          }}
          />
          <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          disabled={disableActions}
          />
          <button type="submit" disabled={disableActions}>
            {isCreating ? "Creating..." : "Create Item"}
          </button>
          
          {createError && <p style={{ color: "crimson", margin: 0 }}>{createError}</p>}
      </form>

      {/* LIST */}
      <button onClick={handleLoadItems} disabled={disableActions}>
        {status === "loading" ? "Loading..." : "Load items"}
      </button>

      {/* STATUS */}
      {status === "idle" && <p>Click "Load items" to fech data. </p>}
      {status === "loading" && <p>Fetching items...</p>}
      {status === "success" && <p>Items loaded: {items.length}</p>}
      {status === "error" && <p>Couldn't load items.</p>}

      {/* Extra Hint */}
      {status === "error" && (
        <p style={{ color: "crimson" }}>
          Error: {listError}
          {" "}
          (si el backend esta OK, puede ser CORS)
        </p>
      )}

        <ItemsList items={items} />
      </div>
  );
}