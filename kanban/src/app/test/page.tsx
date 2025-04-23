"use client"
import { useState } from 'react';

const TaskStatusIndicator = () => {
    // Все возможные статусы задач с соответствующими цветами
    const statusOptions = [
        { id: 'active', label: 'To Do', colorClasses: 'bg-gray-200 text-gray-800' },
        { id: 'completed', label: 'In Progress', colorClasses: 'bg-blue-100 text-blue-800 border border-blue-300' },
        { id: 'on_hold', label: 'In Review', colorClasses: 'bg-purple-100 text-purple-800 border border-purple-300' },
        { id: 'blocked', label: 'Blocked', colorClasses: 'bg-red-100 text-red-800 border border-red-300' },
        { id: 'done', label: 'Done', colorClasses: 'bg-green-100 text-green-800 border border-green-300' },
        { id: 'archived', label: 'Archived', colorClasses: 'bg-gray-100 text-gray-600 border border-gray-300' },
    ];

    const [currentStatus, setCurrentStatus] = useState(statusOptions[0].id);
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Разработать дизайн', status: 'todo' },
        { id: 2, title: 'Написать API', status: 'in_progress' },
        { id: 3, title: 'Протестировать функционал', status: 'in_review' },
        { id: 4, title: 'Исправить баги', status: 'blocked' },
        { id: 5, title: 'Завершить проект', status: 'done' },
    ]);

    // Получаем классы цвета для текущего статуса
    const getStatusColor = (statusId) => {
        const status = statusOptions.find(s => s.id === statusId);
        return status ? status.colorClasses : statusOptions[0].colorClasses;
    };

    // Изменяем статус задачи
    const updateTaskStatus = (taskId, newStatus) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, status: newStatus } : task
        ));
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Трекер задач со статусами</h1>

            <div className="mb-8 p-4 bg-white rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Демонстрация статуса</h2>
                <div className="flex items-center gap-4">
                    <select
                        value={currentStatus}
                        onChange={(e) => setCurrentStatus(e.target.value)}
                        className="p-2 border rounded flex-1"
                    >
                        {statusOptions.map(status => (
                            <option key={status.id} value={status.id}>{status.label}</option>
                        ))}
                    </select>
                    <div className={`px-4 py-2 rounded-lg ${getStatusColor(currentStatus)}`}>
                        {statusOptions.find(s => s.id === currentStatus)?.label}
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Список задач</h2>
                {tasks.map(task => {
                    const statusInfo = statusOptions.find(s => s.id === task.status);
                    return (
                        <div key={task.id} className="p-4 bg-white rounded-lg shadow flex justify-between items-center">
                            <span>{task.title}</span>
                            <select
                                value={task.status}
                                onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                                className={`px-3 py-1 rounded ${getStatusColor(task.status)}`}
                            >
                                {statusOptions.map(status => (
                                    <option key={status.id} value={status.id}>{status.label}</option>
                                ))}
                            </select>
                        </div>
                    );
                })}
            </div>

            {/* Легенда статусов */}
            <div className="mt-8 pt-4 border-t">
                <h3 className="font-medium mb-2">Легенда статусов:</h3>
                <div className="flex flex-wrap gap-2">
                    {statusOptions.map(status => (
                        <div
                            key={status.id}
                            className={`px-3 py-1 rounded-full text-sm ${status.colorClasses}`}
                        >
                            {status.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TaskStatusIndicator;