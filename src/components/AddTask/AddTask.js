import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { isEmpty } from 'lodash'; //Paquete da muchas funcionalidades básicas de JS ampliadas. Usaremos una que se llama isEmpty()
import firebase from "../../utils/firebase";
import "firebase/firestore";
import { ReactComponent as Send } from '../../assets/send.svg';

import './AddTask.scss';

// Inicializar conexión con base de datos de firebase
const db = firebase.firestore(firebase);

export default function AddTask(props){

    const { setReloadTasks } = props;

    //Task contiene la tarea nueva que escribo en el input
    const [task, setTask] = useState("");

    const onSubmit = (e) => {
        e.preventDefault(); //Previene la recarga de la página al realizar el submit
        
        // Validaré que no se ingrese string vacía
        // Si NO está vacía
        if(!isEmpty(task)){
            //una colección es como una tabla para las BD no SQL
            db.collection("tasks") // Al hacer esto en el Firestore se guarda de una la colección tasks
                .add({
                    name: task, //Nombre de la tarea
                    completed: false    //Estado de la tarea, si está completada o no
                }) // Devuelve una promesa, si entra dentro del .then significa que se creó correctamente
                .then(() => {
                    setTask(""); // Reseteo el task luego de que guarde la tarea (limpi el input)
                    console.log("Tarea creada");
                    setReloadTasks(true); // Estado que paso por props, indico que la tarea fue completada
                }); 
        }
    }

    return (
        <Form onSubmit={onSubmit} className="add-task">
            <input 
                type="text" 
                placeholder='Nueva tarea...'
                //El e es el evento, cuando el input cambie recogemos el evento
                onChange={(e) => setTask(e.target.value)}
                value={task} //El input tendrá el valor del estado task
            />
            <Button type="submit">
                <Send />
            </Button>
        </Form>
    );
}
