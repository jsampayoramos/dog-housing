import React from "react";
import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem";

import styles from "./Drawer.module.css";

const drawer = (props) => {
    const drawerStyle = [styles.Drawer];

    if (props.status) {
        drawerStyle.push(styles.OpenDrawer);
    } else {
        drawerStyle.push(styles.CloseDrawer);
    }

    let signInItems = (
        <div className={styles.RegistrationContainer}>
            <div onClick={props.closeDrawer}>
                <NavigationItem to="/signup" style={{ marginTop: "auto" }}>
                    Signup
                </NavigationItem>
            </div>
            <div onClick={props.closeDrawer}>
                <NavigationItem to="/login">Login</NavigationItem>
            </div>
        </div>
    );

    if (props.isAuth) {
        signInItems = (
            <div className={styles.AccountItems}>
                <div onClick={props.closeDrawer}>
                    <NavigationItem to="/dashboard">Dashboard</NavigationItem>
                </div>
                <div onClick={props.closeDrawer}>
                    <NavigationItem to="/listings">Alojamentos</NavigationItem>
                </div>
                <div onClick={props.logout}>
                    <NavigationItem to="#">Logout</NavigationItem>
                </div>
            </div>
        );
    }

    return (
        <div className={drawerStyle.join(" ")}>
            <ul>
                <h1>PetInn</h1>
                <div
                    className={styles.ItemContainer}
                    onClick={props.closeDrawer}
                >
                    <NavigationItem to="#" style={{ marginTop: "15px" }}>
                        Quero ser anfitrião
                    </NavigationItem>
                </div>
                <div
                    className={styles.ItemContainer}
                    onClick={props.closeDrawer}
                >
                    <NavigationItem to="#">Opção 2</NavigationItem>
                </div>
                {signInItems}
            </ul>
        </div>
    );
};

export default drawer;
