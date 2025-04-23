import {PlusIcon} from "@heroicons/react/24/outline";

export default function Modal({open, onClose, task, addTask, setTask, description, setDescription}) {

    return (
        <div onClick={onClose}
             className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/50" : "invisible"}`}>
            <div
                onClick={e => e.stopPropagation()}
                className={`h-150 w-120 bg-white/90 rounded-lg shadow p-6 transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <div className="flex flex-col text-black">
                    <header className="text-4xl italic mt-7 text-center">Задача</header>
                    <input
                        type="text"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        placeholder="Новая задача"
                        className="px-3 py-2 border rounded italic my-6"
                        onKeyDown={(e) => e.key === 'Enter' && addTask()}
                    />
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Описание"
                        className="px-3 py-2 border rounded italic my-6 h-40 text-wrap text-clip"
                        onKeyDown={(e) => e.key === 'Enter' && addTask()}
                    />
                    <button
                        onClick={addTask}
                        className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 gap-1 mt-30 text-center italic"
                    >
                        Добавить
                    </button>
                </div>

            </div>

        </div>
    )
}
