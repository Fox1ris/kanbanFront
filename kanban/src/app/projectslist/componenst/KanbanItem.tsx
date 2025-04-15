'use client';

import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {useState} from "react";
import DropdownMenu from "./DropdownMenu";
import axios from "axios";
import {redirect} from "next/navigation";

type KanbanItemProps = {
    id: string;
    title: string;
    status: 'active' | 'completed' | 'on_hold';
};


export default function KanbanItem({id, title, status}: KanbanItemProps) {

    const api = axios.create({
        baseURL: "http://127.0.0.1:8000/kanbandata/",  // Без слеша в конце!
    });

    const [selected, setSelected] = useState({
        active: ["Активен"],
        completed: ["Завершен"],
        on_hold: ["На паузе"],
    });
    const handleSelect = (select: string) => {
        setSelected(selected);
        console.log(typeof select);
        api.patch(`projects/${id}/`, {
            status: select})
            .then(response => console.log("Статус успешно!", response))
            .catch(error => console.error("Ошибка:", error.response?.data || error.message));
    };
    const handleBlockClick = (e:any) => {
        // Проверяем, был ли клик по исключенной области
        const excludedArea = e.target.closest(".excluded-area");
        // Если клик был не по исключенной области, выполняем переход
        if (!excludedArea) {
            localStorage.setItem("project", id);
            redirect("/kanban/");// Замените на ваш целевой путь
        }

    };

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-white p-3 rounded shadow cursor-move hover:shadow-md transition-shadow text-pink-600 text-center min-h-[150px] min-w-[150px]"
            onClick={handleBlockClick}
        >
            <div className="excluded-area">
                {title}<br/>
                <DropdownMenu
                    selected={selected}
                    onSelect={handleSelect}
                    defaultLabel={status}
                />
            </div>


        </div>


    );
}
