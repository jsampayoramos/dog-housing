import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import useHttp from "../../hooks/useHttp";
import Button from "../../components/UI/Button/Button";
import Listing from "./Listing/Listing";
import ListingPrices from "../../components/ListingPrices/ListingPrices";
import * as listingsActions from "../../store/actions/listingsActions";
import * as loadingActions from "../../store/actions/loadingActions";

import styles from "./Listings.module.css";
import "./Listings.css";

const Listings = (props) => {
    const [prices, setPrices] = useState(false);
    const listings = useSelector((state) => state.listings);
    const token = useSelector((state) => state.auth.token);
    const loading = useSelector((state) => state.loading);
    const history = useHistory();
    const dispatch = useDispatch();
    const { data, sendRequest, initializeState } = useHttp();

    useEffect(() => {
        if (!data) {
            dispatch(loadingActions.toggleLoading());
            sendRequest("/listings/getuserlistings", null, "get", token);
            //dispatch(listingsActions.getAllListings(data.data.listings));
        }
        if (data) {
            dispatch(listingsActions.getAllListings(data.data.listings));
            dispatch(loadingActions.toggleLoading());
        }
    }, [token, data, sendRequest, dispatch, initializeState]);

    useEffect(() => {
        return () => initializeState();
    }, [initializeState]);

    const deleteListing = async (id) => {
        dispatch(loadingActions.toggleLoading());
        const config = {
            headers: { Authorization: "Bearer " + token },
            params: { id },
        };

        dispatch(listingsActions.deleteListing(id));

        try {
            await axios.delete("/listings/deletelisting", config);
            dispatch(listingsActions.deleteListing(id));
            dispatch(loadingActions.toggleLoading());
        } catch (error) {
            dispatch(loadingActions.toggleLoading());
        }
    };

    const listingsArray = listings.map((listing) => {
        return (
            <Listing
                key={listing.address}
                {...listing}
                deleteAction={() => deleteListing(listing.id)}
                editAction={() => editListing(listing.id)}
                addPrices={() => setPrices(true)}
            />
        );
    });

    const editListing = (id) => {
        history.push({
            pathname: `/listings/newproperty/${id}`,
        });
    };

    return (
        <section className={styles.Listings}>
            {prices ? <ListingPrices cancel={() => setPrices(false)} /> : null}
            <div>
                <h3>As tuas propriedades</h3>
                <Button>
                    <Link to="/listings/newproperty">
                        Adicionar propriedade
                    </Link>
                </Button>
            </div>
            <div className={styles.Header}>
                <span className="spanListingImageHeader"></span>
                <span className="spanAddress">Morada</span>
                <span className="spanPropertyType">Tipo de propriedade</span>
                <span className="spanStatus">Status</span>
                <span className="spanNumberOfPets"># Pets</span>
                <span className="spanTypeOfPets">Type of pets</span>
                <span className="spanClose"></span>
            </div>
            <hr />
            {listingsArray}
        </section>
    );
};

export default Listings;
