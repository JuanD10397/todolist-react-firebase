import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { map, size } from 'lodash';
import firebase from "./utils/firebase";
import "firebase/firestore";
import AddTask from './components/AddTask';
import Task from './components/Task';

import './App.scss';

const db = firebase.firestore(firebase);

export default function App() {

  // Estado para guardar todas las tareas que llegan de Firebase
  const [tasks, setTasks] = useState(null);
  // Cuando este estado se actualice volveré a llamar al useEffect. Osea recargo la lista de tareas
  const [reloadTasks, setReloadTasks] = useState(false);


  useEffect(() => {
    db.collection("tasks")
      .orderBy("completed") // Ordeno las tasks por la propiedad completed
      .get() // Obtener todas las tareas
      .then((response) => {
        //console.log(response); // En consola veo un objeto t con un atributo docs. Ahí dentro hay un array con todos los datos de la bd de firebase (pero aún no puedo verlos bien)
        
        const arrayTasks = [];

        // map es ciclo, itero en todas las respuestas para obtener los datos que me interesan. Lo que guardé en la bd
        map(response.docs, (task) => {

          // Data es un objeto con todas las propiedades de un elemento de la BD (id, name y completed )
          const data = task.data();
          data.id = task.id;
         
          // Arreglo con los datos de todos los elementos de la BD
          arrayTasks.push(data);
        });
        
        // Actualizamos el estado
        setTasks(arrayTasks);
      });
      setReloadTasks(false);
  }, [reloadTasks]);



  return (
    <Container fluid className="app">
      <div className="title">
        <h1>
          Juan Diego Pérez Fonseca
        </h1>   
      </div>

      <Row className="todo">
        <Col
          className="todo__title"
          //Recordar que Bootstrap trabaja con 12 columnas en la pantalla
          //span es el espacio que ocupará lo que pinto en pantalla y offset es el espacio libre a cada uno de los lados de la pantalla
          xs={{ span: 10, offset: 1}} //Esto es para móvil. Span va a ocupar 10 columnas y offset es que tendrá un espacio de 1 columna a la derecha y otra a la izquierda
          md={{ span:6, offset: 3}}
        >
          <h2>Today</h2>
        </Col>
        <Col
          className="todo__list"
          xs={{ span: 10, offset: 1}}
          md={{ span:6, offset: 3}}
        >
          {!tasks ? ( // Si tasks es null muestro Loading
            <div className="loading">
              <Spinner animation="border" />
              <span>Cargando...</span>
            </div>
          ) :  size(tasks) === 0 ? ( // Si tasks está vacío muestro No hay tareas
            <h3>No hay tareas...</h3>
          ) : (
            map(tasks, (task, index) => ( // Si no, ya hago el map de todas las tareas y las pinto
              // Hago un map del estado tasks, por cada task voy a retornar un Componente <Task />
              // cuando hago un map todo children debe tener una propiedad key única, en este caso pasaré el index de la iteración
              <Task key={index} task={task} setReloadTasks={setReloadTasks}/>
            ))
          )}

        </Col>
        <Col
          className="todo__input"
          xs={{ span: 10, offset: 1}}
          md={{ span:6, offset: 3}}
        >
          <AddTask setReloadTasks={setReloadTasks}/>
        </Col>
      </Row>
    </Container>
    
  );
}


