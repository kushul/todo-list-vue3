<template>
    <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
            <h1 class="text-base font-semibold leading-6 text-gray-900 my-4 flex items-center">To-Do List<span
                    class="inline-flex items-center gap-x-1.5 rounded-md ml-4 bg-yellow-100 px-1.5 text-xs font-medium text-yellow-800">
                    <svg class="h-1.5 w-1.5 fill-yellow-500" viewBox="0 0 6 6" aria-hidden="true">
                        <circle cx="3" cy="3" r="3" />
                    </svg>
                    {{ props.taskCount }} tasks left
                </span></h1>
            <input v-model="taskInput" @keyup.enter="addTaskToStore" type="text" placeholder="Add a new task"
                class="p-2 border rounded w-full" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTodoStore } from "../store/todoStore";

const todoStore = useTodoStore();
const { addTask } = todoStore
const taskInput = ref('');

function clearInput() {
    taskInput.value = ''
}

const props = defineProps({
    taskCount: Number
})
function addTaskToStore() {
    addTask(taskInput.value)
    clearInput()
}
</script>