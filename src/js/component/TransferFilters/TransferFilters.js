import React, { useEffect, useState } from "react";
import { getFilters } from "@/service/TransferFilterService";
import { TYPE_PLAYER, TYPE_TRAINER } from "@/consts";
import TransferFilterList from "./component/TransferFilerList/TransferFilterList";
import "./TransferFilters.scss";

const TransferFilter = () => {
    const [filters, setFilters] = useState([]);
    const playerFilters = filters.filter(filter => filter.type === TYPE_PLAYER);
    const trainerFilters = filters.filter(filter => filter.type === TYPE_TRAINER);

    useEffect(async () => {
        setFilters(await getFilters());
    });

    return (
        <div className="transfer-filters">
            <div className="transfer-filters__block transfer-filters__block--players">
                <p>Player filters:</p>
                <TransferFilterList items={playerFilters} />
            </div>
            <div className="transfer-filters__block transfer-filters__block--trainers">
                <p>Trainer filters:</p>
                <TransferFilterList items={trainerFilters} />
            </div>
        </div>
    );

};

export default TransferFilter;
