import React from 'react';

export default class InfiniteScroll extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			customStyle: this.props.customStyle !== undefined ? this.props.customStyle : {},
		}
	}

	endReached(e){
		if(e.target.offsetHeight + e.target.scrollTop >= (e.target.scrollHeight-20))
			this.loadMore();
	}

	loadMore(){
		this.props.loadMore();
		console.log("triggered")
	}

	renderLoader(isLoading, morePosts) { 
		var html = ""

		if (isLoading && morePosts) {
			html = (
				<div style = {{position: "relative", "bottom": "300px", 'textAlign': "center"}}>
					<p>Wait Up</p>
				</div>
			)
			return html;
		}
		if (!isLoading && !morePosts) {
			// Posts have finished loading.
			// End of feed posts.
			html = (
				<div style = {{position: "relative", "bottom": "300px", 'textAlign': "center"}}>
					<p>End of the line</p>
				</div>
			)
			return html;
				
		}
		return null;

	}

	render(){
		return (
			<div
			onScroll = {this.endReached.bind(this)}
			style = {{
				height : "100%",
				width : "100%",
				overflowY : "auto",
				...this.state.customStyle 
			}}
			>
                {this.props.children}
                {/* <div>
					{
						this.renderLoader(isLoading, morePosts)
					}
				</div> */}
			</div>
		)
	}
}