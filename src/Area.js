import React,{Component} from 'react';
import {variables} from './Variables.js';

export class Area extends Component{

    constructor(props){
        super(props);

        this.state={
            areas:[]
        }
    }

    refreshList(){

        fetch(variables.API_URL+'Area')
        .then(response=>response.json())
        .then(json =>{
            this.setState({
                isLoaded:true,
                items:json,
            })
        })
        
    }

    componentDidMount(){
        this.refreshList();
    }
    changeAreaName =(e)=>{
        this.setState({nombre_area:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Agregar nueva area",
            id_area:0

        });
    }
    editClick(data){
        this.setState({
            modalTitle:"Editar",
            id_area:data.id_area,
            nombre_area:data.nombre_area
        });
    }

    createClick(){
        fetch(variables.API_URL+'Area',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                nombre_area:this.state.nombre_area
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
        fetch(variables.API_URL+'Area',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id_area:this.state.id_area,
                nombre_area:this.state.nombre_area
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
        fetch(variables.API_URL+'Area/'+id,{
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
        
        var {isLoaded, items, modalTitle, id_area, nombre_area}
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
        Nueva area
    </button>

            <table className="table table-striped">
             <thead>
                <tr>
                    <th>ID AREA</th>
                    <th>NOMBRE</th>
                    <th>OPCIONES</th>
                </tr>
            </thead>
            <tbody>
                {items.map((data, key)=>{
                    return(
                        <tr key={key}>
                        <td>{data.id_area}</td>
                        <td>{data.nombre_area}</td>
                        <td>
                            <button type="button" className="btn btn-light mr-1" data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={()=>this.editClick(data)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            </svg>EDITAR
                            </button>

                            <button type="button"
                             className="btn btn-light mr-1"
                            onClick={()=>this.deleteClick(data.id_area)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                         </svg>ELIMINAR
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
        <span className="input-group-text">Nombre area</span>
        <input type="text" className="form-control" value={nombre_area} onChange={this.changeAreaName}/>
       
       </div>
       {id_area===0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Crear</button>
        :null}

        {id_area!==0?
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
