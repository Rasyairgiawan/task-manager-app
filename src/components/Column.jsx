import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import { Draggable } from '@hello-pangea/dnd';

const Column = ({ columnId, title, tasks, onDelete, onEdit, color }) => {
    return (
        <div className="flex-1 min-w-[300px]">
            <div className={`${color} rounded-lg p-4 mb-4`}>
                <h2 className="text-lg font-bold text-white flex items-center justify-between">
                    {title}
                    <span className="bg-white bg-opacity-30 rounded-full px-3 py-1 text-sm">
                        {tasks.length}
                    </span>
                </h2>
            </div>

            <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`min-h-[500px] p-4 rounded-lg transition ${snapshot.isDraggingOver
                                ? 'bg-blue-50 dark:bg-gray-600'
                                : 'bg-gray-50 dark:bg-gray-800'
                            }`}
                    >
                        {tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={snapshot.isDragging ? 'opacity-50' : ''}
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

                        {tasks.length === 0 && (
                            <div className="text-center py-8 text-gray-400 dark:text-gray-500">
                                No tasks yet
                            </div>
                        )}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;