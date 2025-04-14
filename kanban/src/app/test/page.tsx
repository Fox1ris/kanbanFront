"use client"
import { useState } from 'react';
import DropdownMenu from "@/app/test/components/DropdownMenu";


export default function HomePage() {
    const [selected, setSelected] = useState<string>('');

    const options = ['Option 1', 'Option 2', 'Option 3'];

    const handleSelect = (option: string) => {
        setSelected(option);
        console.log('Selected:', option);
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Dropdown Example</h1>
            <DropdownMenu
                options={options}
                onSelect={handleSelect}
                defaultLabel="Choose an option"
            />
            {selected && <p className="mt-4">You selected: {selected}</p>}
        </div>
    );
}