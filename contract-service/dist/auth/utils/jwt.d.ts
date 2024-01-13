import { TokenStructure } from "../dto/login.input";
export declare function VerifyToken(token: string): Promise<boolean>;
export declare function DecodeToken(token: string): Promise<TokenStructure>;
