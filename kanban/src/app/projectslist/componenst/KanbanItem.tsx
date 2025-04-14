'use client';

import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {useState} from "react";
import DropdownMenu from "./DropdownMenu";
import axios from "axios";

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
        active: "active",
        completed: "completed",
        on_hold: "on_hold",
    });
    const handleSelect = (select: string) => {
        setSelected(selected);
        console.log(typeof select);
        api.patch(`projects/${id}/`, {
            status: select})
            .then(response => console.log("Статус успешно!", response))
            .catch(error => console.error("Ошибка:", error.response?.data || error.message));
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
        >
            {title}<br/>
            <DropdownMenu
                selected={selected}
                onSelect={handleSelect}
                defaultLabel={status}
            />

        </div>


    );
}
