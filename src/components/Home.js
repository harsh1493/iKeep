import React from 'react';
import Notes from './Notes';

const Home = (props) => {

  return (
      <Notes path={props.path}/>
  );
};

export default Home;
