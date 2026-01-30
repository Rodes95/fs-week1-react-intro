const API_BASE_URL = "http://127.0.0.1:8000";

// HTTP call to Backend and returns JSON
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