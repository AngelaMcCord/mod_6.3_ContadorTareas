import React, { useState, useEffect, useMemo } from 'react';

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [duracion, setDuracion] = useState('');
  const [filtroDuracion, setFiltroDuracion] = useState('');

  // Cargar tareas desde localStorage al iniciar la app
  useEffect(() => {
    const tareasGuardadas = localStorage.getItem('tareas');
  if (tareasGuardadas) {
    
    const cargarTareas = () => {
      setTareas(JSON.parse(tareasGuardadas));
    };
    cargarTareas();
  }
}, []);

  // Guardar tareas en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  // Cálculo de tiempo total optimizado con useMemo
  const calcularTiempoTotal = useMemo(() => {
    return tareas.reduce((total, tarea) => total + tarea.duracion, 0);
  }, [tareas]);

  // Actualizar título de la página
  useEffect(() => {
    document.title = `Total: ${calcularTiempoTotal} minutos`;
  }, [calcularTiempoTotal]);

  // Función para agregar una nueva tarea
  const agregarTarea = () => {
    if (nuevaTarea && duracion) {
      const nuevaTareaObj = {
        nombre: nuevaTarea,
        duracion: parseInt(duracion)
      };
      setTareas([...tareas, nuevaTareaObj]);
      setNuevaTarea('');
      setDuracion('');
    }
  };

  // Filtrar tareas según duración mínima
  const tareasFiltradas = tareas.filter(tarea =>
    filtroDuracion ? tarea.duracion >= parseInt(filtroDuracion) : true
  );

  return (
    <div style={{
      maxWidth: "500px",
      margin: "2rem auto",
      padding: "1.5rem",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#ffffffff",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(21, 213, 50, 0.1)"
    }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Contador de Tareas</h1>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Nombre de la tarea"
          style={{
            flex: 2,
            padding: "0.5rem",
            borderRadius: "5px",
            border: "1px solid #3b3a3aff"
          }}
        />
        <input
          type="number"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          placeholder="Duración"
          style={{
            flex: 1,
            padding: "0.5rem",
            borderRadius: "5px",
            border: "1px solid #525252ff"
          }}
        />
        <button
          onClick={agregarTarea}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#4caf50",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Agregar
        </button>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="number"
          value={filtroDuracion}
          onChange={(e) => setFiltroDuracion(e.target.value)}
          placeholder="Filtrar por duración mínima"
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "5px",
            border: "1px solid #302f2fff"
          }}
        />
      </div>

      <h2 style={{ color: "#2a2828ff" }}>Tareas</h2>
      <ul>
        {tareasFiltradas.map((tarea, index) => (
          <li key={index} style={{
            padding: "0.3rem 0",
            borderBottom: "1px solid #444141ff",
            color: "#63326aff"
          }}>
            {tarea.nombre}: {tarea.duracion} minutos
          </li>
        ))}
      </ul>

      <h3 style={{ textAlign: "center", marginTop: "1rem", color: "#333" }}>
        ⏱ Total de tiempo: {calcularTiempoTotal} minutos
      </h3>
    </div>
  );
}

export default App;