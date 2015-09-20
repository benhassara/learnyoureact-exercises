var React = require('react');

var TodoBox = React.createClass({
  render: function() {
    return (
      <div className="todoBox">
        <h1>Todos</h1>
        <TodoList data = {this.props.data}/>
        <TodoForm />
      </div>
    );
  }
});

var TodoList = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data,
      titleValue: '',
      detailValue: ''
    }
  },
  changeTitle: function(event) {
    this.setState({titleValue: event.target.value});
  },
  changeDetail: function(event) {
    this.setState({detailValue: event.target.value});
  },
  addTodo: function () {
    var newList = this.state.data;
    newList.push({
      title: this.state.titleValue,
      detail: this.state.detailValue
    });

    this.setState({data: newList});
    this.setState({titleValue: ''});
    this.setState({detailValue: ''});
  },
  deleteTodo: function(title) {
    var dataLeft = this.props.data.filter(function(todo) {
      return title !== todo.title;
    });

    this.setState({data: dataLeft});
  },
  render: function() {
    var todo = this.props.data.map(function(obj) {
      return <Todo title={obj.title} onDelete={this.deleteTodo} key={obj.title}>{obj.detail}</Todo>
    }.bind(this));
    return (
      <div className="todoList">
        <div>
          Title:<input type="text" value={this.state.titleValue} onChange={this.changeTitle} />
          Detail:<input type="text" value={this.state.detailValue} onChange={this.changeDetail} />

          <button onClick={this.addTodo}>Add</button>
        </div>
        <table style={{border: "2px solid black"}}>
          <tbody>
            {todo}
          </tbody>
        </table>
      </div>
    );
  }
});

var Todo = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    onDelete: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      checked: false,
      TodoStyle: style.notCheckedTodo,
    };
  },
  render: function () {
    return (
      <tr style={this.state.TodoStyle}>
        <td>
          <button onClick={this._onDelete}>X</button>
        </td>
        <td style={style.tableContent}>
          <input checked={this.state.checked} onChange={this.handleChange} type="checkbox"/>
        </td>
        <td style={style.tableContent}>
          {this.props.title}
        </td>
        <td style={style.tableContent}>
          {this.props.children}
        </td>
      </tr>
    );
  },
  handleChange: function(e) {
    this.setState({checked: e.target.checked});
    if (e.target.checked) {
      this.setState({TodoStyle: style.notCheckedTodo});
    }
    else {
      this.setState({TodoStyle: style.checkedTodo});
    }
  },
  _onDelete: function() {
    this.props.onDelete(this.props.title);
  }
});

var TodoForm = React.createClass({
  render: function() {
    return (
      <div className="todoForm">
        I am a TodoForm.
      </div>
    );
  }
});

var style = {
  checkedTodo: {textDecoration: 'line-through'},
  notCheckedTodo: {textDecoration: 'none'},
  tableContent: {border: '1px solid black'}
};

module.exports = TodoBox;
