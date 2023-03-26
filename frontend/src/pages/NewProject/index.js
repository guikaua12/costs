import React, {useState} from 'react';
import './index.css';
import Page from '../../components/Page';
import ProjectForm from '../../components/ProjectForm';
import useAuth from '../../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import Message from '../../components/Message';

function NewProject() {
    const auth = useAuth();
    const navigate = useNavigate();
    async function handleSubmit(project) {
        createProject(project)
            .then(response => response.json())
            .then(data => {
                if(data.erro) {
                    return;
                }
                navigate('/projects', {
                    state: {
                        message: {
                            type: 'success',
                            msg: data.msg
                        }
                    }
                });
            })
            .catch(err => console.log(err));
    }

    function createProject(project) {
        const headers = {
            'Content-Type': 'application/json',
            authorization: `Bearer ${auth.getToken()}`
        };
        const body = {
            name: project.name,
            budget: Number(project.budget),
            category: Number(project.category)
        };

        return fetch(`/projects/new`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        });
    }

    return (
        <Page title='Criar Projeto' containerProps={{
            className: 'align-center flex-dir-col margin-bottom',
            style: {
                maxWidth: '350px'
            }}}>

            <div className="new-project-container">
                <p>Crie seu projeto para depois adicionar os serviços</p>
                <ProjectForm handleSubmit={handleSubmit} submitName='Criar Projeto'></ProjectForm>
            </div>
        </Page>
    );
}

export default NewProject;