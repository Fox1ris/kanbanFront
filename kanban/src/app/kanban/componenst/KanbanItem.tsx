'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type KanbanItemProps = {
    id: string;
    title: string;
    project: number;
};

export default function KanbanItem({ id, title, project }: KanbanItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id, });

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
            className="bg-white p-3 rounded shadow cursor-move hover:shadow-md transition-shadow text-pink-600"
        >
            {title}
        </div>
    );
}