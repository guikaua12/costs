import React, {useState} from 'react';
import './index.css';
import Page from '../../components/Page';
import ProjectForm from '../../components/ProjectForm';

function NewProject() {
    const [name, setName] = useState('');
    const [budget, setBudget] = useState(0);
    const [category, setCategory] = useState('');

    async function handleSubmit(e) {
        if (!name || (!budget || isNaN(budget) || budget < 0) || !category) return;

        const request = await fetch('/projects/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return (
        <Page title='Criar Projeto' containerProps={{
            className: 'align-center flex-dir-col margin-bottom',
            style: {
                maxWidth: '350px'
            }}}>
            <div>{category}</div>

            <div className="new-project-container">
                <p>Crie seu projeto para depois adicionar os serviços</p>
                <ProjectForm handleSubmit={handleSubmit} submitName='Criar Projeto'
                     handleNameChange={e => setName(e.target.value)}
                     handleBudgetChange={e => setBudget(e.target.value)}
                     handleCategoryChange={e => setCategory(e.target.value)}></ProjectForm>
            </div>
        </Page>
    );
}

export default NewProject;