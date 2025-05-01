'use client';

import {useEffect, useState} from 'react';
import KanbanColumn from './KanbanColumn';
import {PlusIcon} from '@heroicons/react/24/outline';
import LoginMenu from "@/app/projectslist/componenst/authentication/LoginMenu";
import Axios from "@/app/projectslist/componenst/api/Axios";
import TasksCount from "@/app/projectslist/componenst/tasksCount/TasksCount";


type Project = {
    id: number;
    title: string;
    description: string;
    status: 'active' | 'completed' | 'on_hold';
};

export default function KanbanBoard() {
    const [projects, setProjects] = useState([]);
    const [newProjectTitle, setNewProjectTitle] = useState('');
    const [tasks, setTasks] = useState([]);

    const tasksCount = [
        {
            status: "К выполнению",
            length: tasks.filter(x => x.status === "todo").length,
            titles: tasks.filter(x => x.status === "todo").map((x) => x.title),
        }, {
            status: "В работе",
            length: tasks.filter(x => x.status === "in_progress").length,
            titles: tasks.filter(x => x.status === "in_progress").map((x) => x.title),
        },
        {
            status: "Завершен",
            length: tasks.filter(x => x.status === "done").length,
            titles: tasks.filter(x => x.status === "done").map((x) => x.title),
        }
    ];

    useEffect(() => {
        Axios.get('tasks/')
            .then(response => response.data)
            .then(data => setTasks(data));
    }, []);

    useEffect(() => {
        Axios.get('projects/')
            .then(response => response.data)
            .then(data => setProjects(data));
    }, []);


    console.log("test", tasksCount.map((task) => (task.status)));

    const addProject = () => {
        if (!newProjectTitle.trim()) return;

        Axios.post('projects/', {
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

    //<div className="bg-white ml-10 indent-4 italic rounded-full">{status.status}:&ensp; {status.length}&emsp;</div>
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <LoginMenu/>

                <h1 className=" text-2xl font-bold italic">Проекты</h1>
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
            <div className="flex justify-end text-black mb-3"
            >
                {tasksCount.map((task) => (
                    <TasksCount status={task.status}
                                count={task.length}
                                title={task.titles}
                    />

                ))}
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