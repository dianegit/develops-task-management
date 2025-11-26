import { Edit2, Trash2, Calendar, Tag, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

const priorityConfig = {
    low: { class: 'badge-low', icon: '🟢' },
    medium: { class: 'badge-medium', icon: '🟡' },
    high: { class: 'badge-high', icon: '🟠' },
    critical: { class: 'badge-critical', icon: '🔴' },
};

const statusConfig = {
    todo: { class: 'badge-todo', label: 'To Do', icon: '📋' },
    in_progress: { class: 'badge-in-progress', label: 'In Progress', icon: '⚡' },
    done: { class: 'badge-done', label: 'Done', icon: '✅' },
};

export const TaskCard = ({ task, onEdit, onDelete }) => {
    const priority = priorityConfig[task.priority] || priorityConfig.low;
    const status = statusConfig[task.status] || statusConfig.todo;

    return (
        <div className="task-card animate-fade-in hover-lift">
            {/* Priority Indicator Bar */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${task.priority === 'critical' ? 'from-red-500 via-pink-500 to-purple-500' :
                    task.priority === 'high' ? 'from-orange-500 to-red-500' :
                        task.priority === 'medium' ? 'from-yellow-400 to-orange-500' :
                            'from-green-400 to-emerald-500'
                }`}></div>

            <div className="flex justify-between items-start mb-4 mt-2">
                <div className="flex items-center space-x-2">
                    <span className={priority.class}>
                        {priority.icon} {task.priority.toUpperCase()}
                    </span>
                    <span className={status.class}>
                        {status.icon} {status.label}
                    </span>
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all duration-300 transform hover:scale-110"
                        title="Edit task"
                    >
                        <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-all duration-300 transform hover:scale-110"
                        title="Delete task"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-gradient">
                {task.title}
            </h3>

            {task.description && (
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {task.description}
                </p>
            )}

            <div className="space-y-2 mt-auto">
                {task.category && (
                    <div className="flex items-center space-x-2 text-sm">
                        <div className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                            <Tag className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                            {task.category}
                        </span>
                    </div>
                )}

                {task.due_date && (
                    <div className="flex items-center space-x-2 text-sm">
                        <div className={`p-1.5 rounded-lg ${new Date(task.due_date) < new Date() && task.status !== 'done'
                                ? 'bg-red-100 dark:bg-red-900/30 animate-pulse'
                                : 'bg-blue-100 dark:bg-blue-900/30'
                            }`}>
                            {new Date(task.due_date) < new Date() && task.status !== 'done' ? (
                                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                            ) : (
                                <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            )}
                        </div>
                        <span className={`font-medium ${new Date(task.due_date) < new Date() && task.status !== 'done'
                                ? 'text-red-600 dark:text-red-400'
                                : 'text-gray-700 dark:text-gray-300'
                            }`}>
                            {format(new Date(task.due_date), 'MMM dd, yyyy')}
                            {new Date(task.due_date) < new Date() && task.status !== 'done' && (
                                <span className="ml-2 text-xs">(Overdue)</span>
                            )}
                        </span>
                    </div>
                )}
            </div>

            {/* Decorative gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 rounded-2xl transition-all duration-500 pointer-events-none"></div>
        </div>
    );
};
