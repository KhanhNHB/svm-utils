import React, { Fragment, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import InventoryIcon from '@mui/icons-material/Inventory';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ShieldIcon from '@mui/icons-material/Shield';

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
            icon: <DashboardIcon />,
            title: "Sản phẩm",
            to: "/app/san-pham",
            isSelected: false,
            items: []
        },
        {
            icon: <LibraryBooksIcon />,
            title: "Hướng dẫn sử dụng",
            isSelected: false,
            items: [
                {
                    title: "Tính năng",
                    to: "/app/tinh-nang",
                    isSelected: false
                },
                {
                    title: "Lắp đặt",
                    to: "/app/lap-dat",
                    isSelected: false
                }
            ]
        },
        {
            icon: <ContactPhoneIcon />,
            title: "Liên hệ",
            to: "/app/lien-he",
            isSelected: false,
            items: []
        },
        {
            icon: <ShieldIcon />,
            title: "Bảo hành",
            to: "/app/bao-hanh",
            isSelected: false,
            items: []
        },
        {
            icon: <InventoryIcon />,
            title: "Đại lý",
            to: "/app/dai-ly",
            isSelected: false,
            items: []
        },
        {
            icon: <NewspaperIcon />,
            title: "Tin tức",
            isSelected: false,
            items: [
                {
                    icon: <NewspaperIcon />,
                    title: "Tin khuyến mại",
                    to: "/app/tin-khuyen-mai",
                    isSelected: false
                },
                {
                    title: "Tin sản phẩm",
                    to: "/app/tin-san-pham",
                    isSelected: false
                },
                {
                    title: "Tin sự kiện",
                    to: "/app/tin-su-kien",
                    isSelected: false
                }
            ]
        },
    ]);

    // const handleSelectedPath = (pathname, to) => {
    //     setMenu(menu => {
    //         return menu.map(item => {
    //             if (item.items.length) {
    //                 item.items.map(child => {
    //                     if (child.to === to) {
    //                         child.isSelected = true;
    //                         return { ...item, items: child };
    //                     } else {
    //                         child.isSelected = false;
    //                         return { ...item, items: child };
    //                     }
    //                 })
    //             } else {
    //                 if (item.to === to) {
    //                     item.isSelected = true;
    //                 } else {
    //                     item.isSelected = false;
    //                 }
    //             }
    //             return item;
    //         });
    //     });
    // };

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
                                color: "black",
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
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
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