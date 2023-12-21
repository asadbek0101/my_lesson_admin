import "./assets/paginator.scss";
import { useCallback, useMemo } from "react";
import { AppFilter } from "../../filters/AppFilter";

import LeftIcon from "../icons/LeftIcon";
import RightIcon from "../icons/RightIcon";
import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { appTotalPageCountSelector, appTotalRowCountSelector } from "../../reducers/appReducer";
import useLocationHelpers from "../../hooks/userLocationHelpers";

interface Props{
    readonly filter: AppFilter<any>;
}

export default function Paginator({filter}:Props){

    const perPage = useMemo(()=>filter.getPerPage(), [filter]);
    const pageCount = useMemo(()=>filter.getPageCount(), [filter]);
    const totalRowCount = useShallowEqualSelector(appTotalRowCountSelector);
    const totalPageCount = useShallowEqualSelector(appTotalPageCountSelector);
    const locationHelpers = useLocationHelpers();

    const prev = useCallback(()=>{
        if(pageCount > 1){
            const  pageC = pageCount - 1;
            locationHelpers.pushQuery({ perPage: perPage.toString(), pageCount: pageC.toString() })
        }
    },[perPage, pageCount, locationHelpers]);

    const next = useCallback(()=>{
        if(pageCount < Number(totalPageCount)){
            const  pageC = pageCount + 1;
            locationHelpers.pushQuery({ perPage: perPage.toString(), pageCount: pageC.toString()})
        }
    },[totalPageCount, perPage, locationHelpers, pageCount]);

    return (
        <div className="paginator-wrapper">
            <select name="" id="" onChange={(event: any)=>{
                locationHelpers.pushQuery({ perPage: event.target.value, pageCount: pageCount })
            }} className="paginator-select" value={perPage}>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="75">75</option>
                <option value="100">100</option>
            </select>
            <div className="d-flex align-items-center">
                {pageCount} of {totalPageCount}
            </div>
            <div className="button-group">
                <button
                    onClick={()=>prev()}
                    >
                    <LeftIcon color="#000"/>
                </button>
                <button>
                    {pageCount}
                </button>
                <button
                    onClick={()=>next()}
                    >
                    <RightIcon color="#000"/>
                </button>
            </div>
            <div className="d-flex align-items-center">
                <span>Total </span>
                <span className="ms-2">{totalRowCount}</span>
            </div>
        </div>
    )
}