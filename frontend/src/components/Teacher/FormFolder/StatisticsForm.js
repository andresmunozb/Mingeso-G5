import React ,{Component} from 'react';
import { Button,Dropdown,Grid,Dimmer,Loader,Segment } from 'semantic-ui-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from '../ThemeList';
import Paper from 'material-ui/Paper';
import {Row,Col, Modal} from 'react-bootstrap'
import DatePicker from 'material-ui/DatePicker';
import Axios from 'axios'

import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts/lib/ReactFC.js';

Charts(FusionCharts);



const background = {
    bigFrame:{
        padding: 15,
        position:'relative'
    },
}
class StadisticsForm extends Component{
    constructor(props) {
        super(props)
        this.state = {
            userOptions : [ { key: 'Career', text: 'Carrera', value: 'Career' },
                            { key: 'Class', text: 'Curso', value: 'Class' },
                            { key: 'Student', text: 'Estudiante', value: 'Student' },
                            { key: 'Coordination', text: 'Coordinacion', value: 'Coordination' }],
            userOption: null,
            specificOptions : null,    
            specificChoices: [],
            startDate:null,
            endDate:null,
            minDate: new Date("July 21, 1983 00:0:00"),

            maxDate: new Date("July 21, 2083 00:0:00"),
            
            errorMessageRender:false,
            errorMessage: "",
            startDateString:null,
            endDateString:null,
            singleChartBool: false,
            multiChartBool:false,
            loader:false,
            comboBoxDisable:false,
            replacementOptions: null,
            
            buttonDisabler:  true,
            loadingDropDown: false,
            loadingText: "Seleccione...",
            chartConfigsSingleLine : {
                type: 'line',
                renderAt: 'chart-container',
                width: '700',
                height: '400',
                dataFormat: 'json',
                dataSource: {
                    chart: {
                       
                      caption: "Fecha vs Tiempo invertido",
                      subCaption: "",
                      xAxisName: "Fecha",
                      yAxisName: "Tiempo invertido (seg)",
                      //Cosmetics
                      lineThickness : "2",
                      paletteColors : "#0075c2",
                      baseFontColor : "#333333",
                      baseFont : "Helvetica Neue,Arial",
                      captionFontSize : "14",
                      subcaptionFontSize : "14",
                      subcaptionFontBold : "0",
                      showBorder : "0",
                      bgColor : "#ffffff",
                      showShadow : "0",
                      canvasBgColor : "#ffffff",
                      canvasBorderAlpha : "0",
                      divlineAlpha : "100",
                      divlineColor : "#999999",
                      divlineThickness: "1",
                      divLineIsDashed : "1",
                      divLineDashLen : "1",
                      divLineGapLen : "1",
                      showXAxisLine : "1",
                      xAxisLineThickness : "1",
                      xAxisLineColor : "#999999",
                      showAlternateHGridColor : "0",
                    },
                    data: null
                  }
            },
            
            chartConfigsMultiLine: {
                type: 'zoomline',
                renderAt: 'chart-container',
                width: '700',
                height: '400',
                dataFormat: 'json',
                dataSource: {
                    chart: {
                        caption: "Fecha vs Tiempo invertido",
                        subCaption: "",
                        xAxisName: "Fecha",
                        yAxisName: "Tiempo invertido (seg)",
                        captionFontSize: "14",
                        subcaptionFontSize: "14",
                        subcaptionFontBold: "0",
                        paletteColors: "#1aaf5d,#00ffff,#f0ffff,#f5f5dc,#000000,#0000ff,#a52a2a,#00ffff,#00008b,#008b8b,#a9a9a9,#006400,#bdb76b,#8b008b,#556b2f,#ff8c00,#9932cc,#8b0000,#e9967a,#9400d3,#ff00ff,#ffd700,#008000,#4b0082,#f0e68c,#add8e6,#e0ffff,#90ee90,#d3d3d3,#ffb6c1,#ffffe0,#00ff00,#ff00ff,#800000,#000080,#808000,#ffa500,#ffc0cb,#800080,#800080,#ff0000,#c0c0c0,#ffff00",
                        bgcolor: "#ffffff",
                        showBorder: "0",
                        showShadow: "0",
                        showCanvasBorder: "0",
                        usePlotGradientColor: "0",
                        legendBorderAlpha: "0",
                        legendShadow: "0",
                        showAxisLines: "0",
                        showAlternateHGridColor: "0",
                        divlineThickness: "1",
                        divLineIsDashed: "1",
                        divLineDashLen: "1",
                        divLineGapLen: "1",
                        showValues: "0"               
                    },
                    categories: [
                        {
                            category: null
                        }
                    ],
                    dataset: null
                }
            },

            chartConfigsSingleBar : {
                type: 'column2d',
                renderAt: 'chart-container',
                width: '700',
                height: '400',
                border:"1px solid white",
                dataFormat: 'json',
                dataSource:  {
                    chart: {
                       
                      caption: "Fecha vs Cantidad de soluciones",
                      subCaption: "",
                      xAxisName: "Fecha",
                      yAxisName: "Numero de soluciones",
                      paletteColors: "#0075c2",
                      bgColor: "#ffffff",
                      borderAlpha: "20",
                      canvasBorderAlpha: "0",
                      usePlotGradientColor: "0",
                      plotBorderAlpha: "10",
                      placevaluesInside: "1",
                      rotatevalues: "1",
                      valueFontColor: "#ffffff",                
                      showXAxisLine: "1",
                      xAxisLineColor: "#999999",
                      divlineColot: "#999999",               
                      divLineIsDashed: "1",
                      showAlternateHGridColor: "0",
                      subcaptionFontBold: "0",
                      subcaptionFontSize: "14"
                    },
                    data:null
                }
            },

            chartConfigsMultiBar:{
                type: 'mscolumn2d',
                renderAt: 'chart-container',
                width: '700',
                height: '400',
                dataFormat: 'json',
                dataSource: {
                    chart: {
                        caption: "Fecha vs Cantidad de soluciones",
                        subCaption: "",
                        xAxisName: "Fecha",
                        yAxisName: "Numero de soluciones",
                        plotFillAlpha: "80",
                        //Cosmetics
                        paletteColors: "#0075c2,#1aaf5d",
                        baseFontColor: "#333333",
                        baseFont: "Helvetica Neue,Arial",
                        captionFontSize: "14",
                        subcaptionFontSize: "14",
                        subcaptionFontBold: "0",
                        showBorder: "0",
                        bgColor: "#ffffff",
                        showShadow: "0",
                        canvasBgColor: "#ffffff",
                        canvasBorderAlpha: "0",
                        divlineAlpha: "100",
                        divlineColor: "#999999",
                        divlineThickness: "1",
                        divLineIsDashed: "1",
                        divLineDashLen: "1",
                        divLineGapLen: "1",
                        usePlotGradientColor: "0",
                        showplotborder: "0",
                        valueFontColor: "#ffffff",
                        placeValuesInside: "1",
                        showHoverEffect: "1",
                        rotateValues: "1",
                        showXAxisLine: "1",
                        xAxisLineThickness: "1",
                        xAxisLineColor: "#999999",
                        showAlternateHGridColor: "0",
                        legendBgAlpha: "0",
                        legendBorderAlpha: "0",
                        legendShadow: "0",
                        legendItemFontSize: "10",
                        legendItemFontColor: "#666666"
                    },
                    categories: [{
                        category: null
                    }],
                    dataset: null
                }

            },
            
            valueDropdown:[],
            statistics: null,
            renderGraphics:false

        }
        this.checkFields = this.checkFields.bind(this)
        this.handleStartDate = this.handleStartDate.bind(this)
        this.handleEndDate = this.handleEndDate.bind(this)
        this.modeSelection = this.modeSelection.bind(this)
        this.specificSelection = this.specificSelection.bind(this) 
        this.cancelPlots = this.cancelPlots.bind(this)
        this.formatForPlots = this.formatForPlots.bind(this)


        //LOADING SCREEN
        this.handleLoader = this.handleLoader.bind(this)


        //BUTTON DISABLER
        this.handleDisableFilterButton = this.handleDisableFilterButton.bind(this);
        this.handleNotDisableFilterButton = this.handleNotDisableFilterButton.bind(this);

        //COMBOBOX DISABLER
        this.handleDisablerCombobox = this.handleDisablerCombobox.bind(this)
        this.handleNotDisablerCombobox = this.handleNotDisablerCombobox.bind(this)

        //MODAL

        this.handleShowErrorMessage = this.handleShowErrorMessage.bind(this);
        this.handleHideErrorMessage = this.handleHideErrorMessage.bind(this);
        //MODAL

        this.multipleStadistics = this.multipleStadistics.bind(this);


        this.loadDropDown = this.loadDropDown.bind(this)
    }
    loadDropDown(){
        this.setState({loadingDropDown: !this.state.loadingDropDown})
    }

