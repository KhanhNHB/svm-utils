import React, { useState, useEffect } from "react";
import {
    makeStyles,
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import datetimeUtils from '../utils/datetimeUtils';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import API from "../api/API";
import { withStyles } from "@material-ui/styles";
import TextEditor from "./TextEditor";

const useStyles = makeStyles((theme) => ({
    container: {
        margin: 10,
        overflowY: "auto",
    },
    wrapperDetail: {
        backgroundColor: "white",
        overflowY: "auto",
    },
    wrapperTransaction: {
        overflowY: "auto",
        height: 700,
        borderBottomLeftRadius: "5px",
        borderBottomRightRadius: "5px",
    },
    titleText: {
        textAlign: "center",
        paddingBottom: "20px",
        paddingTop: "50px",
    },
    detailRow: {
        paddingBottom: "15px",
        paddingLeft: "20px",
    },
    closeBtn: {
        margin: "10px",
        cursor: 'pointer',
        color: 'white'
    },
    tableRow: {
        borderBottom: "1px solid #e0e0e0",
        paddingBottom: "8px",
    },
    table: {
        width: "80%",
        marginLeft: "10%",
    },
    dot: {
        fontSize: "30px",
    },
    currentstatus: {
        color: "#00bdb6",
    },
    detailHeader: {
        display: "flex",
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: "#00bdb6",
        borderTopLeftRadius: "5px",
        borderTopRightRadius: "5px",
    }
}));

const ModalEditor = (props) => {
    const classes = useStyles();
    const [content, setContent] = useState(props.initialContent);

    return (
        <div className={classes.container}>
            <div className={classes.detailHeader}>
                <div style={{
                    margin: "10px",
                    color: 'white'
                }}>
                    <h3>Text editor</h3>
                </div>
                <CloseIcon className={classes.closeBtn} onClick={() => props.onCloseModal()} />
            </div>
            <TextEditor
                initialContent={props.initialContent}
                onSubmit={props.onSubmit}
                title="Trình soạn thảo"
            />
        </div>
    );
};
export default ModalEditor;