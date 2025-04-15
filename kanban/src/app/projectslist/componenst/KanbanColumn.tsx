'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import KanbanItem from './KanbanItem';
import { Project } from './KanbanBoard';

type KanbanColumnProps = {
    id: string;
    title: string;
    projects: Project[];
};

export default function KanbanColumn({ id, title, projects}: KanbanColumnProps) {
    const { setNodeRef, isOver } = useDroppable({
        id,
        data: {
            type: 'column',
        },
    });

    return (
        <div
            ref={setNodeRef}
            className={`bg-gray-100 rounded-lg p-4 min-h-[200px] w-[800px] ${
                isOver ? 'ring-2 ring-blue-500' : ''
            }`}
        >
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            {(
                <SortableContext
                    items={projects.map((project) => project.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="flex flex-wrap gap-[30px]">
                        {projects.map((project) => (
                            <KanbanItem key={project.id} id={project.id} title={project.title} status={project.status} />
                        ))}
                    </div>
                </SortableContext>
            )}
        </div>
    );
}