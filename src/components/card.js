import React from 'react'

class Card extends React.Component{
    render(){
        return(
            <div className="card mb-3">                
                <h3 className="card-header">{this.props.title}</h3>
                <div className="card-body">
                    {this.props.children}
                    {/* Comentário */}
                </div>
            </div>

        )
    }
}

export default Card;