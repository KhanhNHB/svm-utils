import React, { Fragment, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import InventoryIcon from '@mui/icons-material/Inventory';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';

import { hasChildren } from "../../utils/menuUtils";
import { Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const CustomMenuItem = () => {
    const location = useLocation();
    const [menu, setMenu] = useState([
        {
            icon: <HomeIcon />,
            title: "Trang chủ",
            to: "/app",
            isSelected: true,
            items: []
        },
        {
            icon: <InfoIcon />,
            title: "Thông tin liên hệ",
            to: "/app/setting",
            isSelected: false,
            items: []
        },
        {
            icon: <DashboardIcon />,
            title: "Sản phẩm",
            to: "/app/san-pham",
            isSelected: false,
            items: []
        },
        {
            icon: <MenuBookOutlinedIcon />,
            title: "Quản lý bài viết",
            isSelected: false,
            items: [
                {
                    icon: <ArrowRightIcon />,
                    title: "Tin khuyến mại",
                    to: "/app/tin-khuyen-mai",
                    isSelected: false
                },
                {
                    icon: <ArrowRightIcon />,
                    title: "Tin sản phẩm",
                    to: "/app/tin-san-pham",
                    isSelected: false
                },
                {
                    icon: <ArrowRightIcon />,
                    title: "Tin sự kiện",
                    to: "/app/tin-su-kien",
                    isSelected: false
                },
                {
                    icon: <ArrowRightIcon />,
                    title: "Tính năng",
                    to: "/app/tinh-nang",
                    isSelected: false
                },
                {
                    icon: <ArrowRightIcon />,
                    title: "Lắp đặt",
                    to: "/app/lap-dat",
                    isSelected: false
                }
            ]
        },
        {
            icon: <LibraryBooksIcon />,
            title: "Quản lý dữ liệu",
            isSelected: false,
            items: [
                {
                    icon: <ArrowRightIcon />,
                    title: "Liên hệ",
                    to: "/app/lien-he",
                    isSelected: false
                },
                {
                    icon: <ArrowRightIcon />,
                    title: "Đặt hàng",
                    to: "/app/dat-hang",
                    isSelected: false
                },
                {
                    icon: <ArrowRightIcon />,
                    title: "Đăng ký dùng thử",
                    to: "/app/dang-ky-dung-thu",
                    isSelected: false
                }
            ]
        },
        {
            icon: <LocalPoliceOutlinedIcon />,
            title: "Chính sách",
            isSelected: false,
            items: [
                {
                    icon: <ArrowRightIcon />,
                    title: "Chính sách bảo hành",
                    to: "/app/bao-hanh",
                    isSelected: false,
                    items: []
                },
                {
                    icon: <ArrowRightIcon />,
                    title: "Chính sách đại lý",
                    to: "/app/chinh-sach-dai-ly",
                    isSelected: false
                }
            ]
        },
        {
            icon: <InventoryIcon />,
            title: "Đại lý",
            to: "/app/he-thong-dai-ly",
            isSelected: false,
            items: []
        }
    ]);

    const SingleLevel = ({ item }) => {
        return (
            <Link to={item.to}>
                <ListItem button>
                    <ListItemIcon
                        style={{
                            color: "black"
                        }}
                    >
                        {item.icon}
                    </ListItemIcon>
                    <Box
                        sx={{
                            fontFamily: "Manrope, sans-serif",
                            fontSize: 14,
                            fontWeight: "bold",
                            flexGrow: 1,
                            display: "flex",
                            color: "black",
                            justifyContent: "space-between"
                        }}
                    >
                        {item.title}
                    </Box>
                </ListItem>
            </Link>
        );
    };

    const MultiLevel = ({ item }) => {
        const { items: children } = item;
        const [open, setOpen] = useState(false);

        const handleClick = () => {
            setOpen((prev) => !prev);
        };

        return (
            <Fragment>
                <ListItem button onClick={handleClick}>
                    <ListItemIcon
                        style={{
                            color: "black"
                        }}
                    >
                        {item.icon}
                    </ListItemIcon>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                fontFamily: "Manrope, sans-serif",
                                fontSize: 14,
                                fontWeight: "bold",
                                color: "black"
                            }}
                        >
                            {item.title}
                        </Box>
                        {open ?
                            <Box sx={{ display: "flex" }}>
                                <ExpandLessIcon />
                            </Box>
                            :
                            <Box sx={{ display: "flex" }}>
                                <ExpandMoreIcon />
                            </Box>
                        }
                    </Box>
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit >
                    <List component="div" disablePadding style={{ paddingLeft: 10 }}>
                        {children.map((child, key) => (
                            <MenuItem key={key} item={child} />
                        ))}
                    </List>
                </Collapse>
            </Fragment>
        );
    };

    const MenuItem = ({ item }) => {
        const Component = hasChildren(item) ? MultiLevel : SingleLevel;
        return <Component item={item} />;
    };

    return menu.map((item, key) => <MenuItem key={key} item={item} />);
}

export default CustomMenuItem;