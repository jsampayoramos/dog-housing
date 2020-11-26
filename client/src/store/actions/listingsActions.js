import * as actionType from './actionsType';

export const addNewListing = (listing) => {
    return {
        type: actionType.ADD_NEW_LISTING,
        payload: listing
    };
};

export const getAllListings = (listings) => {
    return {
        type: actionType.GET_USER_LISTINGS,
        payload: listings
    }
}