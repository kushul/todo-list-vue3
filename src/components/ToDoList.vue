<template>
    <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-base font-semibold leading-6 text-gray-900 my-4 flex items-center">To-Do List<span
                        class="inline-flex items-center gap-x-1.5 rounded-md ml-4 bg-yellow-100 px-1.5 text-xs font-medium text-yellow-800">
                        <svg class="h-1.5 w-1.5 fill-yellow-500" viewBox="0 0 6 6" aria-hidden="true">
                            <circle cx="3" cy="3" r="3" />
                        </svg>
                        {{ notCompletedTasksCount }} tasks left
                    </span></h1>
                <input v-model="newTask" @keyup.enter="addTask" type="text" placeholder="Add a new task"
                    class="p-2 border rounded w-full" />
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">

            </div>
        </div>
        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8" v-if="tasks.length > 0">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col"
                                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Title
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Content
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Completed
                                </th>
                                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                    <span class="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="(task, index) in tasks" :key="index">
                                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{{
                                    task.title }}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ task.content }}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <Switch v-model="task.completed"
                                        class="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">
                                        <span class="sr-only">Use setting</span>
                                        <span aria-hidden="true"
                                            class="pointer-events-none absolute h-full w-full rounded-md bg-white" />
                                        <span aria-hidden="true"
                                            :class="[task.completed ? 'bg-green-600' : 'bg-gray-200', 'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out']" />
                                        <span aria-hidden="true"
                                            :class="[task.completed ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out']" />
                                    </Switch>
                                </td>

                                <td
                                    class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                    <button type="button" @click="openDeleteModal = true"
                                        class="rounded-full mr-2 bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                                        <TrashIcon class="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    <button type="button" @click="openEditModal(index)"
                                        class="rounded-full bg-blue-600 p-2 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                                        <PencilIcon class="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </td>
                                <TransitionRoot as="template" :show="openDeleteModal">
                                    <Dialog as="div" class="relative z-10" @close="openDeleteModal = false">
                                        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0"
                                            enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100"
                                            leave-to="opacity-0">
                                            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                        </TransitionChild>

                                        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                                            <div
                                                class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                <TransitionChild as="template" enter="ease-out duration-300"
                                                    enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                                    enter-to="opacity-100 translate-y-0 sm:scale-100"
                                                    leave="ease-in duration-200"
                                                    leave-from="opacity-100 translate-y-0 sm:scale-100"
                                                    leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                                                    <DialogPanel
                                                        class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                                        <div>
                                                            <div
                                                                class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                                                                <ShieldExclamationIcon class="h-6 w-6 text-yellow-600"
                                                                    aria-hidden="true" />
                                                            </div>
                                                            <div class="mt-3 text-center sm:mt-5">
                                                                <DialogTitle as="h3"
                                                                    class="text-base font-semibold leading-6 text-gray-900">
                                                                    Delete
                                                                    Confirmation</DialogTitle>
                                                                <div class="mt-2">
                                                                    <p class="text-sm text-gray-500">Are you sure you want
                                                                        to delete this
                                                                        task?</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                                            <button type="button"
                                                                class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                                                @click="deleteTask(index)">Delete
                                                                <XCircleIcon class="ml-1 h-5 w-5" aria-hidden="true" />
                                                            </button>
                                                            <button type="button"
                                                                class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                                                @click="openDeleteModal = false"
                                                                ref="cancelButtonRef">Cancel
                                                                <MinusCircleIcon class="ml-1 h-5 w-5" aria-hidden="true" />
                                                            </button>
                                                        </div>
                                                    </DialogPanel>
                                                </TransitionChild>
                                            </div>
                                        </div>
                                    </Dialog>
                                </TransitionRoot>

                            </tr>
                        </tbody>

                    </table>
                    <TransitionRoot as="template" :show="editModal">
                        <Dialog as="div" class="relative z-10" @close="editModal = false">
                            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0"
                                enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100"
                                leave-to="opacity-0">
                                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            </TransitionChild>

                            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                                <div
                                    class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                    <TransitionChild as="template" enter="ease-out duration-300"
                                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                                        <DialogPanel
                                            class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                            <div>
                                                <div
                                                    class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                                                    <PencilIcon class="h-6 w-6 text-yellow-600" aria-hidden="true" />
                                                </div>
                                                <div class="mt-3 text-center sm:mt-5">
                                                    <DialogTitle as="h3"
                                                        class="text-base font-semibold leading-6 text-gray-900">
                                                        Edit task</DialogTitle>

                                                </div>
                                            </div>
                                            <div>
                                                <input v-model="editedTask.title" type="text" placeholder="Title"
                                                    class="p-2 border rounded mb-2 w-full" />
                                                <textarea v-model="editedTask.content" placeholder="Content" rows="4"
                                                    class="p-2 border rounded w-full"></textarea>
                                            </div>
                                            <div
                                                class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                                <button type="button"
                                                    class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:col-start-2"
                                                    @click="updateTask">Update task
                                                    <CheckCircleIcon class="ml-1 h-5 w-5" aria-hidden="true" />
                                                </button>
                                                <button type="button"
                                                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                                    @click="closeEditModal" ref="cancelButtonRef">Cancel
                                                    <MinusCircleIcon class="ml-1 h-5 w-5" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </DialogPanel>
                                    </TransitionChild>
                                </div>
                            </div>
                        </Dialog>
                    </TransitionRoot>
                    <div class="flex justify-end mt-6">
                        <button @click="clearCompleted" type="button"
                            class="inline-flex w-48 justify-center rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 sm:col-start-2">Clear
                            all completed
                            <ArrowPathIcon class="ml-1 h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot, Switch } from '@headlessui/vue'
import { XCircleIcon, ShieldExclamationIcon, MinusCircleIcon, TrashIcon, PencilIcon, CheckCircleIcon, ArrowPathIcon } from '@heroicons/vue/20/solid'

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

