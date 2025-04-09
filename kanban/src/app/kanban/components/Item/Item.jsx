import React from 'react';
import {useSortable} from '@dnd-kit/react/sortable';

export function Item({id, index, column}) {

    const {ref, isDragging} = useSortable({
        id,
        index,
        type: 'item',
        accept: 'item',
        group: column
    });

    return (
        <button
            className="min-w-50 mx-5 max-w-55 max-h-50 border-4 border-amber-200 my-2 border-double rounded-lg overflow-hidden hover:overflow-visible hover:max-h-full"
            ref={ref} data-dragging={isDragging}>
            {id}
        </button>

    );
}