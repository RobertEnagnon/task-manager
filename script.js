// Gestion des tâches dans une liste
let tasks = [];

// Récupérer l'élément du formulaire et la liste des tâches
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('tasks');

// Lorsqu'on soumet le formulaire pour ajouter une tâche
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Récupérer les valeurs du formulaire
    const title = document.getElementById('task-title').value;
    const desc = document.getElementById('task-desc').value;
    const deadline = document.getElementById('task-deadline').value;

    // Créer un objet tâche
    const newTask = {
        id: Date.now(),
        title,
        desc,
        deadline,
        completed: false,
    };

    // Ajouter la tâche à la liste
    tasks.push(newTask);
    afficherTaches();  // Mettre à jour l'affichage

    // Réinitialiser le formulaire
    taskForm.reset();
});

// Fonction pour afficher les tâches
function afficherTaches() {
    taskList.innerHTML = '';  // Réinitialiser l'affichage

    // Parcourir toutes les tâches et les afficher
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>
                <strong>${task.title}</strong><br>
                ${task.desc}<br>
                <small>À terminer avant : ${task.deadline}</small>
            </span>
            <div>
                <button class="complete-btn">${task.completed ? 'Non terminée' : 'Terminée'}</button>
                <button class="delete-btn">Supprimer</button>
            </div>
        `;

        // Ajouter une classe si la tâche est terminée
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        // Gestion du bouton "Terminer"
        taskItem.querySelector('.complete-btn').addEventListener('click', () => {
            task.completed = !task.completed;  // Inverser le statut
            afficherTaches();  // Mettre à jour l'affichage
        });

        // Gestion du bouton "Supprimer"
        taskItem.querySelector('.delete-btn').addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);  // Retirer la tâche de la liste
            afficherTaches();  // Mettre à jour l'affichage
        });

        // Ajouter la tâche à la liste
        taskList.appendChild(taskItem);
    });
}
