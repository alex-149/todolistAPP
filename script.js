const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

function addTask() {
    const task = inputBox.value.trim();
    if (!task) {
        alert("Please write down a task");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
        <label>
            <input type="checkbox">
            <span>${task}</span>
        </label>
        <span class="edit-btn">Edit</span>
        <span class="delete-btn">Delete</span>
    `;

    listContainer.appendChild(li);
    inputBox.value = "";
    updateCounters();
}

function updateCounters() {
    const completedTasks = document.querySelectorAll(".completed").length;
    const uncompletedTasks =
        document.querySelectorAll("li:not(.completed)").length;

    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
}

document.getElementById("input-button").addEventListener("click", addTask);

listContainer.addEventListener("click", function (event) {
    const target = event.target;

    if (target.matches("input[type='checkbox']")) {
        const li = target.closest("li");
        li.classList.toggle("completed", target.checked);
        updateCounters();
    } else if (target.matches(".edit-btn")) {
        const taskSpan = target.previousElementSibling;
        const update = prompt("Edit task:", taskSpan.textContent);
        if (update !== null) {
            taskSpan.textContent = update;
            const li = target.closest("li");
            li.classList.remove("completed");
            const checkbox = li.querySelector("input[type='checkbox']");
            checkbox.checked = false;
            updateCounters();
        }
    } else if (target.matches(".delete-btn")) {
        if (confirm("Are you sure you want to delete this task?")) {
            const li = target.closest("li");
            li.remove();
            updateCounters();
        }
    }
});

updateCounters();
