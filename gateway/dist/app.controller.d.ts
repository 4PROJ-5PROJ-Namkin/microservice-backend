import { HttpService } from '@nestjs/axios';
export declare class AppController {
    private httpService;
    constructor(httpService: HttpService);
    getAllUsers(): import("rxjs").Observable<any>;
    getUserById(id: string): import("rxjs").Observable<any>;
    updateUserById(id: string, updateUserData: any): import("rxjs").Observable<any>;
    deleteUserById(id: string): import("rxjs").Observable<any>;
    getProductionById(id: string): import("rxjs").Observable<any>;
}
