import React, {useEffect, useState} from 'react';
import './index.css';
import Page from '../../components/Page';
import ProjectCard from '../../components/ProjectCard';
import useAuth from '../../auth/useAuth';
import {useLocation} from 'react-router-dom';
import Message from '../../components/Message';
import Loading from '../../components/Loading';

function Projetos() {
    const auth = useAuth();
    const location = useLocation();

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const [message, setMessage] = useState(location.state ? location.state.message : undefined);

    useEffect(() => {
        const headers = {
            authorization: `Bearer ${auth.getToken()}`
        };

        fetch('/projects/all', {
            headers
        }).then(response => response.json())
            .then(response => {
                setLoading(false);
                if(response.erro) return;
                setProjects(response.projects);
            })
            .catch(err => console.log(err));

    }, []);

    function deleteProject(id) {
        const headers = {
            authorization: `Bearer ${auth.getToken()}`
        };

        return fetch(`/projects/${id}`, {
            method: 'DELETE',
            headers
        });
    }

    function handleDelete(id) {
        deleteProject(id)
            .then(response => response.json())
            .then(data => {
                if(data.erro) {
                    console.log(data.msg);
                    return;
                }
                setMessage(message => { return {type: 'success', msg: 'Projeto removido com sucesso.'}});
                setProjects(projects => projects.filter(pr => pr._id !== id));
            })
            .catch(err => console.log(err));
    }

    return (
        <Page title='Projetos' containerProps={{className: 'align-center justify-center block'}} currentPage='projetos'>
            {
                message && <Message type='success' msg={message.msg}></Message>
            }
            {
                loading && <Loading></Loading>
            }
            <div className='projects-container'>
                {
                    projects.map(project => <ProjectCard key={project._id} id={project._id} name={project.name} budget={project.budget} type={project.category.name} handleDelete={handleDelete}></ProjectCard>)
                }
                {/*<ProjectCard id='adaw' name='wawada' budget={100} type={1}></ProjectCard>*/}

            </div>
        </Page>
    );
}

export default Projetos;