import { useState, useRef, useEffect } from 'react';


interface DropdownProps {
    onSelect: (selectedOption: string) => void;
    defaultLabel?: string;
}

const DropdownMenu = ({ selected, onSelect, defaultLabel = 'Select an option' }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSelect = (selected: string) => {
        setSelectedStatus(selected);
        onSelect(selected);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div>
                <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selectedStatus || defaultLabel}

                </button>
            </div>

            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                >
                    <div className="py-1" role="none">
                        {Object.entries(selected).map(([selected]) =>
                             (
                            <button
                                key={selected}
                                className={`block w-full text-left px-4 py-2 text-sm ${
                                    selectedStatus === selected
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                                role="menuitem"
                                onClick={() => handleSelect(selected)}
                            >
                                {selected}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;