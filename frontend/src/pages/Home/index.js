import React from 'react';
import './index.css';
import Page from '../../components/Page';
import LinkButton from '../../components/LinkButton';
import savingsImg from '../../static/savings.svg';
function Home() {
    return (
        <Page containerProps={{className: 'align-center justify-center'}} currentPage='home'>
            <div className='home-container'>
                <h1>Bem-vindo ao <span style={{backgroundColor: '#222222', color: '#FFBB33', padding: '5px'}}>Costs</span></h1>
                <p>Comece a gerenciar os seus projetos agora mesmo!</p>
                <LinkButton to='/newproject'>Criar projeto</LinkButton>
                <img src={savingsImg} alt='Savings' width='350px'/>
            </div>
        </Page>
    );
}

export default Home;