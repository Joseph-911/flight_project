import React from "react";

import sim_chip_transparent from "../assets/images/utils/sim_chip_transparent.png";
import world_map_transparent from "../assets/images/utils/world_map_transparent.png";

const CreditCard = (props) => {
    const firstName = props.formInputs.first_name || '';
    const lastName = props.formInputs.last_name || '';
    const fullName = firstName || lastName ? `${firstName} ${lastName}` : '';
    const cardNumber = props.formInputs.credit_card_no
        ? props.formInputs.credit_card_no.replace(/(.{4})/g, "$1 ")
        : "0000 0000 0000 0000";

    return (
        <div className="credit-card">
            <div className="card-bg">
                <img src={world_map_transparent} alt="World Map" />
            </div>
            <div className="card-content">
                <div className="card-header">
                    <p>CREDIT CARD</p>
                </div>
                <div className="card-graph">
                    <img src={sim_chip_transparent} alt="SIM Chip" />
                </div>
                <div className="card-info">
                    <p className="card-number">{cardNumber}</p>
                    <p className="card-holder">{fullName || "YOUR NAME"}</p>
                </div>
            </div>
        </div>
    );
};

export default CreditCard;
