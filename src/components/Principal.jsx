import React, {useState} from 'react';
import {Formik, useFormik} from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup'

const Principal = () => {
  const [Edit, SetEdit] = useState(false)
  const DataPlatos = [{

    cod:"VAL",
    nombre:"Valenciana",
    precio:"30000",
    adicional:"Cerdo"

  }]
  
  const [Datos, SetDatos] = useState(DataPlatos);

  const [Temp, SetTemp] = useState({
    cod: '', nombre: '', precio: '', adicional: ''
  })

  const Ingresar = (registro) =>{
    SetDatos([...Datos, registro])
  };

  const handleChange = (e) => {
    const {cod, value} = e.target
    SetTemp({
      ...Temp,
      [cod]:value
    })
  }
  const Editar = (Temp) => {
      const index = Datos.findIndex((registro) => registro.cod === Temp.cod)
      Datos[index] = {...Temp}
      SetTemp({
        cod: null, nombre: '', precio: '', adicional: ''
      })
    }
    
  

  const Eliminar = (cod) =>{
    const datos_nuevos = Datos.filter(registro => registro.cod !== cod)
    SetDatos(datos_nuevos)
  }
  
  const formik = useFormik({
    initialValues : Temp,

    validationSchema:Yup.object({
      cod:Yup.string()
      .required('Ingrese codigo del plato')
      .max(6,"Maximo 6 caracteres")
      .min(3,'Minimo 3 caracteres'),

       nombre:Yup.string()
      .required('Nombre del plato')
      .max(30,"Maximo 30 caracteres")
      .min(8,'Minimo 8 caracteres'),
      
      precio:Yup.string()
      .required('Ingrese el precio del plato')
      .max(15,"Maximo 15 caracteres")
      .min(4,'Minimo 4 caracteres'),

      adicional:Yup.string()
      .required('Ingrese el adicional')
      .max(30,"Maximo 30 caracteres")
      .min(10,'Minimo 10 caracteres'),

    }),

    onSubmit: (values) =>{
      const{cod, nombre, precio, adicional} = values
      const cod_temp = Datos.filter(registro => registro.cod === cod )

      if (cod_temp.length ===0){
        Ingresar(values);
        Swal.fire({
          icon: 'success',
          title: 'Plato ingresado!',
          showConfirmButton: false,
          timer: 1500
        })  
        formik.resetForm()

      }else{
        Swal.fire({
          icon: 'error',
          title: 'Este plato ya existe!',
          showConfirmButton: false,
          timer: 1500
        })  
      }

    },
  })

  return (

    <div class="form-row" id="todo">
      
      
      <div class="form-group col-md-6">

        <div class="padre" align="center">

          <br />
          <h2>Gestión</h2>
          {
            Edit ?
            <form class="principal" onSubmit="">
              <div class="form-row">

              <div class="form-group col-md-6">
                <label for="cod">Codigo</label>
                <input type="text" id="cod" name="cod" class="form-control" placeholder="" onChange={handleChange} value={Temp.cod} ></input>
                {formik.errors.cod && <div><small style={{color:"goldenrod"}}><em>{formik.errors.cod}</em></small></div>}
              </div>

              <div class="form-group col-md-6">
                <label for="nombre">Nombre</label>
                <input type="text" id="nombre" name="nombre" class="form-control" placeholder="" onChange={handleChange} value={Temp.nombre} ></input>
                {formik.errors.nombre && <div><small style={{color:"goldenrod"}}><em>{formik.errors.nombre}</em></small></div>}
              </div>

            </div>
            <br />
            <div class="form-row">

              <div class="form-group col-md-6">
                <label for="precio">Precio</label>
                <input type="text" id="precio" name="precio" class="form-control" placeholder="" onChange={handleChange} value={Temp.precio}></input>
                {formik.errors.precio && <div><small style={{color:"goldenrod"}}><em>{formik.errors.precio}</em></small></div>}
              </div>

              <div class="form-group col-md-6">
                <label for="adicional">Adicional</label>
                <input type="text" id="adicional" name="adicional" class="form-control" placeholder="" onChange={handleChange} value={Temp.adicional}></input>
                {formik.errors.adicional && <div><small style={{color:"goldenrod"}}><em>{formik.errors.adicional}</em></small></div>}
              </div>
  
            </div>
            <br />
            <button onClick={()=>Editar(Temp)} class="btn btn-secondary">Update</button>

            </form>
            
            :

            <form class="principal" onSubmit={formik.handleSubmit}>
              <div class="form-row">

                <div class="form-group col-md-6">
                  <label for="cod">Codigo</label>
                  <input type="text" id="cod" name="cod" class="form-control" placeholder="" onChange={formik.handleChange} value={formik.values.cod} ></input>
                  {formik.errors.cod && <div><small style={{color:"goldenrod"}}><em>{formik.errors.cod}</em></small></div>}
                </div>

                <div class="form-group col-md-6">
                  <label for="nombre">Nombre</label>
                  <input type="text" id="nombre" name="nombre" class="form-control" placeholder="" onChange={formik.handleChange} value={formik.values.nombre} ></input>
                  {formik.errors.nombre && <div><small style={{color:"goldenrod"}}><em>{formik.errors.nombre}</em></small></div>}
                </div>

              </div>
              <br />
              <div class="form-row">

                <div class="form-group col-md-6">
                  <label for="precio">Precio</label>
                  <input type="text" id="precio" name="precio" class="form-control" placeholder="" onChange={formik.handleChange} value={formik.values.precio}></input>
                  {formik.errors.precio && <div><small style={{color:"goldenrod"}}><em>{formik.errors.precio}</em></small></div>}
                </div>

                <div class="form-group col-md-6">
                  <label for="adicional">Adicional</label>
                  <input type="text" id="adicional" name="adicional" class="form-control" placeholder="" onChange={formik.handleChange} value={formik.values.adicional}></input>
                  {formik.errors.adicional && <div><small style={{color:"goldenrod"}}><em>{formik.errors.adicional}</em></small></div>}
                </div>
    
              </div>
              <br />
              <button type="submit" class="btn btn-secondary">Guardar</button>

              </form>
          }

        </div>

      </div>




      <div class="form-group col-md-6">

        <div class="padre" align="center">

          <br />
          <h2>Platos</h2>    
          <form class='principal' onSubmit={formik.handleSubmit}>

            <table className="table">

              <thead>

                <tr>
                  <th scope="col">Codigo</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Adicional</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>

              </thead>

              <tbody>
              {
                  Datos.map((registro) => {

                    const {cod, nombre, precio, adicional } = registro
                    return (
                      
                      <tr key={cod}>

                        <td>{cod}</td>
                        <td>{nombre}</td>
                        <td>{precio}</td>
                        <td>{adicional}</td>
                        <td>
                          <button onClick={()=>Editar(registro)} className='btn btn-light btn-sm'>
                            U
                          </button>
                        </td>
                        <td>
                          <button onClick={()=>Eliminar(cod)} className='btn btn-light btn-sm'>
                           D
                          </button>
                        </td>

                      </tr>
                    )
                  })
              }
            
              </tbody>

            </table>

          </form>  

        </div>  

      </div>
    </div>
  )
}

export default Principal
