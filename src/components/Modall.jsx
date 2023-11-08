import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Modall({ open, onOpen, children ,title}) {
  return (
    <>
      <Modal show={open} onHide={() => onOpen(false)} >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        
      </Modal>
    </>
  );
}

export default Modall;
