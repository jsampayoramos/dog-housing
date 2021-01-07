import React, { useState } from "react";

import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Icon from "../UI/Icon/Icon";
import useHttp from "../../hooks/useHttp";

import styles from "./ListingPrices.module.css";

const ListingPrices = (props) => {
    const { data, error, sendRequest } = useHttp();
    const history = useHistory();
    const { id } = useParams();
    const [overallPrice, setOverallPrice] = useState({
        type: "input",
        config: {
            name: "overallPrice",
            type: "number",
            required: true,
            placeholder: "Preço por noite",
        },
        value: "",
    });

    const token = useSelector((state) => state.auth.token);

    const [specificPrices, setSpecificPrices] = useState([]);

    const addSpecificPrices = () => {
        if (specificPrices.length < 5) {
            setSpecificPrices((prevPrices) => {
                return [
                    ...prevPrices,
                    {
                        from: {
                            type: "date",
                            config: {
                                name: "from",
                                required: true,
                                placeholderText: "De",
                            },
                            value: "",
                        },
                        to: {
                            type: "date",
                            config: {
                                name: "to",
                                required: true,
                                placeholderText: "Até",
                            },
                            value: "",
                        },
                        price: {
                            type: "input",
                            config: {
                                name: "price",
                                type: "number",
                                required: true,
                                placeholder: "Preço por noite",
                            },
                            value: "",
                        },
                    },
                ];
            });
        }
    };

    const onSetOverallPrice = (event) => {
        setOverallPrice((prevPrice) => {
            return {
                ...prevPrice,
                value: event.target.value,
            };
        });
    };

    const changeSpecialPrices = (event, index) => {
        const { name, value } = event.target;
        const specificPricesCopy = [...specificPrices];
        specificPricesCopy[index][name].value = value;
        setSpecificPrices(specificPricesCopy);
    };

    const changeSpecialDates = (date, index, name) => {
        console.log(date);
        const specificPricesCopy = [...specificPrices];
        specificPricesCopy[index][name].value = date;
        setSpecificPrices(specificPricesCopy);
    };

    const aditionalPrices = specificPrices.map((el, index) => {
        const keys = Object.keys(el);
        return (
            <div key={index} className={styles.AdditionalPrice}>
                <div>
                    <Input
                        elementType={el[keys[0]].type}
                        config={el[keys[0]].config}
                        value={el[keys[0]].value}
                        className={styles.Datepicker}
                        action={(date) =>
                            changeSpecialDates(date, index, "from")
                        }
                    />
                </div>
                <div>
                    <Input
                        elementType={el[keys[1]].type}
                        config={el[keys[1]].config}
                        value={el[keys[1]].value}
                        className={styles.Datepicker}
                        action={(date) => changeSpecialDates(date, index, "to")}
                    />
                </div>
                <div>
                    <Input
                        elementType={el[keys[2]].type}
                        config={el[keys[2]].config}
                        value={el[keys[2]].value}
                        action={(event) => changeSpecialPrices(event, index)}
                    />
                </div>
                <Icon
                    icon="times"
                    size="1x"
                    action={(event) => deleteAditionalPrice(event, index)}
                />
            </div>
        );
    });

    const deleteAditionalPrice = (index) => {
        const copyArray = [...specificPrices];
        copyArray.splice(index, 1);
        setSpecificPrices(copyArray);
    };

    const submitPrices = async () => {
        const data = {
            id: props.id,
            prices: specificPrices,
        };

        sendRequest("/listings/addprices", data, "POST", token);
    };

    const onBack = () => {
        history.push("/listings");
        props.cancel();
    };
    console.log(id);
    return (
        <div className={styles.ListingPricesContainer}>
            <div className={styles.ListingPrices}>
                <h2>Preços</h2>
                <hr />
                <form>
                    <div className={styles.OverallPrice}>
                        <label>Preço geral</label>
                        <Input
                            elementType={overallPrice.type}
                            config={overallPrice.config}
                            value={overallPrice.value}
                            action={(event) => onSetOverallPrice(event)}
                        />
                    </div>
                </form>
                <p>
                    Se quiser definir preços para datas específicas, faça-o em
                    baixo, até um máximo de 5
                </p>
                <form>{aditionalPrices}</form>
                {specificPrices.length < 5 ? (
                    <Button action={addSpecificPrices}>Adicionar preço</Button>
                ) : null}
                <div className={styles.ButtonsContainer}>
                    <Button action={onBack}>Cancelar</Button>
                    <Button action={submitPrices}>Confirmar</Button>
                </div>
            </div>
        </div>
    );
};

export default ListingPrices;
