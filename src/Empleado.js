import React,{Component} from 'react';
import {variables} from './Variables.js';

export class Empleado extends Component{

    constructor(props){
        super(props);

        this.state={
            empleados:[],
            areas:[]
        }
    }

    refreshList(){

        fetch(variables.API_URL+'Empleado')
        .then(response=>response.json())
        .then(json =>{
            this.setState({
                isLoaded:true,
                items:json,
            })
        })
        
    }
    refreshListAreas(){

        fetch(variables.API_URL+'Area')
        .then(response=>response.json())
        .then(json =>{
            this.setState({
                isLoaded:true,
                areas:json,
            })
        })
   
    }

    componentDidMount(){
        this.refreshList();
        this.refreshListAreas();
    }
    changeEmpName =(e)=>{
        this.setState({nombre_empleado:e.target.value});
    }
    changeEmpPuesto =(e)=>{
        this.setState({puesto_empleado:e.target.value});
        console.log(e.target.value);
        console.log(this.puesto_empleado);
    }
    changeEmpArea =(e)=>{
        this.setState({area_empleado:e.target.value});
        console.log(e.target.value);
        console.log(this.area_empleado);
    }
    addClick(){
        this.setState({
            modalTitle:"Agregar nuevo empleado",
            id_empleado:0

        });
    }
    editClick(data){
        this.setState({
            modalTitle:"Editar",
            id_empleado:data.id_empleado,
            nombre_empleado:data.nombre_empleado,
            puesto_empleado:data.puesto_empleado,
            id_area:data.area_empleado
        });
    }
    createClick(){
        console.log(this.state.area_empleado);
        fetch(variables.API_URL+'Empleado',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                nombre_empleado:this.state.nombre_empleado,
                puesto_empleado:this.state.puesto_empleado,
                id_area:this.state.area_empleado
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Error');
        })
    }
    updateClick(){
        fetch(variables.API_URL+'Empleado',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id_empleado:this.state.id_empleado,
                nombre_empleado:this.state.nombre_empleado,
                puesto_empleado:this.state.puesto_empleado,
                id_area:this.state.area_empleado
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Error');
        })
    }

    deleteClick(id){
        if(window.confirm('¿Está segudo de que desea eliminar?')){
        fetch(variables.API_URL+'Empleado/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Error');
        })
        }
    }
    render(){
        
        var {isLoaded, items, areas, modalTitle, id_empleado, nombre_empleado, puesto_empleado, area_empleado}
        = this.state;
        if(!isLoaded)
        {
            return <div>Cargando...</div>
        }else
        {
            
            return(
                <div className="stock-container">
                <button type="button"
                className="btn btn-primary m-2 float-end"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.addClick()}>
        Nuevo empleado
    </button>

            <table className="table table-striped">
             <thead>
                <tr>
                    <th>ID EMPLEADO</th>
                    <th>NOMBRE</th>
                    <th>PUESTO</th>
                    <th>AREA</th>
                    <th>OPCIONES</th>
                </tr>
            </thead>
            <tbody>
                {items.map((data, key)=>{
                    return(
                        <tr key={key}>
                        <td>{data.id_empleado}</td>
                        <td>{data.nombre_empleado}</td>
                        <td>{data.puesto_empleado}</td>
                        <td>{data.nombre_area}</td>
                        <td>
                            <button type="button" className="btn btn-light mr-1" data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={()=>this.editClick(data)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            </svg>Editar
                            </button>

                            <button type="button"
                             className="btn btn-light mr-1"
                            onClick={()=>this.deleteClick(data.id_empleado)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                         </svg>Eliminar
                </button>

                </td>
                        </tr>
                    );
                })}
            </tbody>
            </table>
            
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title">{modalTitle}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                ></button>
            </div>

        <div className="modal-body">
       <div className="input-group mb-3">
        <span className="input-group-text">Nombre empleado</span>
        <input type="text" className="form-control" value={nombre_empleado} onChange={this.changeEmpName}/>
        <span className="input-group-text">Puesto</span>
        <input type="text" className="form-control" value={puesto_empleado} onChange={this.changeEmpPuesto}/>
        <span className="input-group-text">Area</span>
        <select id='select' className="form-control" value={area_empleado} onChange={this.changeEmpArea}>
         {areas.map((data, key)=>{
                    return(
                        <option key={key} value={data.id_area}>{data.nombre_area}</option>
                    )
         })}
                
        </select>
       
       </div>
       {id_empleado===0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Crear</button>
        :null}

        {id_empleado!==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick()}
        >Actualizar</button>
        :null}
        

   </div>

</div>
</div> 
</div>


</div>
              
            );
        }
    }
}
