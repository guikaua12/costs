import React, {useState} from 'react';
import './index.css';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

function ServiceForm({handleSubmit, className, submitName}) {
    const [service, setService] = useState({});
    function handleChange(e) {
        setService(pr => {return {...pr, [e.target.name]: e.target.value}});
    }

    return (
        <form className={`project-form ${className}`} action="#" onSubmit={e => [e.preventDefault(), handleSubmit(service)]}>
            <Input id='service-name' name='name' label='Nome do serviço:' placeholder='Insira o nome do serviço' onChange={handleChange}/>
            <Input id='service-cost' name='cost' label='Custo do serviço:' placeholder='Insira o custo do serviço' type='number' onChange={handleChange}/>
            <Input id='service-description' name='description' label='Descrição do serviço:' placeholder='Insira a descrição do serviço' type='text' onChange={handleChange}/>
            <Button>{submitName}</Button>
        </form>
    );
}

ServiceForm.defaultProps = {
    submitName: 'Adicionar Serviço',
    serviceData: {
        name: '',
        cost: 0,
        description: ''
    }
}


export default ServiceForm;