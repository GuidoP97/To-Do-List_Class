import React, { Component } from 'react'
import { createGlobalStyle } from 'styled-components'

import allColors from './styles/colors'

import {generate as id} from 'shortid';
import FormTask from './Components/FormTask';
import Task from './Components/Task';

const GlobalSyle = createGlobalStyle`
    body{
        font-family:sans-serif;
        background-color: #222;
        color:${allColors.mainColor};
        text-align: center;
        margin:0;
    }
`

class App extends Component {

    state = {
        colorSelected: allColors.colors[0],
        tasks: [
            {
                title:'Aprender React',
                color: allColors.colors[0],
                done:false
            }
        ]
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(e.target.title.value.trim() !== ''){
            this.createNewTask(e.target.title.value)
            e.target.title.value = ``
        }
    }

    createNewTask = (title) => {
        const newTask = {
            id:id(),
            title,
            color:this.state.colorSelected,
            done:false
        }

        const allTask = [...this.state.tasks, newTask];

        this.setState({tasks: allTask});
    }

    getTask = (id) => {
        const task = this.state.tasks.find(task => task.id === id)
        return task
    }

    handleCompleteTask = (id) => {
        const currentTasks = this.state.tasks
        const task = this.getTask(id)
        const index = currentTasks.indexOf(task)

        currentTasks[index].done = !currentTasks[index].done

        this.setState({ tasks: currentTasks })
    }

    handleDeleteTask = (id) => {
        let currentTasks = this.state.tasks
        currentTasks = currentTasks.filter(task => task.id !== id)

        this.setState({tasks: currentTasks});
    }

    handleChangeColor = (color) => {
        this.setState({ colorSelected: color })
    }

    render() {
        const { colorSelected, tasks } = this.state

        return (
            <>
                <GlobalSyle />
                <h1>To do list</h1>
                <FormTask 
                    handleChangeColor={this.handleChangeColor}
                    handleSubmit={this.handleSubmit}
                    colorSelected={colorSelected}
                />
                {this.state.tasks.length === 0 && <h3>No tasks yet</h3>}
                <div>
                    {
                        tasks.map(task => (
                            <Task
                                color={task.color}
                                done={task.done}
                                key={id()}
                                title={task.title}
                                handleCompleteTask={() => this.handleCompleteTask(task.id)}
                                handleDeleteTask={()=> this.handleDeleteTask(task.id)}
                            />
                        ))
                    }
                </div>
            </>

        )
    }
}

export default App;