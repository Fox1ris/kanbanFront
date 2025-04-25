'use client';

import {useEffect, useState} from 'react';
import {DndContext, DragEndEvent, closestCorners} from '@dnd-kit/core';
import {SortableContext, arrayMove} from '@dnd-kit/sortable';
import KanbanColumn from './KanbanColumn';
import {PlusIcon} from '@heroicons/react/24/outline';
import axios from "axios";
import {redirect} from "next/navigation";
import AddingTask from "@/app/kanban/componenst/AddingTask";


type Task = {
    id: number;
    title: string;
    description: string;
    status: 'todo' | 'in_progress' | 'done';
    project: number

};

export default function KanbanBoard() {
    const [tasks, setTasks] = useState<string[]>([]);
    const statusOptions = [
        {id: 'active', label: 'Активен', colorClasses: 'bg-green-600'},
        {id: 'completed', label: 'Завершен', colorClasses: 'bg-gray-600'},
        {id: 'on_hold', label: 'На паузе', colorClasses: 'bg-yellow-600'},
    ];

    const getStatusColor = () => {
        const status = statusOptions.find(s => s.id === projectStatus);
        return status ? status.colorClasses : statusOptions[0].colorClasses;
    };

    const getStatusLabel = () => {
        const label = statusOptions.find(s => s.id === projectStatus);
        return label ? label.label : statusOptions[0].label;
    };


    const projectID = Number(localStorage.getItem("projectID"));
    const projectTitle = String(localStorage.getItem("projectTitle"));
    const projectStatus = String(localStorage.getItem("projectStatus"));



    const toProjects = () => redirect("/projectslist/");

    const api = axios.create({
        baseURL: "http://127.0.0.1:8000/kanbandata/",  // Без слеша в конце!
    });
    useEffect(() => {
        fetch("http://127.0.0.1:8000/kanbandata/tasks/")
            .then(response => response.json())
            .then(data => setTasks(data));
    }, []);

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


    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold italic content-center">{projectTitle}</h1>
                    <h1 className={`text-2xl font-bold italic w-40 h-10 ml-3 content-center text-center rounded-4xl ${getStatusColor(tasks.status)}`}>{getStatusLabel(status.label)}</h1>
                </div>


                <div className="flex justify-center items-center mr-40">
                    <AddingTask project={projectID}/>
                </div>


                <div className="flex gap-6">
                    <button
                        className="flex bg-blue-500 hover:bg-blue-600 rounded px-4 py-2 justify-center gap-6 italic"
                        onClick={toProjects}
                    >
                        К проектам
                    </button>

                </div>

            </div>


            <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-black italic">
                    <KanbanColumn
                        id="todo"
                        title="To Do"
                        tasks={getTasksByStatus('todo')}
                        isEmpty={getTasksByStatus('todo').length === 0}
                        project={projectID}

                    />
                    <KanbanColumn
                        id="in_progress"
                        title="In Progress"
                        tasks={getTasksByStatus('in_progress')}
                        isEmpty={getTasksByStatus('in_progress').length === 0}
                        project={projectID}
                    />
                    <KanbanColumn
                        id="done"
                        title="Done"
                        tasks={getTasksByStatus('done')}
                        isEmpty={getTasksByStatus('done').length === 0}
                        project={projectID}
                    />
                </div>
            </DndContext>
        </div>
    );
}