import React from "react"


export const FourOhFour = ({match}) => {
    return (
        <h1>Ups, nie znaleizono widoku o nazwie {match.params.view} </h1>
    )
};