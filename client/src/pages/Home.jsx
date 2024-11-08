import Content from '../components/Content';

function Home() {
  

    return (
      <Content>
        <header className='header'>
          <h1>Welcome to MotionMinds</h1>
        </header>

        <img src="/assets/logo.png" alt="MotionMinds Logo" className="logo" />
      </Content>
    );
  }
  
  export default Home;