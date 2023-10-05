<template>
    <div class="bg-gray-100 min-h-screen p-4">
        <h1 class="text-3xl font-semibold mb-4">To-Do List</h1>

        <!-- Input for adding a new task -->
        <div class="mb-4">
            <input v-model="newTask" @keyup.enter="addTask" type="text" placeholder="Add a new task"
                class="p-2 border rounded w-full" />
        </div>

        <!-- Task list -->
        <div v-if="tasks.length > 0">
            <div class="flex justify-between p-2 bg-white rounded">
                <span>{{ notCompletedTasksCount }} tasks left</span>
                <button @click="clearCompleted" class="text-red-600">Clear Completed</button>
            </div>
            <div v-for="(task, index) in tasks" :key="index"
                class="bg-white p-4 my-2 flex justify-between items-center rounded">
                <div @click="openEditModal(index)">
                    <h3 class="text-lg">{{ task.title }}</h3>
                    <p>{{ task.content }}</p>
                </div>
                <div>
                    <input type="checkbox" v-model="task.completed" class="mr-2" />
                    <button @click="openDeleteModal = true" class="text-red-600 mr-2">Delete</button>
                    <button @click="openEditModal(index)" class="text-blue-600">Edit</button>
                </div>
                <TransitionRoot as="template" :show="openDeleteModal">
                    <Dialog as="div" class="relative z-10" @close="openDeleteModal = false">
                        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0"
                            enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100"
                            leave-to="opacity-0">
                            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </TransitionChild>

                        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <TransitionChild as="template" enter="ease-out duration-300"
                                    enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                                    leave-from="opacity-100 translate-y-0 sm:scale-100"
                                    leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                                    <DialogPanel
                                        class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                        <div>
                                            <div
                                                class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                            </div>
                                            <div class="mt-3 text-center sm:mt-5">
                                                <DialogTitle as="h3"
                                                    class="text-base font-semibold leading-6 text-gray-900">Delete
                                                    Confirmation</DialogTitle>
                                                <div class="mt-2">
                                                    <p class="text-sm text-gray-500">Are you sure you want to delete this
                                                        task?</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                            <button type="button"
                                                class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                                @click="deleteTask(index)">Delete</button>
                                            <button type="button"
                                                class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                                @click="openDeleteModal = false" ref="cancelButtonRef">Cancel</button>
                                        </div>
                                    </DialogPanel>
                                </TransitionChild>
                            </div>
                        </div>
                    </Dialog>
                </TransitionRoot>
                <TransitionRoot as="template" :show="editModal">
                    <Dialog as="div" :static="true" class="relative z-10 pointer-events-none" @close="editModal = false">
                        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0"
                            enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100"
                            leave-to="opacity-0">
                            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </TransitionChild>

                        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <TransitionChild as="template" enter="ease-out duration-300"
                                    enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                                    leave-from="opacity-100 translate-y-0 sm:scale-100"
                                    leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                                    <DialogPanel
                                        class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                        <h2 class="text-xl font-semibold mb-2">Edit Task</h2>
                                        <input v-model="editedTask.title" type="text" placeholder="Title"
                                            class="p-2 border rounded mb-2 w-full" />
                                        <textarea v-model="editedTask.content" placeholder="Content" rows="4"
                                            class="p-2 border rounded w-full"></textarea>
                                        <div class="flex justify-end mt-4">
                                            <button @click="updateTask">Save</button>
                                            <button @click="closeEditModal" class="ml-2">Cancel</button>
                                        </div>
                                    </DialogPanel>
                                </TransitionChild>
                            </div>
                        </div>
                    </Dialog>
                </TransitionRoot>
            </div>
        </div>

        <!-- Modal for editing a task -->
        <!-- <div v-if="selectedTaskIndex !== null" class="fixed inset-0 z-10 flex items-center justify-center">
            <div class="fixed inset-0 bg-black opacity-30" @click="closeEditModal"></div>
            <div class="bg-white p-4 rounded shadow-md w-1/2">
                <h2 class="text-xl font-semibold mb-2">Edit Task</h2>
                <input v-model="editedTask.title" type="text" placeholder="Title" class="p-2 border rounded mb-2 w-full" />
                <textarea v-model="editedTask.content" placeholder="Content" rows="4"
                    class="p-2 border rounded w-full"></textarea>
                <div class="flex justify-end mt-4">
                    <button @click="updateTask">Save</button>
                    <button @click="closeEditModal" class="ml-2">Cancel</button>
                </div>
            </div>
        </div> -->

    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const newTask = ref<string>("");
const tasks = ref<{ title: string; content: string; completed: boolean }[]>([]);
const selectedTaskIndex = ref<number | null>(null);
const editedTask = ref<{ title: string; content: string }>({ title: "", content: "" });
const notCompletedTasksCount = computed(() => tasks.value.filter((task) => !task.completed).length);
const openDeleteModal = ref<boolean>(false);
const editModal = ref<boolean>(false);

const addTask = () => {
    if (newTask.value.trim() === "") return;
    tasks.value.push({ title: newTask.value, content: "", completed: false });
    newTask.value = "";
};

const deleteTask = (index: number) => {
    tasks.value.splice(index, 1);
};

const openEditModal = (index: number) => {
    editModal.value = true;
    selectedTaskIndex.value = index;
    editedTask.value.title = tasks.value[index].title;
    editedTask.value.content = tasks.value[index].content;
};

const closeEditModal = () => {
    editModal.value = false;
    selectedTaskIndex.value = null;
};

const updateTask = () => {
    if (selectedTaskIndex.value !== null) {
        tasks.value[selectedTaskIndex.value].title = editedTask.value.title;
        tasks.value[selectedTaskIndex.value].content = editedTask.value.content;
        closeEditModal();
    }
};

const clearCompleted = () => {
    tasks.value = tasks.value.filter((task) => !task.completed);
};
</script>

<style scoped>
/* Add your custom CSS styles or use Tailwind classes here */
</style>
