import { Component } from 'react';
import { getNews } from '../news-utils/news-utils';
import './NewsItem.css';

export default class NewsItem extends Component {
    state = {
      news: []
    }
    componentDidMount = async () => {
      const news = await getNews();
      this.setState({ news: news });
    }
  
    render() {
      return (
        <div className="NewsItem">
          <p>jesus christ </p>
        </div>
      );
    }
}