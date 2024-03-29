import React from 'react';
import './index.css';
import LoaderCircle from './../img/Load.svg';
import InfiniteScroll from './InfiniteScroll';
import defaults from './../img/default.jpeg';
class index extends React.Component{
    intervalID;
    constructor(props){
        super(props);
        this.state = {
                articleData : [],
                search : "",
                loader : false,
                totalCount : 80,
                current : 1
            } 
    }

    componentDidMount(){
      this.intervalID = setInterval(this.refreshData, 30000);
      this.getData() 
    }

    componentWillUnmount(){
        clearTimeout(this.intervalID);
        this.setState({
          loader : false
        })
    }

    refreshData=()=>{
      var maxcount = this.state.totalCount;
      var pages = Math.round(maxcount/10)
      var currentCount = this.state.current;
      currentCount = currentCount + 1 ;
      if(currentCount > pages)
      console.log("...")
      else{
        this.setState({
          current : currentCount
        },()=>this.getData())
        
      }
      
    }

    getData=()=>{
      var searchedData = this.state.search ? this.state.search : "reactjs"
      fetch('https://newsapi.org/v2/everything?q='+searchedData+'&apiKey=99b2dc084eae4993adf955652422c714&pageSize=10&page='+this.state.current)
        .then(res => res.json())
        .then((data) => {
          this.setState({ articleData : data.articles,loader:true })
        })
        .catch(console.log("-"))  
    }
    
    
    onChangesearchData = (e) =>{
        var searchedData = e.target.value;
        this.setState({
          search : searchedData
        },()=>{
          this.getData()
        })
    }

    render(){
        // var filteredData=this.state.articleData.filter(
        //   (search) => {
        //     var filter = search
        //     return search.source.name.toLowerCase().indexOf(this.state.search) !== -1 && filter;
        //   } 
        // )
        return(
            <React.Fragment>
              <InfiniteScroll
                loadMore={this.getData.bind(this)}>
                  <div className="mainContainer">
                    <div className="subContainer">
                        <div className="" style={{fontSize:"25px",padding:"25px 0px", textAlign:"center"}}>  
                           Latest News Search 
                        </div>
                        <div className="card-container">
                           <div className="searchBar-container">
                              <input className="searchinputBar-class img-class"
                                 placeholder="Search"
                                 onChange = {this.onChangesearchData.bind(this)} 
                              />
                           </div>
                            <div className="map-container">
                            {
                                this.state.articleData.length !== 0 ? (
                                  this.state.articleData && this.state.articleData.map((value,key)=>{
                                  return(
                                      <div className="card-contents" key={key}>
                                        <div className="img-container">
                                            <img alt="" src={value.urlToImage ? value.urlToImage : defaults } width="70px" height="70px"/>
                                        </div>
                                        <div className="content-container">
                                            <div className="name-class">
                                              {value.source.name}
                                            </div>
                                            <div className="desc-class" style={{lineHeight:"32px"}}>
                                              {value.description}
                                            </div>
                                        </div>
                                      </div>
                                  )
                                }) 
                                ) : (
                                  <div style={{textAlign:"center",padding:"30px"}}>
                                    No result found.
                                  </div>
                                )
                            }
                            </div>
                        </div>
                    </div>
                    {/* { this.state.loader === true ?
                     */}
                  </div>
                  {/* {
                    (this.state.articleData.length<this.state.totalCount-10)?
                    // <img src = {LoaderCircle} alt = "" height = "50px" style = {{margin:"auto",width:"100%"}}/>: null
                  } */}
                </InfiniteScroll>
            </React.Fragment>
        )
    }
}
export default index;