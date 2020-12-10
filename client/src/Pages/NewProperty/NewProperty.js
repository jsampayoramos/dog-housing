import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import useHttp from "../../hooks/useHttp";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import * as listingsActions from "../../store/actions/listingsActions";
import * as loadingActions from "../../store/actions/loadingActions";

import styles from "./NewProperty.module.css";

const NewProperty = (props) => {
    const { sendRequest, initializeState } = useHttp();
    const [form, setForm] = useState({
        address: {
            label: "Morada",
            type: "input",
            config: {
                required: true,
                name: "address",
                type: "text",
            },
            value: "",
        },
        location: {
            label: "Concelho",
            type: "select",
            config: {
                required: true,
                name: "location",
                defaultValue: "Lisboa",
            },
            options: ["Lisboa", "Porto", "Faro"],
            value: "Lisboa",
        },
        floorAndDoor: {
            label: "Andar e Porta",
            type: "input",
            config: {
                required: true,
                name: "floorAndDoor",
                type: "text",
            },
            value: "",
        },
        numberOfAnimals: {
            label: "# of Pets",
            type: "input",
            config: {
                required: true,
                name: "numberOfAnimals",
                type: "number",
            },
            value: "",
        },
        typeOfAnimals: {
            label: "Pets accepted",
            type: "select",
            config: {
                name: "typeOfAnimals",
                required: true,
                defaultValue: "Cão",
            },
            options: ["Cão", "Gato", "Cães e gatos"],
            value: "Cão",
        },
        typeOfProperty: {
            label: "Tipo de propriedade",
            type: "select",
            config: {
                name: "typeOfProperty",
                required: true,
                defaultValue: "Apartamento",
            },
            options: ["Apartamento", "Moradia", "Quinta", "Hotel para cães"],
            value: "Apartamento",
        },
        description: {
            label: "Descrição",
            type: "textarea",
            config: {
                required: true,
                name: "description",
            },
            value: "",
        },
    });

    const [checkBoxForm, setCheckBoxForm] = useState({
        walks: {
            label: "Passeios diários",
            type: "checkbox",
            config: {
                type: "checkbox",
                name: "walks",
                checked: false,
            },
            value: "Passeios diários",
            checked: false,
        },
        balcony: {
            label: "Jardim/Terraço",
            type: "checkbox",
            config: {
                type: "checkbox",
                name: "balcony",
                checked: false,
            },
            value: "Jardim/Terraço",
        },
    });

    const [checkedOptions, setCheckedOptions] = useState([]);

    const [uploadImage, setUploadImage] = useState({
        image: {
            label: "Upload imagens",
            type: "input",
            config: {
                // required: true,
                type: "file",
                name: "image",
            },
            value: "",
        },
    });

    const [imagesUploaded, setImagesUploaded] = useState([]);

    const listings = useSelector((state) => state.listings);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const listing = listings.find((list) => list.id === parseInt(id));
            if (form.address.value === "") {
                const formCopy = { ...form };
                for (let item in formCopy) {
                    formCopy[item].value = listing[item];
                }
                setForm(formCopy);
            }
            setCheckedOptions(listing.services);
            setCheckBoxForm((prevForm) => {
                if (listing.services.includes("Passeios diários"))
                    prevForm.walks.config.checked = true;
                if (listing.services.includes("Jardim/Terraço"))
                    prevForm.balcony.config.checked = true;
                return {
                    ...prevForm,
                };
            });
        }
    }, [form, id, listings]);

    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const history = useHistory();

    const setFormValues = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: {
                ...form[name],
                value: value,
            },
        });
    };

    const formArray = Object.keys(form).map((el) => {
        if (el !== "description") {
            return (
                <React.Fragment>
                    <label>{form[el].label}</label>
                    <Input
                        style={{
                            marginBottom: "10px",
                        }}
                        action={setFormValues}
                        elementType={form[el].type}
                        config={form[el].config}
                        value={form[el].value}
                        options={
                            form[el].type === "select" ? form[el].options : null
                        }
                    />
                </React.Fragment>
            );
        }
    });

    const setChecked = (event) => {
        let checkedOptionsCopy = [...checkedOptions];
        const index = checkedOptionsCopy.indexOf(event.target.value);
        if (index === -1) {
            checkedOptionsCopy = [...checkedOptionsCopy, event.target.value];
        } else {
            checkedOptionsCopy.splice(index, 1);
        }
        setCheckedOptions(checkedOptionsCopy);
        setCheckBoxForm((prevState) => {
            return {
                ...prevState,
                [event.target.name]: {
                    ...prevState[event.target.name],
                    config: {
                        ...prevState[event.target.name].config,
                        checked: !prevState[event.target.name].config.checked,
                    },
                },
            };
        });
    };

    const checkBoxArray = Object.keys(checkBoxForm).map((key) => {
        return (
            <div className={styles.CheckBoxUnitContainer}>
                <label>{checkBoxForm[key].label}</label>
                <Input
                    elementType={checkBoxForm[key].type}
                    config={checkBoxForm[key].config}
                    value={checkBoxForm[key].value}
                    action={setChecked}
                />
            </div>
        );
    });

    const fileUploadAction = (event) => {
        event.preventDefault();
        setImagesUploaded([...imagesUploaded, event.target.files[0]]);
    };

    const deleteImage = (name) => {
        const imageArray = imagesUploaded.filter((img) => img.name !== name);
        setImagesUploaded(imageArray);
    };

    const uploadImageArray = Object.keys(uploadImage).map((key) => {
        return (
            <div className={styles.ImageContainer}>
                <label>{uploadImage[key].label}</label>
                <Input
                    elementType={uploadImage[key].type}
                    config={uploadImage[key].config}
                    action={fileUploadAction}
                />
            </div>
        );
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        dispatch(loadingActions.toggleLoading());
        const formData = new FormData();
        for (let key in form) {
            formData.append(key, form[key].value);
        }
        formData.append("checkedOptions", checkedOptions);
        imagesUploaded.forEach((img) => formData.append("image", img));

        await sendRequest("/listings/newlisting", formData, "post", token);
        dispatch(loadingActions.toggleLoading());
        initializeState();
        history.push("/listings");
    };

    const onEdit = async (event, listId) => {
        event.preventDefault();
        dispatch(loadingActions.toggleLoading());
        const formData = new FormData();
        for (let key in form) {
            formData.append(key, form[key].value);
        }
        formData.append("checkedOptions", checkedOptions);
        imagesUploaded.forEach((img) => formData.append("image", img));

        await sendRequest(
            "/listings/editlisting",
            formData,
            "put",
            token,
            listId
        );
        dispatch(loadingActions.toggleLoading());
        initializeState();
        history.push("/listings");
    };

    return (
        <section className={styles.NewProperty}>
            <h3>Adicionar propriedade</h3>
            <hr />
            <form onSubmit={!id ? onSubmit : (event) => onEdit(event, id)}>
                {formArray}
                <div className={styles.CheckBoxContainer}>
                    <h3>Serviços</h3>
                    {checkBoxArray}
                </div>
                {uploadImageArray}
                <div className={styles.ImagesUploaded}>
                    {imagesUploaded.map((img) => {
                        return (
                            <div className={styles.ImageNames}>
                                <span>{img.name}</span>
                                <p onClick={() => deleteImage(img.name)}>X</p>
                            </div>
                        );
                    })}
                </div>
                <label>{form.description.label}</label>
                <Input
                    style={{
                        marginBottom: "10px",
                    }}
                    action={setFormValues}
                    elementType={form.description.type}
                    config={form.description.config}
                    value={form.description.value}
                />
                <div className={styles.ButtonContainer}>
                    <Button>
                        <Link to="/listings">Cancelar</Link>
                    </Button>
                    <Button>{id ? "Editar" : "Adicionar"}</Button>
                </div>
            </form>
        </section>
    );
};

export default NewProperty;
