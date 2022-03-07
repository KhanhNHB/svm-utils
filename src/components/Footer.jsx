import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Grid,
    Container,
    Link
} from '@material-ui/core';

const Copyright = () => {
    return (
        <p variant="body2" align="center" fontSize={16} color="#000000" fontWeight={"medium"}>
            {'©' + new Date().getFullYear() + ' '} Bản quyền thuộc về NEXTGEN
        </p>
    );
}

const Footer = (props) => {
    const { description, title } = props;

    return (
        <Box component="footer">
            <Box
                px={{ xs: 3, sm: 10 }}
                py={{ xs: 5, sm: 10 }}
                bgcolor="#27272C"
            >
                <Container maxWidth="lg">
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={2}>
                            <img src="/logo-footer.png" width={109} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box className="title-footer">NEXTGEN Hà Nội</Box>
                            <Box display={"flex"}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                    <g id="Group_100921" data-name="Group 100921" transform="translate(0.171 0.024)">
                                        <rect id="Rectangle_32576" data-name="Rectangle 32576" width="20" height="20" transform="translate(-0.171 -0.024)" fill="none" />
                                        <path id="Path_179189" data-name="Path 179189" d="M46.835,16A6.843,6.843,0,0,0,40,22.835c0,5.848,6.213,10.268,6.478,10.454a.645.645,0,0,0,.715,0c.264-.186,6.478-4.606,6.478-10.454A6.843,6.843,0,0,0,46.835,16Zm0,4.349a2.485,2.485,0,1,1-2.485,2.485A2.485,2.485,0,0,1,46.835,20.349Z" transform="translate(-36.959 -14.798)" fill="#c3c3c3" />
                                    </g>
                                </svg>
                                <p className="content-footer">Số 23 Ngọc Khánh, Ba Đình, Hà Nội</p>
                            </Box>
                            <Box display={"flex"}>
                                <svg id="Group_100922" data-name="Group 100922" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                    <rect id="Rectangle_32577" data-name="Rectangle 32577" width="20" height="20" transform="translate(0 0)" fill="none" />
                                    <path id="Path_179190" data-name="Path 179190" d="M47.4,35.935a4.336,4.336,0,0,1-4.29,3.773A11.123,11.123,0,0,1,32,28.6a4.336,4.336,0,0,1,3.773-4.29,1.258,1.258,0,0,1,1.288.741l1.551,3.619a1.227,1.227,0,0,1-.108,1.165l-1.281,1.96h0a5.9,5.9,0,0,0,2.716,2.7L41.876,33.2a1.2,1.2,0,0,1,1.165-.1l3.619,1.543A1.258,1.258,0,0,1,47.4,35.935Zm-5.524-5.486a.656.656,0,0,0,.44-.177l2.646-2.654v1.6a.617.617,0,0,0,1.234,0V26.129a.617.617,0,0,0-.617-.617H42.493a.617.617,0,0,0,0,1.234h1.6l-2.654,2.646a.625.625,0,0,0,0,.88A.656.656,0,0,0,41.876,30.449Z" transform="translate(-29.531 -22.425)" fill="#c3c3c3" />
                                </svg>
                                <p className="content-footer">1900 0532</p>
                            </Box>
                            <Box display={"flex"}>
                                <svg id="Group_100923" data-name="Group 100923" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                    <rect id="Rectangle_32578" data-name="Rectangle 32578" width="20" height="20" transform="translate(0 0)" fill="none" />
                                    <path id="Path_179191" data-name="Path 179191" d="M39.758,48H24.63a.63.63,0,0,0-.63.63V59.346a1.261,1.261,0,0,0,1.261,1.261H39.128a1.261,1.261,0,0,0,1.261-1.261V48.63A.63.63,0,0,0,39.758,48Zm-.63,11.346H25.261V50.064l6.508,5.965a.63.63,0,0,0,.851,0l6.508-5.965Z" transform="translate(-22.109 -44.218)" fill="#c3c3c3" />
                                </svg>
                                <p className="content-footer">NextG@gmail.com</p>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box className="title-footer">Hỗ trợ</Box>
                            <Box>
                                <Link href="/">
                                    <p className="content-footer">Chính sách bảo hành</p>
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/">
                                    <p className="content-footer">Điều khoản sử dụng</p>
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/">
                                    <p className="content-footer">Chính sách thanh toán</p>
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box className="title-footer">Đăng kí nhận thông tin</Box>
                            <Box>
                                <form style={{
                                    display: "flex",
                                    paddingBottom: 25,
                                }}>
                                    <input type="text"
                                        style={{
                                            border: "1px solid #C3C3C3",
                                            background: "transparent",
                                            color: "#fff",
                                            paddingTop: 10,
                                            paddingBottom: 10,
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                            fontSize: 16,
                                        }}
                                    />
                                    <input type="submit" value="Gửi"
                                        style={{
                                            width: 70,
                                            background: "#FFFFFF 0% 0% no-repeat padding-box",
                                            fontSize: "16px",
                                            color: "#27272C",
                                            border: "1px solid #fff",
                                        }}
                                    />
                                </form>
                            </Box>
                            <Box>
                                <img src="/thong-bao-bo-cong-thuong.png" width={176} />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Box
                textAlign="center"
                bgcolor="#fff"
                paddingTop={"15px"}
                paddingBottom={"15px"}
            >
                <Copyright />
            </Box>
        </Box>
    );
}

Footer.propTypes = {
};

export default Footer;