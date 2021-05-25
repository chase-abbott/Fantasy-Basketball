import { Component } from 'react';
import { motion } from 'framer-motion';
import './Ticker.css';
import NewsItem from '../common/NewsItem';

const variants = {
  animate: {
    x: [860, -20535],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 100,
        ease: 'linear',
      },
    },
  },
};

export default class Ticker extends Component {

  
  render() {
    return (
      <motion.div
        className='track'
        variants={variants}
        animate='animate'
      >
        <h1> <NewsItem/> </h1>

      </motion.div>
    );
  }

}