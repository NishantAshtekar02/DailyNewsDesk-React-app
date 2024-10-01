import React, {useEffect, useState} from 'react'
import NewsItem from './newsitem'
import Spinner from './spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    

    const updateNews = async ()=> {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0dfa44fc23a24ed1a99d8639ae867ec1&page=${page}&pageSize=${props.pagesize}`; 
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        setArticles(parsedData.articles ? parsedData.articles : [])
        setTotalResults(parsedData.totalResults ? parsedData.totalResults : 0)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${(props.category)} - Daily News Desk`;
        updateNews(); 
        // eslint-disable-next-line
    }, [])


    const fetchMoreData = async () => {  
      if (articles.length >= totalResults) return; 
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0dfa44fc23a24ed1a99d8639ae867ec1&page=${page+1}&pageSize=${props.pagesize}`;
        setPage(page+1) 
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles ? parsedData.articles : []))
        setTotalResults(parsedData.totalResults ? parsedData.totalResults : 0)
      };
 
        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px', color:'white' }}> Top {props.category} Headlines</h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                > 
                    <div className="container">
                         
                    <div className="row">
                        {loading && articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} 
                                          description={element.description ? element.description.slice(0, 80) : ""} 
                                          imageUrl={element.urlToImage ? element.urlToImage : "https://static.vecteezy.com/system/resources/previews/000/198/221/original/vector-breaking-news-banner-background-with-world-map.jpg"} 
                                          newsUrl={element.url} 
                                          author={element.author} 
                                          date={element.publishedAt} 
                                          source={element.source.name} 
                                />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>
            </>
        )
    
}

News.propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
}

export default News