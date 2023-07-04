import readline from "readline";
import {TokenType,Tokenizer} from "./lexer"

const rs = readline.createInterface({
    input: process.stdin
})

rs.on("line",(input)=>{
    const tokenizer = new Tokenizer(input)
    
    while(true){
        const token = tokenizer.getNextToken()
        console.log(token)
        if(token.type===TokenType.Eof){
            break 
        } 
    } 
})

rs.on("close",()=>{
    console.log("Lexer complete")
})
