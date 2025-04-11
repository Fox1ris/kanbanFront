'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import KanbanItem from './KanbanItem';
import { Task } from './KanbanBoard';

type KanbanColumnProps = {
    id: string;
    title: string;
    tasks: Task[];
    isEmpty: boolean;
};

export default function KanbanColumn({ id, title, tasks, isEmpty }: KanbanColumnProps) {
    const { setNodeRef, isOver } = useDroppable({
        id,
        data: {
            type: 'column',
        },
    });

    return (
        <div
            ref={setNodeRef}
            className={`bg-gray-100 rounded-lg p-4 min-h-[200px] ${
                isOver ? 'ring-2 ring-blue-500' : ''
            }`}
        >
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            {isEmpty ? (
                <div className="text-gray-500 text-center py-4"></div>
            ) : (
                <SortableContext
                    items={tasks.map((task) => task.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-3">
                        {tasks.map((task) => (
                            <KanbanItem key={task.id} id={task.id} title={task.title} />
                        ))}
                    </div>
                </SortableContext>
            )}
        </div>
    );
}