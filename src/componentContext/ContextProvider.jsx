import React from 'react'
import context from './context'
const Provider = context.Provider;
function ContextProvider(props) {
    return (
        <Provider value={props.testData} >
            <div>
                 {props.children}
            </div>
        </Provider>

    )
}

export default ContextProvider