    handleDisablerCombobox() {
        this.setState({ comboBoxDisable: true });
    }
    handleNotDisablerCombobox() {
        this.setState({ comboBoxDisable: false });
    }

    handleLoader(){
        this.setState({loader: !this.state.loader});
    }

    handleShowErrorMessage() {
        this.setState({ errorMessageRender: true });
    }
    handleHideErrorMessage() {
        this.setState({ errorMessageRender: false });
    }


    handleDisableFilterButton() {
        this.setState({ buttonDisabler: true });
    }
    handleNotDisableFilterButton() {
        this.setState({ buttonDisabler: false });
    }

    formatForPlots(type, statistics){
        //Es grafico de 1 sola linea (tiempo invertido) o barra(cantidad de soluciones)
        var month;
        var day;
        var data;
        if(statistics.length === 1){
            var singleStatistics = statistics[0]
            var actualSingleStatistics = []
            /*
            FORMATO: Ej:  {  
                            "label": "Tue",
                            "value": "14233"
                        }
            */
            for(let i = 0; i<singleStatistics.length; i++){

                    switch(singleStatistics[i].date.substring(3,5)){
                        case "01":  month = "En"
                                    break;
                        case "02":  month = "Feb"
                                    break;
                        case "03":  month = "Mar"
                                    break;
                        case "04":  month = "Abr"
                                    break;
                        case "05":  month = "May"
                                    break;
                        case "06":  month = "Jun"
                                    break;
                        case "07":  month = "Jul"
                                    break;
                        case "08":  month = "Ago"
                                    break;
                        case "09":  month = "Sep"
                                    break;
                        case "10":  month = "Oct"
                                    break;
                        case "11":  month = "Nov"
                                    break;
                        case "12":  month = "Dic"
                                    break;
                        default:

                        break
                    }
                    day = singleStatistics[i].date.substring(0,2)

                    if(type === "line"){
                         //Tiempo invertido, hay que usar el "spendTime"

                         data = singleStatistics[i].spendTime
                    }
                    else{
                         //Cantidad de soluciones, hay que usar el "solutions"

                         data = singleStatistics[i].solutions

               
                    }

                    actualSingleStatistics.push({label: day+' '+month, value: data.toString() });

            }

            console.log("este es el formato de las estadisticas")
            console.log(actualSingleStatistics)


            return actualSingleStatistics;


        }
        //Grafico de varias lineas (tiempos invertidos) o barras(cantidad de soluciones)
        else{
            //Categorias eje x (fechas comunes entre datos)
            var category = []
            //Dataset eje Y (conjunto de datos a mostrar en eje Y)
            var dataset = []


            //Las estadisticas estan hechas de "category" y "dataset"
            var actualMultiStatistics = []



            //1.- Sacar el eje X (fechas comunes entre datos)
            /*
            FORMATO: Ej:  
                        .
                        .
                        .
                        {  
                            "label": "11 Mar",
                        }
                        .
                        .
                        .
            */

            //2.- Sacar el eje Y (dado las estadisticas)
             /*
            FORMATO: Ej:
                        .
                        .
                        .
                        {
                            "seriesname": "Previous Year",
                            "data": [{
                                "value": "10000"
                            }, {
                                "value": "11100"
                            }, {
                                "value": "12100"
                            }, {
                                "value": "11000"
                            }]
                        },
                        .
                        .
                        .
            */



            for(let i = 0; i<statistics[0].data.length; i++){

                    switch(statistics[0].data[i].date.substring(3,5)){
                        case "01":  month = "En"
                                    break;
                        case "02":  month = "Feb"
                                    break;
                        case "03":  month = "Mar"
                                    break;
                        case "04":  month = "Abr"
                                    break;
                        case "05":  month = "May"
                                    break;
                        case "06":  month = "Jun"
                                    break;
                        case "07":  month = "Jul"
                                    break;
                        case "08":  month = "Ago"
                                    break;
                        case "09":  month = "Sep"
                                    break;
                        case "10":  month = "Oct"
                                    break;
                        case "11":  month = "Nov"
                                    break;
                        case "12":  month = "Dic"
                                    break;
                        default:

                        break
                    }
                    day = statistics[0].data[i].date.substring(0,2)

                    category.push({label: day+' '+month});

            }
            console.log("aqui deberian estar las fechas solas")
            console.log(category)
            var variableData = [];
            if(type === "line"){

                //Tiempo invertido, hay que usar el "spendTime"
                for(let i = 0; i<statistics.length;i++){
                    for(let j = 0; j<statistics[i].data.length;j++){
                        variableData.push({value:statistics[i].data[j].spendTime.toString()})

                    }
                    dataset.push({seriesname: statistics[i].seriesname, data: variableData});
                    variableData = []
                }

                console.log("aqui deberian estar los datos solos")
                console.log(dataset)
                actualMultiStatistics.push({category: category, dataset: dataset})

            }
            else{
                //Cantidad de soluciones, hay que usar el "solutions"
                for(let i = 0; i<statistics.length;i++){
                    for(let j = 0; j<statistics[i].data.length;j++){
                        variableData.push({value:statistics[i].data[j].solutions.toString()})

                    }
                    dataset.push({seriesname: statistics[i].seriesname, data: variableData});
                    variableData = []
                }

                console.log("aqui deberian estar los datos solos")
                console.log(dataset)
                actualMultiStatistics.push({category: category, dataset: dataset})

            }
            return actualMultiStatistics;


        }
    }
    
