import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class Modal extends Component {

   

  componentDidMount() {
    const options = {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%"
    };
    M.Modal.init(this.Modal, options);
  }

  render() {
    return (
      <>
        <button
          style={this.props.btnStyle}
          className={`waves-effect waves-light btn-small ${this.props.btnColor} modal-trigger`}
          data-target="modal1"
        >
          {this.props.btnText}
        </button>

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modal1"
          className="modal"
        >
          <div className="modal-content">
            <h4 style={{color:'black'}}>{this.props.naming}</h4>
            <p style={{color:'black'}}>{this.props.body}</p>
          </div>
          <div className="modal-footer">
            <button onClick={this.props.onDisagree} name={this.props.name} className="modal-close waves-effect waves-red btn-flat ">
              Disagree
            </button>
            <button onClick={this.props.onAgree} name={this.props.name} className="modal-close waves-effect waves-green btn-flat">
              Agree
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Modal;