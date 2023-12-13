import React, { Component } from 'react';
import './App.css';

export default class AppDragDropDemo extends Component {
    state = {
        tasks: [
            {name:"queenBee",category:"player1", bgcolor: "yellow"},
            {name:"ant", category:"player1", bgcolor:"pink"},
            {name:"hopper", category:"player2", bgcolor:"skyblue"}
          ]
    }

    onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {
       let id = ev.dataTransfer.getData("id");
       
       let tasks = this.state.tasks.filter((task) => {
           if (task.name == id) {
               task.category = cat;
           }
           return task;
       });

       this.setState({
           ...this.state,
           tasks
       });
    }

    render() {
        var tasks = {
            player1: [],
            player2: [],
            playArea: []
        }

        this.state.tasks.forEach ((t) => {
            tasks[t.category].push(
                <div class="hex"
                    key={t.name} 
                    onDragStart = {(e) => this.onDragStart(e, t.name)}
                    draggable
                    style = {{backgroundColor: t.bgcolor}}
                >
                    {t.name}
                </div>
            );
        });

        return (
            <div className="container-drag">
                <h2 className="header">Bug Chess</h2>
                <div className="player1"
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "player1")}}>
                    <span className="task-header">Player 1</span>
                    {tasks.player1}
                </div>
                <div className="player2" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "player2")}>
                     <span className="task-header">Player 2</span>
                     {tasks.player2}
                </div>
                <div className="playArea" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "playArea")}>
                     <span className="task-header">Play Area</span>
                     {tasks.playArea}
                </div>
            </div>
        );
    }
}