    componentWillMount () {
    }

    multipleStadistics(type,index,statistics,filterDates,axiosConfig){
        var res;
        var _this = this;
        if(type === "career"){

            Axios.post('http://206.189.220.236:8080/backend-0.0.1-SNAPSHOT/statistics/career/'+this.state.specificChoices[index].key,filterDates,axiosConfig)
            .then(response => {
                console.log("RESPONSE RECEIVED: ", response);
                res = response.data
                statistics.push({seriesname:this.state.specificChoices[index].optionName , data:res})
                if( index === this.state.specificChoices.length - 1){

                    console.log("aqui estan las stadisticas")
                    console.log(statistics)
                    var linesData = this.formatForPlots("line", statistics)

                    var barsData = this.formatForPlots("bar", statistics)
                                    
                    //Se tiene un arreglo con 2 elementos
                    // category: fechas y dataset: datos con sus nombre asociado a ellos
                    console.log("aca van los datos")
                    console.log(linesData)
                    console.log(barsData)
                    console.log("aqui deberia estar el category")

                    console.log(linesData[0].category)
                        console.log(barsData[0].category)

                    let chartConfigsMultiLine = _this.state.chartConfigsMultiLine
                    chartConfigsMultiLine.dataSource.categories[0].category = linesData[0].category
                    chartConfigsMultiLine.dataSource.dataset = linesData[0].dataset


                    let chartConfigsMultiBar = _this.state.chartConfigsMultiBar
                    chartConfigsMultiBar.dataSource.categories[0].category = barsData[0].category
                    chartConfigsMultiBar.dataSource.dataset = barsData[0].dataset
                                    

                    _this.setState({chartConfigsMultiLine, chartConfigsMultiBar})
                    console.log(JSON.stringify(chartConfigsMultiLine,null,'\t'))
                    setTimeout(() => {
                            _this.handleLoader()
                            _this.setState({renderGraphics:true, multiChartBool:true})
                        }, 100);
                                

                    }

                    })
                    .catch((err) => {
                        console.log("AXIOS ERROR: ", err);
                        this.handleLoader();
                        this.setState({errorMessage:"No se ha podido recuperar las estadisticas de las carreras, porfavor intente nuevamente"});
                        setTimeout(() => {
                            this.handleShowErrorMessage();
                            return;
                        }, 5);
                    })

        }
        else if(type === "class"){


            Axios.post('http://206.189.220.236:8080/backend-0.0.1-SNAPSHOT/statistics/class/'+this.state.specificChoices[index].key,filterDates,axiosConfig)
            .then(response => {
                console.log("RESPONSE RECEIVED: ", response);
                res = response.data
                statistics.push({seriesname:this.state.specificChoices[index].optionName , data:res})
                if( index === this.state.specificChoices.length - 1){

                    console.log("aqui estan las stadisticas")
                    console.log(statistics)
                    var linesData = this.formatForPlots("line", statistics)

                    var barsData = this.formatForPlots("bar", statistics)
                    
                    //Se tiene un arreglo con 2 elementos
                    // category: fechas y dataset: datos con sus nombre asociado a ellos
                    console.log("aca van los datos")
                    console.log(linesData)
                    console.log(barsData)
                    console.log("aqui deberia estar el category")

                    console.log(linesData[0].category)
                    console.log(barsData[0].category)

                    let chartConfigsMultiLine = _this.state.chartConfigsMultiLine
                    chartConfigsMultiLine.dataSource.categories[0].category = linesData[0].category
                    chartConfigsMultiLine.dataSource.dataset = linesData[0].dataset


                    let chartConfigsMultiBar = _this.state.chartConfigsMultiBar
                    chartConfigsMultiBar.dataSource.categories[0].category = barsData[0].category
                    chartConfigsMultiBar.dataSource.dataset = barsData[0].dataset
                    

                    _this.setState({chartConfigsMultiLine, chartConfigsMultiBar})
                    console.log(JSON.stringify(chartConfigsMultiLine,null,'\t'))
                    setTimeout(() => {
                        _this.handleLoader()
                        _this.setState({renderGraphics:true, multiChartBool:true})
                    }, 100);
                

                }

                

            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
                this.handleLoader();
                this.setState({errorMessage:"No se ha podido recuperar las estadisticas de los cursos, porfavor intente nuevamente"});
                setTimeout(() => {
                    this.handleShowErrorMessage();
                    return;
                }, 5);
            })
        }
        else{

            Axios.post('http://206.189.220.236:8080/backend-0.0.1-SNAPSHOT/statistics/user/'+this.state.specificChoices[index].key,filterDates,axiosConfig)
            .then(response => {

                console.log("RESPONSE RECEIVED: ", response);
                res = response.data
                statistics.push({seriesname:this.state.specificChoices[index].optionName , data:res})
                if( index === this.state.specificChoices.length - 1){

                    console.log("aqui estan las stadisticas")
                    console.log(statistics)
                    var linesData = this.formatForPlots("line", statistics)

                    var barsData = this.formatForPlots("bar", statistics)
                    
                    //Se tiene un arreglo con 2 elementos
                    // category: fechas y dataset: datos con sus nombre asociado a ellos
                    console.log("aca van los datos")
                    console.log(linesData)
                    console.log(barsData)
                    console.log("aqui deberia estar el category")

                    console.log(linesData[0].category)
                    console.log(barsData[0].category)

                    let chartConfigsMultiLine = _this.state.chartConfigsMultiLine
                    chartConfigsMultiLine.dataSource.categories[0].category = linesData[0].category
                    chartConfigsMultiLine.dataSource.dataset = linesData[0].dataset


                    let chartConfigsMultiBar = _this.state.chartConfigsMultiBar
                    chartConfigsMultiBar.dataSource.categories[0].category = barsData[0].category
                    chartConfigsMultiBar.dataSource.dataset = barsData[0].dataset
                    

                    _this.setState({chartConfigsMultiLine, chartConfigsMultiBar})
                    console.log(JSON.stringify(chartConfigsMultiLine,null,'\t'))
                    setTimeout(() => {
                        _this.handleLoader()
                        _this.setState({renderGraphics:true, multiChartBool:true})
                    }, 100);
                

                }


            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
                this.handleLoader();
                this.setState({errorMessage:"No se ha podido recuperar las estadisticas de los estudiantes, porfavor intente nuevamente"});
                setTimeout(() => {
                    this.handleShowErrorMessage();
                    return;
                }, 5);
            })

        }






    }

