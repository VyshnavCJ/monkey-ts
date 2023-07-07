type Nody = {
    TokenLiteral: () => string
}

type Statement = Nody & {
    statmentNode:() => void
}

type Expression = Nody & {
    expression: () => void
}

type Program = {
    Statements: Statement[]
}

export function TokenLiteral(p: Program): string {
    if (p.Statements.length > 0){
        return p.Statements[0].TokenLiteral()
    }else 
        return ""
}
