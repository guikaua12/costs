import React, {useEffect, useState} from 'react';
import './index.css';
import Page from '../../components/Page';
import ProjectCard from '../../components/ProjectCard';
import useAuth from '../../auth/useAuth';
function Projetos() {
    const auth = useAuth();

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const headers = {
            authorization: `Bearer ${auth.getToken()}`
        };

        fetch('/projects/all', {
            headers
        }).then(response => response.json())
            .then(response => {
                if(response.erro) return;
                setProjects(response.projects);
            })
            .catch(err => console.log(err));

    }, []);

    return (
        <Page title='Projetos' containerProps={{className: 'align-center justify-center block'}} currentPage='projetos'>
            <div className='projects-container'>
                {
                    projects.map(project => <ProjectCard key={project._id} id={project._id} name={project.name} budget={project.budget} type={project.category.name}></ProjectCard>)
                }
                {/*<ProjectCard id='adaw' name='wawada' budget={100} type={1}></ProjectCard>*/}

            </div>
        </Page>
    );
}

export default Projetos;