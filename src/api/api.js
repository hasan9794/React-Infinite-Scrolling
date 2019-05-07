import React from "react"

function getCrimeCategory(){
    return new Promise((resolve, reject) => {
        fetch("https://data.police.uk/api/crime-categories")
            .then((res) => res.json())
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject({message: "something"})
            })
    })
}

function getForce(){
    return new Promise((resolve, reject) => {
        fetch('https://data.police.uk/api/forces')
            .then((res) => res.json())
            .then((res) => {
                resolve(res)
            }).catch(() => {
                reject({message: "error agaya forces lane m"})
            })
        })
}

function getCrime(category, force){
    return new Promise((resolve, reject) => {
        console.log("hello from API ==>>", category, force)
        fetch(`https://data.police.uk/api/crimes-no-location?category=${category}&force=${force}`)
            .then((res) => res.json())
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject({message: "error hai jani get crime mn"})
            })
    })
}

export {
    getCrimeCategory,
    getForce,
    getCrime
}