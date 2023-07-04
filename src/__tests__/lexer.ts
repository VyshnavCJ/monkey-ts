import {TokenType, Tokenizer} from ".."

test("test getNextToken()",function(){
    const input = `=+(){},;`
    const tokens = [
        TokenType.Assign,
        TokenType.Plus,
        TokenType.Lparen,
        TokenType.Rparen,
        TokenType.Lbrace,
        TokenType.Rbrace,
        TokenType.Comma,
        TokenType.Semicolon
    ]
    const lexer = new Tokenizer(input)
    for(const token of tokens){
            expect(lexer.getNextToken().type).toBe(token)
    }
})

test("test getNextToken() complete", function() {
    const input =`let five = 5;
        let ten = 10;
        let add = fn(x, y) {
            x + y;
        };
        let result = add(five, ten);
        `;

    var lex = new Tokenizer(input);

    var tokens = [
        {type: TokenType.Let, literal: "let"},
        { type: TokenType.Ident, literal: "five" },
        {type: TokenType.Assign, literal: "="},
        { type: TokenType.Int, literal: "5" },
        {type: TokenType.Semicolon, literal: ";"},
        {type: TokenType.Let, literal: "let"},
        { type: TokenType.Ident, literal: "ten" },
        {type: TokenType.Assign, literal: "="},
        { type: TokenType.Int, literal: "10" },
        {type: TokenType.Semicolon, literal: ";"},
        {type: TokenType.Let, literal: "let"},
        { type: TokenType.Ident, literal: "add" },
        {type: TokenType.Assign, literal: "="},
        {type: TokenType.Function, literal: "fn"},
        {type: TokenType.Lparen, literal: "("},
        { type: TokenType.Ident, literal: "x" },
        {type: TokenType.Comma, literal: ","},
        { type: TokenType.Ident, literal: "y" },
        {type: TokenType.Rparen, literal: ")"},
        {type: TokenType.Lbrace, literal: "{"},
        { type: TokenType.Ident, literal: "x" },
        {type: TokenType.Plus, literal: "+"},
        { type: TokenType.Ident, literal: "y" },
        {type: TokenType.Semicolon, literal: ";"},
        {type: TokenType.Rbrace, literal: "}"},
        {type: TokenType.Semicolon, literal: ";"},
        {type: TokenType.Let, literal: "let"},
        { type: TokenType.Ident, literal: "result" },
        {type: TokenType.Assign, literal: "="},
        { type: TokenType.Ident, literal: "add" },
        {type: TokenType.Lparen, literal: "("},
        { type: TokenType.Ident, literal: "five" },
        {type: TokenType.Comma, literal: ","},
        { type: TokenType.Ident, literal: "ten" },
        {type: TokenType.Rparen, literal: ")"},
        {type: TokenType.Semicolon, literal: ";"},
        {type: TokenType.Eof, literal: ""},
    ];

    for (const token of tokens) {
        expect(lex.getNextToken()).toEqual(token);
    }
});
