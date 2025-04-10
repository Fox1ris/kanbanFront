"use client";

import React, {useEffect, useState} from 'react';
import {DragDropProvider} from '@dnd-kit/react';
import {move} from '@dnd-kit/helpers';
import {Column} from "@/app/kanban/components/Column/Column";
import {Item} from "@/app/kanban/components/Item/Item";


export default function Kanban() {
    const [items, setItems] = useState([]);
    const [columns, setColumns] = useState({
        title: ['todo',
            'in_progress',
            'done',]
    });

    useEffect(() => {
        fetch("http://127.0.0.1:8000/kanbandata/projects/")
            .then(response => response.json())
            .then(data => setItems(data));
    }, []);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/kanbandata/tasks/")
            .then(response => response.json())
            .then(data => setColumns(data))

    }, []);
    console.log(columns);
    return (
        <DragDropProvider
            onDragOver={(event) => {
                setItems((items) => move(items, event));
            }}
        >

            <div className="flex justify-center">Задания</div>
            <div className="flex justify-center gap-10 mt-10 Root">
                {Object.keys(columns).map((title) => (
                    <Column key={title.length} id={title}>
                        {columns.title}
                        {items.map((review) => (
                            <Item key={review.id} id={review.title} index={review.length} column={columns.length}/>
                        ))}
                    </Column>
                ))}
            </div>
        </DragDropProvider>
    );
}