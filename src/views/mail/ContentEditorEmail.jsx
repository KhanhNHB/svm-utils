import React, { useState } from 'react';
import { Box } from '@mui/material';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const ContentEditorEmail = ({title, content, setContent}) => {
    return (
        <Box>
            <Box>{title}</Box>
            <SunEditor
                id='contentEmail'
                autoFocus={true}
                height='150px'
                width='100%'
                setContents={content}
                onChange={setContent}
                setOptions={{
                    buttonList: [
                        [
                            'undo',
                            'redo',
                            "bold",
                            "underline",
                            "italic",
                            "strike",
                            "list",
                            "formatBlock",
                            "align",
                            "link"

                        ]
                    ]
                }}

            />

        </Box>
    )
}

export default ContentEditorEmail