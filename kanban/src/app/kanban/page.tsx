"use client";

import React, {useState} from 'react';
import {DragDropProvider} from '@dnd-kit/react';
import {move} from '@dnd-kit/helpers';
import {Column} from "@/app/kanban/components/Column/Column";
import {Item} from "@/app/kanban/components/Item/Item";
import {Input} from "@/app/kanban/components/Input/Input";


export default function Kanban() {
    const [items, setItems] = useState({
        A: [],
        B: [],
        C: [],
    });

    const addItemToGroup = (group: "A" | "B" | "C", newItem: string) => {
        setItems(prev => ({...prev, [group]: [...prev[group], newItem]}));
    }

    const addItemToA = (title: string) => {
        addItemToGroup("A", title);
    }

    return (
        <DragDropProvider
            onDragOver={(event) => {
                setItems((items) => move(items, event));
            }}
        >

            <div className="flex justify-center">Задания</div>
            <div className="flex justify-center gap-10 mt-10 Root">
                <Input onSubmit={addItemToA}/>
                {Object.entries(items).map(([column, items]) => (
                    <Column key={column} id={column}>
                        {items.map((id, index) => (
                            <Item key={id} id={id} index={index} column={column}/>
                        ))}
                    </Column>
                ))}
            </div>
        </DragDropProvider>
    );
}