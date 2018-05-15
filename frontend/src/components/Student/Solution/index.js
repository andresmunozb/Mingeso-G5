import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/mode/c_cpp';

import 'brace/theme/tomorrow';
import 'brace/theme/kuroir';
import 'brace/theme/terminal';

import 'brace/snippets/python';
import 'brace/ext/language_tools';
//onChange={this.updateLenguaje.bind(this)}
//{this.state.lenjuajeSelect} 

class Solution extends Component{
    constructor(props){
        super(props)
        console.log(props)

    }
  
   
    
    onChange(newValue) {
     console.log('change',newValue);
    }


    render(){

        return(
         <div className="row">
            <div className="col-sm-2">
                <select >
                    <option selected hidden></option>
                    <option value="python">Python</option>
                    <option value="c_cpp">C</option>
                    <option value="Java">Java</option>
                </select>
            </div>
            <button type="button" className="btn btn-primary">Run</button>
            
            <div className="row" >
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
                    <AceEditor
                    mode="python" //escoger lenguaje
                    theme="terminal"
                    name="blah2"
                   // onChange={this.onChange}
                    fontSize={18}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    value=""
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: false,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 2,
                    }}/>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
                    <textarea rows="25" cols="60">
                    </textarea>
                </div>
            </div>
        </div>
        );
    }
}

export default Solution;
