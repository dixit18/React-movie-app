import React, { Component } from 'react'
import { movies } from './getMovies'

export default class favourite extends Component {
  
    constructor(){
        super()
        this.state={
            geners:[],
            currgen:'All Geners',
            movies:[],
            currtext:'',
            limit:5,
            currPage:1
        }
    }
    componentDidMount(){
        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
        let data = JSON.parse(localStorage.getItem('movies-app') || "[]")
        let temp = []
        data.forEach((movieObj)=>{
            if(!temp.includes(genreids[movieObj.genre_ids[0]])){
                temp.push(genreids[movieObj.genre_ids[0]])
            }
        })
        temp.unshift('All Geners');
        this.setState({
            geners:[...temp],
            movies:[...data]
        })

    }
    handlegGenerChange=(gener)=>{
        this.setState({
            currgen:gener
        })
    }
    sortPopularityDesc=()=>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objB.popularity-objA.popularity
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortPopularityAsc=()=>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objA.popularity-objB.popularity
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortRatingDesc=()=>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objB.vote_average-objA.vote_average
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortRatingAsc=()=>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objA.vote_average-objB.vote_average
        })
        this.setState({
            movies:[...temp]
        })
    }
    handlePageChange=(page)=>{
        this.setState({
            currPage:page
        })
    }
    handleDelete=(id)=>{
        let newArr =[];
        newArr = this.state.movies.filter((movieObj)=>movieObj.id!=id)
        this.setState({
            movies:[...newArr]
        })
        localStorage.setItem("movies-app",JSON.stringify(newArr))
    }

    render() {
        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
        let filterArr = [];
        if(this.state.currtext==''){
            filterArr = this.state.movies
        }else{
            filterArr = this.state.movies.filter((movieObj)=>{
                let title = movieObj.original_title.toLowerCase();
                return title.includes(this.state.currtext.toLowerCase())
            })
        }
        // if(this.state.currgen=="All Geners"){
        //     filterArr = this.state.movies}
        if(this.state.currgen!="All Geners"){
            filterArr = this.state.movies.filter((movieObj)=>genreids[movieObj.genre_ids[0]]==this.state.currgen)
        }
        let pages = Math.ceil(filterArr.length/this.state.limit);
        let pagesArr =[];
        for(let i=1;i<=pages;i++){
            pagesArr.push(i)
        }
        let si = (this.state.currPage-1)*this.state.limit;
        let ei = si+this.state.limit
        filterArr = filterArr.slice(si,ei);

        return (
            <div>
                <>
                    <div className='main'>
                        <div className='row'>
                            <div className='col-lg-3 col-sm-12'>
                                <ul class="list-group favourite-gener">
                                    {
                                       this.state.geners.map((gener)=>(
                                           this.state.currgen == gener?
                                            <li class="list-group-item"  style={{background:'#3f51b5',color:'white',fontWeight:'bold'}}>{gener}</li>:
                                            <li class="list-group-item"  style={{background:'white',color:'#3f51b5'}} onClick={()=>this.handlegGenerChange(gener)}>{gener}</li>
                                        ))
                                    }
                                   
                                 
                                </ul>
                            </div>
                            <div className='col-lg-9 favourites-table col-sm-12'  >
                                <div className='row'>
                                    <input type='text' className="input-group-text col" placeholder='Search' value={this.state.currtext} onChange={(e)=>this.setState({currtext:e.target.value})}/>
                                    <input type='number' className="input-group-text col" placeholder='Rows Count' value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})} />
                                </div>
                                <div className='row'>
                                    <table class="table">
                                        <thead>
                                            <tr>

                                                <th scope="col">Title</th>
                                                <th scope="col">Gener</th>
                                                <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortPopularityDesc}/>Popularity<i class="fa-solid fa-sort-down"onClick={this.sortPopularityAsc} ></i></th>
                                                <th scope="col"><i class="fa-solid fa-sort-up"onClick={this.sortRatingDesc}/>Rating<i class="fa-solid fa-sort-down" onClick={this.sortRatingAsc}></i></th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                filterArr.map((movieObj) => (
                                                    <tr>

                                                        <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{width:'5rem'}}/> {movieObj.original_title}</td>
                                                        <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                        <td>{movieObj.popularity}</td>
                                                        <td>{movieObj.vote_average} </td>
                                                        <td><button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(movieObj.id)}>Delete</button></td>
                                                    </tr>
                                                ))
                                            }

                                          
                                        </tbody>
                                    </table>
                                </div>
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        {
                                            pagesArr.map((page)=>(
                                                <li class="page-item"><a class="page-link" onClick={()=>this.handlePageChange(page)}>{page}</a></li>
                                            ))
                                        }
                                        
                                        
                                        
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        )
    }
}
