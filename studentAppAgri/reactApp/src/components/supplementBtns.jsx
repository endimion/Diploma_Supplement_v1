import React, { Component } from 'react'
import {  Button} from 'react-materialize'
import {Link} from 'react-router-dom'


export default class SupBtns extends React.Component {


  render(){

    const download = <Link to={"/back/supplement/rest/pdf/"+this.props.id} className="btn-floating btn-medium waves-effect waves-light blue darken-3" target="_blank">
                        <i className="material-icons">file_download</i>
                    </Link>;
    const edit =  <Link to={"/app/edit/"+this.props.id} className="btn-floating btn-medium waves-effect waves-light yellow darken-3" style={{ marginLeft: "1em"}}>
                        <i className="material-icons">edit</i>
                    </Link>;

      if(this.props.isOwner){
        return (
           <span>
              {download}
              {edit}
           </span>);
      }else{
        return (
          <span>
             {download}
          </span>
        );
      }
    }

}
