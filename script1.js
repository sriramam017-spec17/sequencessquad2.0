// Resource data
let resources = [
  { id: 1, name: "Room A", type: "Room", capacity: 20, available: true },
  { id: 2, name: "Lab 1", type: "Lab", capacity: 15, available: true },
  { id: 3, name: "Projector X", type: "Equipment", capacity: 1, available: true },
  { id: 4, name: "Room B", type: "Room", capacity: 25, available: true },
  { id: 5, name: "Lab 2", type: "Lab", capacity: 10, available: true }
];

let waitingList = [];

const resourcesDiv = document.getElementById("resources");
const select = document.getElementById("resourceSelect");
const message = document.getElementById("message");

function renderResources() {
  resourcesDiv.innerHTML = "";
  resources.forEach(res => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${res.name}</h3>
      <p>Type: ${res.type}</p>
      <p>Capacity: ${res.capacity}</p>
      <p>Status: ${res.available ? "Available ✅" : "Booked ❌"}</p>
    `;
    resourcesDiv.appendChild(card);
  });
}

function populateSelect() {
  select.innerHTML = `<option value="">Select a resource</option>`;
  resources.forEach(res => {
    const option = document.createElement("option");
    option.value = res.id;
    option.textContent = `${res.name} (${res.available ? "Available" : "Booked"})`;
    select.appendChild(option);
  });
}

document.getElementById("bookBtn").addEventListener("click", () => {
  const selectedId = parseInt(select.value);
  const name = document.getElementById("userName").value.trim();

  if (!selectedId || !name) {
    message.textContent = "Please select a resource and enter your name!";
    return;
  }

  const resource = resources.find(r => r.id === selectedId);
  if (resource.available) {
    resource.available = false;

    // Save the user name for the success page
    localStorage.setItem('userName', name);

    // Redirect to success page
    window.location.href = "success.html";
  } else {
    waitingList.push({ resourceId: resource.id, name });
    message.textContent = `"${resource.name}" is already booked! Added ${name} to waiting list.`;
  }

  renderResources();
  populateSelect();
});

renderResources();
populateSelect();
