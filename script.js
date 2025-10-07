document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('event');
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    const addBtn = document.getElementById('add-btn');
    const list = document.getElementById('todo-list');

    function addTodo() {
        const value = input.value.trim();
        if (value === '') return;
        const dateVal = dateInput.value;
        const timeVal = timeInput.value;
        let displayText = value;
        if (dateVal || timeVal) {
            displayText += ` (${dateVal}${dateVal && timeVal ? ' ' : ''}${timeVal})`;
        }
        const li = document.createElement('li');
        // Create span for text
        const span = document.createElement('span');
        span.textContent = displayText;
        li.appendChild(span);

        // Complete on click (not on buttons)
        span.addEventListener('click', function () {
            li.classList.toggle('completed');
        });

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit-btn';
        editBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            // Create input for editing
            const editInput = document.createElement('input');
            editInput.type = 'text';
            // Try to extract just the task text (before date/time)
            const match = span.textContent.match(/^(.*?)( \(.*\))?$/);
            editInput.value = match ? match[1] : span.textContent;
            span.style.display = 'none';
            li.insertBefore(editInput, editBtn);
            editInput.focus();

            // Create Save button
            const saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save';
            saveBtn.className = 'save-btn';
            li.insertBefore(saveBtn, editBtn);

            function saveEdit() {
                let newText = editInput.value.trim();
                if (newText === '') newText = match ? match[1] : '';
                // Keep date/time if present
                if (match && match[2]) {
                    newText += match[2];
                }
                span.textContent = newText;
                span.style.display = '';
                li.removeChild(editInput);
                li.removeChild(saveBtn);
            }
            editInput.addEventListener('keydown', function (ev) {
                if (ev.key === 'Enter') saveEdit();
            });
            editInput.addEventListener('blur', saveEdit);
            saveBtn.addEventListener('click', saveEdit);
        });

        // Delete button
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.className = 'delete-btn';
        delBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            li.remove();
        });
        li.appendChild(editBtn);
        li.appendChild(delBtn);
        list.appendChild(li);
        input.value = '';
        dateInput.value = '';
        timeInput.value = '';
    }

    addBtn.addEventListener('click', addTodo);
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') addTodo();
    });
});