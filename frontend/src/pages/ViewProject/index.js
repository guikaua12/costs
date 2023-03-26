import React, {useEffect, useState} from 'react';
import './index.css';
import Page from '../../components/Page';
import useAuth from '../../auth/useAuth';
import {useParams} from 'react-router-dom';
import Button from '../../components/Button';
import ProjectForm from '../../components/ProjectForm';
import Loading from '../../components/Loading';

function ProjectInfo({projectData}) {
    return (
        <div className="project-info-container">
            <div>
                <span className='project-info'>Categoria: </span><span>{projectData.category && projectData.category.name}</span>
            </div>
            <div>
                <span className='project-info'>Total do orçamento: </span><span>R${projectData.budget}</span>
            </div>
            <div>
                <span className='project-info'>Total utilizado: </span><span>N/A</span>
            </div>
        </div>
    );
}

function ViewProject() {
    const auth = useAuth();
    const {id} = useParams();

    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(true);

    // project form (edit project)
    const [isEditing, setIsEditing] = useState(false);
    // project form (add service)
    const [serviceIsEditing, setServiceIsEditing] = useState(false);

    useEffect(() => {
        // fetch project data
        const headers = {
            authorization: `Bearer ${auth.getToken()}`
        };

        fetch(`/projects/${id}`, {
            headers
        }).then(response => response.json())
            .then(response => {
                setLoading(false);
                if(!response.erro)
                    setProject(response.project);
            }).catch(err => console.log(err));

    }, []);

    function updateProject(project) {
        const headers = {
            'Content-Type': 'application/json',
            authorization: `Bearer ${auth.getToken()}`
        };
        const body = {
            name: project.name,
            budget: Number(project.budget),
            category: Number(project.category.id)
        };

        return fetch(`/projects/${id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(body)
        });
    }

    function addService(project) {

    }


    function handleEditSubmit(project) {
        setIsEditing(false);
        updateProject(project)
            .then(response => response.json())
            .then(data => {
                if(data.erro) return;
                setProject(project)
            });

        // exibir mensagem
    }

    function handleAddServiceSubmit(project) {
        setServiceIsEditing(false);
        // exibir mensagem
    }

    return (
        <Page containerProps={{className: 'align-center justify-center block'}}>
            <div className='project-container'>
                {
                    loading && <Loading></Loading>
                }
                {
                    !loading && (
                        <>
                            <div className="wrapper1">
                                <h1 className='project-name'>Projeto: {project.name}</h1>
                                <Button onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Fechar' : 'Editar'}</Button>
                            </div>

                            {
                                isEditing ?
                                    <ProjectForm projectData={project} submitName='Concluir edição' handleSubmit={handleEditSubmit}/>
                                    : <ProjectInfo projectData={project}/>

                            }

                            <div className="add-service-container">
                                <div className="wrapper1">
                                    <h1>Adicione um serviço:</h1>
                                    <Button onClick={() => setServiceIsEditing(!serviceIsEditing)}>{serviceIsEditing ? 'Fechar' : 'Adicionar Serviço'}</Button>
                                </div>
                                {
                                    serviceIsEditing && <ProjectForm submitName='Concluir edição' handleSubmit={handleAddServiceSubmit}/>
                                }
                            </div>
                        </>
                    )
                }
            </div>
        </Page>
    );
}

export default ViewProject;