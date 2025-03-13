'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setUserIsLoggedIn } from '@/library/redux/userSlice';
import { useRouter } from 'next/navigation';
import { RootState } from '@/library/redux/store';

const pages = ['Home', 'Posts'];
const settings = {
    loggedIn: ['Profile'],
    notLoggedIn: ['Register', 'Login']
};

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [isClient, setIsClient] = React.useState(false);
    const { isLoggedIn } = useSelector((state: RootState) => state.user)
    React.useEffect(() => {
        setIsClient(true);
    }, []);
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const dispatch = useDispatch();
    const router = useRouter();
    function Logout() {
        Cookies.remove("token");
        dispatch(setUserIsLoggedIn(false));
        router.push("/login");
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Social App
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        {isClient && isLoggedIn &&
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>}

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {isClient && isLoggedIn && pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Link href={page.toLowerCase() === 'home' ? '/' : `/${page.toLowerCase()}`} style={{ textAlign: 'center' }} passHref>
                                        <Typography textAlign="center" color="inherit">{page}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {isClient && isLoggedIn && pages.map((page) => (
                            <Link
                                key={page}
                                href={page.toLowerCase() === 'home' ? '/' : `/${page.toLowerCase()}`}
                                style={{ textDecoration: 'none', color: 'inherit', marginRight: '15px' }}
                            >
                                {page}
                            </Link>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {isClient && isLoggedIn
                                ?
                                [
                                    ...settings.loggedIn.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            <Link href={`/${setting.toLowerCase()}`} style={{ textAlign: 'center' }} passHref>
                                                <Typography textAlign="center" color="inherit">{setting}</Typography>
                                            </Link>
                                        </MenuItem>
                                    )),
                                    <MenuItem key="logout" onClick={() => { handleCloseUserMenu(); Logout() }}>
                                        <Typography textAlign="center" color="inherit">Logout</Typography>
                                    </MenuItem>
                                ]
                                :
                                settings.notLoggedIn.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Link href={`/${setting.toLowerCase()}`} style={{ textAlign: 'center' }} passHref>
                                            <Typography textAlign="center" color="inherit">{setting}</Typography>
                                        </Link>
                                    </MenuItem>
                                ))
                            }
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
