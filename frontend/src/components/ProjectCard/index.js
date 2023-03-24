import React from 'react';
import './index.css';
import ActionLink from '../ActionLink';
import {FaPencilAlt, FaTrashAlt} from 'react-icons/fa';
import ActionButton from '../ActionButton';

function ProjectCard({id, name, budget, type}) {
    return (
        <div className='project-card'>
            <h1 className='card-title'>{name}</h1>
            <span className='budget'>Orçamento:</span> <span>R${budget}</span>
            <span className='type'>{type}</span>
            <div className='action-wrapper'>
                <ActionLink icon={<FaPencilAlt></FaPencilAlt>} to={`/project/${id}`}>Editar</ActionLink>
                <ActionButton icon={<FaTrashAlt></FaTrashAlt>}>Excluir</ActionButton>
            </div>
        </div>
    );
}

export default ProjectCard;