'use client';

import {useEffect, useState} from 'react';
import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import KanbanColumn from './KanbanColumn';
import { PlusIcon } from '@heroicons/react/24/outline';

type Task = {
    id: number;
    title: string;
    description: string;
    status: 'todo' | 'in-progress' | 'done';
    project: number;
};

export default function KanbanBoard() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/kanbandata/tasks/")
            .then(response => response.json())
            .then(data => setTasks(data));
    }, []);

    console.log(tasks);

    const [newTaskTitle, setNewTaskTitle] = useState('');

    const getTasksByStatus = (status: Task['status']) => {
        // @ts-ignore
        return tasks.filter((task) => task.status === status);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;
        // @ts-ignore
        const activeTask = tasks.find((task) => task.id === active.id);
        if (!activeTask) return;


        if (over.id === 'todo' || over.id === 'in-progress' || over.id === 'done') {
            setTasks((tasks) =>
                tasks.map((task) =>
                    task.id === active.id ? { ...task, status: over.id as Task['status'] } : task
                )
            );
            return;
        }

        // Обычное перемещение между задачами
        const overTask = tasks.find((task) => task.id === over.id);
        if (!overTask) return;

        if (activeTask.status !== overTask.status) {
            // Перемещение между колонками
            setTasks((tasks) =>
                tasks.map((task) =>
                    task.id === active.id ? { ...task, status: overTask.status } : task
                )
            );
        } else {
            // Перемещение внутри колонки
            const oldIndex = tasks.findIndex((task) => task.id === active.id);
            const newIndex = tasks.findIndex((task) => task.id === over.id);
            setTasks((tasks) => arrayMove(tasks, oldIndex, newIndex));
        }
    };

    const addTask = () => {
        if (!newTaskTitle.trim()) return;

        const newTask: Task = {
            id: tasks.length + 1,
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
                        <PlusIcon className="h-5 w-5" />
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
                    />
                    <KanbanColumn
                        id="in-progress"
                        title="In Progress"
                        tasks={getTasksByStatus('in-progress')}
                        isEmpty={getTasksByStatus('in-progress').length === 0}
                    />
                    <KanbanColumn
                        id="done"
                        title="Done"
                        tasks={getTasksByStatus('done')}
                        isEmpty={getTasksByStatus('done').length === 0}
                    />
                </div>
            </DndContext>
        </div>
    );
}