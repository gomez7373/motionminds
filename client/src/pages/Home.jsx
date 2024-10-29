import React, { useEffect, useState } from 'react';
import Content from '../components/Content';
import Slider from '../components/Slider';

function Home() {
  

  return (
    <Content>
      <header className='header'>
        <h1>Management of Emotions</h1>
      </header>
      
      <Slider/>
    </Content>
  );
}

export default Home;