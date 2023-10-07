import { defineStore } from 'pinia';

export type Task = {
    id: string;
    title: string;
    content: string;
    completed: boolean;
};

export type EditedTask = {
    title: string;
    content: string;
};

export const useTodoStore = defineStore('todo', {
    state: () => ({
        tasks: [] as Task[],
        selectedTaskIndex: null as number | null,
        editedTask: { title: '', content: '' } as EditedTask,
    }),
    actions: {
        addTask(newTask: string) {
            if (newTask.trim() === '') return;
            const id = new Date().toISOString();
            this.tasks.push({ id: id, title: newTask, content: '', completed: false });
        },
        deleteTask(id: string) {
            let index = this.tasks.findIndex(item => item.id === id)
            this.tasks.splice(index, 1);
        },
        closeEditModal() {
            this.selectedTaskIndex = null;
        },
        updateTask(task: Task) {
            let index = this.tasks.findIndex(item => item.id === task.id)
            if (index) {
                this.tasks[index] = task;
            }
        },
        clearCompleted() {
            this.tasks = this.tasks.filter(task => !task.completed);
        },
    },
});
