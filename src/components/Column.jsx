import { Droppable, Draggable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';

const Column = ({ columnId, title, tasks, onDelete, onEdit, color }) => {
    return (
        <div className="flex-1 min-w-[320px]">
            {/* Column Header */}
            <div className={`${color} rounded-xl p-4 mb-4 shadow-lg`}>
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white flex items-center">
                        <span>{title}</span>
                    </h2>
                    <span className="bg-white bg-opacity-30 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-bold text-white shadow-md">
                        {tasks.length}
                    </span>
                </div>
            </div>

            {/* Droppable Area */}
            <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`min-h-[600px] p-4 rounded-xl transition-all duration-200 ${snapshot.isDraggingOver
                                ? 'bg-blue-100 dark:bg-blue-900 border-4 border-dashed border-blue-400 dark:border-blue-500 scale-105'
                                : 'bg-gray-100 dark:bg-gray-800 border-2 border-transparent'
                            }`}
                    >
                        {/* Task Cards */}
                        {tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={`${snapshot.isDragging
                                                ? 'opacity-70 rotate-3 scale-105 shadow-2xl'
                                                : 'opacity-100'
                                            } transition-all duration-200`}
                                    >
                                        <TaskCard
                                            task={task}
                                            onDelete={onDelete}
                                            onEdit={onEdit}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}

                        {/* Empty State */}
                        {tasks.length === 0 && (
                            <div className="text-center py-12">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mb-4">
                                    <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                    </svg>
                                </div>
                                <p className="text-gray-400 dark:text-gray-500 font-semibold">No tasks here</p>
                                <p className="text-sm text-gray-400 dark:text-gray-600 mt-1">Drag tasks here</p>
                            </div>
                        )}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;