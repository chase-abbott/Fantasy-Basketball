import { Component } from 'react';
import { getVids } from '../vid-utils/vid-utils';
import VideoItem from './VideoItem';
import './VideoList.css';

export default class VideoList extends Component {
    state = {
      videos: []
    }

  componentDidMount = async () => {
    try {
      // const videos = await getVids();
      // this.setState({ videos: videos });
    }
    catch (err){
      console.log(err);
    }
  }
  
  render() {
    // const { videos } = this.state;

    return (
      <ul className="VideoList" style={{ marginTop: '50px' }}>
        {/* {videos.map(video => (
          <VideoItem key={video.id} video={video}/>
        ))} */}
      </ul>
    );
  }

}