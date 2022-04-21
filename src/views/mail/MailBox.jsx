import React, {useEffect, useRef, useState} from 'react';
import {Container, Box, Grid, Button, FormControl, InputLabel, OutlinedInput} from '@mui/material';
import SockJsClient from 'react-stomp';
import {useDispatch, useSelector} from "react-redux";
import parse from 'html-react-parser';

import ContentEditorEmail from './ContentEditorEmail';
import MailTable from './MailTable';
import MailResult from './MailResult';
import * as Actions from './redux/mail.action';


import './mail.css'
import {addSuccess} from "./redux/mail.action";

const MailBox = () => {
    const dispatch = useDispatch();

    const [content, setContent] = React.useState('')
    const [subject, setSubject] = React.useState('')
    const [resultClass, setResultClass] = useState('result-hidden')
    const successCurrent = useSelector((state) => state.email.success)
    const failedCurrent = useSelector((state) => state.email.failed)


    let clientRef = useRef(undefined)

    const sendMessage = () => {
        const messageRequest = JSON.stringify({
            subject: subject,
            content: content
        })
        console.log('messageRequest', messageRequest)
        setTimeout(clientRef.sendMessage('/app/sends', messageRequest), 1000);

    };
    const handleValue = (event, typeValue) => {
        switch (typeValue) {
            case 'title':
                setSubject(event.target.value);
                break;
            default:
                break;
        }
    };
    useEffect(() => {

    }, []);


    return (
        <Container maxWidth="xl" style={{paddingTop: 20, paddingBottom: 50}}>
            <Box sx={{textAlign: "center", paddingBottom: 5}}>
                <h1>Quản lý nhận mail thông báo</h1>
            </Box>

            <Grid container item xs={12} sm={12} md={12} spacing={5} direction="row-reverse" alignItems='flex-start'>
                <Grid item xs={12} sm={12} md={6} p={1}>
                    <Grid container item xs={12} sm={12} md={12} className={resultClass}>
                        <h2>Kết quả gửi mail</h2>
                        <MailResult/>
                    </Grid>

                </Grid>
                <Grid container item xs={12} sm={12} md={6}>
                    <Grid item xs={12} sm={12} md={12}>
                        <h2>Nội dung email</h2>
                        <Grid item container xs={12} sm={12} md={12}>
                            <FormControl size='medium' sx={{ width: '100%', margin:'10px auto' }}>
                                <InputLabel>Tiêu đề email</InputLabel>
                                <OutlinedInput
                                    value={subject}
                                    onChange={e => handleValue(e, 'title')}
                                    label="Tiêu đề email"
                                />
                            </FormControl>
                        </Grid>
                        <ContentEditorEmail
                            title=''
                            content={content}
                            setContent={setContent}
                        />
                        <Button
                            className='send-mail-socket'
                            variant="contained"
                            color="primary"
                            onClick={() => sendMessage()}>
                            Gửi
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <h2>Danh sách email nhận đăng ký</h2>
                        <MailTable/>
                    </Grid>


                </Grid>

            </Grid>
            <SockJsClient url='http://localhost:8080/websocket/'
                          topics={['/topic/receive']}
                          onConnect={() => {
                              console.log("connected");
                          }}
                          onDisconnect={() => {
                              console.log("Disconnected");
                          }}
                          onMessage={(msg) => {

                              if (msg !== undefined) {
                                  setResultClass('result-show')
                                  let success = msg.success
                                  let failed = msg.failed
                                  dispatch(Actions.addSuccess(successCurrent, success))
                                  dispatch(Actions.addFailed(failedCurrent, failed))
                              }
                          }}
                          ref={(client) => {
                              clientRef = client
                          }}/>

        </Container>
    );

}
export default MailBox;