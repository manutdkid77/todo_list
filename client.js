var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    // Get number of completed todos.
    this.todos.forEach(function(todo){
      if(todo.completed===true)
      completedTodos++;
    });
    
    this.todos.forEach(function(todo){
      if(completedTodos===totalTodos){
        todo.completed=false;
      }
      else{
        todo.completed=true;
      }
    });
  }
};

var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    
    //Detect no input
    if(addTodoTextInput.value.match(/^\s*$/))
      return false;

    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }  
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    
    todoList.todos.forEach(function(todo,itemNo){
      var todoLi=document.createElement('li');
      var todoTextWithCompletion='';
      
      if(todo.completed===true)
        todoTextWithCompletion='(\u2713) '+todo.todoText;
      else
        todoTextWithCompletion='( ) '+todo.todoText;
        
      todoLi.textContent=todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todoLi.id=itemNo;
      todosUl.appendChild(todoLi);
    },this);
  },
  createDeleteButton:function(){
    var deleteButton=document.createElement('button');
    deleteButton.textContent='x';
    deleteButton.className='deleteButton';
    return deleteButton;
  },
  setUpEventListener:function(){
    var todoUl=document.querySelector('ul');
    todoUl.addEventListener('click',function(event){
        var clickedElement=event.target;
        
        if(clickedElement.className==='deleteButton')
          handlers.deleteTodo(parseInt(clickedElement.parentNode.id));
    });    
  }
};

view.setUpEventListener();