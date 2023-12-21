import { AppFilter, AppFilterProps } from "./AppFilter";


export enum ResultFilterTabs {

}

interface ResultFilterProps extends AppFilterProps<ResultFilterTabs>{
    readonly testId: string
}

export class ResultFilter extends AppFilter<ResultFilterTabs>{
    readonly testId: string;
    public constructor(
        { testId, ...props } = {} as ResultFilterProps
    ){
        super({...props});
        this.testId = testId
    }

    public getAllResultsFilter(){
        return {
            pageNumber: this.page,
            pageSize: this.perPage,
            testId: 1
        }
    }
}