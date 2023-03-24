import React from 'react';
import './index.css';
import Footer from '../../layout/Footer';
import Container from '../../layout/Container';
import Header from '../../layout/Header';

function Page({children, title, containerProps, currentPage}) {
    return (
        <>
            <Header currentPage={currentPage}></Header>
            <Container containerProps={containerProps}>
                {
                    title && <h1 className='page-title'>{title}</h1>
                }
                {children}
            </Container>
            <Footer></Footer>
        </>
    );
}

Page.defaultProps = {
    containerProps: {}
}

export default Page;