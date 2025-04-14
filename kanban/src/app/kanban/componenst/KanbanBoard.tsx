'use client';

import {useEffect, useState} from 'react';
import {DndContext, DragEndEvent, closestCorners} from '@dnd-kit/core';
import {SortableContext, arrayMove} from '@dnd-kit/sortable';
import KanbanColumn from './KanbanColumn';
import {PlusIcon} from '@heroicons/react/24/outline';
import axios from "axios";

type Task = {
    id: number;
    title: string;
    description: string;
    status: 'todo' | 'in_progress' | 'done';
};

export default function KanbanBoard() {
    const [tasks, setTasks] = useState([]);
    const project = 7;
    const api = axios.create({
        baseURL: "http://127.0.0.1:8000/kanbandata/",  // Без слеша в конце!
    });
    useEffect(() => {
        fetch("http://127.0.0.1:8000/kanbandata/tasks/")
            .then(response => response.json())
            .then(data => setTasks(data));
    }, []);

    const [newTaskTitle, setNewTaskTitle] = useState('');

    const getTasksByStatus = (status: Task['status']) => {
        // @ts-ignore
        return tasks.filter((task) => task.status === status);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (!over) return;
        // @ts-ignore
        const activeTask = tasks.find((task) => task.id === active.id);
        if (!activeTask) return;


        if (over.id === 'todo' || over.id === 'in_progress' || over.id === 'done') {
            setTasks((tasks) =>
                tasks.map((task) =>
                    task.id === active.id ? {...task, status: over.id as Task['status']} : task
                )
            );
                api.patch(`tasks/${activeTask.id}/`, {
                    status: over.id
                })
                    .then(response => console.log("Статус успешно!", response))
                    .catch(error => console.error("Ошибка:", error.response?.data || error.message));

            return;
        }
        const overTask = tasks.find((task) => task.id === over.id);


        if (!overTask) return;

        if (activeTask.status !== overTask.status) {
            // Перемещение между колонками
            setTasks((tasks) =>
                tasks.map((task) =>
                    task.id === active.id ? {...task, status: overTask.status} : task
                )
            );
            api.patch(`tasks/${activeTask.id}/`, {
                status: overTask.status
            })
                .then(response => console.log("Статус успешно!", response))
                .catch(error => console.error("Ошибка:", error.response?.data || error.message));
        } else {
            // Перемещение внутри колонки
            const oldIndex = tasks.findIndex((task) => task.id === active.id);
            const newIndex = tasks.findIndex((task) => task.id === over.id);
            setTasks((tasks) => arrayMove(tasks, oldIndex, newIndex));
        }

    };

    const addTask = () => {
        if (!newTaskTitle.trim()) return;

        api.post(`tasks/`, {
            project: 1,
            title: newTaskTitle,
            description: "newTask.description",
            status: 'todo',
        })
            .then(response => console.log("Добавление успешно!", response))
            .catch(error => console.error("Ошибка:", error.response?.data || error.message));

        const newTask: Task = {
            id: tasks.at(-1).id +1,
            title: newTaskTitle,
            status: 'todo',
        };

        setTasks([...tasks, newTask]);
        setNewTaskTitle('');
    };
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Канбан Доска</h1>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="Новая задача"
                        className="px-3 py-2 border rounded"
                        onKeyDown={(e) => e.key === 'Enter' && addTask()}
                    />
                    <button
                        onClick={addTask}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-1"
                    >
                        <PlusIcon className="h-5 w-5"/>
                        ADD
                    </button>
                </div>
            </div>

            <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-black">
                    <KanbanColumn
                        id="todo"
                        title="To Do"
                        tasks={getTasksByStatus('todo')}
                        isEmpty={getTasksByStatus('todo').length === 0}
                        project={project}
                    />
                    <KanbanColumn
                        id="in_progress"
                        title="In Progress"
                        tasks={getTasksByStatus('in_progress')}
                        isEmpty={getTasksByStatus('in_progress').length === 0}
                        project={project}
                    />
                    <KanbanColumn
                        id="done"
                        title="Done"
                        tasks={getTasksByStatus('done')}
                        isEmpty={getTasksByStatus('done').length === 0}
                        project={project}
                    />
                </div>
            </DndContext>
        </div>
    );
}