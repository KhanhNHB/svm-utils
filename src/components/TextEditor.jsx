import React, { useRef, useState } from 'react';
import { Box, Button } from '@mui/material';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const TextEditor = ({ initialContent, onSubmit, title }) => {
    const [content, setContent] = useState(initialContent);

    return (
        <Box>
            <Box>{title}</Box>
            <SunEditor
                autoFocus={true}
                height={800}
                setContents={initialContent}
                onChange={setContent}
                showToolbar={true}
                setOptions={{
                    buttonList: [
                        [
                            'undo',
                            'redo',
                            'link',
                            'fullScreen',
                            "bold",
                            "underline",
                            "italic",
                            "strike",
                            "list",
                            "align",
                            "fontSize",
                            "formatBlock",
                            "table",
                            "image"
                        ]
                    ]
                }}
            />
            <Button
                variant="contained"
                style={{
                    maxWidth: 160,
                    maxHeight: 40,
                    minWidth: 160,
                    minHeight: 40,
                    display: "flex",
                    textTransform: 'none',
                    background: 'linear-gradient(#00AFEC, #005FBE)'
                }}
                onClick={() => onSubmit(content)}
            >
                Lưu lại
            </Button>
        </Box>
    )
}

export default TextEditor