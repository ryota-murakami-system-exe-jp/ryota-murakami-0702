class RainbowTodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('rainbowTodos')) || [];
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.totalTasks = document.getElementById('totalTasks');
        this.completedTasks = document.getElementById('completedTasks');
        this.pendingTasks = document.getElementById('pendingTasks');
        this.clearCompleted = document.getElementById('clearCompleted');
        this.clearAll = document.getElementById('clearAll');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.renderTodos();
        this.updateStats();
    }
    
    bindEvents() {
        // 追加ボタンのクリックイベント
        this.addBtn.addEventListener('click', () => this.addTodo());
        
        // Enterキーでタスク追加
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });
        
        // 完了済みタスクを削除
        this.clearCompleted.addEventListener('click', () => this.clearCompletedTodos());
        
        // 全てのタスクを削除
        this.clearAll.addEventListener('click', () => this.clearAllTodos());
        
        // 入力フィールドにフォーカスを当てる
        this.todoInput.focus();
    }
    
    addTodo() {
        const text = this.todoInput.value.trim();
        
        if (text === '') {
            this.showNotification('タスクを入力してください！', 'warning');
            return;
        }
        
        if (text.length > 100) {
            this.showNotification('タスクは100文字以内で入力してください！', 'warning');
            return;
        }
        
        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toLocaleString('ja-JP')
        };
        
        this.todos.unshift(todo);
        this.todoInput.value = '';
        this.saveTodos();
        this.renderTodos();
        this.updateStats();
        this.showNotification('タスクが追加されました！', 'success');
    }
    
    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodos();
        this.renderTodos();
        this.updateStats();
        this.showNotification('タスクが削除されました！', 'info');
    }
    
    toggleTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.renderTodos();
            this.updateStats();
            
            if (todo.completed) {
                this.showNotification('タスクが完了しました！🎉', 'success');
            } else {
                this.showNotification('タスクが未完了に戻されました', 'info');
            }
        }
    }
    
    clearCompletedTodos() {
        const completedCount = this.todos.filter(todo => todo.completed).length;
        
        if (completedCount === 0) {
            this.showNotification('完了済みのタスクがありません', 'info');
            return;
        }
        
        if (confirm(`${completedCount}個の完了済みタスクを削除しますか？`)) {
            this.todos = this.todos.filter(todo => !todo.completed);
            this.saveTodos();
            this.renderTodos();
            this.updateStats();
            this.showNotification(`${completedCount}個のタスクが削除されました！`, 'success');
        }
    }
    
    clearAllTodos() {
        if (this.todos.length === 0) {
            this.showNotification('削除するタスクがありません', 'info');
            return;
        }
        
        if (confirm(`全ての${this.todos.length}個のタスクを削除しますか？`)) {
            this.todos = [];
            this.saveTodos();
            this.renderTodos();
            this.updateStats();
            this.showNotification('全てのタスクが削除されました！', 'success');
        }
    }
    
    renderTodos() {
        this.todoList.innerHTML = '';
        
        if (this.todos.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.className = 'empty-message';
            emptyMessage.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #666; font-size: 1.1rem;">
                    🌈 新しいタスクを追加してみましょう！
                </div>
            `;
            this.todoList.appendChild(emptyMessage);
            return;
        }
        
        this.todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <button class="todo-delete">削除</button>
            `;
            
            // チェックボックスのイベント
            const checkbox = li.querySelector('.todo-checkbox');
            checkbox.addEventListener('change', () => this.toggleTodo(todo.id));
            
            // 削除ボタンのイベント
            const deleteBtn = li.querySelector('.todo-delete');
            deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));
            
            this.todoList.appendChild(li);
        });
    }
    
    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(todo => todo.completed).length;
        const pending = total - completed;
        
        this.totalTasks.textContent = `総タスク: ${total}`;
        this.completedTasks.textContent = `完了: ${completed}`;
        this.pendingTasks.textContent = `未完了: ${pending}`;
    }
    
    saveTodos() {
        localStorage.setItem('rainbowTodos', JSON.stringify(this.todos));
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    showNotification(message, type = 'info') {
        // 既存の通知を削除
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // 通知のスタイル
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        // タイプ別の背景色
        switch (type) {
            case 'success':
                notification.style.background = 'linear-gradient(45deg, #32cd32, #00bfff)';
                break;
            case 'warning':
                notification.style.background = 'linear-gradient(45deg, #ffa500, #ff6b6b)';
                break;
            case 'info':
                notification.style.background = 'linear-gradient(45deg, #00bfff, #4169e1)';
                break;
            default:
                notification.style.background = 'linear-gradient(45deg, #666, #888)';
        }
        
        document.body.appendChild(notification);
        
        // 3秒後に自動削除
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
}

// アニメーションのCSSを動的に追加
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// アプリケーションの初期化
document.addEventListener('DOMContentLoaded', () => {
    new RainbowTodoApp();
});

// ページ読み込み時のウェルカムメッセージ
window.addEventListener('load', () => {
    setTimeout(() => {
        const app = new RainbowTodoApp();
        if (app.todos.length === 0) {
            app.showNotification('🌈 Rainbow Todo Appへようこそ！', 'success');
        }
    }, 500);
});