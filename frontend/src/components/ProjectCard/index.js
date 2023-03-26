import React, {useState} from 'react';
import './index.css';
import ActionLink from '../ActionLink';
import {FaPencilAlt, FaTrashAlt} from 'react-icons/fa';
import ActionButton from '../ActionButton';
import useAuth from '../../auth/useAuth';

function ProjectCard({id, name, budget, type, handleDelete}) {
    return (
        <div className='project-card'>
            <h1 className='card-title'>{name}</h1>
            <span className='budget'>Orçamento:</span> <span>R${budget}</span>
            <span className='type'>{type}</span>
            <div className='action-wrapper'>
                <ActionLink icon={<FaPencilAlt></FaPencilAlt>} to={`/project/${id}`}>Editar</ActionLink>
                <ActionButton icon={<FaTrashAlt></FaTrashAlt>} onClick={() => handleDelete(id)}>Excluir</ActionButton>
            </div>
        </div>
    );
}

export default ProjectCard;