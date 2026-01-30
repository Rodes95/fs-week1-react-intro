import { useEffect, useRef, useState } from "react";
import { fetchItems } from "./api/itemsApi";
import ItemsList from "./components/ItemsList";


export default function App() {
  // State: UI data and states
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const didFetchRef = useRef(false);

  async function handleLoadItems() {
    setStatus("loading");
    setError("");

    try {
        const data = await fetchItems(); // Calls backend
        setItems(data);
        setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err?.message ?? "Unknown error");
    }
  }

    // auto-load the first time the page is loaded.  
    useEffect(() => {
    if (didFetchRef.current) return; // Skips double execution on StrictMode
    didFetchRef.current = true;

    const run = async () => {
      setStatus("loading");
      setError("");

      try {
          const data = await fetchItems(); // Calls backend
          setItems(data);
          setStatus("success");
      } catch (err) {
        setStatus("error");
        setError(err?.message ?? "Unknown error");
      }
  };

    run();
  }, []);

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", fontFamily: "system-ui" }}>
      <h1>FastAPI Items</h1>

      <button onClick={handleLoadItems} disabled={status === "loading"}>
        {status === "loading" ? "Loading..." : "Load items"}
      </button>

      {status === "loading" && <p style={{ marginTop: 12 }}>Loading...</p>}

      {status === "error" && (
        <p style={{ color: "crimson" }}>
          Error: {error}
          {" "}
          (si el backend esta OK, puede ser CORS)
        </p>
      )}

      {status === "idle" && <p>Click "Load items" to fech data. </p>}
      {status === "loading" && <p>Fetching items...</p>}
      {status === "success" && <p>Items loaded: {items.length}</p>}
      {status === "error" && <p>Couldn't load items.</p>}

      <ItemsList items={items} />
      </div>
  );
}