import React, {useState} from 'react';
import './index.css';

function Home() {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <div className={visible ? 'home' : 'home hidden'}>
                <div className='expandable' onClick={() => setVisible(!visible)}></div>
                <div className='content'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto dicta ducimus fuga ipsam ipsum nobis pariatur placeat voluptatum. Aut deleniti eaque eligendi eos facere incidunt molestias non quaerat ratione sit.</p>
                </div>
            </div>
            <div className={visible ? 'home' : 'home hidden'}>
                <div className='expandable' onClick={() => setVisible(!visible)}></div>
                <div className={'content'}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto dicta ducimus fuga ipsam ipsum nobis pariatur placeat voluptatum. Aut deleniti eaque eligendi eos facere incidunt molestias non quaerat ratione sit.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;