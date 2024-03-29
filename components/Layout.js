import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Header';
import Head from 'next/head';

const Layout = (props) => {
	return (
		<Container>
			<Head>
				<link
					rel='stylesheet'
					href='//cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css'
				/>
			</Head>
			<Header />
			{props.children}
		</Container>
	);
};

export default Layout;
