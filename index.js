'use strict';

const QUESTIONS = [
    {
        id: 'a', 
        q: 'Who among the listed presidents was the only one to be unanimously elected?',
        aArr: ['George Washington','John Adams','Thomas Jefferson', 'James Madison']
    },
    {
        id: 'b', 
        q: 'Three individuals wrote The Federalist Papers (essays promoting ratifying the U.S. Constitution): Alexander Hamilton, James Madison, and whom?',
        aArr: ['Benjamin Franklin','William Short','John Jay', 'George Clinton'] 
    },
    {
        id: 'c', 
        q: 'The first Constitution of the United States, the Articles of Confederation and Perpetual Union, were signed by the 13 colonies between 1777 and 1781. Which state was the last to sign?',
        aArr: ['Virginia','Massachusetts','Delaware', 'Maryland'] 
    },
    {
        id: 'd', 
        q: 'Where was the treaty that ended the American Revolutionary War signed?',
        aArr: ['London','Philadelphia','Paris', 'Prague'] 
    },
    {
        id: 'e', 
        q: 'While historians in the United States and Canada view it as an independent conflict, historians in the United Kingdom view the War of 1812 as a separate theater of what larger conflict??',
        aArr: ['Wallachian Uprisin','Napoleonic Wars','French Invasion of Spain', 'Mahtra War'] 
    },
        
]


function mainFunctionCall(){
    renderScore();

}