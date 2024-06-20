import clsx from "clsx"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function App() {

const [koders, setKoders] = useState([])
/* const [text, setText] = useState("") */

const { register, handleSubmit, formState: { errors, isValid, isSubmitted }, reset, } = useForm()


function removeKoder(indexToRemove) {
 /*  todos.splice(indexToRemove, 1)
  setTodos([...todos]) */

  const newKoders = koders.filter((koder, idx) => idx !== indexToRemove )
  setKoders(newKoders)
}

function onSubmit(data) {
    setKoders([...koders,{ nombre: data.nombre, apellido: data.apellidos, correo: data.correo },])
    reset()
}

  return (
    <main className="w-full min-h-screen flex flex-col">
        <p className="w-full bg-teal-600 text-black font-bold text-center p-2">TO-DO react-hook-form</p>
      <form className="flex flex-row gap-2 justify-center p-5" 
        onSubmit={handleSubmit(onSubmit)}
      >
        <input 
          type="text"
          className={clsx("p-2 rounded text-black w-full max-w-screen-sm", {
            'border-2 border-red-500 bg-red-300': errors.nombre,
          })}
          placeholder="Nombre" 
          { ...register('nombre', {
            required: {value: true, message:'Campo requerido'},
            minLength: {value: 3, message:'3 caracteres minimo'},
            maxLength: {value: 180, message:'Mucho texto'},
          }) }
         />
        <input 
          type="text"
          className={clsx("p-2 rounded text-black w-full max-w-screen-sm", {
            'border-2 border-red-500 bg-red-300': errors.apellidos,
          })}
          placeholder="Apellidos" 
          { ...register('apellidos', {
            required: {value: true, message:'Campo requerido'},
            minLength: {value: 3, message:'3 caracteres minimo'},
            maxLength: {value: 180, message:'Mucho texto'},
          }) }
         />
        <input 
          type="email"
          className={clsx("p-2 rounded text-black w-full max-w-screen-sm", {
            'border-2 border-red-500 bg-red-300': errors.correo,
          })}
          placeholder="Correo" 
          { ...register('correo', {
            required: {value: true, message:'Campo requerido'},
            minLength: {value: 3, message:'3 caracteres minimo'},
            maxLength: {value: 180, message:'Mucho texto'},
          }) }
         />
        <button className={clsx("text-black px-3 rounded", {
            "bg-stone-400": isSubmitted ? !isValid : false,
            "bg-white": isSubmitted ? isValid : true,
        })}
         disabled={isSubmitted ? !isValid : false}>+ Agregar</button>
      </form>
      
      <div className="flex justify-around">
        { errors.nombre && (
          <p className="text-red-500 text-sm font-semibold">{errors.nombre?.message}</p>
        )}
        { errors.apellidos && (
          <p className="text-red-500  text-sm font-semibold">{errors.apellidos?.message}</p>
        )}
        { errors.correo && (
          <p className="text-red-500 text-sm font-semibold">{errors.correo?.message}</p>
        )}
      </div>

       
      <div className="max-w-screen-sm w-full mx-auto p-4 flex flex-col gap-1">
        {koders.length === 0 && (
          <p>No hay koders agregados 🤷‍♂️</p>
        )}
        {koders.length > 0 && 
          koders.map((koder, idx) => {
            return (
              <div 
                key={`koder-${idx}`} 
                className="bg-white/10 rounded p-4 flex flex-row justify-between select-none"
              >  
                <span>{koder.nombre}</span> 
                <span>{koder.apellido}</span>
                <span>{koder.correo}</span>
                <span className="text-red-500 cursor-pointer hover:bg-red-500 hover:text-white rounded-full size-5 text-center items-center" onClick={() => removeKoder(idx)} >x</span>
              </div> 
              ) 
          })}
      </div>
    </main>
  )
}