import React, { useEffect, useState } from "react";
import { getFilters, removeFilter } from "@/service/TransferFilterService";
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

    const handleFilterRemove = async (name, type) => {
        const filterRemoved = await removeFilter(name, type);

        if (filterRemoved) {
            setFilters(await getFilters());
        }
    };

    return (
        <div className="transfer-filters">
            <div className="transfer-filters__block transfer-filters__block--players">
                <p>Player filters:</p>
                <TransferFilterList items={playerFilters} onRemove={(name) => handleFilterRemove(name, TYPE_PLAYER)} />
            </div>
            <div className="transfer-filters__block transfer-filters__block--trainers">
                <p>Trainer filters:</p>
                <TransferFilterList
                    items={trainerFilters}
                    onRemove={(name) => handleFilterRemove(name, TYPE_TRAINER)}
                />
            </div>
        </div>
    );

};

export default TransferFilter;
