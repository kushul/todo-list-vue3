<template>
    <div class="bg-gray-100 min-h-screen p-4">
        <h1 class="text-3xl font-semibold mb-4">To-Do List</h1>
        <div class="mb-4">
            <input v-model="newTask" @keyup.enter="addTask" type="text" placeholder="Add a new task"
                class="p-2 border rounded w-full" />
        </div>
        <div>
            <div v-for="(task, index) in tasks" :key="index"
                class="bg-white p-4 my-2 flex justify-between items-center rounded">
                <div>
                    <h3 class="text-lg">{{ task.title }}</h3>
                    <p>{{ task.content }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const newTask = ref<string>("");
const tasks = ref<{ title: string; content: string; completed: boolean }[]>([]);
const addTask = () => {
    if (newTask.value.trim() === "") return;
    tasks.value.push({ title: newTask.value, content: "", completed: false });
    newTask.value = "";
};
</script>