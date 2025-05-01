'use client';

import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {useState} from "react";
import DropdownMenu from "./DropdownMenu";
import {redirect} from "next/navigation";
import Axios from "@/app/projectslist/componenst/api/Axios";

type KanbanItemProps = {
    id: string;
    title: string;
    status: 'active' | 'completed' | 'on_hold';
    description: string;
};


export default function KanbanItem({id, title, status, description}: KanbanItemProps) {

    const [selected, setSelected] = useState({
        active: ["Активен"],
        completed: ["Завершен"],
        on_hold: ["На паузе"],
    });

    const statusOptions = [
        {id: 'active', label: 'Активен', colorClasses: 'bg-green-600'},
        {id: 'completed', label: 'Завершен', colorClasses: 'bg-gray-600'},
        {id: 'on_hold', label: 'На паузе', colorClasses: 'bg-yellow-600'},
    ];


    const getStatusLabel = () => {
        const label = statusOptions.find(s => s.id === status);
        return label ? label.label : statusOptions[0].label;
    };

    const statusLabel = getStatusLabel(status.label);

    const handleSelect = (select: string) => {
        setSelected(selected);
        Axios.patch(`projects/${id}/`, {
            status: select
        })
            .then(response => console.log("Статус успешно!", response))
            .catch(error => console.error("Ошибка:", error.response?.data || error.message));
    };


    const handleBlockClick = (e: any) => {
        const excludedArea = e.target.closest(".excluded-area");

        if (!excludedArea) {
            localStorage.setItem("projectID", id);
            localStorage.setItem("projectTitle", title);
            redirect("/kanban/");
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
            className="bg-white p-3 rounded shadow cursor-move hover:shadow-md transition-shadow text-pink-600 text-center min-h-[150px] min-w-[150px] max-w-[300]"
            onClick={handleBlockClick}
        >
            <div>
                {title}
                <div className="excluded-area">
                    <DropdownMenu
                        selected={selected}
                        onSelect={handleSelect}
                        defaultLabel={statusLabel}
                    />
                </div>
                {description}
            </div>
        </div>
    );
}
