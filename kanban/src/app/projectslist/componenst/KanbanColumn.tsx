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
    console.log("Board", projects);
    return (
        <div
            ref={setNodeRef}
            className={`bg-gray-100 rounded-lg p-4 min-h-[200px]  ${
                isOver ? 'ring-2 ring-blue-500' : ''
            }`}
        >
            <div className="flex justify-center">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
            </div>
            {(
                    <div className="flex flex-wrap gap-[30px]">
                        {projects.map((project) => (
                            <KanbanItem key={project.id}
                                        id={project.id}
                                        title={project.title}
                                        status={project.status}
                                        description={project.description}
                                        />
                        ))}
                    </div>
            )}
        </div>
    );
}