import React, { Component } from 'react'
import {  Button} from 'react-materialize'
import {Link} from 'react-router-dom'


export default class SupBtns extends React.Component {


  componentDidMount(){
    $(document).ready(function(){
     $('.tooltipped').tooltip();
    });
  }


  render(){

    const download = <Link to={"/back/supplement/rest/pdf/"+this.props.id} className="btn btn-floating tooltipped btn-medium waves-effect waves-light blue darken-3" data-position="top" data-tooltip="Download pdf" target="_blank">
                        <i className="material-icons">file_download</i>
                    </Link>;
    const downloadRaw = <Link to={"/back/supplement/rest/raw/"+this.props.id} className="btn btn-floating tooltipped btn-medium waves-effect waves-light raw darken-3" data-position="top" data-tooltip="Download XML/JSON" target="_blank">
                        <i className="material-icons">code</i>
                    </Link>;
    const edit =  <Link to={"/app/edit/"+this.props.id} className="btn btn-floating tooltipped btn-medium waves-effect waves-light yellow darken-3" data-position="top" data-tooltip="Who has access?" style={{ marginLeft: "1em"}}>
                        <i className="material-icons">edit</i>
                    </Link>;

      if(this.props.isOwner){
        return (
           <span>
              {download}
              {downloadRaw}
              {edit}
           </span>);
      }else{
        return (
          <span>
             {download}
             {downloadRaw}
          </span>
        );
      }
    }

}
