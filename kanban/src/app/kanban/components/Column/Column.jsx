import React from 'react';
import {useDroppable} from '@dnd-kit/react';
import {CollisionPriority} from '@dnd-kit/abstract';
import {Input} from "@/app/kanban/components/Input/Input";

export function Column({children, id}) {
    const {isDropTarget, ref} = useDroppable({
        id,
        type: 'column',
        accept: 'item',
        collisionPriority: CollisionPriority.Low,
    });
    const style = isDropTarget ? {background: '#00000030'} : undefined;

    return (
        <div className="flex Column border-4 flex-wrap max-h-full min-w-50 max-w-140 rounded-md border-blue-400" ref={ref} style={style}>
            {children}
        </div>
    );
}