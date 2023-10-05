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
                <div>
                    <button @click="openDeleteModal = true" class="text-red-600 mr-2">Delete</button>
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
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
const newTask = ref<string>("");
const tasks = ref<{ title: string; content: string; completed: boolean }[]>([]);
const openDeleteModal = ref<boolean>(false);
const addTask = () => {
    if (newTask.value.trim() === "") return;
    tasks.value.push({ title: newTask.value, content: "", completed: false });
    newTask.value = "";
};
const deleteTask = (index: number) => {
    tasks.value.splice(index, 1);
};
</script>