import React, { useEffect, useState } from "react";
import Button from "@/component/Button";
import { getFilters, removeFilter, clearFilters } from "@/service/TransferFilterService";
import { TYPE_PLAYER, TYPE_TRAINER } from "@/consts";
import TransferFilterList from "./component/TransferFilerList/TransferFilterList";
import "./TransferFilters.scss";

const TransferFilter = () => {
    const [filters, setFilters] = useState([]);
    const playerFilters = filters.filter(filter => filter.type === TYPE_PLAYER);
    const trainerFilters = filters.filter(filter => filter.type === TYPE_TRAINER);

    useEffect(async () => {
        setFilters(await getFilters());
    }, []);

    const handleFilterRemove = async (name, type) => {
        const filterRemoved = await removeFilter(name, type);

        if (filterRemoved) {
            setFilters(await getFilters());
        }
    };

    const handleClearAllButtonClick = async () => {
        const cleared = await clearFilters();

        if (cleared) {
            setFilters([]);
        }
    };

    return (
        <div className="transfer-filters">
            <div className="transfer-filters__clear">
                <Button onClick={handleClearAllButtonClick}>Clear all</Button>
            </div>
            <div className="transfer-filters__blocks">
                <div className="transfer-filters__block transfer-filters__block--players">
                    <p>Player filters:</p>
                    <TransferFilterList
                        items={playerFilters}
                        onRemove={(name) => handleFilterRemove(name, TYPE_PLAYER)}
                    />
                </div>
                <div className="transfer-filters__block transfer-filters__block--trainers">
                    <p>Trainer filters:</p>
                    <TransferFilterList
                        items={trainerFilters}
                        onRemove={(name) => handleFilterRemove(name, TYPE_TRAINER)}
                    />
                </div>
            </div>
        </div>
    );

};

export default TransferFilter;
