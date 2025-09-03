import React from 'react'

const autoId = () => {
    const text = () => {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
     };
     return (text()+text()+"-"+text()+"-"+text()+"-"+text()+"-"+text()+text()+text());
}

export default autoId