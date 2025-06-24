import React from 'react';

function MomentItem({ moment, playerName }) {
    if (!moment || !moment.image || !moment.text) {
        return null; // Não renderiza se os dados estiverem incompletos
    }
    return (
        <div className="moment-item">
            <img src={moment.image} alt={`Momento de ${playerName}: ${moment.text.substring(0, 50)}...`} />
            <p>{moment.text}</p>
        </div>
    );
}

export default MomentItem;