import React, { Component } from 'react'
import Counter from './Counter';


class ControlPanel extends Component {
    
    render() {
        return (
            <div>
                <Counter caption='第一个' oninitValue={0} />
                {/* <Counter caption='第二个' oninitValue={1} /> */}
            </div>
        )
    }
}
export default ControlPanel