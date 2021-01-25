import React from 'react';
import NavbarElement from './NavbarElement';

const NavbarLogin = () => {
    return (
        <>
            <NavbarElement dest="/login" text="Login" />,
            <NavbarElement dest="/lista/usuarios/add" text="Registrar" />
        </>
    );
};

export default NavbarLogin;