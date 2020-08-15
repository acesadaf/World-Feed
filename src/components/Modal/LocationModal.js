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
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>Loading Tweets for {this.props.locName}</Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
