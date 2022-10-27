import React from 'react';
import { ReactComponent as Check } from '../../assets/check.svg';
import { ReactComponent as Delete } from '../../assets/delete.svg';
import firebase from "../../utils/firebase";
import "firebase/firestore";

import './Task.scss';


// inicializamos bd
const db = firebase.firestore(firebase);


export default function Task(props){

    const { task, setReloadTasks } = props;

    // Función para marcar tareas completadas
    const completeTask = () => {
        db.collection("tasks")
            .doc(task.id)
            .update({
                completed: !task.completed //Al clickear el check si está true lo cambio a false y si está false lo cambio a true
            })
            .then(() => {
                setReloadTasks(true);
            })
    }


    const deleteTask = () => {
        db.collection("tasks")
            .doc(task.id)
            .delete()
            .then(() => {
                setReloadTasks(true);
            })
    }


    return (
        <div className="task">
            <div>
                <Check 
                    className={task.completed ? "completed" : ""} //Si task.completed es true coloca la clase completed, sino coloca clase "" vacío
                    onClick={completeTask}
                />
            </div>
            <div>{task.name}</div>
            <div>
                <Delete 
                    onClick={deleteTask}
                />
            </div>
        </div>
    );
}