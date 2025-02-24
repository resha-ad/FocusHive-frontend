import React, { useState } from 'react';
import '../../styles/Task.css';
import beeImage from '../../assets/bee.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faProjectDiagram, faClock, faCalendar, faBullseye, faSearch, faPlus, faBars } from '@fortawesome/free-solid-svg-icons';

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [currentFilter, setCurrentFilter] = useState('all');
    const [completedVisible, setCompletedVisible] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [username, setUsername] = useState('');

    const handleAddTask = (event) => {
        event.preventDefault();
        const form = event.target;
        const newTask = {
            id: Date.now(),
            title: form.title.value,
            description: form.description.value,
            deadline: form.deadline.value,
            category: form.category.value,
            important: form.important.checked,
            completed: false,
        };
        setTasks([...tasks, newTask]);
        setIsAddModalOpen(false);
        form.reset();
    };

    const handleUpdateTask = (event) => {
        event.preventDefault();
        const form = event.target;
        const updatedTask = {
            ...taskToUpdate,
            title: form.title.value,
            description: form.description.value,
            deadline: form.deadline.value,
            category: form.category.value,
            important: form.important.checked,
            addToCalendar: form.addToCalendar.checked,
        };
        setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
        setIsUpdateModalOpen(false);
    };

    const toggleTaskCompletion = (taskId, isCompleted = false) => {
        if (isCompleted) {
            const task = completedTasks.find(t => t.id === taskId);
            if (task) {
                task.completed = false;
                setTasks([...tasks, task]);
                setCompletedTasks(completedTasks.filter(t => t.id !== taskId));
            }
        } else {
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                task.completedAt = new Date();
                setCompletedTasks([...completedTasks, task]);
                setTasks(tasks.filter(t => t.id !== taskId));
            }
        }
    };

    const deleteTask = (taskId, isCompleted = false) => {
        if (isCompleted) {
            setCompletedTasks(completedTasks.filter(t => t.id !== taskId));
        } else {
            setTasks(tasks.filter(t => t.id !== taskId));
        }
    };

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = currentFilter === 'all' ||
            (currentFilter === 'important' && task.important) ||
            (currentFilter === 'category' && task.category === document.getElementById('categoryFilter').value);
        return matchesSearch && matchesFilter;
    });

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    return (
        <div className="task-container">
            <div className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
                <div className="nav-item" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faBars} />
                    <span className={isExpanded ? '' : 'hidden'}>Menu</span>
                </div>
                <div className="nav-item active">
                    <FontAwesomeIcon icon={faTasks} />
                    <span className={isExpanded ? '' : 'hidden'}>Tasks</span>
                </div>
                <div className="nav-item">
                    <FontAwesomeIcon icon={faProjectDiagram} />
                    <span className={isExpanded ? '' : 'hidden'}>Projects</span>
                </div>
                <div className="nav-item">
                    <FontAwesomeIcon icon={faClock} />
                </div>
                <div className="nav-item">
                    <FontAwesomeIcon icon={faCalendar} />
                </div>
                <div className="nav-item">
                    <FontAwesomeIcon icon={faBullseye} />
                </div>
            </div>
            <div className="main-content">
                <div className="header">
                    <h1>Focus Hive</h1>
                    <div className="search-add">
                        <div className="search-box">
                            <FontAwesomeIcon icon={faSearch} />
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="add-btn" onClick={openAddModal}>
                            <FontAwesomeIcon icon={faPlus} /> Add Task
                        </button>
                    </div>
                </div>

                <div className="motivational">
                    <img src={beeImage} alt="Bee" className="bee-img" />
                    <div>
                        <h2>Welcome back, {username}!</h2>
                        <p>Stay busy as a bee! You'll achieve your goals, one task at a time!</p>
                    </div>
                </div>

                <div className="filters">
                    <button className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`} onClick={() => setCurrentFilter('all')}>All</button>
                    <button className={`filter-btn ${currentFilter === 'important' ? 'active' : ''}`} onClick={() => setCurrentFilter('important')}>Important</button>
                    <select id="categoryFilter" className="filter-btn" onChange={() => setCurrentFilter('category')}>
                        <option value="">Select Category</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Study">Study</option>
                        <option value="General">General</option>
                    </select>
                </div>

                <div className="tasks">
                    <h2>Active Tasks</h2>
                    {filteredTasks.map(task => (
                        <div key={task.id} className="task-card">
                            <div className="task-content">
                                <div className="task-info">
                                    <div className="checkbox" onClick={() => toggleTaskCompletion(task.id)}></div>
                                    <div>
                                        <h3>{task.title}</h3>
                                        {task.description && <p>{task.description}</p>}
                                        <div className="tags">
                                            {task.category && <span className="tag category">{task.category}</span>}
                                            {task.deadline && <span className="tag deadline"><i className="fas fa-calendar"></i> Due: {task.deadline}</span>}
                                            {task.important && <span className="tag important">Important</span>}
                                            {task.addToCalendar && <span className="tag calendar"><i className="fas fa-calendar"></i> Added to Calendar</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="task-actions">
                                    <button onClick={() => openUpdateModal(task)}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button onClick={() => deleteTask(task.id)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="completed">
                    <div className="completed-header" onClick={() => setCompletedVisible(!completedVisible)}>
                        <h2>Completed Tasks</h2>
                        <i className={`fas fa-chevron-${completedVisible ? 'up' : 'down'}`}></i>
                    </div>
                    <div className={`completed-tasks ${completedVisible ? 'visible' : 'hidden'}`}>
                        {completedTasks.map(task => (
                            <div key={task.id} className="task-card completed">
                                <div className="task-content">
                                    <div className="task-info">
                                        <div className="checkbox checked" onClick={() => toggleTaskCompletion(task.id, true)}></div>
                                        <div>
                                            <h3>{task.title}</h3>
                                            {task.description && <p>{task.description}</p>}
                                            <div className="tags">
                                                {task.category && <span className="tag category">{task.category}</span>}
                                                {task.important && <span className="tag important">Important</span>}
                                                {task.addToCalendar && <span className="tag calendar"><i className="fas fa-calendar"></i> Added to Calendar</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => deleteTask(task.id, true)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isAddModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add New Task</h2>
                        <form onSubmit={handleAddTask}>
                            <input
                                type="text"
                                name="title"
                                placeholder="Task title"
                                required
                            />
                            <textarea
                                name="description"
                                placeholder="Description (optional)"
                            ></textarea>
                            <div className="date-category">
                                <input
                                    type="date"
                                    name="deadline"
                                    required
                                />
                                <select name="category" required>
                                    <option value="">Select Category</option>
                                    <option value="Work">Work</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Study">Study</option>
                                    <option value="General">General</option>
                                </select>
                            </div>
                            <div className="checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="important"
                                    />
                                    Mark as important
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="addToCalendar"
                                    />
                                    Add to Calendar
                                </label>
                            </div>
                            <div className="modal-actions">
                                <button type="submit">Add Task</button>
                                <button type="button" onClick={closeAddModal}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isUpdateModalOpen && taskToUpdate && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Update Task</h2>
                        <form onSubmit={handleUpdateTask}>
                            <input type="text" name="title" defaultValue={taskToUpdate.title} required />
                            <textarea name="description" defaultValue={taskToUpdate.description}></textarea>
                            <input type="date" name="deadline" defaultValue={taskToUpdate.deadline} />
                            <select name="category" defaultValue={taskToUpdate.category}>
                                <option value="General">Select Category</option>
                                <option value="Work">Work</option>
                                <option value="Personal">Personal</option>
                                <option value="Study">Study</option>
                                <option value="General">General</option>
                            </select>
                            <label>
                                <input type="checkbox" name="important" defaultChecked={taskToUpdate.important} />
                                Mark as important
                            </label>
                            <label>
                                <input type="checkbox" name="addToCalendar" defaultChecked={taskToUpdate.addToCalendar} />
                                Add to Calendar
                            </label>
                            <div className="modal-actions">
                                <button type="submit">Update Task</button>
                                <button type="button" onClick={() => setIsUpdateModalOpen(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Task;