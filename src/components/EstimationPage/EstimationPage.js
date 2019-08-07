import React, { useState, useEffect } from 'react';
import './EstimationPage.css';

import EvaluationForm from '../forms/EvaluationForm';
import IPhoneCard from '../IPhoneCard/IPhoneCard';

function EstimationPage() {
    const [results, setResults] = useState(null);
    const [priceTable, setPriceTable] = useState(null);

    useEffect(() => {
        async function fetchPriceTable() {
            const res = await fetch('./pricelist.json');
            const priceTable = await res.json();
            setPriceTable(priceTable);
        }
        fetchPriceTable();
    });

    function handleEvaluationSubmit(results) {
        setResults(results);
    }

    return (
        <div className="EstimationPage">
            <div className="EstimationPage-form">
                <EvaluationForm
                  handleSubmit={handleEvaluationSubmit}
                  priceTable={  priceTable}
                />
            </div>
            <IPhoneCard 
                title="Your iPhone's Value:"
                description={results ? `$${results.buyingPrice}` : '$---'}
                color="#29687C"
            />
        </div>
    );
}

export default EstimationPage;