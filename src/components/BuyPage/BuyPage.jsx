import React, { useState, useEffect } from 'react';
import './BuyPage.css';

import Heading from '../Heading/Heading';
import Switch from '../Switch/Switch';
import ModelOption from './ModelOption/ModelOption';

function BuyPage() {
    const [priceTable, setPriceTable] = useState(null);

    useEffect(() => {
        async function fetchPriceTable() {
            const res = await fetch('./assets/sellpricelist.json');
            const priceTable = await res.json();
            setPriceTable(priceTable);
        }
        fetchPriceTable();
    }, []);

    const AGRADE = 'A-Grade';
    const NEW = 'New';
    const [newOrUsed, setNewOrUsed] = useState(AGRADE);

    const AGrade = priceTable && priceTable['A-Grade'].map(item =>
        <ModelOption key={item.model} {...item} />  
    );

    const New = priceTable && priceTable['New'].map(item =>
        <ModelOption key={item.model} {...item} />  
    );
    
    return (
        <div className="BuyPage">
            <Heading
                title="Buy Your iPhone Here"
                text="View our available iPhones and prices below. Select a model to purchase."
            />
            <div className="BuyPage-content">
                <Switch
                    option1={AGRADE}
                    option2={NEW}
                    selected={newOrUsed}
                    onSwitch={option => setNewOrUsed(option)}
                />
                <div className="BuyPage-options">
                    { newOrUsed === AGRADE ? AGrade : New }
                </div>
            </div>
        </div>
    );
}

export default BuyPage;
