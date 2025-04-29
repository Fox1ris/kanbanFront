'use client';

import {useEffect, useState} from 'react';
import KanbanColumn from './KanbanColumn';
import {PlusIcon} from '@heroicons/react/24/outline';
import axios from "axios";
import LoginMenu from "@/app/projectslist/componenst/authentication/LoginMenu";

type Project = {
    id: number;
    title: string;
    description: string;
    status: 'active' | 'completed' | 'on_hold';
};

export default function KanbanBoard() {
    const [projects, setProjects] = useState([]);
    const [newProjectTitle, setNewProjectTitle] = useState('');

    const api = axios.create({
        baseURL: "http://127.0.0.1:8000/kanbandata/",  // Без слеша в конце!
    });

    useEffect(() => {
        fetch("http://127.0.0.1:8000/kanbandata/projects/")
            .then(response => response.json())
            .then(data => setProjects(data));
    },[]);




    const addProject = () => {
        if (!newProjectTitle.trim()) return;

        api.post('projects/', {
            title: newProjectTitle,
            description: "newTask.description",
            status: 'active',
        })
            .then(response => console.log("Добавление успешно!", response))
            .catch(error => console.error("Ошибка:", error.response?.data || error.message));

        const newProject: Project = {
            id: projects.at(-1).id + 1,
            title: newProjectTitle,
            status: 'active',
        };

        setProjects([...projects, newProject]);
        setNewProjectTitle('');
    };
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <LoginMenu/>
                <h1 className="text-2xl font-bold italic">Проекты</h1>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newProjectTitle}
                        onChange={(e) => setNewProjectTitle(e.target.value)}
                        placeholder="Новая задача"
                        className="px-3 py-2 border rounded"
                        onKeyDown={(e) => e.key === 'Enter' && addProject()}
                    />
                    <button
                        onClick={addProject}
                        className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-1"
                    >
                        <PlusIcon className="h-5 w-5"/>
                        ADD
                    </button>
                </div>
            </div>

            <div className=" gap-4 text-black text-center">
                <KanbanColumn
                    id="all"
                    title="Активные проекты"
                    projects={projects}
                />
            </div>
        </div>
    );
}