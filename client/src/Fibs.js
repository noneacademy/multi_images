import React, { Component} from 'react';
import axios from 'axios';


class Fibs extends Component {

    state = {
        screenIndex: [],
        values: {},
        index: ''
    }

    componentDidMount(){
        this.fetchValues();
        this.fetchIndex();
    }

    async fetchValues(){
       
        const values = await axios.get('/api/values/current');
        this.setState({ values: values.data });

    }

    async fetchIndexes(){
        const senIndexes = await axios.get('/api/values/all');
        this.setState({ senIndexes: senIndexes.data });
     }

     handleSubmit = async (event) => {
         event.preventDefault();

         await axios.post('/api/values', {
            index: this.state.index
         })
         this.setState({ index: ''})
     }


     renderSeenIndexes(){
        return this.state.senIndexes.map(({ number }) => number ).join(',');
     }

     renderValues(){

        const entries = [];

        for(let key in this.state.values){
            entries.push(
                <div key={key}>
                    For Index { key} I calculated {this.state.values[key]}
                </div>
            )
        }

        return entries
     }

     render(){
         return(
             <div>
                 <form onSubmit={this.handleSubmit}>
                     <label> Enter your Index:</label>
                     <input 
                     value={this.state.index}
                     onChange={event => this.setState({ index: event.target.value })}
                     />
                     <button> Submit</button>
                 </form>

                <h3> Indexes I have seen: </h3>
                    {this.renderSeenIndexes()}
                <h3> Calculated Values: </h3>
                    {this.renderValues()}
             </div>
         )
     }

}

export default Fibs;