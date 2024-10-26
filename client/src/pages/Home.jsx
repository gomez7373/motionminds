import React, { useEffect, useState } from 'react';
import Content from '../components/Content';
import Slider from '../components/Slider';

function Home() {
  

  return (
    <Content>
      <header>
        <h1>Welcome to MotionMinds</h1>
      </header>
      
      <Slider/>
    </Content>
  );
}

export default Home;