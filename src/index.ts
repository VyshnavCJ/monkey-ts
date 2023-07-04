export const  TokenType = {
    Illegal : "ILLEGAL",
    Eof : "EOF",
    Ident: "IDENT",
    Int: "INT",
    Assign : "=",
    Plus : "+",
    Comma : ",",
    Semicolon : ";",
    Lparen : "(",
    Rparen : ")",
    Lbrace : "{", 
    Rbrace : "}", 
    Function : "FUNCTION",
    Let : "LET"
}as const

type TokenItem = typeof TokenType[keyof typeof TokenType]

type Token  = {
    type : TokenItem,
    literal: string
}
export function createToken(type: TokenItem, literal: string):Token{
    return {type,literal}
}
const _0 = "0".charCodeAt(0);
const _9 = "9".charCodeAt(0);

const a = "a".charCodeAt(0);
const z = "z".charCodeAt(0);

const A = "A".charCodeAt(0);
const Z = "Z".charCodeAt(0);

const _ = "_".charCodeAt(0);

function isLetter(character: string): boolean {
    const char = character.charCodeAt(0);
    return a <= char && z >= char || A <= char && Z >= char || char === _;
}
function isNumber(character: string): boolean {
    const char = character.charCodeAt(0);
    return _0 <= char && _9 >= char;
}
const Keywords = {
    "fn": createToken(TokenType.Function, "fn"),
    "let": createToken(TokenType.Let, "let")
} as const;

export class Tokenizer{
    private position:number = 0
    private readPosition:number = 0
    private ch: string
    
    constructor(private input: string){
        this.readChar()
    }

    /** @throws {Error} */
    public getNextToken():Token{

        let tok: Token;
        this.skipWhitespace()

        switch (this.ch) {
            case "{":
                tok = createToken(TokenType.Lbrace, this.ch);
                break;
            case "}":
                tok = createToken(TokenType.Rbrace, this.ch);
                break;
            case "(":
                tok = createToken(TokenType.Lparen, this.ch);
                break;
            case ")":
                tok = createToken(TokenType.Rparen, this.ch);
                break;
            case ",":
                tok = createToken(TokenType.Comma, this.ch);
                break;
            case ";":
                tok = createToken(TokenType.Semicolon, this.ch);
                break;
            case "+":
                tok = createToken(TokenType.Plus, this.ch);
                break;
            case "=":
                tok = createToken(TokenType.Assign, this.ch);
                break
            case "\0":
                tok = createToken(TokenType.Eof, "");
                break;
        }
        
        if (isLetter(this.ch)){
            const ident = this.readIden()
            const keyword = Keywords[ident as keyof typeof Keywords]
            if(keyword){
                return keyword
            }else{
                return createToken(TokenType.Ident,ident)
            }
        }else if(isNumber(this.ch)){
            return createToken(TokenType.Int,this.readNumber())
        }else if(!tok){
            tok = createToken(TokenType.Illegal,this.ch)
        }

        this.readChar()

        return tok as Token
    }

    private readChar(): void{
        if (this.readPosition >= this.input.length){
            this.ch = "\0"
        }else{
            this.ch = this.input[this.readPosition]
        }
        this.position = this.readPosition
        this.readPosition+=1
    }
    
    private readIden(): string{
        const position:number = this.position
        while(isLetter(this.ch)){
            this.readChar()
        }
        return this.input.slice(position, this.position);
    }

    private readNumber(): string{
        const position:number = this.position
        while(isNumber(this.ch)){
            this.readChar()
        }
        return this.input.slice(position, this.position);
    }
    private skipWhitespace(): void {
        while (this.ch === " " || this.ch === "\t" || this.ch === "\n" || this.ch === "\r") {
            this.readChar();
        }
    }
}
