import {useState} from "react";
import {PlusIcon} from "@heroicons/react/24/outline";
import axios from "axios";
import Modal from "@/app/kanban/componenst/Modal";

type ProjectProps = {
    project: number;
}

export default function AddingTask({project}: ProjectProps) {

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [open, setOpen] = useState(false);
    const [newTaskDescription, setNewTaskDescription] = useState('');

    const api = axios.create({
        baseURL: "http://127.0.0.1:8000/kanbandata/",  // Без слеша в конце!
    });

    const addTask = () => {
        if (!newTaskTitle.trim()) return;

        api.post(`tasks/`, {
            project: project,
            title: newTaskTitle,
            description: newTaskDescription,
            status: 'todo',
        })
            .then(response => console.log("Добавление успешно!", response))
            .catch(error => console.error("Ошибка:", error.response?.data || error.message));

        location.reload()
    };

    return (
        <div className="flex gap-2">

            <button
                onClick={()=> setOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-1 italic"
            >
                <PlusIcon className="h-5 w-5"/>
                Создать задачу
            </button>
            <Modal open={open}
                   onClose={()=>setOpen(false)}
                   addTask={addTask}
                   task={newTaskTitle}
                   setTask={setNewTaskTitle}
                   description={newTaskDescription}
                   setDescription={setNewTaskDescription}
            />

        </div>
    )
}