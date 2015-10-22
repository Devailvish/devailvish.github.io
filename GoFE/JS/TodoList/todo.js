/**
 * Created by elenapotebenko on 13.08.15.
 */
(function () {
    function ToDo() {
        var storage = new Storage(),
            model = new Model(storage),
            template = new Template(),
            view = new View(model, template),
            controller = new Controller(model, view);

        view.init();
        controller.init();

        return controller;
    }

    function Item(text) {
        this.id = (new Date().getTime() * Math.random());
        this.isComplete = false;
        this.text = text;
    }

// Хранилище данных
    function Model(storage) {
        var tasks = storage.load() || {};
        this.get = function (itemId) {
            return tasks[itemId];
        };
        this.add = function (item) {
            tasks[item.id] = item;
            this.store();
        };
        this.remove = function(taskId){
            delete tasks[taskId];
            this.store();
        };
        this.getAll = function () {
            return tasks;
        };
        this.store = function(){
            storage.store(tasks);
        }
    }

    function View(model, template) {
        var container, todoList, todoInput, todoSubmit;
        this.init = function () {
            container = document.createElement('div');
            container.className = 'todo';

            todoList = document.createElement('div');
            todoList.className = 'todo__list';

            todoInput = document.createElement('input');
            todoInput.className = 'todo__input';

            todoSubmit = document.createElement('button');
            todoSubmit.className = 'todo__submit';
            todoSubmit.textContent = 'Записать';

            container.appendChild(todoList);
            container.appendChild(todoInput);
            container.appendChild(todoSubmit);

            document.body.appendChild(container);
        };
        this.render = function () {
            var html = '';
            var tasks = model.getAll();
            for (var taskId in tasks) {
                html += template.render(tasks[taskId]);
            }
            todoList.innerHTML = html;
        };
        this.getList = function () {
            return todoList
        };
        this.getSubmitButton = function () {
            return todoSubmit
        };
        this.getInput = function () {
            return todoInput
        };
    }

    function Controller(model, view) {
        this.init = function () {
            view.render();
            view.getSubmitButton().addEventListener('click', function () {
                var input = view.getInput(),
                    todoText = input.value;
                if (todoText) {
                    var newItem = new Item(todoText);
                    model.add(newItem);
                    input.value = '';
                    input.focus();
                    view.render();
                }
            });
            view.getList().addEventListener('change', function(e) {
                var input = e.target,
                    taskId = input.parentNode.dataset.id;

                switch (input.type) {
                    case 'checkbox':
                        model.get(taskId).isComplete = input.checked;
                        break;
                    case 'text':
                        model.get(taskId).text = input.value;
                        break;
                }
                model.store();
            });
            view.getList().addEventListener('click',function(e){
                if (e.target.type !=='button')return;
                var input = e.target,
                    taskId = input.parentNode.dataset.id;
                model.remove(taskId);
                input.parentNode.remove();
            });
        };
    }

    function Template() {
        this.render = function (item) {
            return '<label class="todo__list-item" data-id="' + item.id + '">' +
                '<input class = "todo__list-item-checkbox" type="checkbox"' + (item.isComplete ? 'checked' : '') + '>' +
                '<input class="todo__list-item-text" type="text" value="' + item.text + '"/>' +
                '<input class="todo__list-remove" type="button" value="x"/>' +
                '</label>';
        }
    }

    function Storage() {
        this.store = function (tasks) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        };
        this.load = function () {
            return JSON.parse(localStorage.getItem('tasks'));
        };
    }

    window.ToDo = ToDo;
})();