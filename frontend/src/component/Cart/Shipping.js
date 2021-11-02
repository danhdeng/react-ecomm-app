import React, { Fragment, useState } from 'react'
import './Shipping.css'
import { useSelector, useDispatch } from 'react-redux';
import { saveShippingInfo } from '../../actions/cartAction';
import { MetaData } from '../layout/MetaData';
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import { CheckoutSteps } from "../Cart/CaheckoutSteps";
export const Shipping = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { shippingInfo } = useSelector((state) => state.cart);

    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shhippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length < 10 || phoneNo.length > 10) {
            alert.error("Phone Number should be 10 digits long");
        }
        dispatch(saveShippingInfo({ address, city, country, postalCode, phoneNo }));
        history.push("/order/confirm/");
    };
    return (
        <Fragment>
            <MetaData title="Shipping Details" />
            <CheckoutSteps activeStep={0} />
            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className="shippingHeading">Shipping Details</h2>
                    <form
                        className="shippingForm"
                        encType="multipart/form-data"
                        onSubmit={shhippingSubmit}
                    >
                        <div>
                            <HomeIcon />
                            <input
                                type="text"
                                placeholder="Address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div>
                            <LocationCityIcon />
                            <input
                                type="text"
                                placeholder="City"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div>
                            <PinDropIcon />
                            <input
                                type="text"
                                placeholder="Postal Code"
                                required
                                value={address}
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                        </div>
                        <div>
                            <HomeIcon />
                            <input
                                type="number"
                                placeholder="Phone Number"
                                required
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                            />
                        </div>
                        <div>
                            <PublicIcon />
                            <select
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Country</option>
                                {
                                    Country && Country.getAllCountries().map((item) => (
                                        <option key={item.isoCode} value={isoCode}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        {
                            country && (<div>
                                <TransferWithinAStationIcon />
                                <select
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">State</option>
                                    {
                                        State && State.getStateOfCountry(country).map((item) => (
                                            <option key={item.isoCode} value={isoCode}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>)
                        }
                        <input
                            type="submit"
                            value="Continue"
                            className="shippingBtn"
                            disabled={state ? false : true}
                        />
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