    filterResults(){
            //VERIFICAR que se ha dado fecha de inicio Y de salida
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "@crossorigin",
                }
        };
    
        let filterDates = {
                    desde:this.state.startDate,
                    hasta: this.state.endDate,
        }
        var statistics = [];
        var _this = this
        console.log("aqui estan las stadisticas")
        console.log(this.state.statistics)
        if(this.state.userOption === "Career"){

                if(this.state.specificChoices.length === 1){


                    Axios.post('http://206.189.220.236:8080/backend-0.0.1-SNAPSHOT/statistics/career/'+this.state.specificChoices[0].key,filterDates,axiosConfig)
                        .then(response => {

                                console.log("RESPONSE RECEIVED: ", response);
                                statistics.push(response.data)
                                
                                var lineData = this.formatForPlots("line", statistics)

                                var barData = this.formatForPlots("bar",statistics)

                                let chartConfigsSingleLine = _this.state.chartConfigsSingleLine
                                chartConfigsSingleLine.dataSource.data = lineData


                                let chartConfigsSingleBar = _this.state.chartConfigsSingleBar
                                chartConfigsSingleBar.dataSource.data = barData


                                _this.setState({chartConfigsSingleLine, chartConfigsSingleBar})
                                setTimeout(() => {
                                    _this.handleLoader()
                                    _this.setState({renderGraphics:true, singleChartBool:true})
                                }, 100);
                            

                        })
                        .catch((err) => {
                            console.log("AXIOS ERROR: ", err);
                            this.handleLoader();
                            this.setState({errorMessage:"No se ha podido recuperar las estadisticas de la carrera, porfavor intente nuevamente"});
                            setTimeout(() => {
                                this.handleShowErrorMessage();
                                return;
                            }, 5);
                        })

                }
                else{

                        for(let i = 0; i< this.state.specificChoices.length;i++){
                            this.multipleStadistics("career",i,statistics,filterDates,axiosConfig);

                        }

                    }
                  
        
            }
            else if(this.state.userOption === "Class"){
                    if(this.state.specificChoices.length === 1){

                        Axios.post('http://206.189.220.236:8080/backend-0.0.1-SNAPSHOT/statistics/class/'+this.state.specificChoices[0].key,filterDates,axiosConfig)
                        .then(response => {
                            console.log("RESPONSE RECEIVED: ", response);
                            statistics.push(response.data)
                            
                            var lineData = this.formatForPlots("line", statistics)

                            var barData = this.formatForPlots("bar",statistics)

                            let chartConfigsSingleLine = _this.state.chartConfigsSingleLine
                            chartConfigsSingleLine.dataSource.data = lineData


                            let chartConfigsSingleBar = _this.state.chartConfigsSingleBar
                            chartConfigsSingleBar.dataSource.data = barData


                            _this.setState({chartConfigsSingleLine, chartConfigsSingleBar})
                            setTimeout(() => {
                                _this.handleLoader()
                                _this.setState({renderGraphics:true, singleChartBool:true})
                            }, 100);
                            

                        })
                        .catch((err) => {
                            console.log("AXIOS ERROR: ", err);
                            this.handleLoader();
                            this.setState({errorMessage:"No se ha podido recuperar las estadisticas del curso, porfavor intente nuevamente"});
                            setTimeout(() => {
                                this.handleShowErrorMessage();
                                return;
                            }, 5);
                        })

                    }
                    else{
                        for(let i = 0; i< this.state.specificChoices.length;i++){

                            this.multipleStadistics("class",i,statistics,filterDates,axiosConfig);
                
                        }
                    
                    
                    
                    
                    }


                    
                  
        
            }
            else if(this.state.userOption === "Student"){
                    //value == "Student"

                    if(this.state.specificChoices.length === 1){

                        Axios.post('http://206.189.220.236:8080/backend-0.0.1-SNAPSHOT/statistics/user/'+this.state.specificChoices[0].key,filterDates,axiosConfig)
                        .then(response => {
                            console.log("RESPONSE RECEIVED: ", response);
                            statistics.push(response.data)
                            
                            var lineData = this.formatForPlots("line", statistics)

                            var barData = this.formatForPlots("bar",statistics)

                            let chartConfigsSingleLine = _this.state.chartConfigsSingleLine
                            chartConfigsSingleLine.dataSource.data = lineData


                            let chartConfigsSingleBar = _this.state.chartConfigsSingleBar
                            chartConfigsSingleBar.dataSource.data = barData


                            _this.setState({chartConfigsSingleLine, chartConfigsSingleBar})
                            setTimeout(() => {
                                _this.handleLoader()
                                _this.setState({renderGraphics:true, singleChartBool:true})
                            }, 100);
                            
                        })
                        .catch((err) => {
                            console.log("AXIOS ERROR: ", err);
                            this.handleLoader();
                            this.setState({errorMessage:"No se ha podido recuperar las estadisticas de el/la estudiante, porfavor intente nuevamente"});
                            setTimeout(() => {
                                this.handleShowErrorMessage();
                                return;
                            }, 5);
                        })

                    }
                    else{
                        for(let i = 0; i< this.state.specificChoices.length;i++){
                            this.multipleStadistics("student",i,statistics,filterDates,axiosConfig);


                        }
                }


                
                  
        
            }
            else{
                //this.state.userOption === "Coordination"

                
                 Axios.post('http://206.189.220.236:8080/backend-0.0.1-SNAPSHOT/statistics/coordination',filterDates,axiosConfig)
                        .then(response => {
                            console.log("RESPONSE RECEIVED: ", response);
                            statistics.push(response.data)
                            
                            var lineData = this.formatForPlots("line", statistics)

                            var barData = this.formatForPlots("bar",statistics)

                            let chartConfigsSingleLine = _this.state.chartConfigsSingleLine
                            chartConfigsSingleLine.dataSource.data = lineData


                            let chartConfigsSingleBar = _this.state.chartConfigsSingleBar
                            chartConfigsSingleBar.dataSource.data = barData


                            _this.setState({chartConfigsSingleLine, chartConfigsSingleBar})
                            setTimeout(() => {
                                _this.handleLoader()
                                _this.setState({renderGraphics:true, singleChartBool:true})
                            }, 100);
                            
                        })
                        .catch((err) => {
                            console.log("AXIOS ERROR: ", err);
                            this.handleLoader();
                            this.setState({errorMessage:"No se ha podido recuperar las estadisticas de la coordinacion, porfavor intente nuevamente"});
                            setTimeout(() => {
                                this.handleShowErrorMessage();
                                return;
                            }, 5);
                        })

                

               

            }
    }
    checkFields(){
        console.log("estos son los estados de las cosas")
        console.log(this.state.specificOptions )
        console.log(this.state.specificChoices.length)
        console.log(this.state.startDate)
        console.log(this.state.endDate)
        //VERIFICAR que se ha seleccionado carrera/curso/estudiante
        if(this.state.specificOptions !== null){
            //VERIFICAR que por lo menos se ha seleccionado UNA o MAS carreras/cursos/estudiantes
            //O que se consulte por coordinacion
                if( this.state.specificChoices.length >= 1 || this.state.userOption === "Coordination"){


                    if(this.state.startDate !== null && this.state.endDate !== null){

                        console.log("entre")
                        this.handleNotDisableFilterButton()
                        
                
                    }
                    else{
                        this.handleDisableFilterButton()

                    }

                }
                else{
                    this.handleDisableFilterButton()
                }
        }
        else{
            this.handleDisableFilterButton()
        }

    }
    handleStartDate= (event, date) => {
        let year = date.getFullYear().toString()
        let month = date.getMonth().toString()
        let day = date.getDate().toString()
        let startDateString = year+'-'+month+'-'+day
        console.log(date.getFullYear())
        console.log(date.getMonth())
        console.log(date.getDate())
        console.log(date)
        console.log(startDateString)
        
        this.setState({
            startDate: date,
            minDate:date,
            startDateString
            
        });

        setTimeout(() => {
            this.checkFields();
        }, 10);
      };

    handleEndDate= (event, date) => {

        let year = date.getFullYear().toString()
        let month = date.getMonth().toString()
        let day = date.getDate().toString()
        let endDateString = year+'-'+month+'-'+day
        console.log(date.getFullYear())
        console.log(date.getMonth())
        console.log(date.getDate())
        console.log(date)
        console.log(endDateString)

        console.log(date)

        this.setState({
            endDate: date,
            maxDate:date,
            endDateString
        });

        setTimeout(() => {
            this.checkFields();
        }, 10);

      };

    cancelPlots = (e, { value}) => {
        this.loadDropDown();
        this.handleNotDisablerCombobox();
        this.setState({renderGraphics:false,specificChoices:[],specificOptions:[],
                        endDate:null,startDate:null,  buttonDisabler: true, loadingText: "Cargando...",
                        minDate: new Date("July 21, 1983 00:0:00"),
            
                        maxDate: new Date("July 21, 2083 00:0:00")})
        console.log("estos son los values que se van a poner")
        console.log(value)
        setTimeout(() => {
            this.modeSelection(value);
        }, 10);
    }  
    modeSelection = (value) => {
        var actualOptions = []
        var res;
        console.log("estos son las opciones actuales")
        console.log(this.state.specificOptions)
        console.log("estas estan por si acaso")
        console.log(this.state.replacementOptions)

        console.log("estas son las antiguas (?)")
        console.log(this.state.userOption)
        if(value === "Career"){
                Axios.get('http://206.189.220.236:8080/backend-0.0.1-SNAPSHOT/careers/')
                    .then(response => {
                        console.log("RESPONSE RECEIVED: ", response);
                        res = response.data
                        for(let i = 0; i<res.length;i++){
                            actualOptions.push({key: res[i].idCareer, 
                                                text: res[i].nameCareer,
                                                value: res[i].nameCareer})
                        }

                       
                        this.loadDropDown();
                        setTimeout(() => {
                            this.setState({loadingText: "Seleccione...",specificOptions:actualOptions, userOption:value, valueDropdown:actualOptions})                            
                        }, 5);
                        setTimeout(() => {
                            this.checkFields();
                        }, 15);

                    })
                    .catch((err) => {
                        console.log("AXIOS ERROR: ", err);
                        
                        this.loadDropDown();
                        this.setState({loadingText: "Seleccione...",errorMessage:"No se pudo obtener las carreras, porfavor intentar mas tarde "});
                        setTimeout(() => {
                                this.handleShowErrorMessage();
                                return;
                        }, 5);
                    })


        }
        else if(value === "Class"){
                Axios.get('http://206.189.220.236:8080/backend-0.0.1-SNAPSHOT/classes/')
                    .then(response => {
                        console.log("RESPONSE RECEIVED: ", response);
                        res = response.data
                        for(let i = 0; i<res.length;i++){
                            actualOptions.push({key: res[i].idClass, 
                                                text: res[i].nameClass,
                                                value: res[i].nameClass})
                        }

                        
                        this.loadDropDown();
                        setTimeout(() => {
                            this.setState({loadingText: "Seleccione...",specificOptions:actualOptions, userOption:value, valueDropdown:actualOptions})

                        }, 5);


                        setTimeout(() => {
                            this.checkFields();
                        }, 15);
                    })
                    .catch((err) => {
                        console.log("AXIOS ERROR: ", err);
                        
                        this.loadDropDown();
                        this.setState({loadingText: "Seleccione...",errorMessage:"No se pudo obtener las clases, porfavor intentar mas tarde "});
                        setTimeout(() => {
                            this.handleShowErrorMessage();
                                return;
                        }, 5);
                        
                    })

        }
        else if(value === "Student"){
                //value == "Student"
                Axios.get('http://206.189.220.236:8080/backend-0.0.1-SNAPSHOT/users/students/')
                    .then(response => {
                        console.log("RESPONSE RECEIVED: ", response);
                        res = response.data
                        for(let i = 0; i<res.length;i++){
                            actualOptions.push({key: res[i].id, 
                                                text: res[i].email,
                                                value: res[i].email})
                        }
                        
                        this.loadDropDown();
                        setTimeout(() => {
                            this.setState({loadingText: "Seleccione...",specificOptions:actualOptions, userOption:value, valueDropdown:actualOptions})

                        }, 5);

                        setTimeout(() => {
                            this.checkFields();
                        }, 15);

                    })
                    .catch((err) => {
                        console.log("AXIOS ERROR: ", err);
                        console.log("AXIOS ERROR: ", err);

                        this.loadDropDown();
                        this.setState({loadingText: "Seleccione...",errorMessage:"No se pudo obtener la lista de estudiantes, porfavor intentar mas tarde "});
                        setTimeout(() => {
                                this.handleShowErrorMessage();
                                return;
                        }, 5);
                    })

        }
        else{
            //value === "Coordination"
            
            this.loadDropDown();
            this.handleDisablerCombobox();
            this.setState({loadingText: "Seleccione...",specificOptions:[], userOption:"Coordination", valueDropdown:[]})
            setTimeout(() => {
                this.checkFields();
            }, 15);
        }
    }
    specificSelection = (e, { value}) => {
        console.log("estos son los values")
        console.log(this.state.specificChoices)
        console.log(value)
        /*var actualValue
        if(value.length !== 0){
            actualValue = []
        }
        else{
            actualValue = value
        }*/
        var actualSpecificChoices = [];
        for(let i = 0; i< this.state.specificOptions.length;i++){
            for(let j = 0; j< value.length;j++){

                if(this.state.specificOptions[i].text === value[j]){
                    actualSpecificChoices.push({key: this.state.specificOptions[i].key, optionName:this.state.specificOptions[i].text} )
                }
            }
        }
        
        this.setState({specificChoices:actualSpecificChoices, replacementOptions:value})

        setTimeout(() => {
            this.checkFields();
        }, 15);
    }    
    render() {
        return (
            <div> 

                <Segment>

                    <Dimmer active={this.state.loader} inverted>
                        <Loader inverted content='Consultando...' />
                    </Dimmer>


                <MuiThemeProvider muiTheme={ThemeDefault}>  
                    <div className= "Forms">
                        <h1 style={{textAlign:"center"}} >Estadisticas</h1>
                        <div style={{padding:10}}></div>
                        <Paper style={background.bigFrame}>


                            <Grid>
                                <Row style= {{position:"relative", left: "7%", textAlign:"center"}}>
                                    <Col  xs={4} sm={4} md={3}>
                                    <label>Seleccione (Carrera/Curso/Estudiante)</label>

                                    

                                    <Dropdown
                                        
                                        options={this.state.userOptions}
                                        selection
                                        onChange ={this.cancelPlots}
                                        onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                    />
                                        
                                    </Col>

                                    <Col  xs={2} sm={2} md={2}>
                                    <label>Especifico</label>

                                    <Dropdown
                                        
                                        options={this.state.specificOptions}
                                        search
                                        selection
                                        multiple
                                        text={this.state.loadingText}
                                        onChange ={this.specificSelection}
                                        disabled={this.state.comboBoxDisable}
                                        loading = {this.state.loadingDropDown}
                                        onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}
                                        noResultsMessage= {"No hay resultados"}
                                    />

                                    
                                    </Col>

                                    <Col  xs={2} sm={2} md={2}>
                                    <label >Desde:</label>

                                    <DatePicker
                                        hintText="Inicio"
                                        value={this.state.startDate}
                                        onChange={this.handleStartDate}
                                        textFieldStyle= {{width: "50%", textAlign:"center"}}
                                        DateTimeFormat={Intl.DateTimeFormat}  
                                        locale='es'
                                        onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                        maxDate = {this.state.maxDate}

                                    />

                                    
                                    </Col>

                                    <Col  xs={2} sm={2} md={2}>
                                    <label >Hasta:</label>

                                    <DatePicker
                                        hintText="Final"
                                        value={this.state.endDate}
                                        onChange={this.handleEndDate}
                                        textFieldStyle= {{width: "50%", textAlign:"center"}}
                                        DateTimeFormat={Intl.DateTimeFormat}  
                                        locale='es'
                                        onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                        minDate = {this.state.minDate}

                                    />

                                    
                                    </Col>

                                    <Col  xs={2} sm={2} md={1}>
                                        <div style={{padding:"10%"}}></div>
                                        <Button floated= {'right'} 
                                                color='blue' 
                                                type='Empty'
                                                onClick={() => {
                                                    this.setState({singleChartBool:false, multiChartBool:false});
                                                    this.handleLoader()
                                                    setTimeout(() => {
                                                        this.filterResults()
                                                    }, 5);
                                                    
                                                    }}
                                                onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}
                                                disabled={this.state.buttonDisabler}
                                                >

                                                Filtrar
                                        </Button>

                                    
                                    </Col>
                                </Row>
                                {this.state.renderGraphics &&
                                    <div style ={{position:"relative", left:"23%"}}>

                                        <Row >
                                            {this.state.singleChartBool &&
                                            
                                                <ReactFC {...this.state.chartConfigsSingleLine} />
                                            }
                                            {this.state.multiChartBool &&
                                            
                                                <ReactFC {...this.state.chartConfigsMultiLine} />
                                            }

                                        </Row>

                                        <Row >
                                            {this.state.singleChartBool &&
                                                
                                                <ReactFC {...this.state.chartConfigsSingleBar} />
                                            }
                                            {this.state.multiChartBool &&
                                            
                                                <ReactFC {...this.state.chartConfigsMultiBar} />
                                            }
                                        </Row>
                                    </div>
                                
                                }


                            </Grid>
                            






                        </Paper>

                        <Modal show={this.state.errorMessageRender}
                              bsSize="small">  

                                    <Modal.Header >
                                      <Modal.Title style= {{textAlign: "center"}}>Error!</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body >
                                          <p style= {{textAlign:'center'}} >
                                            {this.state.errorMessage}
                                          </p>
                                      </Modal.Body>
                                      <Modal.Footer>                                        
                                                <Button  style={{position:'relative', right: '35%'}}
                                                        color='blue' 
                                                        type='Positive'
                                                        onClick={this.handleHideErrorMessage}
                                                        onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                                        >
                                                        OK
                                                </Button>
                                      </Modal.Footer>

                        </Modal>
                    
                    </div>
                </MuiThemeProvider> 


                </Segment>
            </div>
  
     );
        
    }


}

export default StadisticsForm;