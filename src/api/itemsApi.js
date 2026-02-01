const API_BASE_URL = "http://127.0.0.1:8000";

// HTTP call to Backend and returns JSON
// GET /items
export async function fetchItems() {

    // Intencional Delay for testing
    await new Promise((r) => setTimeout(r, 800))

    const res = await fetch(`${API_BASE_URL}/items`);

    // if backend returns 404/500/etc, show an error
    if(!res.ok){
        throw new Error(`HTTP ${res.status}`);
    }

    // Convert the answer to JSON (an items array)
    return res.json();
}

// POST /items
export async function createItem({ title, description }) {
    let res;

    try{
        res = await fetch(`${API_BASE_URL}/items`, { // Endpoint where the method lives in the Backend
        method: "POST", // Declare the method. Default is GET
        headers: { "Content-Type": "application/json" }, // Describes the format that is being sent
        body: JSON.stringify({ // Transforms the JSON into a STRING
            title,
            description: description || null,
        }),
    });
    } catch (err) {
        console.error("Network error creating item:", err);
        throw new Error("Can't establish a connection with the Backend.");
    }


    if (!res.ok) {
        // Reads the res as TEXT and if it fails, returns "" + Error code.
        const text = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} ${text}`.trim());
    }

    return res.json(); // Item Created

}