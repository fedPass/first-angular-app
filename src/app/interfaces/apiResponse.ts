//struttura della response
//tutte le response delle chiamate mi rispondono con le info nella proprietà results
export interface APIResponse<Type> {
    results: Type[];
    next:string | null;
    previous:string | null;
    count:number
}