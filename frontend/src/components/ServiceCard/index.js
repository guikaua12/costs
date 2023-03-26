import React, {useState} from 'react';
import './index.css';
import ActionLink from '../ActionLink';
import {FaPencilAlt, FaTrashAlt} from 'react-icons/fa';
import ActionButton from '../ActionButton';

function ServiceCard({id, name, cost, description, handleDelete}) {
    return (
        <div className='service-card'>
            <h1 className='card-title'>{name}</h1>
            <span className='budget'>Custo:</span> <span>R${cost}</span>
            <span className='type'>{description}</span>
            <div className='action-wrapper'>
                <ActionButton icon={<FaTrashAlt></FaTrashAlt>} onClick={() => handleDelete(id)}>Excluir</ActionButton>
            </div>
        </div>
    );
}

export default ServiceCard;