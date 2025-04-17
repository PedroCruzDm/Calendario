import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

const CreateEvents = ({ show, handleClose, handleSave, event }) => {

    const [title, setTitle] = React.useState(event ? event.title : "");
    const [start, setStart] = React.useState(event ? event.start : new Date());
    const [end, setEnd] = React.useState(event ? event.end : new Date());
    const [color, setColor] = React.useState(event ? event.color : "#000000");
    const [type, setType] = React.useState(event ? event.type : "");
    const [important, setImportant] = React.useState(event ? event.important : 0);
    const [desc, setDesc] = React.useState(event ? event.desc : "");
    const [id, setid] = React.useState(event ? event.id : Math.random());

    const [showModal, setShowModal] = React.useState(show);
    const handleShow = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    

}