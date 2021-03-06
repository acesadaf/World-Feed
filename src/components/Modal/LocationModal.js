import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import "../../GoogleMap/map.css";
import "./modal.css";
export default class LocModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        {...this.props}
        dark
        // size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop={false}
        dialogClassName="dialog"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Switching Maps!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Switching to{" "}
          {this.props.locName === 4 ? "Country view" : "State view"}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
