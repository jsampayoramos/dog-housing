import React from "react";

import { useHistory } from "react-router-dom";

import Icon from "../../../components/UI/Icon/Icon";
import Button from "../../../components/UI/Button/Button";

import styles from "./Listing.module.css";

const Listing = (props) => {
    const history = useHistory();
    const addPrices = () => {
        props.addPrices();
        history.push({
            pathname: `/listings/${props.id}`,
        });
    };

    return (
        <div className={styles.Listing}>
            <span
                className="spanListingImage"
                style={{ backgroundImage: `url(${props.image[0]})` }}
            ></span>
            <div className="spanAddressContainer">
                <span className="spanName">Cantinho da Maria</span>
                <div>
                    <Icon icon="map-marker-alt" size="1x" />
                    <span className="spanAddressLocation">{props.address}</span>
                </div>
            </div>
            <span className="spanPropertyType">{props.typeOfProperty}</span>
            <span className="spanStatus">{props.status}</span>
            <span className="spanNumberOfPets">
                <Icon icon="paw" size="1x" />
                {props.numberOfAnimals}
            </span>
            <span className="spanTypeOfPets">{props.typeOfAnimals}</span>
            <span className="spanClose">
                <div>
                    <Icon icon="pen" size="1x" action={props.editAction} />
                    <Icon icon="times" size="1x" action={props.deleteAction} />
                </div>
                <Button action={addPrices}>Prices</Button>
            </span>
        </div>
    );
};

export default Listing;
