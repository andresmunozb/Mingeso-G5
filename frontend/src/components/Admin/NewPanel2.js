import React,{Component} from 'react';
import Axios from 'axios';
import {BootstrapTable, TableHeaderColumn, SearchField, ClearSearchButton} from 'react-bootstrap-table';
import {Panel} from 'react-bootstrap';

function onAfterDeleteRow(rowKeys) {
    alert('The rowkey you drop: ' + rowKeys);
  }

  /*class MySearchPanel extends React.Component {

    cleanBtnClick = () => {
      this.refs.seachInput.value = '';
      this.props.search('');
    }
  
  
    render() {
      return (
        <div className='input-group'>
          <span className='input-group-btn'>
            <button
              className='btn btn-default'
              type='button'
              onClick={ this.cleanBtnClick }>
              Limpiar
            </button>
          </span>
          <input
            ref='searchField'
            className='form-control'
            type='text'
            defaultValue={ this.props.defaultValue }
            placeholder={ this.props.placeholder }/>
        </div>
      );
    }
  }*/
  
  
  
  // If you want to enable deleteRow, you must enable row selection also.
  const selectRowProp = {
    mode: 'checkbox'
  };

class NewPanel2 extends Component{
    constructor(props) {    
        super(props);
        this.state = {
            careers: [],
            showNewCareer:false,
            nameNewCareer:'',
            selected:[],
        }
        this.getCareers = this.getCareers.bind(this);
        //this.deleteCareer = this.deleteCareer.bind(this);
        /*this.closeNewCareer = this.closeNewCareer.bind(this);
        this.showNewCareer = this.showNewCareer.bind(this);
        this.updateNameNewCareer = this.updateNameNewCareer.bind(this);
        this.createCareer = this.createCareer.bind(this);*/
        
        //this.handleOnSelect = this.handleOnSelect.bind(this);
        //this.handleOnSelectAll = this.handleOnSelectAll.bind(this);


    }
    getCareers(){
        Axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/careers/')
        .then( res => {
            const careers = res.data;
            this.setState({careers});
            console.log(this.state.careers);
        })
    }
    componentWillMount(){
        this.getCareers();
    }
    createCustomSearchField = (props) => {
        return (
          <SearchField
              className='my-custom-class'
              
              placeholder='Buscar'/>
        );
    }
    handleClearButtonClick = (onClick) => {
        // Custom your onClick event here,
        // it's not necessary to implement this function if you have no any process before onClick
        console.log('This is my custom function for ClearSearchButton click event');
        onClick();
      }
      createCustomClearButton = (onClick) => {
        return (
          <ClearSearchButton
            btnText='Limpiar'
            //btnContextual='btn-warning'
            className='my-custom-class'
            onClick={ e => this.handleClearButtonClick(onClick) }/>
        );
      }
    render(){
         
        const options = {
        afterDeleteRow: onAfterDeleteRow,  // A hook for after droping rows.
        exportCSVText: 'Exportar',
        insertText: 'Nuevo',
        deleteText: 'Borrar',
        saveText: 'Guardar',
        closeText: 'Cerrar',
        searchField: this.createCustomSearchField,
        clearSearch: true,
        clearSearchBtn: this.createCustomClearButton
        };

        return(
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">
                        Carreras
                    </Panel.Title>
                </Panel.Heading>
            <Panel.Body>
                <BootstrapTable data={ this.state.careers } pagination hover insertRow deleteRow exportCSV selectRow={ selectRowProp } search  options={ options }>
                    <TableHeaderColumn dataField='idCareer' isKey headerAlign='center' dataAlign='center'  width='20%' >#</TableHeaderColumn>
                    <TableHeaderColumn dataField='nameCareer' headerAlign='center' dataAlign='center'  width='80%'>Carrera</TableHeaderColumn>
                </BootstrapTable>
            
            </Panel.Body>
            </Panel>
            
        );

    }
}

export default NewPanel2;