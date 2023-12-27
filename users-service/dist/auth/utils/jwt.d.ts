import { Token, TokenStructure } from "../dto/auth.dto";
export declare function GenerateToken(params: TokenStructure): Promise<Token>;
export declare function VerifyToken(token: Token): Promise<boolean>;
export declare function DecodeToken(token: Token): Promise<TokenStructure>;
