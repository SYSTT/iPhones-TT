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
    }, []);

    function handleEvaluationSubmit(results) {
        setResults(results);
    }

    const description = results && results.buyingPrice ?
            `$${results.buyingPrice}`
        :   results && results.submitted ?
            'Unfortunately we don\'t have an estimate for this model and memory configuration yet!'
        :   '$---------';

    return (
        <div className="EstimationPage">
            <div className="EstimationPage-form">
                <EvaluationForm
                  handleSubmit={handleEvaluationSubmit}
                  priceTable={priceTable}
                />
            </div>
            <div className="EstimationPage-results">
                <IPhoneCard 
                    title="Your iPhone's Value:"
                    description={description}
                    color="#29687C"
                />
            </div>
        </div>
    );
}

export default EstimationPage;