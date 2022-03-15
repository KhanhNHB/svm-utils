import React, { useState } from 'react';
import { Box } from '@mui/material';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import '../css/textEditorProduct.css'

const ImageEditorProduct = ({title, content, setContent}) => {
    return (
        <Box>
            <Box>{title}</Box>
            <SunEditor
                id='info1'
                autoFocus={true}
                height='150px'
                width='100%'
                setContents={content}
                onChange={setContent}
                setOptions={{
                    buttonList: [
                        [
                            'image',
                        
                        ]
                    ]
                }}
                
            />
           
        </Box>
    )
}

export default ImageEditorProduct