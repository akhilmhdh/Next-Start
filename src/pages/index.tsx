import Head from 'next/head';

const Home = (): JSX.Element => {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <h1>Hello Next Boilerplate</h1>
            </div>
        </div>
    );
};

export default Home;
