import React, {useEffect, useState} from 'react';
import './index.css';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import useAuth from '../../auth/useAuth';

function ProjectForm({projectData, handleSubmit, className, submitName}) {
    const auth = useAuth();
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData);

    useEffect(() => {
        // get categories
        const headers = {
            authorization: `Bearer ${auth.getToken()}`
        }
        fetch('/projects/categories', {
            headers
        })
            .then(response => response.json())
            .then(response => {
                if(response.erro) return;
                setCategories(response.categories);
            });
    }, []);

    function handleChange(e) {
        setProject(pr => {return {...pr, [e.target.name]: e.target.value}});
    }

    return (
        <form className={`project-form ${className}`} action="#" onSubmit={e => [e.preventDefault(), handleSubmit(project)]}>
            <Input id='project-name' name='name' label='Nome do projeto:' placeholder='Insira o nome do projeto' value={project.name} onChange={handleChange}/>
            <Input id='project-orçamento' name='budget' label='Orçamento do projeto:' placeholder='Insira o orçamento total' value={project.budget} type='number' onChange={handleChange}/>
            <Select id='project-category' name='category' label='Selecione a categoria:' placeholder='Selecione uma opção' value={project.category.id} onChange={handleChange}>
                <option value=''>Selecione uma opção</option>
                {
                    categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)
                }
            </Select>
            <Button>{submitName}</Button>
        </form>
    );
}

ProjectForm.defaultProps = {
    submitName: 'Enviar',
    projectData: {
        name: '',
        budget: 0,
        category: {
            id: 0
        }
    }
}


export default ProjectForm;