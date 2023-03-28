import React, {useEffect, useState} from 'react';
import './index.css';
import Page from '../../components/Page';
import useAuth from '../../auth/useAuth';
import {useParams} from 'react-router-dom';
import Button from '../../components/Button';
import ProjectForm from '../../components/ProjectForm';
import ServiceForm from '../../components/ServiceForm';
import Loading from '../../components/Loading';
import Message from '../../components/Message';
import ServiceCard from '../../components/ServiceCard';

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
                <span className='project-info'>Total utilizado: </span><span>R${projectData.cost}</span>
            </div>
        </div>
    );
}

function ViewProject() {
    const auth = useAuth();
    const {id} = useParams();

    const [project, setProject] = useState({});
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    // project form (edit project)
    const [isEditing, setIsEditing] = useState(false);
    // project form (add service)
    const [serviceIsEditing, setServiceIsEditing] = useState(false);

    // message
    const [message, setMessage] = useState();

    useEffect(() => {
        // fetch project data
        const headers = {
            authorization: `Bearer ${auth.getToken()}`
        };

        fetch(`/projects/${id}`, {
            headers
        }).then(response => response.json())
            .then(data => {
                setLoading(false);
                if(!data.erro) {
                    setProject(data.project);
                    setServices(data.project.services);
                }
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
            category: Number(project.category)
        };

        return fetch(`/projects/${id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(body)
        });
    }

    function addService(service) {
        const headers = {
            'Content-Type': 'application/json',
            authorization: `Bearer ${auth.getToken()}`
        };
        const body = {
            name: service.name,
            cost: Number(service.cost),
            description: service.description
        };

        return fetch(`/projects/${id}/services/new`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        });
    }

    function deleteService(serviceId) {
        const headers = {
            authorization: `Bearer ${auth.getToken()}`
        };

        return fetch(`/projects/${id}/services/${serviceId}`, {
            method: 'DELETE',
            headers
        });
    }

    function handleEditSubmit(project) {
        setIsEditing(false);
        updateProject(project)
            .then(response => response.json())
            .then(data => {
                if(data.erro) {
                    console.log(data.msg);
                    return;
                }
                setProject(project)
            });

        // exibir mensagem
    }

    function handleAddServiceSubmit(service) {
        if(Number(project.cost)+Number(service.cost) > Number(project.budget)) {
            setMessage({
                type: 'error',
                msg: 'O custo não pode exceder o orçamento do projeto.',
                delay: 0
            });
            return;
        }

        addService(service)
            .then(response => response.json())
            .then(data => {
                setMessage({
                    type: data.erro ? 'error' : 'success',
                    msg: data.msg
                });
                setProject(data.project);
                setServices(data.project.services);
                setServiceIsEditing(false);
            })
            .catch(err => console.log(err));
    }

    function handleDeleteServiceSubmit(serviceId) {
        deleteService(serviceId)
            .then(response => response.json())
            .then(data => {
                setMessage({
                    type: data.erro ? 'error' : 'success',
                    msg: data.msg
                });
                setProject(data.project);
                setServices(data.project.services);
            })
            .catch(err => console.log(err));
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
                            {
                                message && <Message type={message.type} msg={message.msg} delay={message.delay && message.delay}></Message>
                            }
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
                                    serviceIsEditing && <ServiceForm handleSubmit={handleAddServiceSubmit}/>
                                }
                            </div>

                            <h1>Serviços:</h1>
                            <div className="services-container">
                                {
                                    services.map(service => <ServiceCard key={service._id}
                                                                         id={service._id}
                                                                         name={service.name}
                                                                         cost={service.cost}
                                                                         description={service.description}
                                                                         handleDelete={handleDeleteServiceSubmit}/>)
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