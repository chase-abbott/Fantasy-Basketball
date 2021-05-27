import { Component } from 'react';
import './VideoItem.css';

export default class VideoItem extends Component {
  
  render() {
    const { video } = this.props;

    return (
      <li className="VideoItem">
        <iframe title={video.vid} width="420" height="235" src={`https://www.youtube.com/embed/${video.video}`} frameBorder='0'></iframe>
      </li>
    );
  }
}