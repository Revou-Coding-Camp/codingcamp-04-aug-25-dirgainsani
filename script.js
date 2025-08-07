document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const taskDate = document.getElementById("task-date");
  const taskList = document.getElementById("task-list");
  const filterDate = document.getElementById("filter-date");
  const clearBtn = document.getElementById("clear-tasks");

  let tasks = [];

  function renderTasks() {
    taskList.innerHTML = "";

    const selectedDate = filterDate.value;

    const filteredTasks = selectedDate
      ? tasks.filter((task) => task.date === selectedDate)
      : tasks;

    if (filteredTasks.length === 0) {
      taskList.innerHTML = `<li class="text-white text-center">Belum ada tugas untuk tanggal ini</li>`;
      return;
    }

    filteredTasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className =
        "bg-white bg-opacity-70 rounded p-3 flex justify-between items-center";

      const textSection = document.createElement("div");
      textSection.innerHTML = `
        <p class="font-semibold">${task.text}</p>
        <p class="text-sm text-gray-600">${task.date}</p>
      `;

      const btnGroup = document.createElement("div");
      btnGroup.className = "flex gap-2";

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className =
        "bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm";
      editBtn.addEventListener("click", () => {
        const newText = prompt("Edit tugas:", task.text);
        const newDate = prompt("Edit tanggal (yyyy-mm-dd):", task.date);
        if (newText && newDate) {
          tasks[index] = { text: newText, date: newDate };
          renderTasks();
        }
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Hapus";
      deleteBtn.className =
        "bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm";
      deleteBtn.addEventListener("click", () => {
        if (confirm("Yakin ingin menghapus tugas ini?")) {
          tasks.splice(index, 1);
          renderTasks();
        }
      });

      btnGroup.appendChild(editBtn);
      btnGroup.appendChild(deleteBtn);

      li.appendChild(textSection);
      li.appendChild(btnGroup);

      taskList.appendChild(li);
    });
  }

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    const date = taskDate.value;

    if (!text || !date) {
      alert("Isi tugas dan tanggal dulu ya bray!");
      return;
    }

    tasks.push({ text, date });
    taskInput.value = "";
    taskDate.value = "";
    renderTasks();
  });

  filterDate.addEventListener("change", renderTasks);

  clearBtn.addEventListener("click", () => {
    if (confirm("Hapus semua tugas?")) {
      tasks = [];
      renderTasks();
    }
  });

  renderTasks(); // Tampilkan di awal
});
